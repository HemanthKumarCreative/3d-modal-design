import React, { useState, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import Dresser2 from "./models/dresser2.glb";

function TableDrawer(props) {
  const { nodes, materials } = useGLTF(Dresser2);
  const [open, setOpen] = useState(false);

  const { scale } = props;

  const positionX = useMemo(() => -0.35 * (1 - scale[0]), [scale]);
  const positionZ = useMemo(() => -0.3 * (1 - scale[1]), [scale]);

  const { posX } = useSpring({
    posX: open ? 0.7 + positionX : 0.35 + positionX,
    config: { tension: 50, friction: 50 },
  });

  const drawerPosition = useMemo(() => {
    switch (props.count) {
      case 1:
        return 0;
      case 2:
        return props.i === 0 ? -0.3 : 0.3;
      case 3:
        return props.i === 0 ? -0.6 : props.i === 1 ? 0 : 0.6;
      case 4:
        return props.i === 0
          ? -0.9
          : props.i === 1
          ? -0.3
          : props.i === 2
          ? 0.3
          : 0.9;
      case 5:
        return props.i === 0
          ? -1.2
          : props.i === 1
          ? -0.6
          : props.i === 2
          ? 0
          : props.i === 3
          ? 0.6
          : 1.2;
      default:
        return 0;
    }
  }, [props.count, props.i]);

  return (
    <a.group
      position-x={open === true ? posX : 0.35 + positionX}
      position-y={0.26 + positionZ}
      position-z={drawerPosition}
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
