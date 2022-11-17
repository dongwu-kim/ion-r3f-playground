/* eslint-disable react/no-unknown-property */
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';

import * as THREE from 'three';

const MouseLight = () => {
  const light = useRef<THREE.PointLight | null>();
  const { viewport, mouse, camera } = useThree();

  useFrame(() => {
    const { x: cameraX, y: cameraY, z: cameraZ } = camera.position;

    const coordinates = [
      Math.abs(cameraX),
      Math.abs(cameraY),
      Math.abs(cameraZ),
    ];
    const max = Math.max(...coordinates);
    const maxIndex = coordinates.indexOf(max);

    const mouseRow = mouse.x * viewport.width;
    const mouseCol = mouse.y * viewport.height;

    const lightPosition = light?.current?.position;

    if (window?.innerWidth > 750) {
      if (maxIndex === 0) {
        if (cameraX >= 0) {
          light?.current?.position.set(cameraX / 2, mouseCol, -mouseRow);
        }

        if (cameraX < 0) {
          light?.current?.position.set(cameraX / 2, mouseCol, mouseRow);
        }
      }

      if (maxIndex === 1) {
        if (cameraY >= 0) {
          light?.current?.position.set(mouseCol, cameraY / 2, mouseRow);

          if (cameraX > 0) {
            light?.current?.position.set(-mouseCol, cameraY / 2, -mouseRow);
          }
        }

        if (cameraY < 0) {
          light?.current?.position.set(-mouseCol, cameraY / 2, mouseRow);

          if (cameraX > 0) {
            light?.current?.position.set(mouseCol, cameraY / 2, -mouseRow);
          }
        }
      }

      if (maxIndex === 2) {
        light?.current?.position.set(mouseRow, mouseCol, cameraZ / 2);

        if (cameraZ < 0) {
          light?.current?.position.set(-mouseRow, mouseCol, cameraZ / 2);
        }
      }
    }
  });

  return (
    <pointLight
      ref={(ref) => {
        light.current = ref;
      }}
      distance={60}
      intensity={3}
      color={new THREE.Color('rgb(63, 62, 238)')}
    />
  );
};

const IONPool = ({ count }: { count: number }) => {
  const mesh = useRef<THREE.InstancedMesh | null>();
  const { viewport, mouse, camera } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const randomSeed = Math.random() * 100;
      const factor = -100 + Math.random() * 100;
      const speed = 0.005 + Math.random() / 200;
      const xFactor = -100 + Math.random() * 200;
      const yFactor = -100 + Math.random() * 200;
      const zFactor = -100 + Math.random() * 200;
      temp.push({
        randomSeed,
        factor,
        speed,
        xFactor,
        yFactor,
        zFactor,
        mx: 0,
        my: 0,
      });
    }
    return temp;
  }, [count]);
  // The innards of this hook will run every frame

  useFrame(() => {
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, i) => {
      let { randomSeed } = particle;
      const { factor, speed, xFactor, yFactor, zFactor } = particle;
      // There is no sense or reason to any of this, just messing around with trigonometric functions

      particle.mx += mouse.x * viewport.width * particle.mx * 0.01;
      particle.my += mouse.y * viewport.height * particle.my * 0.01;

      randomSeed = particle.randomSeed += speed / 2;

      const a = Math.cos(randomSeed) + Math.sin(randomSeed * 1) / 10;
      const b = Math.sin(randomSeed) + Math.cos(randomSeed * 2) / 10;
      // Update the dummy object
      dummy.position.set(
        (particle.mx / 10) * a +
          xFactor +
          Math.cos((randomSeed / 10) * factor) +
          (Math.sin(randomSeed * 1) * factor) / 10,

        (particle.my / 10) * b +
          yFactor +
          Math.sin((randomSeed / 10) * factor) +
          (Math.cos(randomSeed * 2) * factor) / 10,

        (particle.my / 10) * b +
          zFactor +
          Math.cos((randomSeed / 10) * factor) +
          (Math.sin(randomSeed * 3) * factor) / 10,
      );

      const size = Math.cos(randomSeed);

      dummy.scale.set(size, size, size);
      dummy.rotation.set(size * 5, size * 5, size * 5);

      dummy.updateMatrix();
      // And apply the matrix to the instanced item
      mesh.current && mesh.current.setMatrixAt(i, dummy.matrix);
    });

    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <MouseLight />
      <instancedMesh
        ref={(ref) => {
          mesh.current = ref;
        }}
        args={[, , count]}
      >
        <torusBufferGeometry attach="geometry" args={[2.4, 1.2, 30, 200]} />
        <meshStandardMaterial
          color={new THREE.Color('rgb(0, 38, 255)')}
          depthWrite
          depthTest
          opacity={1}
        />
      </instancedMesh>
    </>
  );
};

export default IONPool;
