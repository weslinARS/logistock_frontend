import { Outlet, redirect, useLoaderData } from 'react-router';
import AppSideBar from '~/components/AppSideBar/Index';
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
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

  return (
    <div>
      <SidebarProvider>
        <AppSideBar />
        <main>
          <SidebarTrigger className="hover:cursor-pointer" />
          <main className="p-4">
            <Outlet />
          </main>
        </main>
      </SidebarProvider>
    </div>
  );
}
