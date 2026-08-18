import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedArticle } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) notFound();
  return <main className="content-shell article-shell"><Link className="brand-mark" href="/">MIC<span>•</span></Link><article className="article-content"><p className="eyebrow">{article.category} / MIC PULSE</p><h1 className="display display-lg">{article.title}</h1>{article.excerpt && <p className="article-excerpt">{article.excerpt}</p>}<div className="article-body">{article.content?.split("\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div><Link className="text-link" href={`/${article.category.toLowerCase()}`}>← Back to {article.category}</Link></article></main>;
}
