"use client";

import Link from "next/link";
import { Search, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { ThemeToggle } from "./ThemeToggle";

const links = [["Business", "/business"], ["Technology", "/technology"], ["Markets", "/finance"], ["Opportunities", "/opportunities"], ["Founders", "/founders"]] as const;

export function GlobalHeader() {
  const pathname = usePathname(); const [open, setOpen] = useState(false); const [signedIn, setSignedIn] = useState(false);
  useEffect(() => { let mounted = true; const supabase = createClient(); void supabase.auth.getUser().then(({ data }) => { if (mounted) setSignedIn(Boolean(data.user)); }); const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => { if (mounted) setSignedIn(Boolean(session?.user)); }); return () => { mounted = false; subscription.subscription.unsubscribe(); }; }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  return <header className={`site-header ${pathname === "/" ? "site-header-hero" : ""}`}><div className="site-header-inner"><Link className="brand-lockup" href="/" aria-label="MIC Pulse — Motivate, Innovate, Create"><span className="brand-mark">MIC<span>•</span></span><span className="brand-lockup-copy"><strong>MIC PULSE</strong><small>Motivate • Innovate • Create</small></span></Link><button className={`site-menu-button ${open ? "is-open" : ""}`} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen((value) => !value)}><span /><span /></button><nav id="primary-navigation" className={`site-nav ${open ? "is-open" : ""}`} aria-label="Primary navigation">{links.map(([label, href]) => <Link key={href} className={pathname === href || pathname.startsWith(`${href}/`) ? "is-active" : ""} href={href}>{label}</Link>)}<Link className={`site-search-link ${pathname === "/search" ? "is-active" : ""}`} href="/search" aria-label="Search MIC Pulse" title="Search MIC Pulse"><Search size={15} strokeWidth={1.6} aria-hidden="true" /><span>Search</span></Link></nav><div className="site-header-actions"><ThemeToggle /><Link className="account-link" href={signedIn ? "/profile" : "/login"} aria-label={signedIn ? "Open your profile" : "Sign in to MIC Pulse"}>{signedIn ? <><UserRound size={15} strokeWidth={1.6} aria-hidden="true" /><span>Account</span></> : "Sign in"}</Link><Link className="site-header-cta" href="/#newsletter">Join MIC <span>↗</span></Link></div></div></header>;
}
