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

  const [modalContent, setModalContent] = useState<React.ReactNode>();

  const showModal = useCallback(
    (body: React.ReactNode) => {
      setState({ ...state, visible: true });
      if (body) {
        setModalContent(body);
      }
    },
    [state]
  );

  const hideModal = useCallback(() => {
    setState({ ...state, visible: false });
  }, [state]);

  return (
    <Provider
      value={{ visible: state.visible, showModal, hideModal, modalContent }}
    >
      <Modal onClose={hideModal} show={state.visible} className='z-[55]'>
        {modalContent}
      </Modal>
      {children}
    </Provider>
  );
};

export { Modal, ModalContext, ModalProvider };
