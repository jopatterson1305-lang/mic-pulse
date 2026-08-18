import Link from "next/link";
import { getPublishedOpportunities } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function OpportunitiesPage() {
  const opportunities = await getPublishedOpportunities();
  return <main className="content-shell"><Link className="brand-mark" href="/">MIC<span>•</span></Link><header className="content-header"><p className="eyebrow">05 / OPPORTUNITIES</p><h1 className="display display-lg">Find where<br /><span>the door opens.</span></h1><p className="section-lede">Scholarships, funding, grants, jobs and competitions worth knowing about.</p></header><section className="content-grid">{opportunities.map(item => <article className="content-card" key={item.id}><p className="eyebrow">{item.type}</p><h2>{item.title}</h2>{item.organization && <p>{item.organization}</p>}{item.description && <p>{item.description}</p>}{item.url && <a className="text-link" href={item.url} target="_blank" rel="noreferrer">View opportunity ↗</a>}</article>)}{opportunities.length === 0 && <div className="empty-state"><h2>No live opportunities yet.</h2><p>Editors can publish the next opening from MIC Admin.</p></div>}</section></main>;
}
