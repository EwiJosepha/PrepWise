import React from 'react';
import { useAppState } from '@/hooks/use-app';
import { useDesktop } from '@/hooks/use-desktop';
import { Bell, MenuIcon, MessageCircleCodeIcon, User } from 'lucide-react';
import Link from 'next/link';

const HeaderDashboard: React.FC = () => {
  // const { userInfo } = useUserStore();
  const { state, setAppState } = useAppState();
  const { isSidebarOpen } = state;
  const displayName = 'Josey Ewi'
  const navbarToggleHandler = () => {
    setAppState({ isSidebarOpen: !isSidebarOpen });
  };
  const isDesktop = useDesktop();

  return (
    <header className='fixed top-0 left-0 right-0 bg-primary flex overflow-hidden items-center z-40 shadow-md justify-center h-16'>
      <div className='flex flex-row items-center px-4 mdi:px-8 w-full h-full max-w-[1614px]'>
        {!isDesktop && (
          <>
            <div className='cursor-pointer ' onClick={navbarToggleHandler}>
              <MenuIcon className='w-[27px]  text-white ' />
            </div>
            <div className='w-[12px]' />{' '}
          </>
        )}
        <Link href='/dashboard'>
          <p className='w-[100px]  mdi:w-[150px] object-cover text-indigo-500'>Prep Wise@ </p>
        </Link>

        <div className='flex-grow'></div>
        <div className='w-4' />
        <div className='flex items-center'>
          <MessageCircleCodeIcon className='text-white w-[21px] h-[21px] mdi:w-[26px] mdi:h-[26px]' />
          <div className='w-[18px] mdi:w-[27px]' />
          <Bell className='text-white w-[19px] h-[16px mdi:w-[26px] mdi:h-[26px]' />
          <div className='w-[20px] mdi:w-[25px]' />
          <Link href='/dashboard/settings' className='flex'>
            <User  className='text-white'/>
           <p className='text-white'>{displayName}</p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;
