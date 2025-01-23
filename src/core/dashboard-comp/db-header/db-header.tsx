'use client'
import React from 'react';
import { useAppState } from '@/hooks/use-app';
import { useDesktop } from '@/hooks/use-desktop';
import {  MenuIcon, Share} from 'lucide-react';
import defaultImage from '@/assets/images/avatar.png'
import Link from 'next/link';
import Image from 'next/image';
import { UploadIcon } from '@/components/svg-components/side-bar-svg';

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
          <p className='w-[100px] md:w-[150px]  mdi:w-[150px] object-cover text-indigo-500 font-bold md:text-2xl'>Prep Wise@ </p>
        </Link>

        <div className='flex-grow'></div>
        <div className='w-4' />
        <div className='flex items-center cursor-pointer'>
          <UploadIcon  />
          <div className='w-[18px] mdi:w-[27px]' />
          <div className='w-[20px] mdi:w-[25px]' />
          <div className='flex justify-center items-center'>
            <Image src={defaultImage} alt="Avatar" width={30} height={30} />
           <p className='text-white text-xs'>{displayName}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;
