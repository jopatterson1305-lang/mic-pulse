import Link from "next/link";
import type { Article, SearchResult } from "@/lib/content";

type StoryLike = Pick<Article, "id" | "title" | "slug" | "excerpt" | "category"> & { href?: string; kind?: string };

export function StoryList({ items, empty = "No published stories yet." }: { items: StoryLike[] | SearchResult[]; empty?: string }) {
  if (!items.length) return <div className="empty-state"><h2>Nothing published yet.</h2><p>{empty}</p></div>;
  return <div className="story-list">{items.map((item, index) => { const href = "href" in item && item.href ? item.href : `/articles/${item.slug}`; const type = "kind" in item && item.kind ? item.kind : item.category ?? "Story"; return <Link className="story-item" href={href} key={`${item.id}-${href}`}><div><div className="story-meta"><span>{String(type).replaceAll("_", " ")}</span><span>{String(index + 1).padStart(2, "0")}</span></div><h2>{item.title}</h2><p>{item.excerpt || "Published reporting from the MIC Pulse newsroom."}</p></div><div className="story-meta"><span>Read the brief</span><span>↗</span></div></Link>; })}</div>;
}
