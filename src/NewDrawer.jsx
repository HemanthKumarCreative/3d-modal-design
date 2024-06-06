import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import Dresser2 from "./models/dresser2.glb";

function TableDrawer(props) {
  const { nodes, materials } = useGLTF(Dresser2);
  const [open, setOpen] = useState(false);

  const { scale } = props;

  const positionX = -0.35 * (1 - scale[0]);
  const positionZ = -0.3 * (1 - scale[1]);

  const { position } = useSpring({
    position: open
      ? [0.7 + positionX, 0.26 + positionZ, 0]
      : [0.35 + positionX, 0.26 + positionZ, 0],
    config: { tension: 50, friction: 50 },
  });

  const drawerPosition =
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
      : 0;

  return (
    <a.group
      position={position.to((x, y, z) => [x, y, drawerPosition])}
      rotation={[1.58, 0, 0]}
      scale={[0.0035, 0.0035, 0.0035]}
    >
      <mesh geometry={nodes.Mesh003.geometry} material={props.material} />
      <mesh
        geometry={nodes.Mesh003_1.geometry}
        material={materials["Tisch_3-03"]}
        onClick={() => setOpen(!open)}
        scale={[1, 1, 1]}
      />
    </a.group>
  );
}

useGLTF.preload(Dresser2);

export default TableDrawer;
