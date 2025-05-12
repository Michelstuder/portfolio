'use client';

import { shantell } from './fonts';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Meteors } from '@/components/magicui/meteors';
import Band from '@/components/band';
import { Environment, Lightformer, useGLTF, useTexture } from '@react-three/drei';

useGLTF.preload('../../public/card.glb');
useTexture.preload('../../public/tag_texture.png');

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-screen w-full overflow-hidden">
      <div className="relative">
        <Meteors number={100} className="" />
        <div
          className="flex text-[10rem] w-full pointer-events-none bg-gradient-to-b from-white to-gray-500/30 bg-clip-text text-center leading-none text-transparent"
          style={shantell.style}
        >
          Michel Studer
        </div>
      </div>
      <div className="relative h-screen w-full">
        <Canvas
          camera={{ position: [0, 0, 13], fov: 25 }}
          style={{ backgroundColor: 'transparent' }}
        >
          <ambientLight intensity={Math.PI} />
          <Physics
            debug={false}
            interpolate
            gravity={[0, -40, 0]}
            timeStep={1 / 60}
          >
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
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Canvas>
      </div>
    </main>
  );
}
