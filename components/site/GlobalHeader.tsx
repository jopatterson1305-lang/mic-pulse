"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  ["Intelligence", "/intelligence"],
  ["Business", "/business"],
  ["Technology", "/technology"],
  ["Markets", "/finance"],
  ["Opportunities", "/opportunities"],
  ["Founders", "/founders"],
] as const;

export function GlobalHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    let mounted = true;
    void createClient().auth.getUser().then(({ data }) => { if (mounted) setSignedIn(Boolean(data.user)); });
    return () => { mounted = false; };
  }, []);

  return <header className={`site-header ${pathname === "/" ? "site-header-hero" : ""}`}>
    <div className="site-header-inner">
      <Link className="brand-mark" href="/" aria-label="MIC Pulse home">MIC<span>•</span></Link>
      <button className="site-menu-button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}><span /><span /></button>
      <nav className={`site-nav ${open ? "is-open" : ""}`} aria-label="Primary navigation">
        {links.map(([label, href]) => <Link key={href} className={pathname === href ? "is-active" : ""} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
        <Link href="/search" onClick={() => setOpen(false)}>Search</Link>
      </nav>
      <div className="site-header-actions"><ThemeToggle /><Link className="account-link" href={signedIn ? "/profile" : "/login"}>{signedIn ? "Account" : "Sign in"}</Link><Link className="site-header-cta" href="/#newsletter">Join MIC <span>↗</span></Link></div>
    </div>
  </header>;
}
