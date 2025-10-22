import { type Config } from 'tailwindcss';

import { colors, fontSize } from './src/styles/designTokens';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './src/**/*.svg', './styles//*.{css,scss}'],
  theme: {
    extend: {
      colors,
      fontSize,
      fontFamily: {
        primary: ['var(--font-primary)'],
      },
      borderRadius: {
        '1x': '4px',
        '2x': '8px',
        '3x': '12px',
        '4x': '16px',
        '5x': '20px',
      },
    },
  },
  plugins: [],
};

export default config;
