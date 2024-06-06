import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Model } from "./Table";
import BackgroundImage from "./models/bgImage.jpeg";

export default function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 1.66] }}>
        {/* <Environment background files={BackgroundImage} /> */}
        <Environment preset="forest" />
        <Model />
        {/* <ContactShadows position={[0, -0.8, 0]} color="#ffffff" /> */}
        <OrbitControls position={[0, 0, 0]} />
      </Canvas>
    </>
  );
}
