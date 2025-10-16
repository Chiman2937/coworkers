import '@/app/globals.css';

import type { Preview } from '@storybook/nextjs';

import { primary } from '../src/app/font';
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={primary.variable}>
        <div className='font-primary'>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default preview;
