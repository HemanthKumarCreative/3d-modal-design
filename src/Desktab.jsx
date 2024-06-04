import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import DeskTab from "./models/desktab.glb";

export function Model(props) {
  const { nodes, materials } = useGLTF(DeskTab);
  console.log({ nodes });
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.GenericClassicTable001.geometry}
        material={materials.GenericClassicTable001}
      />
    </group>
  );
}

useGLTF.preload(DeskTab);
