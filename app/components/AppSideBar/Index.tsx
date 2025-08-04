import { ChevronUp } from 'lucide-react';
import { useMemo } from 'react';
import { FaHome, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useAuth } from '~/hooks/useAuth.hook';
import type { UserRole } from '~/lib/types/entities.type';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';

export default function AppSideBar() {
  const { logOut, userProfile } = useAuth();
  const navigate = useNavigate();
  const Links = useMemo(() => {
    if (!userProfile) return [];
    const userRole = userProfile.role;
    const roleLinks = routeLinks.find((roleLink) => roleLink.role === userRole);
    return roleLinks ? roleLinks.links : [];
  }, [userProfile]);

  function handleLogOut() {
    logOut();
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarGroupLabel>LogiStock</SidebarGroupLabel>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Links.map((link) => (
                <SidebarMenuItem key={link.label}>
                  <SidebarMenuButton asChild>
                    <a href={link.path}>
                      {link.icon}
                      <span> {link.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size={'lg'}>
                  <div className="flex flex-row gap-4 items-center">
                    <span className="bg-neutral-800 font-black text-secondary  p-2 rounded-lg w-fit">
                      {userProfile.firstName[0]}
                      {userProfile.lastName[0]}
                    </span>

                    <span>
                      {userProfile.firstName} {userProfile.lastName}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem
                  asChild
                  className="hover:cursor-pointer w-full"
                >
                  <span>Cuenta</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:cursor-pointer w-full"
                  asChild
                  onClick={() => handleLogOut()}
                >
                  <span>Salir </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
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
    ],
  },
];
