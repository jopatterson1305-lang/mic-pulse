"use client";

import { usePathname } from "next/navigation";
import { GlobalHeader } from "./GlobalHeader";
import { Footer } from "@/components/sections/Footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/audit")) return <>{children}</>;
  return <><GlobalHeader /><div className="site-main">{children}</div><Footer /></>;
}
