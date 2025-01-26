'use client'

import { useCallback } from 'react';
import Button from '@/components/button';
import { useModal } from '@/hooks/use-modal';


export const DashboardLogout = () => {

  const { showModal, hideModal } = useModal();

  const onCancel = useCallback(() => {
    hideModal();
  }, []);

  const logout = useCallback(async () => {
    // await authService.logout();
    localStorage.clear();
    location.reload();
  }, []);


  return (
    <Button variant='primary' className='w-full hover:bg-gray-800' >
      <p className='text-red-wine'>{'Logout'}</p>
    </Button>
  );
};
