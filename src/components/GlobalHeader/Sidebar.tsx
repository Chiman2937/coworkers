'use client';
import { useState } from 'react';

import IconFold from '@/assets/icons/icon_fold_false.svg';
import IconLogo from '@/assets/icons/icon_logo_default.svg';
import IconTitleLarge from '@/assets/icons/icon_logo_with_text_large.svg';
import IconProfileDefault from '@/assets/icons/icon_profile_default.svg';
import { cn } from '@/lib/cn';

interface Props {
  className?: string;
}

const Sidebar = ({ className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      className={cn(
        'border-border-primary animate-default z-header bg-background-primary relative flex h-screen flex-col items-center border-r-1',
        isOpen && 'w-sidebar-opened',
        !isOpen && 'w-sidebar-closed',
        className,
      )}
    >
      {/* 로고 영역 */}
      <div className='layout-center h-24'>
        {!isOpen && <IconLogo />}
        {isOpen && <IconTitleLarge />}
        <button
          className={cn(
            'border-border-primary layout-center bg-background-primary smooth-color size-8 cursor-pointer rounded-full',
            'hover:bg-background-secondary',
            'absolute top-8 right-0 translate-x-[50%] border-1',
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <IconFold className={cn('animate-default size-6', !isOpen && 'rotate-180')} />
        </button>
      </div>
      {/* navigation 영역 */}
      <nav className='grow'>
        <div className={cn(isOpen && 'px-4 py-6', !isOpen && 'px-2 py-6')}></div>
      </nav>
      {/* 프로필 영역 */}
      <div className={cn('w-full', isOpen && 'px-4')}>
        <div className='flex w-full flex-row gap-3 border-t-1 border-slate-200 pt-7 pb-6'>
          {isOpen && (
            <div className='rounded-3x layout-center size-10 bg-slate-200'>
              <IconProfileDefault className='size-8' />
            </div>
          )}
          <button
            className={cn(
              'text-lg-medium text-text-default cursor-pointer whitespace-nowrap',
              !isOpen && 'mx-auto',
            )}
          >
            로그인
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
