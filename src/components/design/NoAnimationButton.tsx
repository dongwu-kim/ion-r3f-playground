import React from 'react';

import { ButtonBase, ButtonProps } from '@mui/material';

const NoAnimationButton = ({ sx, children, ...props }: ButtonProps) => {
  return (
    <ButtonBase
      {...props}
      sx={{
        '.MuiTouchRipple-root': {
          display: 'none',
        },
        fontFamily: 'Poppins',
        fontWeight: 600,
        ...sx,
      }}
    >
      {children}
    </ButtonBase>
  );
};

export default NoAnimationButton;
