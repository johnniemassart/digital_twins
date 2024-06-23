import React, { useRef, Suspense } from "react";
import "../css/Home.css";
import HomeToLogin from "../components/home/HomeToLogin";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  useTexture,
  Stars,
  Environment,
  ContactShadows,
} from "@react-three/drei";

const MoonSphere = () => {
  const texture = useTexture("../src/assets/moonmap1k.jpg");
  return (
    <mesh position={[1, 0, 0]}>
      <ambientLight intensity={1} />
      <directionalLight />
      <Environment preset="night" />
      <sphereGeometry />
      <meshStandardMaterial map={texture} displacementScale={0.2} />
    </mesh>
  );
};

const Home = () => {
  return (
    <>
      <HomeToLogin />
      <Canvas id="canvas">
        <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />
        <Stars radius={250} />
        <MoonSphere />
      </Canvas>
    </>
  );
};

export default Home;
