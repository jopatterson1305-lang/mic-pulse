"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase";

export type ArticleDraft = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string | null;
  content?: string | null;
  cover_image?: string | null;
  category?: string;
  tags?: string[] | null;
  seo_title?: string | null;
  seo_description?: string | null;
  published?: boolean;
};

const categories = ["Business", "Finance", "Technology", "AI", "Startups", "Opportunities"];

function makeSlug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function ArticleEditor({ initial, userId }: { initial?: ArticleDraft; userId: string }) {
  const [form, setForm] = useState({
    title: initial?.title ?? "", slug: initial?.slug ?? "", excerpt: initial?.excerpt ?? "", content: initial?.content ?? "", cover_image: initial?.cover_image ?? "", category: initial?.category ?? "Business", tags: initial?.tags?.join(", ") ?? "", seo_title: initial?.seo_title ?? "", seo_description: initial?.seo_description ?? "", published: initial?.published ?? false,
  });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const editing = Boolean(initial?.id);
  const displaySlug = useMemo(() => form.slug || makeSlug(form.title), [form.slug, form.title]);
  const update = (key: keyof typeof form, value: string | boolean) => setForm(current => ({ ...current, [key]: value }));

  async function save(published = form.published) {
    setBusy(true); setError(""); setMessage("");
    const supabase = createClient();
    const payload = { title: form.title.trim(), slug: displaySlug, excerpt: form.excerpt, content: form.content, cover_image: form.cover_image || null, category: form.category, tags: form.tags.split(",").map(tag => tag.trim()).filter(Boolean), seo_title: form.seo_title || null, seo_description: form.seo_description || null, published, published_at: published ? new Date().toISOString() : null, updated_by: userId, ...(editing ? {} : { author_id: userId }) };
    const result = editing ? await supabase.from("articles").update(payload).eq("id", initial?.id) : await supabase.from("articles").insert(payload);
    if (result.error) setError(result.error.code === "23505" ? "That slug is already in use. Choose another." : result.error.message);
    else { setForm(current => ({ ...current, slug: displaySlug, published })); setMessage(published ? "Article published." : "Draft saved."); }
    setBusy(false);
  }

  async function remove() {
    if (!initial?.id || !window.confirm("Delete this article permanently?")) return;
    setBusy(true); const { error: deleteError } = await createClient().from("articles").delete().eq("id", initial.id);
    if (deleteError) setError(deleteError.message); else window.location.href = "/admin/articles";
    setBusy(false);
  }

  function insert(markup: string) {
    const area = document.getElementById("article-content") as HTMLTextAreaElement | null;
    if (!area) return;
    const start = area.selectionStart; const end = area.selectionEnd; const selected = form.content.slice(start, end) || "text";
    update("content", `${form.content.slice(0, start)}${markup.replace("$TEXT", selected)}${form.content.slice(end)}`);
  }

  return <form className="admin-card admin-form wide" onSubmit={event => { event.preventDefault(); void save(); }}>
    <div className="admin-row"><div><p className="eyebrow">CONTENT STUDIO</p><h1>{editing ? "Edit article" : "New article"}</h1><p>Draft, review and publish a MIC story without editing code.</p></div><span className={`status-badge ${form.published ? "published" : "draft"}`}>{form.published ? "Published" : "Draft"}</span></div>
    {error && <p className="admin-error">{error}</p>}{message && <p className="admin-success">{message}</p>}
    <label>Title<input required value={form.title} onChange={event => { update("title", event.target.value); if (!form.slug) update("slug", makeSlug(event.target.value)); }} /></label>
    <label>Slug<input required value={form.slug || makeSlug(form.title)} onChange={event => update("slug", makeSlug(event.target.value))} /><small>Public URL: /articles/{displaySlug || "your-story"}</small></label>
    <div className="admin-form-grid"><label>Category<select value={form.category} onChange={event => update("category", event.target.value)}>{categories.map(category => <option key={category}>{category}</option>)}</select></label><label>Tags<input value={form.tags} placeholder="ai, fintech, east africa" onChange={event => update("tags", event.target.value)} /></label></div>
    <label>Excerpt<textarea rows={3} value={form.excerpt} onChange={event => update("excerpt", event.target.value)} /></label>
    <label>Cover image URL<input type="url" value={form.cover_image} onChange={event => update("cover_image", event.target.value)} placeholder="Select from Media Library in the next step" /></label>
    <label>Content<div className="editor-toolbar"><button type="button" onClick={() => insert("# $TEXT")}>H1</button><button type="button" onClick={() => insert("**$TEXT**")}>Bold</button><button type="button" onClick={() => insert("*$TEXT*")}>Italic</button><button type="button" onClick={() => insert("> $TEXT")}>Quote</button><button type="button" onClick={() => insert("- $TEXT")}>List</button><button type="button" onClick={() => insert("[$TEXT](https://)")}>Link</button></div><textarea id="article-content" className="content-editor" required rows={18} value={form.content} onChange={event => update("content", event.target.value)} /></label>
    <div className="admin-form-grid"><label>SEO title<input value={form.seo_title} onChange={event => update("seo_title", event.target.value)} /></label><label>SEO description<textarea rows={2} value={form.seo_description} onChange={event => update("seo_description", event.target.value)} /></label></div>
    <div className="admin-row"><a href="/admin/articles">Cancel</a><div className="admin-actions"><button type="button" className="admin-button secondary" disabled={busy} onClick={() => void save(false)}>Save draft</button><button type="submit" className="admin-button" disabled={busy}>{busy ? "Saving…" : form.published ? "Update article" : "Publish article"}</button>{editing && <button type="button" className="admin-button danger" disabled={busy} onClick={() => void remove()}>Delete</button>}</div></div>
  </form>;
}
