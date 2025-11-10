import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = new URL(req.url);
  // send ALL requests to the internal edge route, preserving path+query
  const internal = new URL('/_proxy', req.url);
  internal.searchParams.set('path', url.pathname + url.search);
  return NextResponse.rewrite(internal);
}

// let Next serve its own internal assets if any
export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
