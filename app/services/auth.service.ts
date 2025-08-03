// URL

import axiosInstance from '~/lib/axiosIntances';
import type { ApiResponse } from '~/lib/types/api.type';
import type { User } from '~/lib/types/entities.type';

const resource = 'auth';

const urlFactory = {
  signIn: () => `/${resource}/sign-in` as const,
};

// DTOs

export type SignInDto = {
  email: string;
  password: string;
};

export type SignedUserDto = {
  token: string;
  user: User;
};

// Service Methods

const signIn = async (data: SignInDto): Promise<ApiResponse<SignedUserDto>> =>
  axiosInstance.post(urlFactory.signIn(), data);

const AuthService = {
  signIn,
};

export default AuthService;
