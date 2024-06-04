import React, { useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { Color, TextureLoader } from "three";
import Table from "./models/table.glb";
import Floor from "./tableTextures/Floor.png";
import Leaves from "./tableTextures/Leaves.png";
import Potato from "./tableTextures/Potato.png";
import WhiteBoard from "./tableTextures/WhiteBoard.png";
import WoodBoard from "./tableTextures/WoodBoard.png";
import WoodWorn from "./tableTextures/WoodWorn.jpg";
import woodDisp from "./tableTextures/WoodDisp.png";

import { Box } from "@react-three/drei";
import * as THREE from "three";
import DrawerNib from "./DrawerNib";
import Drawer from "./Drawer";

export function Model(props) {
  const { nodes, materials } = useGLTF(Table);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  // Load textures
  const textureLoader = new TextureLoader();
  const texturePaths = [
    { path: WoodWorn, title: "White Worn" },
    { path: WoodBoard, title: "Wood Board" },
    { path: woodDisp, title: "White Disp" },
    { path: Floor, title: "Floor" },
    { path: Leaves, title: "Leaves" },
    { path: Potato, title: "Potato" },
    { path: WhiteBoard, title: "White Board" },
  ];
  const textures = texturePaths.map((texture) =>
    textureLoader.load(texture.path)
  );
  const textureOptions = texturePaths.map((texture) => texture.title);

  // Function to apply the texture to the materials
  const applyTexture = (materialName, texture) => {
    if (materials[materialName]) {
      materials[materialName].map = texture;
      materials[materialName].needsUpdate = true;
    }
  };

  useControls("Table Texture", () => {
    const texturePickers = {};
    Object.keys(materials).forEach((m) => {
      texturePickers[m] = {
        options: textureOptions,
        value: textureOptions[0],
        onChange: (path) => {
          console.log("Change Triggered", path);
          const selectedTexture = textures[textureOptions.indexOf(path)];
          applyTexture(m, selectedTexture);
        },
      };
    });
    return texturePickers;
  });

  useControls("Table Color", () => {
    const colorPickers = {};
    Object.keys(materials).forEach((m) => {
      colorPickers[m] = {
        value: "#deb887",
        onChange: (v) => {
          materials[m].color = new Color(v);
        },
      };
    });
    return colorPickers;
  });

  // Controls for table dimensions
  const { length, width, height } = useControls("Table Dimensions", {
    length: { value: 1, min: 1, max: 10, step: 0.1 },
    width: { value: 1, min: 1, max: 10, step: 0.1 },
    height: { value: 1, min: 1, max: 10, step: 0.1 },
  });

  return (
    <group
      {...props}
      dispose={null}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        document
          .getElementById("Table Color." + e.object.material.name)
          ?.focus();
      }}
      position={[0, 0, 0]}
      rotation={[0, -Math.PI / 2, -Math.PI / 7]}
    >
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        scale={[length, height, width]}
      />
      <mesh
        geometry={nodes.Cube002.geometry}
        material={materials.Material}
        scale={[length, height, width]}
      />
      <group>
        <Drawer
          scale={[length, height, width]}
          open={open}
          material={materials.Material}
        />
        <DrawerNib
          scale={[length, height, width]}
          setOpen={setOpen}
          open={open}
        />
      </group>
    </group>
  );
}

useGLTF.preload(Table);
