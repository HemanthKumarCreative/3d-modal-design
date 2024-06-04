import React, { useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import TableDrawer from "./models/tablewithdraw.glb";
import { useControls } from "leva";
import { Color, TextureLoader } from "three";
import Floor from "./tableTextures/Floor.png";
import Leaves from "./tableTextures/Leaves.png";
import Potato from "./tableTextures/Potato.png";
import WhiteBoard from "./tableTextures/WhiteBoard.png";
import WoodBoard from "./tableTextures/WoodBoard.png";

export function Model(props) {
  const { nodes, materials } = useGLTF(TableDrawer);
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
  console.log({ materials, door: nodes.Door });
  return (
    <group {...props} dispose={null}>
      <group position={[0.003, 2.632, 0.23]}>
        <mesh
          geometry={nodes.Door.geometry}
          material={materials["Free Drawer  textures"]}
          position={[0.023, 0.058, -0.144]}
          scale={[1, 1.009, 1]}
        />
        <mesh
          geometry={nodes.Drawer_parts.geometry}
          material={materials["Free Drawer  textures"]}
          position={[-0.593, 0.002, -1.148]}
        />
        <mesh
          geometry={nodes.Knob.geometry}
          material={materials["Free Drawer  textures"]}
          position={[-0.003, 0, -0.041]}
        />
      </group>
      <mesh
        geometry={nodes.Base_3.geometry}
        material={materials["Free Drawer  textures"]}
        position={[0.026, 1.949, -1.038]}
      />
      <mesh
        geometry={nodes.Nut.geometry}
        material={materials["Free Drawer  textures"]}
        position={[1.026, 3.002, 0.11]}
      />
      <mesh
        geometry={nodes.Truss_.geometry}
        material={materials["Free Drawer  textures"]}
        position={[0.026, 0.762, 0]}
      />
      <mesh
        geometry={nodes.Base_2.geometry}
        material={materials["Free Drawer  textures"]}
        position={[0.026, 0.763, -1.038]}
      />
      <mesh
        geometry={nodes.Base.geometry}
        material={materials["Free Drawer  textures"]}
        position={[0.026, 2.179, -1.038]}
      />
      <mesh
        geometry={nodes.truss_2.geometry}
        material={materials["Free Drawer  textures"]}
        position={[-0.006, 3.113, -0.008]}
      />
      <mesh
        geometry={nodes.truss_3.geometry}
        material={materials["Free Drawer  textures"]}
        position={[-0.762, 2.623, -0.008]}
      />
      <mesh
        geometry={nodes.Side_walls.geometry}
        material={materials["Free Drawer  textures"]}
        position={[1.026, 1.993, -1]}
      />
      <mesh
        geometry={nodes.Drawer_top.geometry}
        material={materials["Free Drawer  textures"]}
        position={[0.026, 3.232, -1]}
        scale={[0.92, 1, 0.92]}
      />
      <mesh
        geometry={nodes.Leg.geometry}
        material={materials["Free Drawer  textures"]}
        position={[-0.974, 1.6, 0]}
      />
    </group>
  );
}

useGLTF.preload(TableDrawer);
