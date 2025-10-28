import { usePathname, useRouter } from 'next/navigation';

import { useState } from 'react';

import useAuthStore from '@/app/store/useAuthStore';
import IconArrow from '@/assets/icons/icon_arrow_down.svg';
import IconChess from '@/assets/icons/icon_chess.svg';
import IconPlus from '@/assets/icons/icon_plus.svg';
import { cn } from '@/lib/utils';

import { Button } from '../Button/Button';

interface Props {
  isSidebarOpen: boolean;
}

const TeamSelect = ({ isSidebarOpen }: Props) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname().split('/')[1];
  const teamid = Number(pathname);

  const [isOpen, setIsOpen] = useState(true);
  const handleTeamButtonClick = (groupId: number) => {
    router.push(`/${groupId}`);
  };

  const handleAddTeamClick = () => {
    router.push(`/addteam`);
  };

  if (!user) return;

  return (
    <div>
      <button
        className={cn(
          'rounded-3x flex w-full cursor-pointer flex-row items-center gap-3 px-4 py-2',
          !isSidebarOpen && 'size-13 bg-blue-50',
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <IconChess
          className={cn('size-5 text-slate-300', !isSidebarOpen && 'text-brand-primary')}
        />
        {isSidebarOpen && (
          <>
            <span className='text-lg-semibold block grow text-left text-slate-400'>팀 선택</span>
            <IconArrow className='text-icon-primary size-5' />
          </>
        )}
      </button>
      {isOpen && isSidebarOpen && (
        <div className={cn('flex flex-col gap-2 pt-2')}>
          {user.memberships.map(({ group }) => (
            <button
              key={group.id}
              className={cn(
                'rounded-3x flex w-full cursor-pointer flex-row items-center gap-3 p-4',
                teamid === group.id && 'bg-blue-50',
              )}
              onClick={() => handleTeamButtonClick(group.id)}
            >
              <IconChess
                className={cn(
                  'size-5',
                  teamid === group.id ? 'text-brand-primary' : 'text-slate-300',
                )}
              />
              {isSidebarOpen && (
                <span
                  className={cn(
                    'block grow text-left',
                    teamid === group.id
                      ? 'text-brand-primary text-lg-semibold'
                      : 'text-text-primary text-lg-regular',
                  )}
                >
                  {group.name}
                </span>
              )}
            </button>
          ))}
          <Button className='w-full' size='sm' variant='outline' onClick={handleAddTeamClick}>
            <div className='flex flex-row items-center gap-1'>
              <IconPlus className='size-4' />팀 추가하기
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default TeamSelect;
