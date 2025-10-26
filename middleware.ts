import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicRoutes = ['/'];
  const isPublicRoute = publicRoutes.includes(pathname);
  const isPublicApi = pathname.startsWith('/api/auth') || pathname.startsWith('/api/signup');
  const isApiRoute = pathname.startsWith('/api/');

  if (isPublicRoute || isPublicApi) {
    return NextResponse.next();
  }

  // Read token using next-auth helper (works in Edge/middleware)
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Not authenticated
  if (!token) {
    if (isApiRoute) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Admin-only area protection
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin') && (token as any).role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!$|_next/static|_next/image|favicon.ico|login|signup|features|.*\\.(?:png|jpg|jpeg|gif|svg|ico|css|js)).*)',
    '/api/((?!auth|signup).*)',
  ],
};