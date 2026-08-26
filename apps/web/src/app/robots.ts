// @ts-nocheck
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/home-1", "/homepage2", "/account/social-dev-shim"],
    },
    sitemap: `${process.env.APP_URL || "https://eatos.com"}/sitemap.xml`,
  };
}
