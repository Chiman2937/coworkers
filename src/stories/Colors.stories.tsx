// src/stories/Colors.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs';

import { colors } from '@/styles/designTokens';

const ColorPalette = () => {
  const colorGroups = {
    Brand: colors.brand,
    Point: colors.point,
    Background: colors.background,
    Interaction: colors.interaction,
    Border: colors.border,
    Text: colors.text,
    Status: colors.status,
    Icon: colors.icon,
  };

  return (
    <div className='p-8'>
      {Object.entries(colorGroups).map(([groupName, colorSet]) => (
        <div key={groupName} className='mb-12'>
          <h2 className='text-2xl-bold text-text-primary mb-6'>{groupName}</h2>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
            {Object.entries(colorSet).map(([colorName, hexValue]) => (
              <div key={colorName} className='flex flex-col'>
                <div
                  className='h-24 rounded-lg border border-gray-200 shadow-md'
                  style={{ backgroundColor: hexValue }}
                />
                <p className='text-md-semibold text-text-primary mt-2 capitalize'>{colorName}</p>
                <p className='text-xs-regular text-text-default'>{hexValue}</p>
                <code className='text-xs-regular text-text-default'>
                  bg-{groupName.toLowerCase()}-{colorName}
                </code>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const meta: Meta<typeof ColorPalette> = {
  title: 'Design System/Colors',
  component: ColorPalette,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ColorPalette>;

export const AllColors: Story = {};
