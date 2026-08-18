import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedRecord } from "@/lib/content";

export const dynamic = "force-dynamic";
export default async function StartupPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const startup = await getPublishedRecord("startups", slug); if (!startup) notFound(); return <main className="content-shell article-shell"><Link className="brand-mark" href="/">MIC<span>•</span></Link><article className="article-content"><p className="eyebrow">STARTUP / {startup.stage ?? "BUILDING"}</p><h1 className="display display-lg">{startup.name}</h1><p className="article-excerpt">{startup.description}</p><div className="article-body"><p>{startup.industry ?? "Technology"}{startup.country ? ` · ${startup.country}` : ""}</p>{startup.website && <p><a className="text-link" href={startup.website} target="_blank" rel="noreferrer">Visit website ↗</a></p>}</div><Link className="text-link" href="/startups">← All startups</Link></article></main>; }
