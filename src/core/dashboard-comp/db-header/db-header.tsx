'use client'
import React, { useCallback } from 'react';
import { useAppState } from '@/hooks/use-app';
import { useDesktop } from '@/hooks/use-desktop';
import {  MenuIcon, Upload } from 'lucide-react';
import defaultImage from '@/assets/images/avatar.png'
import Link from 'next/link';
import Image from 'next/image';
import { UploadIcon } from '@/components/svg-components/side-bar-svg';
import useUserStore from '@/store/useUserStore';
import { useModal } from '@/hooks/use-modal';
import DangerDialog from '@/components/modals/danger';

const HeaderDashboard: React.FC = () => {
  const { userInfo } = useUserStore();
  const { state, setAppState } = useAppState();
  const { isSidebarOpen } = state;
  const displayName = userInfo.firstName
  const navbarToggleHandler = () => {
    setAppState({ isSidebarOpen: !isSidebarOpen });
  };
  const isDesktop = useDesktop();
  const {showModal, hideModal} = useModal()

    const onCancel = useCallback(() => {
      hideModal();
    }, [hideModal]);

    const handleUpload = () => {
      console.log('upload');
      return Promise.resolve()
    }
  function uploadProfile () {
    showModal(
      <DangerDialog
        title="Logout"
        description="
        Do you really want to log out?"
        onCancel={onCancel}
        close="Confirm"
        icon={<Upload  className="rounded-full p-4 h-[60px] w-[60px] bg-indigo-500" />}
        onAction={handleUpload}
      />
    );
  }

  

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
        <Link href='/'>
          <p className='w-[100px] md:w-[150px]  mdi:w-[150px] object-cover text-indigo-500 font-bold md:text-2xl'>Prep Wise@ </p>
        </Link>

        <div className='flex-grow'></div>
        <div className='w-4' />
        <div className='flex items-center cursor-pointer'>
          <UploadIcon  />
          <div className='w-[18px] mdi:w-[27px]' />
          <div className='flex justify-center items-center'>
            <Image src={defaultImage} alt="Avatar" width={30} height={30}  onClick={uploadProfile}/>
           <p className='text-white text-xs'>{displayName}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;
