import { NextRequest, NextResponse } from 'next/server';

// const ADMIN = 'f53MzysV3QQWKmZcLtWAXJtDKw63';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const session = request.cookies.get('session')?.value;

  const endpoint = new URL('/api/auth/is-authenticated', request.url);

  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ session }),
  });

  const auth: {
    isAuthenticated: boolean;
    token: { uid: string };
  } = await response.json();

  if (!auth.isAuthenticated && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // if (
  //   pathname.startsWith('/admin') &&
  //   (!auth.isAuthenticated || auth.token.uid !== ADMIN)
  // ) {
  //   return NextResponse.redirect(new URL('/auth/login', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    // '/admin/:path*'
  ],
};
