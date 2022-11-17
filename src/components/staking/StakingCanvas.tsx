/* eslint-disable react/no-unknown-property */
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer, SSAO } from '@react-three/postprocessing';
import React, { FC, Suspense } from 'react';

import { Box } from '@mui/material';
import * as THREE from 'three';

import IONBall from './IONBall';

const Light = () => {
  return (
    <>
      <spotLight
        intensity={0.45}
        position={[-60, -40, 85]}
        penumbra={1}
        color={new THREE.Color('rgb(61, 61, 230)')}
      />
      <spotLight
        intensity={0.45}
        position={[-60, 0, 85]}
        penumbra={1}
        color={new THREE.Color('rgb(61, 61, 230)')}
      />
      <spotLight
        intensity={0.45}
        position={[60, -40, 85]}
        penumbra={1}
        color={new THREE.Color('rgb(61, 61, 230)')}
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
        position={[30, 40, 10]}
        penumbra={1}
        color={new THREE.Color('rgb(108, 196, 255)')}
      />
    </>
  );
};

const StakingCanvas: FC = () => {
  return (
    <Box
      component="div"
      sx={{
        display: { xs: 'none', md: 'block' },
        position: 'fixed',
        left: '0',

        width: '100%',
        height: '100%',
        zIndex: 3,
      }}
    >
      <Canvas
        camera={{ fov: 45, position: [0, 0, 120] }}
        style={{ position: 'relative', width: '100%', height: '100%' }}
      >
        <Light />

        <EffectComposer multisampling={1}>
          <SSAO samples={31} radius={5} intensity={30} />
          <Bloom
            intensity={0.2}
            kernelSize={1}
            luminanceThreshold={0}
            luminanceSmoothing={0.3}
          />
          <Bloom
            intensity={0.4}
            kernelSize={2}
            luminanceThreshold={0}
            luminanceSmoothing={0}
          />
        </EffectComposer>

        <OrbitControls
          enablePan={false}
          enableRotate={false}
          enableZoom={false}
        />

        <Suspense fallback={null}>
          <IONBall />
        </Suspense>
      </Canvas>
    </Box>
  );
};

export default StakingCanvas;
