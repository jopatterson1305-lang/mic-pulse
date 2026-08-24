"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSavedContent, removeSavedContent, type SavedContentItem } from "@/lib/reader";

export function LibraryPanel({ kind }: { kind: "likes" | "saves" }) {
  const [items, setItems] = useState<SavedContentItem[]>([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const label = kind === "likes" ? "Liked stories" : "Saved library";
  async function load() { setBusy(true); setError(""); try { setItems(await getSavedContent(kind)); } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to load your library."); } finally { setBusy(false); } }
  useEffect(() => { void load(); }, [kind]);
  async function remove(item: SavedContentItem) { setItems((current) => current.filter((entry) => !(entry.id === item.id && entry.type === item.type))); try { await removeSavedContent(kind, item.type, item.id); } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to remove this item."); void load(); } }
  return <section><p className="eyebrow">READER LIBRARY / {kind.toUpperCase()}</p><h2>{label}</h2><p className="account-muted">Return to the stories, openings, and gatherings you chose to keep close.</p>{busy && <p className="muted" role="status">Loading your library…</p>}{error && <p className="form-error" role="alert">{error}</p>}{!busy && !error && !items.length && <div className="empty-state"><h3>Your library is empty.</h3><p>{kind === "likes" ? "Like a story to keep it close." : "Save an article, opportunity, or event to return to it later."}</p><Link className="text-link" href="/articles">Browse the archive ↗</Link></div>}<div className="library-list">{items.map((item) => <article className="library-item" key={`${item.type}:${item.id}`}><div><div className="story-meta"><span>{item.category ?? item.type}</span><span>{item.created_at ? new Date(item.created_at).toLocaleDateString("en-TZ", { dateStyle: "medium" }) : "Saved"}</span></div><h3><Link href={item.href}>{item.title}</Link></h3><p className="muted">{item.excerpt}</p></div>{kind === "saves" && <button type="button" className="text-link danger-link" onClick={() => void remove(item)}>Remove</button>}</article>)}</div></section>;
}
