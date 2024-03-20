import { DefaultTheme } from 'styled-components';

const colors = {
  dark: {
    400: 'rgba(57,107,137,1)',
    500: 'rgba(50,52,86,1)',
  },
  blue: {
    100: 'rgba(129,165,186,1)',
    200: 'rgba(116, 192, 252, 1)',
  },
  bright: {
    100: 'rgba(204,210,215,1)',
    200: 'rgba(221,231,238,1)',
  },
  gold: {
    300: 'rgba(255, 212, 59, 1)',
  },
};

const border = {
  width: { sm: '1px' },
  radius: {
    md: '8px',
  },
};

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
    border: typeof border;
  }
}

export const theme: DefaultTheme = {
  colors,
  border,
};
