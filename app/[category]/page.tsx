import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedArticles } from "@/lib/content";

const categories = new Set(["business", "finance", "technology", "ai", "startups"]);

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!categories.has(category)) notFound();
  const label = category === "ai" ? "AI" : category[0].toUpperCase() + category.slice(1);
  const articles = await getPublishedArticles(label);

  return <main className="content-shell">
    <header className="content-header"><Link className="brand-mark" href="/">MIC<span>•</span></Link><p className="eyebrow">MIC / {label.toUpperCase()}</p><h1 className="display display-lg">{label}<br /><span>intelligence.</span></h1><p className="section-lede">Published reporting and insight for people building East Africa&apos;s future.</p></header>
    <section className="content-grid" aria-live="polite">{articles.map(article => <article className="content-card" key={article.id}><p className="eyebrow">{article.category}</p><h2><Link href={`/articles/${article.slug}`}>{article.title}</Link></h2>{article.excerpt && <p>{article.excerpt}</p>}<Link className="text-link" href={`/articles/${article.slug}`}>Read story ↗</Link></article>)}{articles.length === 0 && <div className="empty-state"><h2>No published stories yet.</h2><p>MIC is preparing the next signal for this section.</p></div>}</section>
  </main>;
}
