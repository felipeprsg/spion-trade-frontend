import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/database/admin';

export async function POST(request: NextRequest) {
  const { session } = await request.json();

  if (!session) {
    return NextResponse.json(
      { isAuthenticated: false, token: null },
      { status: 200 }
    );
  }

  const decodedClaim = await auth
    .verifySessionCookie(session, true)
    .catch(() => null);

  if (!decodedClaim) {
    return NextResponse.json(
      { isAuthenticated: false, token: null },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { isAuthenticated: true, token: decodedClaim },
    { status: 200 }
  );
}
