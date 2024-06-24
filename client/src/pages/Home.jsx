import React, { useRef, Suspense, useState } from "react";
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

const MoonSphere = ({ position, size }) => {
  const texture = useTexture("../src/assets/moonmap1k.jpg");
  const [clicked, setClicked] = useState(false);
  return (
    <mesh position={position}>
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
      <planeGeometry args={args} />
      <meshBasicMaterial color="#1a1a1a" side={DoubleSide} />
    </mesh>
  );
};

const Home = () => {
  return (
    <>
      <HomeToLogin />
      <Canvas id="canvas">
        <Suspense>
          <PerspectiveCamera position={[10, 10, 10]} makeDefault />
          <OrbitControls autoRotate autoRotateSpeed={0.3} />
          <Stars radius={250} />
          <MoonSphere position={[0, 4, 0]} size={2} />
          {/* <Plane
            position={[0, 2, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            args={[8, 8]}
          /> */}
          {/* <gridHelper args={[8, 8]} position={[0, 2, 0]} /> */}
        </Suspense>
      </Canvas>
    </>
  );
};

export default Home;
