/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  // PROXY: keep your domain, fetch from Notion
  async rewrites() {
    return [
      // optional: make "/" go to a specific page
      // { source: "/", destination: "https://harmless-shawl-5df.notion.site/guoqing" },

      // catch-all: proxy everything to your Notion site
      { source: "/:path*", destination: "https://harmless-shawl-5df.notion.site/:path*" }
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=3600, max-age=0, stale-while-revalidate=86400" }
          // { key: "X-Robots-Tag", value: "noindex" } // optional
        ]
      }
    ];
  },
};
export default nextConfig;
