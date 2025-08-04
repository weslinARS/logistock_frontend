import { createCookie, redirect } from 'react-router';
import type { User } from '~/lib/types/entities.type';
import type { SignedUserDto } from './auth.service';

export const sessionCookie = createCookie('session', {
  secrets: [process.env.SECRET_KEY || 'default_secret_key'],
  maxAge: 60 * 60 * 24 * 7,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
});

export async function getUserToken(request: Request) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await sessionCookie.parse(cookieHeader)) || {};
  return cookie.token || null;
}

export async function getUserFromSession(
  request: Request,
): Promise<User | null> {
  const cookieHeader = request.headers.get('Cookie');

  const session = await sessionCookie.parse(cookieHeader);

  if (!session) return null;

  return session.user || null;
}

export async function createUserSession(
  data: SignedUserDto,
  redirectTo: string,
) {
  const session = {
    ...data,
  };

  const cookie = await sessionCookie.serialize(session);

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': cookie,
    },
  });
}

export async function logout(request: Request) {
  const cookieHeader = request.headers.get('Cookie');
  return redirect('/login', {
    headers: {
      'Set-Cookie': await sessionCookie.serialize('', {
        maxAge: 0,
      }),
    },
  });
}
