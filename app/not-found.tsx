import Link from "next/link";

export default function NotFound() {
  return <main className="content-shell"><section className="article-shell article-content"><p className="eyebrow">MIC PULSE / 404</p><h1 className="display display-lg">That signal<br /><span>is not here.</span></h1><p className="article-excerpt">The page may have moved, expired, or never been published. Return to the live MIC Pulse archive to keep exploring.</p><div className="card-actions"><Link className="primary-button" href="/">Return home</Link><Link className="text-link" href="/search">Search the archive ↗</Link></div></section></main>;
}
