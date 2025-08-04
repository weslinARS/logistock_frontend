import { FaTag } from 'react-icons/fa';
import { Outlet } from 'react-router';
import TitleComponent from '~/components/TitleComponent/Index';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export default function AdminProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <TitleComponent size="medium">
            <FaTag />
            Productos
          </TitleComponent>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Outlet />
      </CardContent>
    </Card>
  );
}
