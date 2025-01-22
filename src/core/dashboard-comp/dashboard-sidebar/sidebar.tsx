'use client'
import { AnimatePresence, motion } from 'framer-motion'; 

import { cn } from '@/lib/util';
import { useAppState } from '@/hooks/use-app';
import { useDesktop } from '@/hooks/use-desktop';

// import useUserStore from '@/store/useUserStore';


// import { getDashboardTabs } from '@/constants/get-dashboard-tabs';

// import { UserTypes } from '@/types/enums';
import { DashboardLogout } from '@/core/dashboard-comp/dashboard-logout';
import Link from 'next/link';
import { SidebarCloseIcon } from 'lucide-react';

const motionSidebarVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  closed: {
    x: '-100%',
    opacity: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
};

export const DashboardSideBar: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { state, setAppState } = useAppState();
  const { isSidebarOpen } = state;
  const isDesktop = useDesktop();
  const isOpen = isDesktop ? true : isSidebarOpen;

  // const { userInfo } = useUserStore();

  const toggleSidebar = () => {
    setAppState({ isSidebarOpen: !isSidebarOpen });
  };



  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial='closed'
          animate='open'
          exit='closed'
          variants={motionSidebarVariants}
          onClick={toggleSidebar}
          className={cn(
            'h-full w-[274px] bg-primary text-white rounded-xl',
            className
          )}
        >
          <div className='h-screen xl:h-full flex flex-col justify-between w-[328px] xl:w-[274px] bg-secondary xl:bg-secondary px-4 rounded-r-xl xl:rounded-xl'>
            <div className='pb-4 ml-4 xl:ml-0 h-full relative'>
              <div className='flex flex-row w-full  my-7 justify-between items-center'>
                <p className='text-white'>Prep Wise@</p>
               
                <SidebarCloseIcon
                  className='h-[21px] w-[34px] text-white cursor-pointer'
                  onClick={toggleSidebar}
                />
              </div>
            
              <div className='mt-auto mb-8 bottom-0 absolute w-full'>
                <DashboardLogout />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
