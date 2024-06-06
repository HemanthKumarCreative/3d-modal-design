import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

const TableDrawer = (props) => {
  const mesh = useRef();
  const { scale, open, material } = props;
  const outerGeometry = useMemo(
    () => new THREE.BoxGeometry(0.68, 0.17, 0.68), // Adjust dimensions as needed
    []
  );

  const positionX = -0.35 * (1 - scale[0]);
  const positionZ = -0.3 * (1 - scale[1]);

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
          open ? 0.7 + positionX : positionX,
          0.26 + positionZ,
          props?.count === 1
            ? props.i
            : props?.count === 2
            ? props?.i === 0
              ? -0.3
              : 0.3
            : props?.count === 3
            ? props?.i === 0
              ? -0.6
              : props?.i === 1
              ? 0
              : 0.6
            : props?.count === 4
            ? props?.i === 0
              ? -0.9
              : props?.i === 1
              ? -0.3
              : props?.i === 2
              ? 0.3
              : 0.9
            : props?.count === 5
            ? props?.i === 0
              ? -1.2
              : props?.i === 1
              ? -0.6
              : props?.i === 2
              ? 0
              : props?.i === 3
              ? 0.6
              : 1.2
            : 0,
        ]}
        rotation={[0, Math.PI / 2, 0]}
        // scale={scale}
      />
    </group>
  );
};

export default TableDrawer;
