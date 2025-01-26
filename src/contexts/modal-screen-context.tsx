'use client'

import QueryString from 'qs';
import React, { createContext, useCallback, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/modals/modal';

interface ModalProviderProps {
  children: React.ReactNode;
}

interface DefaultValuesProps {
  visible: boolean;
  showModal: (body: React.ReactNode) => void;
  navigate: (key: string, params?: any) => void;
  setRootNav: (nav: string) => void;
  goBack: () => void;
  hideModal: () => void;
  modalContent: React.ReactNode;
}

const defaultValues: DefaultValuesProps = {
  visible: false,
  showModal: () => {},
  navigate: () => {},
  setRootNav: () => {},
  goBack: () => {},
  hideModal: () => {},
  modalContent: null,
};

const ModalScreenContext = createContext(defaultValues);

export const ModalScreenProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>();
  const [rootNav, setRootNav] = useState('');

  const router = useRouter();

  const showModal = useCallback((body: React.ReactNode) => {
    setVisible(true);
    if (body) {
      setModalContent(body);
    }
  }, []);

  const updateRootNav = useCallback((nav: string) => {
    setRootNav(nav);
  }, []);

  const modalNavigate = useCallback(
    (key: string, params: any = {}) => {
      key = key.split('/')[0];
      const queryParams = QueryString.stringify(params);
      router.push(`${rootNav}/${key}${queryParams ? `?${queryParams}` : ''}`);
    },
    [router, rootNav]
  );

  const hideModal = useCallback(() => {
    setVisible(false);
    const lastKey = rootNav.split('/').pop();
    const toNavigation = rootNav.replace(`/${lastKey}`, '');
    router.push(toNavigation);
  }, [router, rootNav]);

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <ModalScreenContext.Provider
      value={{
        visible,
        showModal,
        hideModal,
        modalContent,
        setRootNav: updateRootNav,
        navigate: modalNavigate,
        goBack,
      }}
    >
      <Modal onClose={hideModal} show={visible}>
        {modalContent}
      </Modal>
      {children}
    </ModalScreenContext.Provider>
  );
};

export const useModalScreen = () => {
  const context = useContext(ModalScreenContext);
  if (context === undefined) {
    throw new Error('useModalScreen must be used within a ModalScreenProvider');
  }
  return context;
};
