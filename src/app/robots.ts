import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL || "https://ledgerly.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/login", "/signup"],
        disallow: [
          "/dashboard",
          "/customers",
          "/projects",
          "/invoices",
          "/expenses",
          "/reports",
          "/settings",
          "/api",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
