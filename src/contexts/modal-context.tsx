'use client'

import React, { createContext, useCallback, useState } from 'react';

import Modal from '@/components/modals/modal';

interface ModalProviderProps {
  children: React.ReactNode;
}

interface DefaultValuesProps {
  visible: boolean;
  showModal: (body: React.ReactNode) => void;
  hideModal: () => void;
  modalContent: React.ReactNode;
}

const defaultValues: DefaultValuesProps = {
  visible: false,
  showModal: () => {},
  hideModal: () => {},
  modalContent: null,
};

const ModalContext = createContext(defaultValues);

const { Provider } = ModalContext;

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [state, setState] = useState({
    visible: false,
  });

  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const showModal = useCallback(
    (body: React.ReactNode) => {
      setState((prevState) => ({ ...prevState, visible: true }));
      setModalContent(() => body);
    },
    []
  );
  
  const hideModal = useCallback(() => {
    setState((prevState) => ({ ...prevState, visible: false }));
    setModalContent(null);
  }, []);

  return (
    <Provider
      value={{ visible: state.visible, showModal, hideModal, modalContent }}
    >
      <Modal onClose={hideModal} show={state.visible} className='z-[55] bg-white'>
        {modalContent}
      </Modal>
      {children}
    </Provider>
  );
};

export { Modal, ModalContext, ModalProvider };
