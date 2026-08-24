import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedArticle, getRelatedArticles } from "@/lib/content";
import { EngagementBar } from "@/components/editorial/EngagementBar";
import { ReadingProgress } from "@/components/editorial/ReadingProgress";

export const dynamic = "force-dynamic";

function readingTime(content: string | null) { return Math.max(1, Math.ceil((content ?? "").trim().split(/\s+/).filter(Boolean).length / 220)); }
function renderLine(line: string, index: number) {
  if (line.startsWith("### ")) return <h3 key={index}>{line.slice(4)}</h3>;
  if (line.startsWith("## ")) return <h2 key={index}>{line.slice(3)}</h2>;
  if (line.startsWith("# ")) return <h2 key={index}>{line.slice(2)}</h2>;
  const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  if (image) return <figure key={index}><img className="article-inline-image" src={image[2]} alt={image[1]} /><figcaption>{image[1]}</figcaption></figure>;
  const parts = line.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, partIndex) => { const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/); return link ? <a key={partIndex} href={link[2]} target={link[2].startsWith("http") ? "_blank" : undefined} rel={link[2].startsWith("http") ? "noreferrer" : undefined}>{link[1]}</a> : part.replace(/\*\*([^*]+)\*\*/g, "$1"); });
  return <p key={index}>{parts}</p>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const article = await getPublishedArticle(slug); if (!article) return { title: "Story not found — MIC Pulse" };
  return { title: `${article.title} — MIC Pulse`, description: article.seo_description ?? article.excerpt ?? "East African business and technology intelligence.", alternates: { canonical: `/articles/${article.slug}` }, openGraph: { type: "article", title: article.title, description: article.seo_description ?? article.excerpt ?? "East African business and technology intelligence.", url: `/articles/${article.slug}`, images: article.cover_image ? [{ url: article.cover_image }] : undefined, publishedTime: article.published_at ?? undefined }, twitter: { card: "summary_large_image", title: article.title, description: article.excerpt ?? undefined, images: article.cover_image ? [article.cover_image] : undefined } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const article = await getPublishedArticle(slug); if (!article) notFound(); const related = await getRelatedArticles(article.category, article.id); const body = article.content ?? "";
  return <main className="content-shell article-shell"><ReadingProgress /><article className="article-content"><Link className="text-link" href={`/${article.category.toLowerCase()}`}>← {article.category}</Link><p className="eyebrow">{article.category} / MIC PULSE</p><h1 className="display display-lg">{article.title}</h1>{article.excerpt && <p className="article-excerpt">{article.excerpt}</p>}<div className="story-meta article-byline"><span>MIC Pulse newsroom</span><span>{article.published_at ? new Date(article.published_at).toLocaleDateString("en-TZ", { year: "numeric", month: "long", day: "numeric" }) : "Published"} · {readingTime(body)} min read</span></div>{article.cover_image && <img className="article-hero-image" src={article.cover_image} alt="" /> }<EngagementBar articleId={article.id} title={article.title} /><div className="article-body">{body.split("\n").filter((line) => line.trim()).map(renderLine)}</div>{related.length > 0 && <section className="related-stories"><p className="eyebrow">Continue reading</p><div className="story-list">{related.map((story) => <Link className="story-item" key={story.id} href={`/articles/${story.slug}`}><div><div className="story-meta"><span>{story.category}</span><span>↗</span></div><h2>{story.title}</h2><p>{story.excerpt}</p></div></Link>)}</div></section>}</article></main>;
}
