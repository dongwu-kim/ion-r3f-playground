/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';

import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    ['Null_1-Mat1']: THREE.Mesh;
    ['Null_1-Mat4']: THREE.Mesh;
    ['Null_1-Mat1_1']: THREE.Mesh;
    ['Null_1-Mat4_1']: THREE.Mesh;
    ['Null_1-Mat1_2']: THREE.Mesh;
    ['Null_1-Mat1_3']: THREE.Mesh;
    ['Null_1-Mat2']: THREE.Mesh;
    ['Null_1-Mat2_1']: THREE.Mesh;
    Null_11: THREE.Mesh;
  };
  materials: {
    ['Mat.1']: THREE.MeshStandardMaterial;
    ['Mat.4']: THREE.MeshStandardMaterial;
    ['Mat.1']: THREE.MeshStandardMaterial;
    ['Mat.1']: THREE.MeshStandardMaterial;
    ['Mat.2']: THREE.MeshStandardMaterial;
    ['Mat.2']: THREE.MeshStandardMaterial;
    ['Mat.5']: THREE.MeshStandardMaterial;
  };
};

const mouseEventSwitch = false;

export default function IONBall({ ...props }: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group | null>();
  const backLight = useRef<THREE.SpotLight | null>();
  const { nodes, materials } = useGLTF(
    '/assets/ion_logo_assets/ion_logo.gltf',
  ) as GLTFResult;

  const { viewport } = useThree();

  const mouse = new THREE.Vector3();

  const onMouseMove = (e: MouseEvent) => {
    mouse.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1,
      0.5,
    );
  };

  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    if (isClicked && !isTimerRunning) {
      setIsTimerRunning(true);
      setTimeout(() => {
        setIsClicked(false);
        setIsTimerRunning(false);
      }, 3000);
    }
  }, [isClicked, isTimerRunning]);

  useFrame(() => {
    if (!mouseEventSwitch) {
      document.body.addEventListener('mousemove', onMouseMove);
    }

    let scale = 0.03;
    const positionX = -15 * (viewport.width / 100);
    let positionY =
      60 - 60 * viewport.aspect > 15 ? 60 - 60 * viewport.aspect : 15;
    const positionZ = 0;

    if (backLight.current) {
      backLight.current.lookAt(0, 0, 0);
    }

    if (window?.innerWidth > 1280 && window?.innerHeight < 850) {
      scale += 0.05;
      // positionY = 0;
      positionY = 5;
    }

    if (window?.innerWidth > 1280 && window?.innerHeight > 850) {
      scale += 0.03;
      // positionY = 0;
      positionY = 5;
    }

    if (group.current) {
      if (isClicked) {
        group.current.rotation.z = group.current.rotation.z += 0.1;
        group.current.rotation.y = group.current.rotation.y += 0.1;
      } else {
        group.current.scale.set(scale, scale, scale);

        group.current.lookAt(
          -positionX + mouse.x * 100,
          -positionY + mouse.y * 100,
          120,
        );

        group.current.position.set(positionX, positionY, positionZ);
      }
    }
  });

  return (
    <group
      ref={(ref) => {
        group.current = ref;
      }}
      {...props}
      dispose={null}
      scale={[1, 1, 1]}
      position={[0, 0, 0]}
      onClick={() => setIsClicked(true)}
    >
      <group>
        <mesh
          geometry={nodes['Null_1-Mat1'].geometry}
          material={nodes['Null_1-Mat1'].material}
        />
        <mesh
          geometry={nodes['Null_1-Mat4'].geometry}
          material={nodes['Null_1-Mat4'].material}
        />
        <mesh
          geometry={nodes['Null_1-Mat1_1'].geometry}
          material={nodes['Null_1-Mat1_1'].material}
        />
        <mesh
          geometry={nodes['Null_1-Mat4_1'].geometry}
          material={nodes['Null_1-Mat4_1'].material}
        />
        <mesh
          geometry={nodes['Null_1-Mat1_2'].geometry}
          material={nodes['Null_1-Mat1_2'].material}
        />
        <mesh
          geometry={nodes['Null_1-Mat1_3'].geometry}
          material={nodes['Null_1-Mat1_3'].material}
        />
        <mesh
          geometry={nodes['Null_1-Mat2'].geometry}
          material={nodes['Null_1-Mat2'].material}
        />
        <mesh
          geometry={nodes['Null_1-Mat2_1'].geometry}
          material={nodes['Null_1-Mat2_1'].material}
        />
      </group>
      <mesh
        geometry={nodes.Null_11.geometry}
        material={materials['Mat.5']}
        position={[0, 0, 334.44]}
      />
    </group>
  );
}

useGLTF.preload('/assets/ion_logo_assets/ion_logo.gltf');
