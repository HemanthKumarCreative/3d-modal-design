import React, { useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import WoodTable from "./models/woodTable.glb";
import { useControls } from "leva";
import { Color, TextureLoader } from "three";
import Floor from "./tableTextures/Floor.png";
import Leaves from "./tableTextures/Leaves.png";
import Potato from "./tableTextures/Potato.png";
import WhiteBoard from "./tableTextures/WhiteBoard.png";
import WoodBoard from "./tableTextures/WoodBoard.png";

export function Model(props) {
  const { nodes, materials } = useGLTF(WoodTable);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  // Load textures
  const textureLoader = new TextureLoader();
  const texturePaths = [
    { path: Floor, title: "Floor" },
    { path: Leaves, title: "Leaves" },
    { path: Potato, title: "Potato" },
    { path: WhiteBoard, title: "White Board" },
    { path: WoodBoard, title: "Wood Board" },
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
        value:
          "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
        onChange: (v) => {
          materials[m].color = new Color(v);
        },
      };
    });
    return colorPickers;
  });

  // Controls for table dimensions
  const { length, width, height } = useControls("Table Dimensions", {
    length: { value: 1, min: 0.1, max: 10, step: 0.1 },
    width: { value: 1, min: 0.1, max: 10, step: 0.1 },
    height: { value: 1, min: 0.1, max: 10, step: 0.1 },
  });
  console.log({ nodes, materials });
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
          .focus();
      }}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh
            geometry={nodes.Table.children[0].geometry}
            material={materials.Table_1}
            position={[0, 2.502, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(WoodTable);
