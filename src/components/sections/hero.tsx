"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import Band from "@/components/band";
import { useGLTF, useTexture } from "@react-three/drei";

useGLTF.preload("../../public/card.glb");
useTexture.preload("../../public/tag_texture.png");

export default function Hero() {
  return (
    <div className="container mx-auto flex flex-col-reverse items-center px-4 py-20 lg:flex-row">
      <div className="mt-10 w-full lg:mt-0 lg:w-1/2">
        <div className="mb-4 text-4xl font-extrabold md:text-6xl">
          Michel Studer
        </div>
        <div className="mb-6 text-xl text-gray-300 md:text-2xl">
          Software Developer & Web3 Enthusiast
        </div>
      </div>

      <div className="mb-12 flex w-full justify-center lg:mb-0 lg:w-1/2">
        <div className="h-72 w-72 cursor-grab drop-shadow-2xl transition-transform hover:scale-105 active:cursor-grabbing md:h-80 md:w-80 lg:h-96 lg:w-96">
          <Canvas
            camera={{ position: [0, 0, 13], fov: 25 }}
            style={{ background: "transparent" }}
          >
            <ambientLight intensity={Math.PI} />
            <Physics gravity={[0, -40, 0]} timeStep={1 / 60}>
              <Band />
            </Physics>
          </Canvas>
        </div>
      </div>
    </div>
  );
}
