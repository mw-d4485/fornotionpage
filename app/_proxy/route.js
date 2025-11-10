export const runtime = 'edge';

const ORIGIN_HOST = 'harmless-shawl-5df.notion.site';

async function forward(req) {
  const inUrl = new URL(req.url);
  const path = inUrl.searchParams.get('path') || '/';
  const target = `https://${ORIGIN_HOST}${path}`;

  // Pass through common request headers, but force host-related ones
  const h = new Headers();
  const cloneIn = req.headers;
  const passthrough = ['user-agent','accept','accept-language','cookie'];
  for (const k of passthrough) {
    const v = cloneIn.get(k);
    if (v) h.set(k, v);
  }
  h.set('host', ORIGIN_HOST);
  h.set('x-forwarded-host', ORIGIN_HOST);
  h.set('x-forwarded-proto', 'https');
  h.set('origin', `https://${ORIGIN_HOST}`);
  h.set('referer', `https://${ORIGIN_HOST}${path}`);

  const res = await fetch(target, {
    method: req.method,
    headers: h,
    body: req.method === 'GET' || req.method === 'HEAD' ? undefined : await req.arrayBuffer(),
    redirect: 'manual'
  });

  // Copy response headers (avoid hop-by-hop), add cache policy
  const outH = new Headers(res.headers);
  outH.set('cache-control', 'public, s-maxage=3600, max-age=0, stale-while-revalidate=86400');
  outH.delete('content-security-policy');   // avoid CSP mismatches from Notion
  outH.delete('content-security-policy-report-only');
  outH.delete('x-frame-options');

  return new Response(res.body, { status: res.status, headers: outH });
}

export async function GET(req)  { return forward(req); }
export async function HEAD(req) { return forward(req); }
export async function POST(req) { return forward(req); }
export async function PUT(req)  { return forward(req); }
export async function PATCH(req){ return forward(req); }
export async function DELETE(req){ return forward(req); }
