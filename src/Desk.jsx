import React, { useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import Desk from "./models/desk.gltf";
import { useControls } from "leva";
import { Color, TextureLoader } from "three";
import Floor from "./tableTextures/Floor.png";
import Leaves from "./tableTextures/Leaves.png";
import Potato from "./tableTextures/Potato.png";
import WhiteBoard from "./tableTextures/WhiteBoard.png";
import WoodBoard from "./tableTextures/WoodBoard.png";

export function Model(props) {
  const { nodes, materials } = useGLTF(Desk);
  const [hovered, setHovered] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState({
    drawer1: false,
    drawer2: false,
  });

  const toggleDrawer = (drawer) => {
    setDrawerOpen((prev) => ({ ...prev, [drawer]: !prev[drawer] }));
  };

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
      rotation={[-Math.PI / 4, 0, -Math.PI]}
      position={[0, 0, 0]}
      scale={0.1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        document
          .getElementById("Table Color." + e.object.material.name)
          .focus();
      }}
    >
      <mesh geometry={nodes.mesh_0.geometry} material={materials.mat0} />
      <mesh geometry={nodes.mesh_0_1.geometry} material={materials.mat1} />
      <mesh geometry={nodes.mesh_1.geometry} material={materials.mat0} />
      <mesh
        geometry={nodes.mesh_1_1.geometry}
        material={materials.mat2}
        position={[0, drawerOpen.drawer1 ? 2 : 0, 0]}
        onClick={() => toggleDrawer("drawer1")}
      />
      <mesh
        geometry={nodes.mesh_2.geometry}
        material={materials.mat0}
        position={[0, drawerOpen.drawer2 ? 2 : 0, 0]}
        onClick={() => toggleDrawer("drawer2")}
      />
      <mesh geometry={nodes.mesh_2_1.geometry} material={materials.mat2} />
    </group>
  );
}

useGLTF.preload(Desk);
