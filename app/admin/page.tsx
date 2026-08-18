"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

type Article = { id: string; title: string; slug: string; category: string; published: boolean; created_at: string };

export default function AdminPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  async function load() {
    const supabase = createClient();
    setLoading(true);
    setError("");
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }
    setSessionEmail(user.email ?? null);
    const { data, error } = await supabase.from("articles").select("id,title,slug,category,published,created_at").order("created_at", { ascending: false });
    if (error) setError(error.message); else setArticles(data ?? []);
    setLoading(false);
  }

  useEffect(() => { void load(); }, []);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.reload();
  }

  if (loading) return <main className="admin-shell"><p>Loading MIC Admin…</p></main>;
  if (!sessionEmail) return <main className="admin-shell"><div className="admin-card"><h1>MIC Admin</h1><p>Sign in with your Supabase account to manage MIC content.</p><a className="admin-button" href="/admin/login">Sign in</a></div></main>;

  return <main className="admin-shell">
    <header className="admin-header"><div><p className="eyebrow">MIC PULSE</p><h1>Command Center</h1><p>Signed in as {sessionEmail}</p></div><button className="admin-button secondary" onClick={signOut}>Sign out</button></header>
    <section className="admin-grid">
      <div className="admin-card"><span className="eyebrow">CONTENT</span><strong>{articles.length}</strong><p>Articles</p></div>
      <div className="admin-card"><span className="eyebrow">PUBLISHED</span><strong>{articles.filter(a => a.published).length}</strong><p>Live articles</p></div>
      <div className="admin-card"><span className="eyebrow">SYSTEM</span><strong>LIVE</strong><p>Supabase CMS</p></div>
    </section>
    <section className="admin-card"><div className="admin-row"><div><h2>Articles</h2><p>Create, edit, publish and unpublish MIC stories.</p></div><a className="admin-button" href="/admin/articles/new">New article</a></div>{error && <p className="admin-error">{error}</p>}<div className="admin-list">{articles.map(article => <a className="admin-list-item" key={article.id} href={`/admin/articles/${article.id}`}><div><strong>{article.title}</strong><span>{article.category} · {article.slug}</span></div><span>{article.published ? "Published" : "Draft"}</span></a>)}{articles.length === 0 && <p>No articles yet. Create the first one.</p>}</div></section>
  </main>;
}
