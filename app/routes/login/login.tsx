import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '~/hooks/useAuth.hook';
import LoginForm from './components/LoginForm';

export default function login() {
  const navigate = useNavigate();
  const { isAuthenticated, getUserRootRoute } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      const rootRoute = getUserRootRoute();
      navigate(`${rootRoute}/dashboard`);
    }
  }, []);
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <LoginForm />
    </div>
  );
}
