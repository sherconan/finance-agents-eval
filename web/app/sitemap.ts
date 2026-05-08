import type { MetadataRoute } from "next";
import { data } from "@/lib/data";

const BASE = "https://finance-agents-eval.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const staticRoutes = ["/", "/results", "/compare", "/case", "/roi", "/vs", "/duel", "/changelog", "/stats", "/downloads", "/methodology", "/artifacts", "/faq"].map((p) => ({
    url: BASE + p,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "/" ? 1.0 : 0.8,
  }));
  const agentRoutes = data.results.map((a) => ({
    url: `${BASE}/agents/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...staticRoutes, ...agentRoutes];
}
