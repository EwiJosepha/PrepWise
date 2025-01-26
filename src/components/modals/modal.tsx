'use client'
import { AnimatePresence, motion } from 'framer-motion';
import React, {
  ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import { cn } from '@/lib/util';

interface ModalProps extends ComponentPropsWithoutRef<'div'> {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  children,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const closeOnEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && show) {
        onClose();
      }
    },
    [show, onClose]
  );

  useEffect(() => {
    if (show) {
      document.body.classList.add('no-scroll');
      document.body.classList.add('h-screen');
    } else {
      document.body.classList.remove('no-scroll');
      document.body.classList.remove('h-screen');
    }

    document.addEventListener('keydown', closeOnEscape, true);

    return () => {
      document.body.classList.remove('no-scroll');
      document.body.classList.remove('h-screen');
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [show, closeOnEscape]);

  let content = null;
  if (!show) return null;

  if (show) {
    content = (
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        animate={{ opacity: 1, height: '100vh', width: '100vw' }}
        exit={{ opacity: 0, height: 0, width: 0 }}
        className={cn(
          `fixed h-full w-full top-0 left-0 z-50 flex items-center justify-center`,
          'overflow-x-hidden overflow-y-visible backdrop-blur-sm backdrop-filter backdrop-brightness-50',
          className
        )}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          ref={modalRef}
          className='w-full flex items-center justify-center overflow-hidden'
        >
          {children}
        </motion.div>
      </motion.div>
    );
  }

  return <AnimatePresence>{content}</AnimatePresence>;
};

export default Modal;
