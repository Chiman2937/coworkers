import { ClassValue } from 'clsx';
import clsx from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

import { fontSize } from '@/styles/designTokens';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': Object.keys(fontSize).map((key) => `text-${key}`),
    },
  },
});

export const cn = (...inputs: ClassValue[]) => {
  return customTwMerge(clsx(inputs));
};
