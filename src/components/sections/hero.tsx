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
    <div className="container mx-auto flex flex-col items-center lg:flex-row">
      <div className="mt-10 w-full py-20 lg:mt-0 lg:w-1/2">
        <div className="mb-4 text-4xl font-extrabold md:text-6xl">
          Michel Studer
        </div>
        <div className="mb-6 text-xl text-gray-300 md:text-2xl">
          Software Developer & Web3 Enthusiast
        </div>
      </div>

      <div className="mb-12 flex w-full justify-center lg:mb-0 lg:w-1/2">
        <div className="h-full w-full cursor-grab drop-shadow-2xl transition-transform hover:scale-105 active:cursor-grabbing md:h-80 md:w-80 lg:h-96 lg:w-96">
          <Canvas
            camera={{ position: [0, 0, 13], fov: 25 }}
            style={{ background: "transparent" }}
          >
            <ambientLight intensity={Math.PI} />
            <Physics gravity={[0, -40, 0]} timeStep={1 / 50}>
              <Band />
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
    </div>
  );
}
