import IconTitleSmall from '@/assets/icons/icon_logo_with_text_small.svg';
import { cn } from '@/lib/cn';

interface Props {
  className?: string;
}

const GlobalHeader = ({ className }: Props) => {
  return (
    <header
      className={cn(
        'border-border-primary z-header bg-background-primary relative flex h-13 w-full flex-row items-center border-b-1 px-4',
        className,
      )}
    >
      <IconTitleSmall />
    </header>
  );
};

export default GlobalHeader;
