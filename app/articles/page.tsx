import { getPublishedArticles } from "@/lib/content";
import { StoryList } from "@/components/editorial/StoryList";

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();
  return <main className="content-shell"><header className="editorial-header mic-container"><p className="eyebrow">MIC / THE ARCHIVE</p><h1>Stories<br /><span>with signal.</span></h1><p className="section-lede">The latest business, finance, technology, and AI reporting from the East African newsroom.</p></header><section className="mic-container"><StoryList items={articles} empty="No stories have been published yet." /></section></main>;
}
