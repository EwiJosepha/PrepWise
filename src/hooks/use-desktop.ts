'use client'

import { useMedia } from 'react-use';

export const useDesktop = () => {
  return useMedia('(min-width: 1280px) and (hover: hover) and (pointer: fine)', false);
};
