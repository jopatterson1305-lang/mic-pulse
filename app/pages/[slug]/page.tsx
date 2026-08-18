import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedRecord } from "@/lib/content";

export const dynamic = "force-dynamic";
export default async function CmsPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const page = await getPublishedRecord("pages", slug); if (!page) notFound(); return <main className="content-shell article-shell"><Link className="brand-mark" href="/">MIC<span>•</span></Link><article className="article-content"><p className="eyebrow">MIC / {page.title.toUpperCase()}</p><h1 className="display display-lg">{page.title}</h1><div className="article-body">{String(page.content ?? "").split("\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></article></main>; }
