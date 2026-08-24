import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedOpportunity } from "@/lib/content";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const item = await getPublishedOpportunity(slug); return item ? { title: `${item.title} — MIC Pulse`, description: item.description ?? undefined } : { title: "Opportunity not found — MIC Pulse" }; }
export default async function OpportunityPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = await getPublishedOpportunity(slug); if (!item) notFound(); return <main className="content-shell"><article className="article-shell article-content"><Link className="text-link" href="/opportunities">← Opportunities</Link><p className="eyebrow">{item.type} / MIC PULSE</p><h1 className="display display-lg">{item.title}</h1><div className="story-meta"><span>{item.organization ?? "MIC Pulse network"}</span><span>{item.deadline ? `Deadline ${new Date(item.deadline).toLocaleDateString("en-TZ")}` : "Open listing"}</span></div><p className="article-excerpt">{item.description ?? "A published opportunity from the MIC Pulse network."}</p><div className="tag-list"><span>{item.location ?? "East Africa"}</span>{item.url && <a className="primary-button" href={item.url} target="_blank" rel="noreferrer">Visit listing ↗</a>}</div></article></main>; }
