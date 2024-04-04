import 'antd/dist/reset.css';
import '@assets/styles/globals.css';
import 'leaflet/dist/leaflet.css';

import { store } from '@app/store';
import { theme } from '@assets/styles/theme';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import StyledComponentsRegistry from '../lib/registry';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StyledComponentsRegistry>
          <Component {...pageProps} />
        </StyledComponentsRegistry>
      </ThemeProvider>
    </Provider>
  );
}
