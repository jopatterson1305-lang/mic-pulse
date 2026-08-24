import { createServerSupabaseClient } from "./supabase-server";

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string;
  cover_image: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  author_id?: string | null;
  updated_at?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  tags?: string[] | null;
};
export type Opportunity = { id: string; title: string; description: string | null; type: string; organization: string | null; url: string | null; deadline: string | null; published: boolean; slug?: string | null; location?: string | null; image_url?: string | null };
export type Event = { id: string; title: string; description: string | null; location: string | null; starts_at: string | null; end_at?: string | null; url: string | null; registration_url?: string | null; published: boolean; slug?: string | null; venue?: string | null; image_url?: string | null };
export type SearchResult = { id: string; title: string; slug: string; excerpt: string | null; kind: "article" | "company" | "startup" | "founder" | "event" | "opportunity"; href: string; category?: string | null };

async function getDb() { return createServerSupabaseClient(); }

export async function getPublishedArticles(category?: string) {
  const supabase = await getDb(); if (!supabase) return [] as Article[];
  let query = supabase.from("articles").select("*").eq("published", true).order("published_at", { ascending: false });
  if (category) query = query.eq("category", category);
  const { data, error } = await query.limit(60); if (error) throw error; return (data ?? []) as Article[];
}
export async function getPublishedArticle(slug: string) { const supabase = await getDb(); if (!supabase) return null; const { data, error } = await supabase.from("articles").select("*").eq("slug", slug).eq("published", true).maybeSingle(); if (error) throw error; return data as Article | null; }
export async function getPublishedArticleById(id: string) { const supabase = await getDb(); if (!supabase) return null; const { data, error } = await supabase.from("articles").select("*").eq("id", id).eq("published", true).maybeSingle(); if (error) throw error; return data as Article | null; }
export async function getPublishedOpportunities() { const supabase = await getDb(); if (!supabase) return [] as Opportunity[]; const { data, error } = await supabase.from("opportunities").select("*").eq("published", true).order("deadline", { ascending: true }).limit(60); if (error) throw error; return (data ?? []) as Opportunity[]; }
export async function getPublishedOpportunity(slug: string) { const supabase = await getDb(); if (!supabase) return null; const { data, error } = await supabase.from("opportunities").select("*").eq("slug", slug).eq("published", true).maybeSingle(); if (error) throw error; return data as Opportunity | null; }
export async function getPublishedEvents() { const supabase = await getDb(); if (!supabase) return [] as Event[]; const { data, error } = await supabase.from("events").select("*").eq("published", true).order("starts_at", { ascending: true }).limit(60); if (error) throw error; return (data ?? []) as Event[]; }
export async function getPublishedEvent(slug: string) { const supabase = await getDb(); if (!supabase) return null; const { data, error } = await supabase.from("events").select("*").eq("slug", slug).eq("published", true).maybeSingle(); if (error) throw error; return data as Event | null; }
export async function getPublishedRecord(table: "companies" | "startups" | "founders" | "market_updates" | "pages", slug: string) { const supabase = await getDb(); if (!supabase) return null; const { data, error } = await supabase.from(table).select("*").eq("slug", slug).eq("published", true).maybeSingle(); if (error) throw error; return data; }

export async function searchPublishedContent(term: string) {
  const supabase = await getDb(); if (!supabase || !term.trim()) return [] as SearchResult[];
  const needle = `%${term.trim().replace(/[%_]/g, "\\$&")}%`;
  const results: SearchResult[] = [];
  const articleQuery = await supabase.from("articles").select("id,title,slug,excerpt,category").eq("published", true).or(`title.ilike.${needle},excerpt.ilike.${needle},content.ilike.${needle}`).order("published_at", { ascending: false }).limit(20);
  if (articleQuery.error) throw articleQuery.error;
  for (const row of articleQuery.data ?? []) results.push({ id: row.id, title: row.title, slug: row.slug, excerpt: row.excerpt, category: row.category, kind: "article", href: `/articles/${row.slug}` });
  for (const [table, kind, prefix] of [["companies", "company", "/companies/"], ["startups", "startup", "/startups/"], ["founders", "founder", "/founders/"], ["events", "event", "/events/"], ["opportunities", "opportunity", "/opportunities/"]] as const) {
    const query = await supabase.from(table).select("id,title,slug,description").eq("published", true).or(`title.ilike.${needle},description.ilike.${needle}`).limit(12);
    if (query.error) throw query.error;
    for (const row of query.data ?? []) results.push({ id: row.id, title: row.title, slug: row.slug, excerpt: row.description, kind, href: `${prefix}${row.slug}` });
  }
  return results;
}

export async function getRelatedArticles(category: string, excludedId: string) {
  const supabase = await getDb(); if (!supabase) return [] as Article[];
  const { data, error } = await supabase.from("articles").select("id,title,slug,excerpt,category,cover_image,published,published_at,created_at").eq("published", true).eq("category", category).neq("id", excludedId).order("published_at", { ascending: false }).limit(4);
  if (error) throw error; return (data ?? []) as Article[];
}
