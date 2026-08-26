import { notFound } from "next/navigation";
import { getPublishedArticles } from "@/lib/content";
import { StoryList } from "@/components/editorial/StoryList";

const categories = new Set(["business", "finance", "technology", "ai", "startups"]);
export const dynamic = "force-dynamic";

const context: Record<string, string> = { business: "Companies, decisions, and the systems shaping regional growth.", finance: "Capital, markets, and the financial context behind consequential moves.", technology: "Products, infrastructure, and the builders widening what is possible.", ai: "Applied AI, practical tools, and the people putting them to work.", startups: "Early momentum, ambitious teams, and the work becoming the next generation." };

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!categories.has(category)) notFound();
  const queryLabel = category === "ai" ? "AI" : category[0].toUpperCase() + category.slice(1);
  const label = category === "finance" ? "Markets" : queryLabel;
  const articles = await getPublishedArticles(queryLabel);

  return <main className={`content-shell category-shell category-${category}`}><section className="category-intro mic-container"><div><p className="eyebrow">MIC / {label.toUpperCase()}</p><h1 className="display display-lg">{label}<br /><span>in context.</span></h1></div><aside className="category-context liquid-glass"><span className="category-context-index">EDITORIAL VIEW</span><p>{context[category]}</p><span className="category-context-rule" /><span className="category-context-note">Published reporting from the MIC newsroom.</span></aside></section><section className="category-content mic-container"><div className="category-content-label"><span>Latest reporting</span><span>{String(articles.length).padStart(2, "0")} published</span></div><StoryList items={articles} empty="The newsroom is preparing the next report for this section." /></section></main>;
}
