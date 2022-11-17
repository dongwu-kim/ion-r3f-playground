import React from 'react';

import { Box, PaletteMode } from '@mui/material';

const PageGradient = ({ mode }: { mode: PaletteMode | null }) => {
  return (
    <>
      {/* left side */}
      <Box
        component="div"
        sx={{
          position: 'absolute',

          display: { xs: 'none', lg: 'flex' },
          width: '37%',
          aspectRatio: '1/1',
          background:
            'linear-gradient(180deg, rgba(45, 88, 229, 0.15) 0%, rgba(45, 88, 229, 0) 100%)',

          filter: 'blur(274px)',
          transform: 'rotate(-90deg)',

          left: '-10%',
          top: '-5%',

          zIndex: 0,
        }}
      />

      {/* right side */}
      <Box
        component="div"
        sx={{
          position: 'absolute',

          display: { xs: 'none', lg: 'flex' },
          width: '40%',
          aspectRatio: '1/1.2',
          background:
            mode === 'dark'
              ? 'linear-gradient(180deg, rgba(45, 88, 229, 0.15) 0%, rgba(45, 88, 229, 0) 100%)'
              : 'linear-gradient(180deg, #E3EDFF -24.1%, rgba(155, 232, 255, 1) 75.9%)',

          filter: 'blur(144px)',
          transform: 'rotate(90deg)',

          right: '-33%',
          top: '-20%',

          zIndex: 0,
        }}
      />
    </>
  );
};

export default PageGradient;
