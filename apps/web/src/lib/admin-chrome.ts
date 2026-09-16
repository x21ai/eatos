/** Fixed admin site header height (Tailwind h-14). */
export const ADMIN_SITE_HEADER_HEIGHT = '3.5rem';

export function isAdminPath(pathname: string): boolean {
  return pathname === '/admin' || pathname.startsWith('/admin/');
}
