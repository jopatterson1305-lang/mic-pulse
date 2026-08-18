import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedRecord } from "@/lib/content";

export const dynamic = "force-dynamic";
export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const company = await getPublishedRecord("companies", slug); if (!company) notFound(); return <main className="content-shell article-shell"><Link className="brand-mark" href="/">MIC<span>•</span></Link><article className="article-content"><p className="eyebrow">COMPANY / {company.industry ?? "EAST AFRICA"}</p><h1 className="display display-lg">{company.name}</h1><p className="article-excerpt">{company.description}</p><div className="article-body"><p>{company.country ?? "East Africa"}{company.founded_year ? ` · Founded ${company.founded_year}` : ""}</p>{company.website && <p><a className="text-link" href={company.website} target="_blank" rel="noreferrer">Visit website ↗</a></p>}</div><Link className="text-link" href="/companies">← All companies</Link></article></main>; }
