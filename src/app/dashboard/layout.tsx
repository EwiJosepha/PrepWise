'use client'

import { useDesktop } from '@/hooks/use-desktop';
import { ModalScreenProvider } from '@/contexts/modal-screen-context';
import { DashboardSideBar } from '@/core/dashboard-comp/dashboard-sidebar/sidebar';
import HeaderDashboard from '@/core/dashboard-comp/db-header/db-header';

export default function DashboardLayout({ children }:any) {
  const isDesktop = useDesktop();

  return (
    <ModalScreenProvider>
      <div className='flex h-screen w-screen justify-center bg-primary'>
        <HeaderDashboard />
        <div className='flex justify-center items-center w-full h-screen pt-24 max-w-[1614px] self-center fixed '>
          <div className='flex h-full w-full md:px-[20px] flex-row gap-8'>
            {isDesktop && <DashboardSideBar className='block' />}
            <div className='flex-grow bg-secondary rounded-md'>
              {children}
            </div>
          </div>
        </div>
      </div>
      {!isDesktop && (
        <DashboardSideBar className='w-screen fixed backdrop-blur-sm backdrop-filter backdrop-brightness-100 bg-transparent top-0 bottom-0 left-0 h-full z-50' />
      )}
    </ModalScreenProvider>
  );
}
