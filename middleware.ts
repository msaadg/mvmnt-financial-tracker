import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicRoutes = ['/'];
  const isPublicRoute = publicRoutes.includes(pathname);
  const isPublicApi = pathname.startsWith('/api/auth') || pathname.startsWith('/api/signup');
  const isApiRoute = pathname.startsWith('/api/');
  
  // Check for authentication token in cookies
  const authToken =
    request.cookies.get('next-auth.session-token')?.value;

  if (isPublicRoute || isPublicApi) {
    return NextResponse.next();
  }

  if (!authToken) {
    if (isApiRoute) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!$|_next/static|_next/image|favicon.ico|login|signup|features|.*\\.(?:png|jpg|jpeg|gif|svg|ico|css|js)).*)',
    '/api/((?!auth|signup).*)',
  ],
};