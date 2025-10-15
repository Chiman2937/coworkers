import { type Config } from 'tailwindcss';

import { colors, fontSize } from '@/styles/designTokens';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './src/**/*.svg', './styles//*.{css,scss}'],
  theme: {
    extend: {
      colors,
      fontSize,
      fontFamily: {
        primary: ['var(--font-primary)'],
      },
    },
  },
  plugins: [],
};

export default config;
