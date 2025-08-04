import { useEffect } from 'react';
import { redirect, useActionData, useNavigate } from 'react-router';
import { useAuth } from '~/hooks/useAuth.hook';
import { HttpStatus, type ApiError } from '~/lib/types/api.type';
import AuthService, { type SignInDto } from '~/services/auth.service';
import { createUserSession } from '~/services/session.server';
import type { Route } from './+types/login';
import LoginForm from './components/LoginForm';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const userCredentials = Object.fromEntries(formData.entries());
  try {
    const response = await AuthService.signIn(userCredentials as SignInDto);

    const token = response.data?.token;

    const role = response.data?.user.role;

    if (role && response.data && response.statusCode == HttpStatus.OK) {
      return await createUserSession(response.data, `/${role}/dashboard`);

      redirect(`/${role}/dashboard`);
    }

    throw new Error('Token no recibido o usuario no encontrado');
  } catch (error) {
    console.debug('LoginForm action error', error);
    const e = error as ApiError;
    return {
      errorMessage: e.message || 'Error desconocido',
      status: e.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }
}

export type LoginAction = ReturnType<typeof action>;
export default function login() {
  const navigate = useNavigate();
  const actionData = useActionData<typeof action>();
  const { isAuthenticated, getUserRootRoute } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      const rootRoute = getUserRootRoute;
      navigate(`${rootRoute}/dashboard`);
    }
  }, []);
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <LoginForm />
    </div>
  );
}
