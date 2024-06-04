import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { useFrame } from "react-three-fiber";

const WardrobeHolderNib = ({ scale, open, setOpen }) => {
  const mesh = useRef();
  const positionX = -0.35 * (1 - scale[0]);
  const positionZ = -0.3 * (1 - scale[1]);

  const geometry = useMemo(
    () => new THREE.CylinderGeometry(0.025, 0.025, 0.15, 32),
    []
  ); // Adjusted geometry to be cylindrical
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0x808080,
        metalness: 0.8, // Adjusted metalness for Almarriah holder
        roughness: 0.2, // Adjusted roughness for smoother surface
      }),
    []
  );

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
        open ? 0.48 + positionX : 0.36 + positionX,
        0.25 + positionZ,
        -0.02,
      ]} // Adjusted position to better fit the scene
      rotation={[Math.PI / 2, 0, 0]} // Rotate the holder to make it horizontal
      onClick={() => setOpen(!open)}
    />
  );
};

export default WardrobeHolderNib;
