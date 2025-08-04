'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowLeft, FaArrowRight, FaExclamation } from 'react-icons/fa';
import { useFetcher, useNavigate } from 'react-router';
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
import type { action } from '../login';
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
  const fetcher = useFetcher<typeof action>();
  const { getUserRootRoute, isAuthenticated } = useAuth();
  async function handleSubmit(values: z.infer<typeof formSchema>) {
    fetcher.submit(values, {
      method: 'POST',
    });
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

  useEffect(() => {
    console.debug('LoginForm useEffect', fetcher.data);
    const serverErrors = fetcher.data?.errorMessage;
    if (fetcher.state === 'idle' && fetcher.data?.errorMessage) {
      toast('Error al iniciar sesión', {
        description: serverErrors,
        icon: <FaExclamation />,
        position: 'top-center',
        closeButton: true,
        duration: 5000,
        id: 'login-error',
      });
    }
  }, [fetcher.data, form.setError]);

  const isSubmitting = fetcher.state !== 'idle';
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
          <fetcher.Form
            method="POST"
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
                    <Input
                      autoComplete="email"
                      placeholder="use@ejemplo.com"
                      {...field}
                    />
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
                    <Input
                      autoComplete="current-password"
                      placeholder="********"
                      type="password"
                      {...field}
                    />
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
                disabled={isSubmitting || !form.formState.isValid}
              >
                <FaArrowRight />
                {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
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
          </fetcher.Form>
        </Form>
      </CardContent>
    </Card>
  );
}
