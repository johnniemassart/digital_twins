import React, { useRef, Suspense, useState } from "react";
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
      <meshBasicMaterial color="black" side={DoubleSide} />
    </mesh>
  );
};

const Moon = () => {
  return (
    <div className="moon-wrapper">
      <Canvas id="canvas">
        <Suspense>
          <PerspectiveCamera position={[6, 6, 6]} makeDefault />
          <OrbitControls
            autoRotate
            autoRotateSpeed={1}
            enableZoom={false}
            enablePan={false}
          />
          <MoonSphere position={[0, 1, 0]} size={1.25} />
          <Plane
            position={[0, -0.25, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            args={[5, 5]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Moon;
