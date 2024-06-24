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
  PerspectiveCamera,
} from "@react-three/drei";
import { DoubleSide } from "three";

const MoonSphere = ({ size }) => {
  const texture = useTexture("../src/assets/moonmap1k.jpg");
  return (
    <mesh position={[0, 0, 0]}>
      <ambientLight intensity={1} />
      <directionalLight />
      <Environment preset="night" />
      <sphereGeometry args={[size, 32, 32]} />
      <meshPhongMaterial map={texture} displacementScale={0.2} />
    </mesh>
  );
};

const Plane = ({ position, rotation, args }) => {
  return (
    <mesh position={position} rotation={rotation}>
      <ambientLight intensity={1} />
      <planeGeometry args={args} />
      <meshBasicMaterial color="#1a1a1a" side={DoubleSide} />
    </mesh>
  );
};

const Home = () => {
  return (
    <>
      {/* <HomeToLogin /> */}
      <Canvas id="canvas">
        <Suspense>
          <PerspectiveCamera position={[3, 3, 3]} makeDefault />
          <OrbitControls autoRotate autoRotateSpeed={0.3} />
          <Stars radius={250} />
          <MoonSphere size={0.5} />
          <Plane
            position={[0, -0.5, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            args={[2, 2]}
          />
          <Plane
            position={[0, 0, -1]}
            rotation={[Math.PI, 0, 0]}
            args={[2, 1]}
          />
          <Plane
            position={[-1, 0, 0]}
            rotation={[Math.PI, Math.PI / 2, 0]}
            args={[2, 1]}
          />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Home;
