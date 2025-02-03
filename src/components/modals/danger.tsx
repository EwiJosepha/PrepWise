
import { useAsyncCall } from '@/hooks/use-api';
import {cn}  from '@/lib/util';
import { Delete } from 'lucide-react';
import Button from '../button';

interface DangerDialogProps {
  title: string;
  description: string;
  className?: string;
  close?: string;
  icon?: React.ReactNode;
  onCancel: () => void;
  onAction: () => Promise<any>;
}

export default function DangerDialog({
  title,
  description,
  className,
  close = 'Delete',
  icon = <Delete />,
  onCancel,
  onAction,
}: DangerDialogProps) {
  const {
    execute: executeAction,
    loading,
    error,
  } = useAsyncCall({
    asyncFunction: onAction,
  });
  const handleCancel = () => {
    onCancel();
  };

  return (
    <div
      className={cn(
        'md:w-[480px] md:h-[542px] h-[490px] w-[90%]  flex flex-col items-center bg-white px-[35px] rounded-[5px]',
        className
      )}
    >
      <div className='w-[132px] h-[132px] bg-soft-ruby-red flex items-center justify-center mt-[55px] bg-indigo-800  rounded-full'>
        <div className='w-[68px] h-[68px] rounded-full bg-red-wine items-center justify-center flex text-white'>
          {icon}
        </div>
      </div>
      <div className='mt-[43px]'>
        <p className='font-bold md:text-[26px] text-[16px] text-night-deep'>
          {title}
        </p>
      </div>
      <div className='mt-[21px]'>
        <p className='font-regular md:text-[21px]  text-[16px] text-night-deep'>
          {description}
        </p>
      </div>
      <div className='md:mt-[57px] mt-[40px] flex flex-col items-center'>
        {error?.message && (
          <div className='text-red-500 text-[10px] bg-slate-50 w-full text-center p-4 text-wrap'>
            {error.message}
          </div>
        )}
        <Button
          className='md:w-[440px] md:h-[49px] w-[300px] h-[35px] bg-red-wine rounded-[5px]'
          variant='secondary'
          onClick={executeAction}
          disabled={loading}
          isLoading={loading}
        >
          <p  className='cursor-pointer ml-[7.7px] text-white font-regular'>
            {close}
          </p>
        </Button>
        <Button
          className='md:w-[440px] md:h-[49px] w-[300px] h-[35px]  bg-dark-gray mt-[25px] rounded-[5px]'
          variant='primary'
          onClick={handleCancel}
        >
          <p className='cursor-pointer ml-[7.7px]  font-regular'>
            {'cancel'}
          </p>
        </Button>
      </div>
    </div>
  );
}
