import { NextResponse } from 'next/server';

const ORIGIN = 'https://harmless-shawl-5df.notion.site';

export function middleware(req) {
  const url = new URL(req.url);
  // 1) Prove it works:
  // return NextResponse.redirect(ORIGIN + url.pathname + url.search, 302);

  // 2) After you see the 302 working, change the line above to:
  return NextResponse.rewrite(ORIGIN + url.pathname + url.search);
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
