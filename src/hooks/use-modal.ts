'use client'

import { useContext } from 'react';
import { ModalContext } from '@/contexts/modal-context';

export const useModal = () => {
  const state = useContext(ModalContext);
  return state;
};
