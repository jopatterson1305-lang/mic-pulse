import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedRecord } from "@/lib/content";

export const dynamic = "force-dynamic";
export default async function FounderProfilePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const founder = await getPublishedRecord("founders", slug); if (!founder) notFound(); return <main className="content-shell article-shell"><Link className="brand-mark" href="/">MIC<span>•</span></Link><article className="article-content"><p className="eyebrow">FOUNDER / {founder.role ?? "BUILDER"}</p><h1 className="display display-lg">{founder.name}</h1><p className="article-excerpt">{founder.bio}</p><div className="article-body"><p>{founder.location ?? "East Africa"}</p>{founder.website && <p><a className="text-link" href={founder.website} target="_blank" rel="noreferrer">Website ↗</a></p>}</div><Link className="text-link" href="/founders/directory">← Founder directory</Link></article></main>; }
