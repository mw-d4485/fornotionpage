import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ORIGIN = 'https://harmless-shawl-5df.notion.site';

export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  // Step 1: prove middleware runs at all (you should see a 302 to Notion)
  return NextResponse.redirect(ORIGIN + url.pathname + url.search, 302);
  // After you confirm the redirect works, replace the line above with:
  // return NextResponse.rewrite(ORIGIN + url.pathname + url.search);
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
