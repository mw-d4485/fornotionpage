export const runtime = "edge";

const ORIGIN = "https://harmless-shawl-5df.notion.site";

async function handle(req, { params }) {
  const path = "/" + (params.path?.join("/") ?? "");
  const query = req.url.includes("?") ? "?" + req.url.split("?")[1] : "";
  const target = ORIGIN + path + query;

  // Copy and normalize headers
  const headers = new Headers(req.headers);
  headers.set("host", "harmless-shawl-5df.notion.site");
  headers.set("x-forwarded-host", "harmless-shawl-5df.notion.site");
  headers.set("x-forwarded-proto", "https");
  headers.set("origin", ORIGIN);
  headers.set("referer", `${ORIGIN}${path}`);

  // Handle all HTTP methods (GET/POST/etc.)
  const body = ["GET", "HEAD"].includes(req.method)
    ? undefined
    : await req.arrayBuffer();

  const resp = await fetch(target, {
    method: req.method,
    headers,
    body,
    redirect: "manual",
  });

  // Clone & clean response headers
  const resHeaders = new Headers(resp.headers);
  resHeaders.delete("content-security-policy");
  resHeaders.delete("content-security-policy-report-only");
  resHeaders.delete("x-frame-options");
  resHeaders.set(
    "cache-control",
    "public, s-maxage=3600, max-age=0, stale-while-revalidate=86400"
  );

  return new Response(resp.body, { status: resp.status, headers: resHeaders });
}

export async function GET(req, ctx) {
  return handle(req, ctx);
}
export async function HEAD(req, ctx) {
  return handle(req, ctx);
}
export async function POST(req, ctx) {
  return handle(req, ctx);
}
export async function PUT(req, ctx) {
  return handle(req, ctx);
}
export async function PATCH(req, ctx) {
  return handle(req, ctx);
}
export async function DELETE(req, ctx) {
  return handle(req, ctx);
}
