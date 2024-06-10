import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Plane,
  PerspectiveCamera,
} from "@react-three/drei";
import { Model } from "./UpdateTable1"; // Assuming your Table component is in a separate file
import BackgroundImage from "./models/bgImage.jpeg";
import { useEffect, useState } from "react";

export default function App() {
  const [mf, setMf] = useState({ width: 1, length: 1 });
  const [planePosition, setPlanePosition] = useState([0, 0, 0]);

  return (
    <>
      <Canvas shadows>
        {/* Adjusted camera position and field of view */}
        <Environment preset="forest" />
        {/* Table is rotated to face opposite to the initial camera view */}
        <Model
          setMf={setMf}
          setPlanePosition={setPlanePosition}
          rotation={[0, Math.PI, 0]}
        />

        {/* Ground Plane */}
        {/* <Plane
          args={[mf.width, mf.length]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={planePosition}
          receiveShadow
        /> */}

        {/* <ContactShadows position={planePosition} color="#ffffff" /> */}

        {/* Adjusted OrbitControls target and make controls */}
        <OrbitControls
          makeDefault
          target={[0, 0.5, 0]} // Focus on the center of the table
          // minDistance={1} // Prevent zooming in too close
          // maxDistance={5} // Prevent zooming out too far
        />

        {/* Camera is positioned to face the table */}
        <PerspectiveCamera makeDefault position={[0, 2, -3.5]} fov={50} />
      </Canvas>
    </>
  );
}
