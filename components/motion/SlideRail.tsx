"use client";

import Link from "next/link";
import { useState, type KeyboardEvent } from "react";

type Slide = { index: string; label: string; title: string; description: string; href: string };

const slides: Slide[] = [
  { index: "01", label: "Business", title: "Know who is building.", description: "Companies, founders and the decisions behind regional growth.", href: "/business" },
  { index: "02", label: "Markets", title: "Read the shift early.", description: "Sourced signals and market context for people making consequential moves.", href: "/finance" },
  { index: "03", label: "Opportunities", title: "Find where the door opens.", description: "Funding, events and openings worth knowing across East Africa.", href: "/opportunities" },
  { index: "04", label: "Founders", title: "Meet what comes next.", description: "The people, products and ideas moving the ecosystem forward.", href: "/founders" },
];

export function SlideRail() {
  const [active, setActive] = useState(0);
  function moveTo(index: number) { const next = (index + slides.length) % slides.length; setActive(next); document.getElementById(`slide-tab-${slides[next].index}`)?.focus(); }
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) { if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); moveTo(index + 1); } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); moveTo(index - 1); } else if (event.key === "Home") { event.preventDefault(); moveTo(0); } else if (event.key === "End") { event.preventDefault(); moveTo(slides.length - 1); } }
  return <div className="slide-rail" role="tablist" aria-label="MIC platform highlights">{slides.map((slide, index) => <article className={`slide-rail-item glass-surface ${active === index ? "is-active" : ""}`} key={slide.index} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}><button id={`slide-tab-${slide.index}`} type="button" role="tab" aria-selected={active === index} aria-controls={`slide-panel-${slide.index}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => handleKeyDown(event, index)}><span className="slide-rail-index">{slide.index}</span><span className="slide-rail-label">{slide.label}</span><span className="slide-rail-arrow">↗</span></button><div id={`slide-panel-${slide.index}`} className="slide-rail-panel" role="tabpanel" aria-labelledby={`slide-tab-${slide.index}`}><h3>{slide.title}</h3><p>{slide.description}</p><Link href={slide.href}>Explore {slide.label} <span>↗</span></Link></div></article>)}</div>;
}
