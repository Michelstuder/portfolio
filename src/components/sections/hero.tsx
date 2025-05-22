"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import Band from "@/components/band";
import {
  Environment,
  Lightformer,
  useGLTF,
  useTexture,
} from "@react-three/drei";

useGLTF.preload("/assets/3d/card.glb");
useTexture.preload("/assets/images/tag_texture.png");

export default function Hero() {
  return (
    <div className="container relative mx-auto flex min-h-screen items-center px-4">
      {/* Text Content */}
      <div className="z-10 max-w-4xl">
        <h1 className="mb-8 text-[8.5rem] font-extrabold leading-[1.1] tracking-tight">
          Michel Studer
        </h1>
        <h2 className="text-4xl font-light text-gray-300">
          Software Developer & Web3 Enthusiast
        </h2>
      </div>

      {/* 3D Card */}
      <div className="absolute right-0 top-1/2 z-20 h-[800px] w-[800px] -translate-y-1/2 cursor-grab transition-all duration-300 hover:scale-105 hover:z-30 active:cursor-grabbing">
        <Canvas
          camera={{ position: [0, 0, 13], fov: 25 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={Math.PI} />
          <Physics gravity={[0, -40, 0]} timeStep={1 / 50}>
            <Band maxSpeed={60} minSpeed={15} />
          </Physics>
          <Environment background blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={5}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Canvas>
      </div>
    </div>
  );
}