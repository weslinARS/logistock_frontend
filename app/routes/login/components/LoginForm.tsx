'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FaArrowLeft, FaArrowRight, FaExclamation } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { useAuth } from '~/hooks/useAuth.hook';
import { HttpStatus, type ApiError } from '~/lib/types/api.type';
import AuthService from '~/services/auth.service';
const formSchema = z.object({
  email: z.email({
    error: 'Correo electrónico inválido',
  }),
  password: z
    .string({
      error: 'Contraseña requerida',
    })
    .min(1, {
      error: 'La contraseña es requerida',
    }),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const { logIn, getUserRootRoute, isAuthenticated } = useAuth();
  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await AuthService.signIn(values);
      if (response.statusCode === HttpStatus.OK && response.data) {
        logIn(response.data);
        toast('Inicio de sesión exitoso', {
          description: 'Bienvenido a LogiStock',
          closeButton: true,
          position: 'top-center',
          duration: 5000,
        });
        const rootRoute = getUserRootRoute();
        navigate(`${rootRoute}/dashboard`, {
          replace: true,
        });
      }
    } catch (error: any) {
      console.debug('Error al iniciar sesión:', error);
      const e = error as ApiError;
      toast('Error Al iniciar sesión', {
        description: e?.message || 'Error desconocido',
        closeButton: true,
        icon: <FaExclamation />,
        id: 'login-error',
        duration: 5000,
        position: 'top-center',
      });
    }
  }
  function goBack() {
    navigate('/', {
      replace: true,
    });
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    reValidateMode: 'onChange',
    mode: 'onBlur',
  });

  return (
    <Card className="min-w-[300px]">
      <CardHeader>
        <CardTitle>Inicio de Sesión</CardTitle>
        <CardDescription>
          LogiStock{' '}
          {isAuthenticated
            ? 'Bienvenido de nuevo'
            : 'Inicia sesión para continuar'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="use@ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage content={form.formState.errors.email?.message} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage
                    content={form.formState.errors.password?.message}
                  />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-4 ">
              <Button
                className="hover:cursor-pointer"
                type="submit"
                color="primary"
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
              >
                <FaArrowRight />
                Iniciar Sesión
              </Button>
              <Button
                onClick={goBack}
                className="hover:cursor-pointer"
                type="button"
                variant={'secondary'}
              >
                <FaArrowLeft />
                Volver Atrás
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
