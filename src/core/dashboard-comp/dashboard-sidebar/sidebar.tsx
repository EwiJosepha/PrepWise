'use client'
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib/util';
import { useAppState } from '@/hooks/use-app';
import { useDesktop } from '@/hooks/use-desktop';
import { SettingIcon, MessageIcon, ProfileIcon } from '@/components/svg-components/side-bar-svg'


import { DashboardLogout } from '@/core/dashboard-comp/dashboard-logout';
import Link from 'next/link';
import {  SidebarCloseIcon } from 'lucide-react';

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

  const links = [
    { href: '/chat', text: 'Chats', icon: <MessageIcon /> },
    { href: '/profile', text: 'Profile', icon: <ProfileIcon /> },
    { href: '/settings', text: 'Settings', icon: <SettingIcon /> },
  ]

  const StyledLink = ({ href, text, icon }: { href: string, text: string, icon: any }) => (
    <div className='flex items-center gap-4 py-2 px-2 border-b border-gray-200 hover:bg-gray-800 hover:text-black transition-colors duration-200 rounded-md'>
      <p>{icon}</p>
      <Link
        href={href}
        className="text-white "
      >
        {text}
      </Link>
    </div>
  );

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
            'h-full w-[274px] bg-secondary text-white rounded-xl',
            className
          )}
        >
          <div className='h-screen xl:h-full flex flex-col justify-between w-[328px] xl:w-[274px] bg-secondary xl:bg-secondary px-4 rounded-r-xl xl:rounded-xl'>
            <div className='pb-4 ml-4 xl:ml-0 h-full relative'>
              <div className='flex flex-col w-full  my-7 '>
                <div className='flex justify-between items-center mb-10'>
                  <p className='text-white font-bold px-2'>Prep Wise@</p>

                  <SidebarCloseIcon
                    className='h-[21px] w-[34px] text-white cursor-pointer'
                    onClick={toggleSidebar}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  {links.map((link, index) => (
                    <StyledLink key={index} href={link.href} text={link.text} icon={link.icon} />
                  ))}
                </div>

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
