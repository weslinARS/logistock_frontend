import { FaPlus, FaTag } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import TitleComponent from '~/components/TitleComponent/Index';
import { Button } from '~/components/ui/button';
import { useAuth } from '~/hooks/useAuth.hook';

export default function AdminProductButtonSet() {
  const navigate = useNavigate();
  const { getUserRootRoute } = useAuth();
  const goToCreateProduct = () => {
    navigate('create');
  };

  const goToCreateCategory = () => {
    navigate(`/${getUserRootRoute}product-categories/`);
  };
  return (
    <div className="flex flex-col gap-4">
      <TitleComponent size="mini">Menu</TitleComponent>
      <div className="flex flex-row gap-4">
        <Button className="hover:cursor-pointer" onClick={goToCreateProduct}>
          <FaPlus />
          Productos
        </Button>
        <Button className="hover:cursor-pointer" onClick={goToCreateCategory}>
          <FaTag />
          Categorias
        </Button>

        <Button className="hover:cursor-pointer">
          <FaTag />
          Marcas
        </Button>
      </div>
    </div>
  );
}
