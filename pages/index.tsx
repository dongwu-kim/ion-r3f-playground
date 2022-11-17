import { Box } from '@mui/material';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const DynamicLandingCanvas = dynamic(
  () => import('@/components/landing/LandingCanvas'),
);

const Home: NextPage = () => {
  return (
    <div>
      <Box
        component="main"
        sx={{
          height: '100%',
        }}
      >
        <DynamicLandingCanvas />
      </Box>
    </div>
  );
};

export default Home;
