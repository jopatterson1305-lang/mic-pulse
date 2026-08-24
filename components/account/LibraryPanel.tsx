"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { getSavedArticleIds } from "@/lib/reader";
import type { Article } from "@/lib/content";

export function LibraryPanel({ kind }: { kind: "likes" | "saves" }) {
  const [items, setItems] = useState<Article[]>([]); const [busy, setBusy] = useState(true); const [error, setError] = useState("");
  useEffect(() => { let active = true; void (async () => { try { const ids = await getSavedArticleIds(kind); if (!ids.length) { if (active) setItems([]); return; } const { data, error: queryError } = await createClient().from("articles").select("id,title,slug,excerpt,category,cover_image,published,published_at,created_at").in("id", ids).eq("published", true); if (queryError) throw queryError; const byId = new Map((data ?? []).map((item) => [item.id, item as Article])); if (active) setItems(ids.map((id) => byId.get(id)).filter((item): item is Article => Boolean(item))); } catch (cause) { if (active) setError(cause instanceof Error ? cause.message : "Unable to load your library."); } finally { if (active) setBusy(false); } })(); return () => { active = false; }; }, [kind]);
  return <section><p className="eyebrow">READER LIBRARY</p><h2>{kind === "likes" ? "Liked stories" : "Saved stories"}</h2>{busy && <p className="muted">Loading your library…</p>}{error && <p className="form-error">{error}</p>}{!busy && !error && !items.length && <div className="empty-state"><h3>Your library is empty.</h3><p>{kind === "likes" ? "Like a story to keep it close." : "Save a story to return to it later."}</p></div>}<div className="library-list">{items.map((item) => <Link href={`/articles/${item.slug}`} key={item.id}><div className="story-meta"><span>{item.category}</span><span>Read ↗</span></div><h3>{item.title}</h3><p className="muted">{item.excerpt}</p></Link>)}</div></section>;
}
