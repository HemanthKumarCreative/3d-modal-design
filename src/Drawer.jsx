import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

const TableDrawer = (props) => {
  const mesh = useRef();
  const { scale, open, material, verticalCount, j } = props;
  const outerGeometry = useMemo(
    () => new THREE.BoxGeometry(1, 0.2, 0.68), // Adjust dimensions as needed
    []
  );

  const positionX = -0.5 * (0.7 - scale[0]);
  const positionZ = -0.001 * scale[1];

  useFrame(() => {
    if (mesh.current) {
      // Your animation or rotation logic here
    }
  });

  return (
    <group>
      <mesh
        ref={mesh}
        geometry={outerGeometry}
        material={material}
        position={[
          positionX,
          -0.15 + positionZ - j / 5,
          props?.count === 1
            ? props.i
            : props?.count === 2
            ? props?.i === 0
              ? -0.5
              : 0.5
            : props?.count === 3
            ? props?.i === 0
              ? -1.0
              : props?.i === 1
              ? 0
              : 1.0
            : props?.count === 4
            ? props?.i === 0
              ? -1.4
              : props?.i === 1
              ? -0.6
              : props?.i === 2
              ? 0.6
              : 1.4
            : props?.count === 5
            ? props?.i === 0
              ? -1.5
              : props?.i === 1
              ? -0.8
              : props?.i === 2
              ? 0
              : props?.i === 3
              ? 0.8
              : 1.5
            : 0,
        ]}
        rotation={[0, Math.PI / 2, 0]}
        // scale={scale}
      />
    </group>
  );
};

export default TableDrawer;
