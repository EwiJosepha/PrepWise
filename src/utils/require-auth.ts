'use client';
import React, { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/store/useUserStore';

interface RequireAuthProps {
  fallbackRoute?: string;
  protectedRoute?: string;
}

const RequireAuth: React.FC<PropsWithChildren<RequireAuthProps>> = ({
  fallbackRoute = '/sign-up',
  protectedRoute = '/dashboard',
  children,
}) => {
  const router = useRouter();
  const { userInfo } = useUserStore();
  const { isAuthenticated } = userInfo;

  useEffect(() => {
    if (isAuthenticated) {
      router.push(protectedRoute);
    } else {
      router.push(fallbackRoute);
    }
  }, [router, isAuthenticated, fallbackRoute, protectedRoute]);

  return isAuthenticated ? React.createElement(React.Fragment, null, children) : null;
};

export default RequireAuth;
