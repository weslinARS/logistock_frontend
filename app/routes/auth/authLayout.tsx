import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import AppSideBar from '~/components/AppSideBar/Index';
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
import { useAuth } from '~/hooks/useAuth.hook';

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      console.debug('User not authenticated, redirecting to login');
      navigate('/login', { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);
  return (
    <div>
      <SidebarProvider>
        <AppSideBar />
        <main>
          <SidebarTrigger className="hover:cursor-pointer" />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}
