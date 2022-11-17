import React, { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useColorModeState } from '@/../pages/_app';
import { RelativeColors } from '@/theme/palette';

import NoAnimationButton from '../design/NoAnimationButton';

import ModeSwitch from './ModeSwitch';

const DynamicGNBModal = dynamic(() => import('./GNBModal'));

const GNB = () => {
  const { mode } = useColorModeState();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { pathname } = useRouter();

  const isStaking = pathname.includes('staking');

  const handleMenuModalToggle = () => {
    setModalOpen(!modalOpen);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <DynamicGNBModal
        onModal={modalOpen}
        handleModalClose={handleModalClose}
      />

      <Box
        component="nav"
        sx={{
          position: 'fixed',

          display: 'flex',
          width: { xs: '100%', md: '180px' },
          flexDirection: { xs: 'row', md: 'column' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', md: 'flex-start' },

          padding: { xs: '20px', md: '0' },

          zIndex: 991,

          top: { xs: '0', md: '40px' },
          left: { xs: '0', md: '30px' },
        }}
      >
        <Link href="/" prefetch={false} style={{ textDecoration: 'none' }}>
          <Typography
            sx={{
              color: isStaking ? 'text.primary' : RelativeColors.grey05,
              padding: '0',
              marginBottom: '28px',
              marginLeft: { md: '24px' },
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '16px',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            Home
          </Typography>
        </Link>

        <Box
          component="div"
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
          }}
        >
          <Link
            href="/staking"
            prefetch={false}
            style={{ textDecoration: 'none' }}
          >
            <Typography
              sx={{
                color: isStaking ? 'text.primary' : RelativeColors.grey05,
                padding: '0',
                marginBottom: '28px',
                marginLeft: { md: '24px' },
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '16px',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              Stake
            </Typography>
          </Link>
        </Box>

        <NoAnimationButton
          sx={{ color: 'text.primary', padding: '0' }}
          onClick={handleMenuModalToggle}
        >
          <MenuIcon
            sx={{
              display: { xs: 'flex', md: 'none' },
            }}
          />
        </NoAnimationButton>
      </Box>

      <Box
        component="div"
        sx={{
          position: 'fixed',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          width: 'fit-content',
          zIndex: 991,

          bottom: { md: '56px', lg: '64px' },
          left: { md: '40px', lg: '56px' },

          textTransform: 'none',
          fontWeight: 600,
          fontSize: '16px',
        }}
      >
        {pathname !== '/' && <ModeSwitch />}
      </Box>
    </>
  );
};

export default GNB;
