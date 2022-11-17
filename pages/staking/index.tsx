import React from 'react';

import { Box } from '@mui/material';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

import PageGradient from '@/components/design/PageGradient';
import { RelativeColors } from '@/theme/palette';

import { useColorModeState } from '../_app';

const DynamicStakingCanvas = dynamic(
  () => import('@/components/staking/StakingCanvas'),
);

const StakingContent = () => {
  const { mode } = useColorModeState();

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background:
          mode === 'dark' ? RelativeColors.grey11 : RelativeColors.grey02,

        overflowX: 'hidden',
        paddingBottom: { xl: '200px' },

        userSelect: 'none',
      }}
    >
      <DynamicStakingCanvas />

      <PageGradient mode={mode} />
    </Box>
  );
};

const Staking: NextPage = () => {
  return <StakingContent />;
};

export default Staking;
