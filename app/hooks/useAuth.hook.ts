import { useCallback, useEffect, useMemo, useState } from 'react';
import type { UserRole } from '~/lib/types/entities.type';
import type { SignedUserDto } from '~/services/auth.service';

const getStoredUser = (): SignedUserDto | null => {
  try {
    const item = localStorage.getItem('user');
    return item ? (JSON.parse(item) as SignedUserDto) : null;
  } catch (error) {
    localStorage.removeItem('user');
    return null;
  }
};
export const useAuth = () => {
  const [userProfile, setUserProfile] = useState<SignedUserDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isAuthenticated = useMemo(() => !!userProfile, [userProfile]);

  const logIn = useCallback((data: SignedUserDto) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUserProfile(data);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUserProfile(null);
  }, []);
  const getUserRole = useCallback((): UserRole | null => {
    return userProfile?.user.role ?? null;
  }, [userProfile]);
  /**
   *get the root route for the user based on their role.
   * @returns the root route for the user based on their role following the patter /<role>/.
   */
  const getUserRootRoute = useCallback((): string => {
    if (!userProfile) return '/login';
    if (userProfile) {
      if (userProfile.user.role === 'admin') return '/admin';
      if (userProfile.user.role === 'manager') return '/manager';
      if (userProfile.user.role === 'seller') return '/seller';
    }
    return '/login';
  }, [userProfile]);
  useEffect(() => {
    try {
      const user = getStoredUser();
      console.log('Loaded user:', user);
      if (user) {
        setUserProfile(user);
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return {
    isAuthenticated,
    logIn,
    logOut,
    getUserRootRoute,
    userProfile,
    getUserRole,
    isLoading,
  };
};
