/* eslint-disable react/no-unknown-property */
import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer, SSAO } from '@react-three/postprocessing';
import React, { FC, Suspense, useMemo } from 'react';

import { Box } from '@mui/material';
import * as THREE from 'three';

import IONLogo from './IONLogo';
import IONPool from './IONPool';

const Light = () => {
  return (
    <>
      <spotLight
        intensity={0.1}
        position={[50, 50, 85]}
        penumbra={1}
        color={new THREE.Color('rgb(255, 255, 255)')}
      />

      <spotLight
        intensity={1}
        position={[30, 40, 10]}
        penumbra={1}
        color={new THREE.Color('rgb(255, 255, 255)')}
      />
      <spotLight
        intensity={0.1}
        angle={1}
        position={[-60, -80, -15]}
        penumbra={2}
        color={new THREE.Color('rgb(34, 58, 192)')}
      />
      <spotLight
        intensity={0.1}
        angle={10}
        position={[60, -80, -15]}
        penumbra={2}
        color={new THREE.Color('rgb(34, 58, 192)')}
      />

      <spotLight
        intensity={1}
        position={[60, 40, 85]}
        penumbra={1}
        color={new THREE.Color('rgb(108, 196, 255)')}
      />

      <spotLight
        intensity={0.35}
        position={[-60, 40, 85]}
        penumbra={1}
        color={new THREE.Color('rgb(102, 207, 255)')}
      />

      <spotLight
        intensity={0.8}
        position={[30, 40, 85]}
        penumbra={1}
        color={new THREE.Color('rgb(108, 196, 255)')}
      />
    </>
  );
};

const OrbitDolly = () => {
  const { camera } = useThree();

  let angle = useMemo(() => 0, []);

  useFrame(() => {
    angle += 0.005;

    camera.position.x = camera.position.x += Math.sign(Math.cos(angle)) * 0.2;
  });

  return (
    <OrbitControls
      enablePan={false}
      enableDamping={false}
      enableRotate
      minDistance={90}
      maxDistance={140}
      zoomSpeed={0.2}
      rotateSpeed={0.2}
    />
  );
};

const LandingCanvas: FC = () => {
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: 1,
      }}
    >
      <Canvas camera={{ fov: 45, position: [0, 0, 140] }}>
        <color attach="background" args={['rgb(0,0,1)']} />
        <OrbitDolly />
        {/* prev setting, camera, light, effect composer, wave... */}
        {/* <PerspectiveDolly scrollY={scrollY} /> */}

        <Light />

        <EffectComposer multisampling={1}>
          <SSAO
            samples={31}
            radius={5}
            intensity={30}
            luminanceInfluence={0.4}
            color="blue"
          />
          <Bloom
            intensity={0.4}
            kernelSize={1}
            luminanceThreshold={0}
            luminanceSmoothing={0.3}
          />
          <Bloom
            intensity={0.7}
            kernelSize={2}
            luminanceThreshold={0}
            luminanceSmoothing={0}
          />
        </EffectComposer>

        <Suspense fallback={null}>
          <IONPool count={400} />

          <IONLogo position={[0, 0, 0]} />
        </Suspense>
      </Canvas>
    </Box>
  );
};

export default LandingCanvas;
