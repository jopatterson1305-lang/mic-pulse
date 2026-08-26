import Link from "next/link";

export default function FoundersPage() {
  return <main className="content-shell"><Link className="brand-mark" href="/">MIC<span>•</span></Link><header className="content-header"><p className="eyebrow">FOUNDERS</p><h1 className="display display-lg">The people<br /><span>moving East Africa.</span></h1><p className="section-lede">Profiles, company stories and the ideas shaping the next generation of builders.</p></header><div className="empty-state"><h2>Founder profiles are coming into focus.</h2><p>Explore the published MIC founder directory.</p><Link className="text-link" href="/founders/directory">Open founder directory ↗</Link></div></main>;
}
