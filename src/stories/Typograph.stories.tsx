// src/stories/Typography.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs';

import { fontSize } from '@/styles/designTokens';

const Typography = () => {
  const fontSizeEntries = Object.entries(fontSize).map(([name, config]) => {
    const [size, { lineHeight, fontWeight }] = config as [
      string,
      { lineHeight: string; fontWeight: string },
    ];
    return {
      name: name.toUpperCase().replace(/-/g, ' '),
      className: `text-${name}`,
      size,
      lineHeight,
      weight: fontWeight,
    };
  });

  return (
    <div className='font-primary p-8'>
      <h1 className='text-3xl-bold text-text-primary mb-8'>Typography System</h1>

      <div className='space-y-6'>
        {fontSizeEntries.map((font) => (
          <div
            key={font.className}
            className='border-border-primary hover:bg-background-secondary flex items-baseline gap-8 rounded-lg border p-4 transition-colors'
          >
            <div className='w-40 flex-shrink-0'>
              <p className='text-md-semibold text-text-secondary'>{font.name}</p>
              <p className='text-xs-regular text-text-default'>
                {font.size} / {font.weight}
              </p>
            </div>
            <div className='flex-1'>
              <p className={`${font.className} text-text-primary`}>
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
            <code className='text-xs-regular text-text-default bg-background-tertiary flex-shrink-0 rounded px-2 py-1'>
              {font.className}
            </code>
          </div>
        ))}
      </div>

      <div className='bg-background-secondary mt-12 rounded-lg p-6'>
        <h2 className='text-2xl-bold text-text-primary mb-4'>Usage Example</h2>
        <pre className='text-md-regular text-text-secondary bg-background-primary overflow-x-auto rounded p-4'>
          {`<h1 className="text-4xl-medium">Heading</h1>
<p className="text-lg-regular">Body text</p>
<span className="text-xs-medium">Caption</span>`}
        </pre>
      </div>
    </div>
  );
};

const meta: Meta<typeof Typography> = {
  title: 'Design System/Typography',
  component: Typography,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const AllTypography: Story = {};
