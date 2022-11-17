import { PaletteOptions } from '@mui/material';

export const RelativeColors = {
  white: '#FFFFFF',
  grey01: '#F3F7FF',
  grey02: '#EDF3FF',
  grey03: '#D8E2F8',
  grey04: '#B6C6E9',
  grey05: '#90A1C6',
  grey06: '#6A789C',
  grey07: '#3D4869',
  grey08: ' #293455',
  grey09: '#1E2948',
  grey10: '#131E3D',
  grey11: '#0B1330',
  grey12: '#010423',
  black: '#000215',

  lightBlue: '#92D1FF',
  skyBlue: '#9AE7FF',
  linearSkyBlue: 'linear-gradient(93.3deg, #A4D9FF 0%, #579AFF 100%)',
  bluePurple: '#4149EA',
  subPurple: '#4B53B0',
  linearBluePurple: 'linear-gradient(90deg, #419AFD 0%, #414AEA 103.57%)',
  errorSolid: '#FF5359',
  errorLight: '#FF4F64',
  errorLinear: 'linear-gradient(93.3deg, #FF9E9E 0%, #7FC1FF 100%)',
  successDark: '#54F2B6',
  successLight: '#1BCA87',
};

export const SemanticColors = {
  background: {
    dark: RelativeColors.grey11,
    light: RelativeColors.grey02,
  },
  border: {},
  surface: {
    primary: {},
    secondary: {},
  },
  text: {
    darkPrimary: RelativeColors.skyBlue,
    darkSecondary: {},
    darkHighlight: {},

    dayPrimary: RelativeColors.bluePurple,
    commonPrimary: RelativeColors.grey05,
  },
  icon: {
    primary: {},
    highlight: {},
  },
  action: {
    primary: {},
    secondary: {},
    neutral: {},
  },
};

export const darkPalette: PaletteOptions = {
  background: {
    default: SemanticColors.background.dark,
  },
  text: {
    primary: SemanticColors.text.darkPrimary,
  },
  error: {
    main: RelativeColors.errorSolid,
  },
  warning: {
    main: SemanticColors.background.dark,
  },
  success: {
    main: RelativeColors.successDark,
  },
  info: {
    main: RelativeColors.lightBlue,
  },
};

export const lightPalette: PaletteOptions = {
  background: {
    default: SemanticColors.background.light,
  },
  text: {
    primary: SemanticColors.text.dayPrimary,
  },
  error: {
    main: RelativeColors.errorLight,
  },
  warning: {
    main: SemanticColors.background.light,
  },
  success: {
    main: RelativeColors.successLight,
  },
  info: {
    main: RelativeColors.bluePurple,
  },
};
