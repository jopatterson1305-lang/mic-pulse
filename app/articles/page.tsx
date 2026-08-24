import { getPublishedArticles } from "@/lib/content";
import { StoryList } from "@/components/editorial/StoryList";

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();
  return <main className="content-shell archive-shell"><header className="archive-intro mic-container"><div><p className="eyebrow">MIC / THE ARCHIVE</p><h1 className="display display-lg">Stories<br /><span>with signal.</span></h1></div><aside className="archive-note"><span>THE NEWSROOM</span><p>The latest business, finance, technology, and AI reporting from the East African newsroom.</p><span className="archive-rule" /><small>Updated as stories are published.</small></aside></header><section className="archive-content mic-container"><div className="archive-content-label"><span>All stories</span><span>{String(articles.length).padStart(2, "0")} published</span></div><StoryList items={articles} empty="No stories have been published yet." /></section></main>;
}
