import type { ActionFunctionArgs } from 'react-router';
import { logout } from '~/services/session.server';

export function action({ request }: ActionFunctionArgs) {
  return logout(request);
}
