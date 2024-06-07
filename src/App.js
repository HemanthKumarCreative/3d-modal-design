import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Plane,
} from "@react-three/drei";
import { Model } from "./Table";
import BackgroundImage from "./models/bgImage.jpeg";
import { useEffect, useState } from "react";

export default function App() {
  const [mf, setMf] = useState({ width: 1, length: 1 });
  const [planePosition, setPlanePosition] = useState([0, 0, 0]);
  return (
    <>
      <Canvas shadows camera={{ position: [0, 0.3, 1.66] }}>
        {/* Environment for background */}
        {/* <Environment background={BackgroundImage} /> */}
        <Environment preset="forest" />

        {/* Your existing table model */}
        <Model setMf={setMf} setPlanePosition={setPlanePosition} />

        {/* Ground Plane */}
        <Plane
          args={[mf.width, mf.length]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={planePosition}
          receiveShadow
        />

        {/* <ContactShadows position={planePosition} color="#ffffff" /> */}
        <OrbitControls position={[0, 0, 0]} />
      </Canvas>
    </>
  );
}
