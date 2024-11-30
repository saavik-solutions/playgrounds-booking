import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { AUTH_ROUTES } from '../../features/utils/constants';

export async function requireAuth() {
  const cookieStore =await cookies();
  const token = cookieStore.get('access_token');

  if (!token) {
    redirect(AUTH_ROUTES.LOGIN);
  }
}

export async function requireGuest() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');

  if (token) {
    redirect(AUTH_ROUTES.DASHBOARD);
  }
}