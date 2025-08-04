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
  route('logout', 'routes/logout.tsx'),
  layout('routes/auth/authLayout.tsx', [
    ...prefix('admin', [
      route('dashboard', 'routes/auth/admin/dashboard/Index.tsx'),
      route('products', 'routes/auth/admin/adminProducts.tsx', [
        index('routes/auth/admin/products/Index.tsx'),
        route('create', 'routes/auth/admin/products/create/Index.tsx'),
        route(':idProduct/edit', 'routes/auth/admin/products/edit/Index.tsx'),
        route(':idProduct', 'routes/auth/admin/products/product/Index.tsx'),
      ]),
      route(
        'product-categories',
        'routes/auth/admin/adminProductCategories.tsx',
        [index('routes/auth/admin/product-categories/Index.tsx')],
      ),
    ]),
  ]),
] satisfies RouteConfig;
