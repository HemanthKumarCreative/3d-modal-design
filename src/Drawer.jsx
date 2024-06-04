import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

const TableDrawer = ({ scale, open }) => {
  const mesh = useRef();

  const geometry = useMemo(
    () => new THREE.BoxGeometry(0.4, 0.1, 0.15), // Adjust dimensions as needed
    []
  );
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "yellow",
        metalness: 0.2, // Adjusted metalness for a metal drawer handle
        roughness: 0.4, // Adjusted roughness for a smoother surface
      }),
    []
  );

  // Calculate the position to move the drawer based on the scale factor
  const positionX = -0.35 * (1 - scale[0]);
  const positionZ = -0.3 * (1 - scale[1]);
  useFrame(() => {
    if (mesh.current) {
      // Your animation or rotation logic here
    }
  });

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      material={material}
      position={[
        open ? 0.4 + positionX : 0.27 + positionX,
        0.25 + positionZ,
        -0.02,
      ]} // Adjusted position to better fit the scene
      rotation={[0, Math.PI / 2, 0]} // Rotate the drawer to make it horizontal
      //   scale={scale}
    />
  );
};

export default TableDrawer;
