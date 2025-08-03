import { FaSignInAlt } from 'react-icons/fa';
import { FiBookOpen } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import TitleComponent from '~/components/TitleComponent/Index';
import { Button } from '~/components/ui/button';
import { useAuth } from '~/hooks/useAuth.hook';

export default function Index() {
  const { isAuthenticated, isLoading, getUserRootRoute } = useAuth();
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/login');
  };
  const goToDashboard = () => {
    if (isAuthenticated) {
      const rootRoute = getUserRootRoute();
      navigate(`${rootRoute}/dashboard`);
    }
  };

  if (isLoading)
    return (
      <div className="flex flex-col h-screen w-screen items-center justify-center">
        <p className="text-neutral-700 font-semibold italic text-lg">
          Cargando...
        </p>
      </div>
    );
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-start">
        <TitleComponent color="primary" size="main">
          <FiBookOpen />
          LogiStock
        </TitleComponent>
        <p className="text-neutral-700 font-semibold italic text-lg">
          Tu app de gestión de inventario
        </p>
        <div className="flex flex-row gap-4 items-start">
          {isAuthenticated && !isLoading ? (
            <Button
              onClick={() => goToDashboard()}
              className="hover:cursor-pointer"
            >
              <FaSignInAlt /> Dashboard
            </Button>
          ) : (
            <Button
              className="hover:cursor-pointer"
              onClick={() => goToLogin()}
            >
              <FaSignInAlt /> Iniciar Sesión
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
