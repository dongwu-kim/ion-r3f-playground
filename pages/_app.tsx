import {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { RecoilRoot } from 'recoil';

import GNB from '@/components/gnb';
import { darkPalette, lightPalette } from '@/theme/palette';
import { storage } from '@/utils/storage';

interface IColorModeContext {
  toggleColorMode: () => void;
  mode: null | PaletteMode;
  setMode: null | React.Dispatch<SetStateAction<PaletteMode | null>>;
}

const ColorModeContext = createContext<IColorModeContext>({
  toggleColorMode: () => {},
  mode: null,
  setMode: null,
});

export const useColorModeState = () => {
  const context = useContext(ColorModeContext);
  return context;
};

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const getDesignTokens = (mode: PaletteMode) => ({
    ...(mode === 'dark' && mode !== undefined ? darkPalette : lightPalette),
  });

  const [mode, setMode] = useState<PaletteMode | null>(null);
  const { pathname } = useRouter();

  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode | null) => {
          storage.setItem('theme', prevMode === 'light' ? 'dark' : 'light');
          return prevMode === 'light' ? 'dark' : 'light';
        });
      },
      mode,
      setMode,
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: 'Poppins',
        },
        components: {
          MuiCssBaseline: {},
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1280,
            xl: 1536,
          },
        },
        palette: mode ? getDesignTokens(mode) : darkPalette,
      }),
    [mode],
  );

  useEffect(() => {
    const localStorageTheme = storage.getItem('theme');
    if (!mode && localStorageTheme === undefined) {
      setMode('dark');
    }

    if (pathname === '/') {
      setMode('dark');
    } else if (pathname !== '/' && localStorageTheme) {
      setMode(localStorageTheme);
    }
  }, []);

  return (
    <>
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-YJK7MJKP9P"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-YJK7MJKP9P');
        `}
      </Script>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <RecoilRoot>
            <GNB />

            <Component {...pageProps} />
          </RecoilRoot>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default App;
