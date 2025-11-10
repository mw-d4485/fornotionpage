export const runtime = "edge";

const ORIGIN = "https://harmless-shawl-5df.notion.site";

export async function GET(req, { params }) {
  const path = "/" + (params.path?.join("/") ?? "");
  const target = ORIGIN + path + (req.url.includes("?") ? "?" + req.url.split("?")[1] : "");

  const headers = new Headers(req.headers);
  headers.set("host", "harmless-shawl-5df.notion.site");
  headers.set("x-forwarded-host", "harmless-shawl-5df.notion.site");
  headers.set("referer", ORIGIN + path);
  headers.set("origin", ORIGIN);

  const resp = await fetch(target, {
    method: "GET",
    headers,
  });

  // Copy and sanitize headers
  const outHeaders = new Headers(resp.headers);
  outHeaders.delete("content-security-policy");
  outHeaders.delete("content-security-policy-report-only");
  outHeaders.delete("x-frame-options");

  return new Response(resp.body, {
    status: resp.status,
    headers: outHeaders,
  });
}
