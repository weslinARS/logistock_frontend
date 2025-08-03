import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
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
  const [Links, setLinks] = useState<RouteLink[]>([]);

  function handleLogOut() {
    logOut();
    navigate('/login', { replace: true });
  }
  useEffect(() => {
    console.log(userProfile);
    const userRole = userProfile?.user.role;
    console.log('User Role:', userRole);
    const roleLinks = routeLinks.find((roleLink) => roleLink.role === userRole);
    if (roleLinks) {
      setLinks(roleLinks.links);
    }
  }, []);
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
                  <div>
                    <span className="bg-neutral-800 font-black text-secondary w-32 p-2 rounded-lg">
                      {userProfile?.user.firstName[0].toUpperCase()}
                      {userProfile?.user.lastName[0].toUpperCase()}
                    </span>
                    <span className="ml-2">{`${userProfile?.user.firstName} ${userProfile?.user.lastName}`}</span>
                  </div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                  onClick={() => handleLogOut()}
                >
                  <span>Sign out</span>
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
