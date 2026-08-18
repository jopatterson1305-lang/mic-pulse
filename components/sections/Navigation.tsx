"use client";

import { useState } from "react";

export function Navigation() {
  const [open, setOpen] = useState(false);
  return <header className="nav"><div className="mic-container nav-inner">
    <a href="#top" className="brand-mark">MIC<span>•</span></a>
    <nav className={`nav-links ${open ? "nav-open" : ""}`}>
      <a href="#intelligence" onClick={() => setOpen(false)}>Intelligence</a><a href="#business" onClick={() => setOpen(false)}>Business</a><a href="#market-pulse" onClick={() => setOpen(false)}>Markets</a><a href="#opportunities" onClick={() => setOpen(false)}>Opportunities</a><a href="#founders" onClick={() => setOpen(false)}>Founders</a>
    </nav>
    <a className="nav-cta" href="#newsletter">Join MIC <span>↗</span></a>
    <button className="menu-button" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /></button>
  </div></header>;
}
