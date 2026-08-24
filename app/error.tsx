"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("MIC Pulse route error", error); }, [error]);

  return <main className="content-shell"><section className="article-shell article-content"><p className="eyebrow">MIC PULSE / SERVICE STATE</p><h1 className="display display-lg">The signal<br /><span>lost its way.</span></h1><p className="article-excerpt">We could not load this page just now. Your account and saved work have not been changed.</p><div className="card-actions"><button className="primary-button" type="button" onClick={reset}>Try again</button><Link className="text-link" href="/">Return home ↗</Link></div></section></main>;
}
