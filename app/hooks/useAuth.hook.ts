import { useMemo, useState } from 'react';
import { useLoaderData, useRouteLoaderData, useSubmit } from 'react-router';
import type { User } from '~/lib/types/entities.type';

type useLoaderData = {
  user: User;
};

export const useAuth = () => {
  const data = useRouteLoaderData('routes/auth/authLayout') as useLoaderData;

  const submit = useSubmit();

  const userProfile = useMemo(() => data?.user, [data]);
  const userRole = useMemo(() => userProfile?.role, [userProfile]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isAuthenticated = useMemo(() => !!userProfile, [userProfile]);

  const logOut = () => {
    submit(null, {
      method: 'post',
      action: '/logout',
    });
  };

  const getUserRootRoute = useMemo((): string => {
    if (userRole) {
      if (userRole === 'admin') return 'admin/';
      if (userRole === 'manager') return 'manager/';
      if (userRole === 'seller') return 'seller/';
    }
    return '/';
  }, [userRole]);

  return {
    isAuthenticated,
    logOut,
    getUserRootRoute,
    userProfile,
    isLoading,
    userRole,
  };
};
