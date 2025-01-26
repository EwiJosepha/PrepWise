import { AnimatePresence, motion, Variants } from 'framer-motion';

import { cn } from '@/lib/util';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const dashboardContentMotionVariants: Variants = {
  visible: {
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  hidden: {
    opacity: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
};

export default function DashboardContentContainer({
  children,
  className,
}: Props) {
  return (
    <AnimatePresence>
      <motion.div
        variants={dashboardContentMotionVariants}
        initial='hidden'
        animate='visible'
        exit='hidden'
        className={cn('h-full w-full flex flex-col', className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
