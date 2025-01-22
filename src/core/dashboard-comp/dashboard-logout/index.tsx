'use client'

import Button from '@/components/button';
import { useCallback } from 'react';
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
    <Button variant='primary' className='w-full' >
      <p className='text-red-wine'>{'dashboard.logout'}</p>
    </Button>
  );
};
