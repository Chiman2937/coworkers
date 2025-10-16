// src/stories/Typography.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs';

const Typography = () => {
  const fonts = [
    'text-4xl-medium',
    'text-3xl-bold',
    'text-3xl-semibold',
    'text-2xl-bold',
    'text-2xl-semibold',
    'text-2xl-medium',
    'text-2xl-regular',
    'text-xl-bold',
    'text-xl-semibold',
    'text-xl-medium',
    'text-xl-regular',
    'text-2lg-bold',
    'text-2lg-semibold',
    'text-2lg-medium',
    'text-2lg-regular',
    'text-lg-bold',
    'text-lg-semibold',
    'text-lg-medium',
    'text-lg-regular',
    'text-md-bold',
    'text-md-semibold',
    'text-md-medium',
    'text-md-regular',
    'text-sm-semibold',
    'text-sm-medium',
    'text-xs-semibold',
    'text-xs-medium',
    'text-xs-regular',
  ];

  return (
    <div className='font-primary p-8'>
      <h1 className='text-3xl-bold text-text-primary mb-8'>Typography System</h1>

      <div className='space-y-6'>
        {fonts.map((font) => (
          <div
            key={font}
            className='border-border-primary hover:bg-background-secondary flex items-baseline gap-8 rounded-lg border p-4 transition-colors'
          >
            <div className='w-40 flex-shrink-0'>
              <p className='text-md-semibold text-text-secondary'>
                {font.replace('text-', '').toUpperCase().replace(/-/g, ' ')}
              </p>
            </div>
            <div className='flex-1'>
              <p className={`${font} text-text-primary`}>Pretendard</p>
            </div>
            <code className='text-xs-regular text-text-default bg-background-tertiary flex-shrink-0 rounded px-2 py-1'>
              {font}
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
