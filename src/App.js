import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Model } from "./Table";

export default function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 1.66] }}>
        <Environment preset="forest" />
        <Model />
        {/* <ContactShadows position={[0, -0.8, 0]} color="#ffffff" /> */}
        <OrbitControls position={[0, 0, 0]} />
      </Canvas>
    </>
  );
}
