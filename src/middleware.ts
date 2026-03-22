import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // Pass strictly the internationalized path routes explicitly to Next-intl engine
  matcher: ['/', '/(fr|en)/:path*']
};
