"use client";

import { useEffect, useState } from "react";
import { getArticleEngagement, toggleArticleEngagement } from "@/lib/reader";
import { createClient } from "@/lib/supabase";

export function EngagementBar({ articleId, title }: { articleId: string; title: string }) {
  const [state, setState] = useState({ liked: false, saved: false });
  const [signedIn, setSignedIn] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => { let active = true; void createClient().auth.getUser().then(({ data }) => { if (!active) return; setSignedIn(Boolean(data.user)); if (data.user) void getArticleEngagement(articleId).then(setState).catch(() => undefined); }); return () => { active = false; }; }, [articleId]);
  async function toggle(kind: "like" | "save") { if (!signedIn) { setNotice("Sign in to build your personal reading library."); return; } const key = kind === "like" ? "liked" : "saved"; const next = !state[key]; setState((current) => ({ ...current, [key]: next })); try { await toggleArticleEngagement(articleId, kind, next); setNotice(next ? `${kind === "like" ? "Liked" : "Saved"}.` : `${kind === "like" ? "Like removed" : "Removed from saved"}.`); } catch { setState((current) => ({ ...current, [key]: !next })); setNotice("That action could not be completed."); } }
  async function copy() { await navigator.clipboard?.writeText(window.location.href); setNotice("Link copied."); }
  async function share() { if (navigator.share) { await navigator.share({ title, url: window.location.href }); setNotice("Shared."); } else await copy(); }
  const encoded = encodeURIComponent(typeof window === "undefined" ? "" : window.location.href); const text = encodeURIComponent(title);
  return <div className="article-toolbar" aria-label="Article actions"><button className={`engagement-button ${state.liked ? "active" : ""}`} type="button" onClick={() => void toggle("like")}>{state.liked ? "Liked" : "Like"}</button><button className={`engagement-button ${state.saved ? "active" : ""}`} type="button" onClick={() => void toggle("save")}>{state.saved ? "Saved" : "Save"}</button><div className="share-menu"><button className="engagement-button" type="button" onClick={() => void copy()}>Copy link</button><button className="engagement-button" type="button" onClick={() => void share()}>Share</button><a className="engagement-button" href={`https://wa.me/?text=${text}%20${encoded}`} target="_blank" rel="noreferrer">WhatsApp</a><a className="engagement-button" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`} target="_blank" rel="noreferrer">LinkedIn</a></div>{notice && <span className="muted" role="status">{notice}</span>}</div>;
}
