// @ts-nocheck
// Unknown /blog, /blogs, /news, /support/article, /shop, /products, and
// /eatos-vs-* slugs return HTTP 404. Do not add Allow rules that would treat
// those missing-content shells as extra indexable sections.
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/home-1", "/homepage1", "/homepage2", "/account/social-dev-shim"],
    },
    sitemap: `${process.env.APP_URL || "https://eatos.com"}/sitemap.xml`,
  };
}
