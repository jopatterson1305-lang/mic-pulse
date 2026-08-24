import { notFound } from "next/navigation";
import { getPublishedArticles } from "@/lib/content";
import { StoryList } from "@/components/editorial/StoryList";

const categories = new Set(["business", "finance", "technology", "ai", "startups"]);
export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params; if (!categories.has(category)) notFound();
  const label = category === "ai" ? "AI" : category[0].toUpperCase() + category.slice(1);
  const articles = await getPublishedArticles(label);
  return <main className="content-shell"><header className="editorial-header mic-container"><p className="eyebrow">MIC / {label.toUpperCase()}</p><h1>{label}<br /><span>in context.</span></h1><p className="section-lede">Published reporting and insight for people building East Africa&apos;s future.</p></header><section className="mic-container"><StoryList items={articles} empty="The newsroom is preparing the next signal for this section." /></section></main>;
}
