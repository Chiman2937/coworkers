'use client';
import { MSWProvider } from '@/providers/MSWProvider';
import { QueryProvider } from '@/providers/QueryProvider';

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <QueryProvider>
      <MSWProvider>{children}</MSWProvider>
    </QueryProvider>
  );
};
