// middleware.js
import { NextResponse } from 'next/server';

const ORIGIN_HOST = 'harmless-shawl-5df.notion.site';

export function middleware(req) {
  const url = new URL(req.url);

  const dest = new URL(`https://${ORIGIN_HOST}${url.pathname}${url.search}`);

  // Clone incoming headers and force forwarded headers so Notion
  // resolves the request to the correct site.
  const h = new Headers(req.headers);
  h.set('x-forwarded-host', ORIGIN_HOST);
  h.set('x-forwarded-proto', 'https');
  h.set('referer', `https://${ORIGIN_HOST}${url.pathname}`);
  h.set('origin', `https://${ORIGIN_HOST}`);

  return NextResponse.rewrite(dest, {
    request: { headers: h }
  });
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};

