import type { Metadata } from "next";
import "../styles/globals.css";
import { SiteShell } from "@/components/site/SiteShell";

export const metadata: Metadata = {
  title: "MIC Pulse — East African Business & Technology Intelligence",
  description:
    "Business, technology, finance and opportunity intelligence for the people building East Africa's future.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><SiteShell>{children}</SiteShell></body>
    </html>
  );
}
