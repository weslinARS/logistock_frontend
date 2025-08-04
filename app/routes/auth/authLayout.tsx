import { useMemo } from 'react';
import {
  FaAlignJustify,
  FaBox,
  FaCartPlus,
  FaHome,
  FaSignOutAlt,
  FaTag,
  FaTruck,
  FaUser,
  FaUserAlt,
} from 'react-icons/fa';
import { NavLink, Outlet, redirect, useLoaderData } from 'react-router';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { useAuth } from '~/hooks/useAuth.hook';
import type { UserRole } from '~/lib/types/entities.type';
import { getUserFromSession } from '~/services/session.server';

export async function loader({ request }: { request: Request }) {
  const user = await getUserFromSession(request);

  if (!user) throw redirect('/login');

  return {
    user,
  };
}
export default function AuthLayout() {
  const { user } = useLoaderData<typeof loader>();
  const links = useMemo(() => {
    return (
      routeLinks.find((roleLink) => roleLink.role === user.role)?.links || []
    );
  }, [user]);
  const { logOut } = useAuth();
  return (
    <div className="flex flex-col ">
      <div className="h-12 p-4 bg-primary sticky flex flex-row gap-4 items-center justify-between">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="hover:cursor-pointer  " variant={'default'}>
                <FaAlignJustify className="text-primary-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Menú</DropdownMenuLabel>

              <DropdownMenuGroup>
                {links.map((link) => (
                  <DropdownMenuItem
                    className="hover:cursor-pointer"
                    key={`navlink-${link.label}`}
                    asChild
                  >
                    <NavLink to={link.path}>
                      {({ isActive }) => (
                        <span
                          className={`inline-flex gap-2 ${isActive ? 'underline font-semibold' : ''}`}
                        >
                          {link.icon}
                          {link.label}
                        </span>
                      )}
                    </NavLink>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="italic font-black text-lg text-secondary">
            LogiStock
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hover:cursor-pointer">
            <div className="text-primary font-black uppercase bg-slate-50 p-1 rounded-lg">
              {user.firstName[0]}
              {user.lastName[0]}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <span className="inline-flex gap-2 hover:cursor-pointer">
                  <FaUser />
                  Cuenta
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span
                  className="inline-flex gap-2 hover:cursor-pointer"
                  onClick={logOut}
                >
                  <FaSignOutAlt />
                  Salir
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
export type RouteLink = {
  label: string;
  icon: React.ReactNode;
  path: string;
};

export type RoleLink = {
  role: UserRole;
  links: RouteLink[];
};
export const routeLinks: RoleLink[] = [
  {
    role: 'admin',
    links: [
      {
        label: 'Dashboard',
        icon: <FaHome />,
        path: '/admin/dashboard',
      },
      {
        label: 'Usuarios',
        icon: <FaUser />,
        path: '/admin/users',
      },
      {
        label: 'Productos',
        icon: <FaTag />,
        path: '/admin/products',
      },
      {
        label: 'Proveedores',
        icon: <FaUserAlt />,
        path: '/admin/suppliers',
      },
      {
        label: 'Órdenes',
        icon: <FaCartPlus />,
        path: '/admin/purchase-orders',
      },
      {
        label: 'Almacenes',
        icon: <FaBox />,
        path: '/admin/warehouses',
      },
      {
        label: 'Movimientos',
        icon: <FaTruck />,
        path: '/admin/stock-movements',
      },
    ],
  },
];
