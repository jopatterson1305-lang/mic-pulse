import type { MetadataRoute } from "next";

const publicRoutes = ["", "/about", "/articles", "/business", "/technology", "/finance", "/companies", "/startups", "/founders", "/founders/directory", "/opportunities", "/events", "/search", "/audit", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mic-pulse.vercel.app";
  return publicRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/audit" ? 0.7 : 0.6,
  }));
}
