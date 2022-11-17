import React, { useEffect } from 'react';

import { Box, Typography, keyframes } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useColorModeState } from '@/../pages/_app';

import ModeSwitch from './ModeSwitch';

export const fadeIn = keyframes`
  from {
    opacity : 0;
  }

  to {
    opacity : 1;
  }
`;

const GNBModal = ({
  onModal,
  handleModalClose,
}: {
  onModal: boolean;
  handleModalClose: () => void;
}) => {
  const { mode, setMode } = useColorModeState();

  const { pathname } = useRouter();

  const backgroundFadeIn = keyframes`
    from {
      backGround : ${
        mode === 'dark' ? `rgba(0, 2, 21, 1)` : `rgba(237,243,255, 1)`
      };
    }

    to {
      backGround : ${
        mode === 'dark' ? `rgba(0, 2, 21, 0.9)` : `rgba(237,243,255, 0.9)`
      };
    }
`;

  useEffect(() => {
    if (pathname === '/' && setMode) {
      setMode('dark');
    }
  }, [pathname, setMode]);

  return (
    <>
      <Box
        component="section"
        sx={{
          position: 'fixed',
          display: onModal ? 'flex' : 'none',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          height: '100vh',

          top: 0,
          left: 0,

          padding: '0 32px',

          zIndex: 990,

          animation: `${backgroundFadeIn} 500ms ease-in-out forwards`,
        }}
      >
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            animation: `${fadeIn} 500ms ease-in-out forwards`,

            marginLeft: '24px',
            marginBottom: '96px',
          }}
        >
          <Link
            href="/staking"
            prefetch={false}
            onClick={handleModalClose}
            style={{ textDecoration: 'none' }}
          >
            <Typography
              sx={{
                color: 'text.primary',
                padding: '0',
                marginBottom: '28px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '16px',
                textDecoration: 'none',
                cursor: 'pointer',

                transition: '500ms ease-in-out',
              }}
            >
              Stake
            </Typography>
          </Link>
        </Box>

        <Box
          component="div"
          sx={{
            position: 'relative',
            display: 'flex',

            flexDirection: 'column',
            width: 'fit-content',
            zIndex: 3,

            marginLeft: '24px',

            textTransform: 'none',
            fontWeight: 600,
            fontSize: '16px',

            animation: `${fadeIn} 500ms ease-in-out forwards`,
          }}
        >
          {pathname !== '/' && <ModeSwitch />}
        </Box>
      </Box>
    </>
  );
};

export default GNBModal;
