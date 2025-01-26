'use client';
import React, { PropsWithChildren, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useUserStore from '@/store/useUserStore';

interface RequireAuthProps {
  fallbackRoute?: string;
  protectedRoutes?: string[];
  authRestrictedRoutes?: string[];
  defaultAuthRoute?: string;
}

const RequireAuth: React.FC<PropsWithChildren<RequireAuthProps>> = ({
  fallbackRoute = '/sign-up',
  protectedRoutes = ['/dashboard', '/resume'],
  authRestrictedRoutes = ['/sign-in', '/sign-up'],
  defaultAuthRoute = '/dashboard',
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { userInfo } = useUserStore();
  const { isAuthenticated } = userInfo;

  useEffect(() => {
    if (isAuthenticated && authRestrictedRoutes.includes(pathname)) {
      router.replace(defaultAuthRoute);
      return;
    }
    if (!isAuthenticated && protectedRoutes.includes(pathname)) {
      router.replace(fallbackRoute);
    }
  }, [router, pathname, isAuthenticated, fallbackRoute, protectedRoutes, authRestrictedRoutes, defaultAuthRoute]);

  const shouldRender =
    (isAuthenticated && !authRestrictedRoutes.includes(pathname)) || 
    (!isAuthenticated && !protectedRoutes.includes(pathname));

  return shouldRender ? React.createElement(React.Fragment, null, children) : null;
};

export default RequireAuth;

