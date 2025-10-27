'use client';
import { ModalProvider } from '@/components/ui/Modal';
import { MSWProvider } from '@/providers/MSWProvider';
import { QueryProvider } from '@/providers/QueryProvider';

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <QueryProvider>
      <MSWProvider>
        <ModalProvider>{children}</ModalProvider>
      </MSWProvider>
    </QueryProvider>
  );
};
