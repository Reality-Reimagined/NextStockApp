import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect routes that require authentication
  if (session && (
    req.nextUrl.pathname.startsWith('/auth/sign-in') ||
    req.nextUrl.pathname.startsWith('/auth/sign-up') ||
    req.nextUrl.pathname.startsWith('/auth/callback')
  )) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!session && (
    req.nextUrl.pathname.startsWith('/dashboard') ||
    req.nextUrl.pathname.startsWith('/portfolio') ||
    req.nextUrl.pathname.startsWith('/watchlist') ||
    req.nextUrl.pathname.startsWith('/screener')
  )) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  return res;
}