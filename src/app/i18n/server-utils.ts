import { cookies } from 'next/headers';
import { fallbackLng, cookieName } from './settings';

export async function getLocale() {
  const cookieStore = await cookies();
  return cookieStore.get(cookieName)?.value || fallbackLng;
}
