import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  index('routes/home/home.tsx'),
  route('login', 'routes/login/login.tsx'),
  layout('routes/auth/authLayout.tsx', [
    ...prefix('admin', [
      route('dashboard', 'routes/auth/admin/dashboard/Index.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
