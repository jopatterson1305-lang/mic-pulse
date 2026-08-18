"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

type Article = { id: string; title: string; slug: string; category: string; published: boolean; created_at: string };

export default function AdminPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState({ opportunities: 0, events: 0, companies: 0, startups: 0, founders: 0, subscribers: 0 });
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
    const [articleResult, opportunities, events, companies, startups, founders, subscribers] = await Promise.all([
      supabase.from("articles").select("id,title,slug,category,published,created_at").order("created_at", { ascending: false }),
      supabase.from("opportunities").select("id", { count: "exact", head: true }),
      supabase.from("events").select("id", { count: "exact", head: true }),
      supabase.from("companies").select("id", { count: "exact", head: true }),
      supabase.from("startups").select("id", { count: "exact", head: true }),
      supabase.from("founders").select("id", { count: "exact", head: true }),
      supabase.from("newsletter_subscribers").select("id", { count: "exact", head: true }),
    ]);
    if (articleResult.error) setError(articleResult.error.message); else setArticles(articleResult.data ?? []);
    setStats({ opportunities: opportunities.count ?? 0, events: events.count ?? 0, companies: companies.count ?? 0, startups: startups.count ?? 0, founders: founders.count ?? 0, subscribers: subscribers.count ?? 0 });
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
      <div className="admin-card"><span className="eyebrow">PUBLISHED</span><strong>{articles.filter(a => a.published).length}</strong><p>Live articles</p></div>
      <div className="admin-card"><span className="eyebrow">DRAFTS</span><strong>{articles.filter(a => !a.published).length}</strong><p>Draft articles</p></div>
      <div className="admin-card"><span className="eyebrow">OPPORTUNITIES</span><strong>{stats.opportunities}</strong><p>Records</p></div>
      <div className="admin-card"><span className="eyebrow">EVENTS</span><strong>{stats.events}</strong><p>Records</p></div>
      <div className="admin-card"><span className="eyebrow">DIRECTORY</span><strong>{stats.companies + stats.startups + stats.founders}</strong><p>Companies · Startups · Founders</p></div>
      <div className="admin-card"><span className="eyebrow">AUDIENCE</span><strong>{stats.subscribers}</strong><p>Newsletter subscribers</p></div>
    </section>
    <section className="admin-card"><div className="admin-row"><div><h2>Articles</h2><p>Create, edit, publish and unpublish MIC stories.</p></div><a className="admin-button" href="/admin/articles/new">New article</a></div>{error && <p className="admin-error">{error}</p>}<div className="admin-list">{articles.map(article => <a className="admin-list-item" key={article.id} href={`/admin/articles/${article.id}/edit`}><div><strong>{article.title}</strong><span>{article.category} · {article.slug}</span></div><span>{article.published ? "Published" : "Draft"}</span></a>)}{articles.length === 0 && <p>No articles yet. Create the first one.</p>}</div></section>
  </main>;
}
