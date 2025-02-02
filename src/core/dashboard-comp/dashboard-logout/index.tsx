'use client';

import Button from '@/components/button';
import { useModal } from '@/hooks/use-modal';
import useUserStore from '@/store/useUserStore';
import { LogOut } from 'lucide-react';
import { useCallback, useState } from 'react';
import DangerDialog from '@/components/modals/danger';

export const DashboardLogout = () => {
  const { logout } = useUserStore();
  const { showModal, hideModal } = useModal();
  const [modal, setModal] = useState(false);

  const onCancel = useCallback(() => {
    hideModal();
    setModal(false);
  }, [modal]);

  const handleLogout = useCallback(async () => {
    setModal(true);
    logout();
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    console.log(modal);
    return Promise.resolve();
    
  }, [logout, modal]);

  const startLogout = useCallback(() => {
    setModal(true);

    showModal(
      <DangerDialog
        title="Logout"
        description="Do you really want to logout?"
        onCancel={onCancel}
        close="Confirm"
        icon={<LogOut className="text-white h-[60px] w-[60px]" />}
        onAction={handleLogout}
      />
    );
    console.log(modal);
    
  }, [showModal, handleLogout, modal]);

  return (
    <Button variant="primary" className="w-full hover:bg-gray-800" onClick={startLogout}>
      <p className="text-red-wine">Logout</p>
    </Button>
  );
};
