import React, { useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { Color, TextureLoader } from "three";
import Table from "./models/table.glb";

import DarkWood from "./tableTextures/DarkWood.jpg";
import FloorWood from "./tableTextures/FloorWood.png";
import LeafPattern from "./tableTextures/LeafPattern.jpg";
import OakWood from "./tableTextures/OakWood.jpg";
import RingPattern from "./tableTextures/RingPattern.jpg";
import RoseWood from "./tableTextures/RoseWood.jpg";
import WornWood from "./tableTextures/WornWood.jpg";
import TableDrawer from "./NewDrawer";
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
    { path: OakWood, title: "Oak Wood" },
    { path: RoseWood, title: "Rose Wood" },
    { path: LeafPattern, title: "Leaf Pattern" },
    { path: RingPattern, title: "Strip Pattern" },
    { path: DarkWood, title: "Dark Wood" },
    { path: WornWood, title: "Worn Wood" },
    { path: FloorWood, title: "Floor Wood" },
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
    length: { value: 1, min: 1, max: 5, step: 0.1 },
    width: { value: 1, min: 1, max: 5, step: 0.1 },
    height: { value: 1, min: 1, max: 5, step: 0.1 },
  });

  const renderDrawers = (count) => {
    let drawers = [];
    for (let i = 0; i < count; i++) {
      const drawer = (
        <group key="table-drawer-section">
          <TableDrawer
            key="table-drawer"
            referenceNode={nodes.Cube002.geometry}
            material={materials.Material}
            open={open}
            setOpen={setOpen}
            scale={[length, height, width]}
            i={i}
            count={count}
          />
          <Drawer
            key="table-draw-holder"
            scale={[length, height, width]}
            material={materials.Material}
            i={i}
            count={count}
          />
        </group>
      );
      drawers.push(drawer);
    }
    return drawers;
  };

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
      key="table-group"
    >
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        scale={[length, height, width]}
        key="table-top"
      />
      <mesh
        geometry={nodes.Cube002.geometry}
        material={materials.Material}
        scale={[length, height, width]}
        key="table-ring"
      />
      {renderDrawers(Math.floor(width))}
    </group>
  );
}

useGLTF.preload(Table);
