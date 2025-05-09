'use client';

import { shantell } from "./fonts";
import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { BallCollider, CuboidCollider, Physics, RigidBody, RapierRigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

extend({ MeshLineGeometry, MeshLineMaterial });

// Types for the refs and state
type RigidBodyRef = {
  wakeUp: () => void;
  translation: () => THREE.Vector3;
  rotation: () => THREE.Vector3;
  angvel: () => THREE.Vector3;
  setAngvel: (vel: { x: number; y: number; z: number }) => void;
  setNextKinematicTranslation: (translation: { x: number; y: number; z: number }) => void;
};

const EMPTY_RIGID_BODY: RigidBodyRef = {
  wakeUp:       () => {},
  translation:  () => new THREE.Vector3(),
  rotation:     () => new THREE.Vector3(),
  angvel:       () => new THREE.Vector3(),
  setAngvel:    () => {},
  setNextKinematicTranslation: () => {},
}

type MeshLineRef = {
  geometry: {
    setPoints: (points: THREE.Vector3[]) => void;
  };
};

type DragState = false | THREE.Vector3;

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-9xl" style={shantell.style}>Michel Studer</div>
      <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
        <Physics debug interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band />
        </Physics>
      </Canvas>
    </main>
  );
}

function Band() {
  const band = useRef<MeshLineRef>(null);
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<RigidBodyRef>(null);
  const j2 = useRef<RigidBodyRef>(null);
  const j3 = useRef<RigidBodyRef>(null);
  const card = useRef<RigidBodyRef>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3()
  ]));
  const [dragged, drag] = useState<DragState>(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useFrame((state) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: vec.x - (dragged as THREE.Vector3).x,
        y: vec.y - (dragged as THREE.Vector3).y,
        z: vec.z - (dragged as THREE.Vector3).z
      });
    }

    if (fixed.current && band.current && card.current && j1.current && j2.current && j3.current) {
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.translation());
      curve.points[2].copy(j1.current.translation());
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} angularDamping={2} linearDamping={2} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} angularDamping={2} linearDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} angularDamping={2} linearDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} angularDamping={2} linearDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} angularDamping={2} linearDamping={2} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <mesh
            onPointerUp={(e) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current!.translation())));
            }}>
            <planeGeometry args={[0.8 * 2, 1.125 * 2]} />
            <meshBasicMaterial transparent opacity={0.25} color="white" side={THREE.DoubleSide} />
          </mesh>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial transparent opacity={0.25} color="white" depthTest={false} resolution={[width, height]} lineWidth={1} />
      </mesh>
    </>
  );
}