import { createClient } from "./supabase";
import type { Article, Event, Opportunity } from "./content";

export type EngagementState = { liked: boolean; saved: boolean };
export type SavedContentType = "article" | "opportunity" | "event";
export type SavedContentItem = {
  id: string;
  title: string;
  excerpt: string | null;
  href: string;
  type: SavedContentType;
  created_at: string;
  category?: string | null;
};

async function currentUser() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return { supabase, user: data.user };
}

export async function getContentEngagement(contentType: SavedContentType, contentId: string): Promise<EngagementState> {
  const { supabase, user } = await currentUser();
  if (!user) return { liked: false, saved: false };
  const [{ data: like }, { data: save }] = await Promise.all([
    supabase.from("content_likes").select("id").eq("user_id", user.id).eq("content_type", contentType).eq("content_id", contentId).maybeSingle(),
    supabase.from("content_saves").select("id").eq("user_id", user.id).eq("content_type", contentType).eq("content_id", contentId).maybeSingle(),
  ]);
  return { liked: Boolean(like), saved: Boolean(save) };
}

export const getArticleEngagement = (articleId: string) => getContentEngagement("article", articleId);

export async function toggleContentEngagement(contentType: SavedContentType, contentId: string, kind: "like" | "save", active: boolean) {
  const { supabase, user } = await currentUser();
  if (!user) throw new Error("Sign in to use this feature.");
  const table = kind === "like" ? "content_likes" : "content_saves";
  if (active) {
    const { error } = await supabase.from(table).insert({ user_id: user.id, content_type: contentType, content_id: contentId });
    if (error && error.code !== "23505") throw error;
  } else {
    const { error } = await supabase.from(table).delete().eq("user_id", user.id).eq("content_type", contentType).eq("content_id", contentId);
    if (error) throw error;
  }
}

export const toggleArticleEngagement = (articleId: string, kind: "like" | "save", active: boolean) => toggleContentEngagement("article", articleId, kind, active);

export async function getSavedArticleIds(kind: "likes" | "saves") {
  const { supabase, user } = await currentUser();
  if (!user) return [] as string[];
  const table = kind === "likes" ? "content_likes" : "content_saves";
  const { data, error } = await supabase.from(table).select("content_id").eq("user_id", user.id).eq("content_type", "article").order("created_at", { ascending: false }).limit(100);
  if (error) throw error;
  return (data ?? []).map((row) => row.content_id as string);
}

export async function getSavedContent(kind: "likes" | "saves"): Promise<SavedContentItem[]> {
  const { supabase, user } = await currentUser();
  if (!user) return [];
  const table = kind === "likes" ? "content_likes" : "content_saves";
  const { data: saves, error } = await supabase.from(table).select("content_type,content_id,created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(100);
  if (error) throw error;
  const grouped = new Map<SavedContentType, string[]>();
  for (const row of saves ?? []) {
    const type = row.content_type as SavedContentType;
    if (["article", "opportunity", "event"].includes(type)) grouped.set(type, [...(grouped.get(type) ?? []), row.content_id as string]);
  }
  const [articles, opportunities, events] = await Promise.all([
    grouped.has("article") ? supabase.from("articles").select("id,title,slug,excerpt,category").in("id", grouped.get("article") ?? []).eq("published", true) : Promise.resolve({ data: [], error: null }),
    grouped.has("opportunity") ? supabase.from("opportunities").select("id,title,slug,description,type").in("id", grouped.get("opportunity") ?? []).eq("published", true) : Promise.resolve({ data: [], error: null }),
    grouped.has("event") ? supabase.from("events").select("id,title,slug,description").in("id", grouped.get("event") ?? []).eq("published", true) : Promise.resolve({ data: [], error: null }),
  ]);
  if (articles.error) throw articles.error;
  if (opportunities.error) throw opportunities.error;
  if (events.error) throw events.error;
  const records = new Map<string, SavedContentItem>();
  for (const row of (articles.data ?? []) as Pick<Article, "id" | "title" | "slug" | "excerpt" | "category">[]) records.set(`article:${row.id}`, { id: row.id, title: row.title, excerpt: row.excerpt, href: `/articles/${row.slug}`, type: "article", category: row.category, created_at: "" });
  for (const row of (opportunities.data ?? []) as Pick<Opportunity, "id" | "title" | "slug" | "description" | "type">[]) if (row.slug) records.set(`opportunity:${row.id}`, { id: row.id, title: row.title, excerpt: row.description, href: `/opportunities/${row.slug}`, type: "opportunity", category: row.type, created_at: "" });
  for (const row of (events.data ?? []) as Pick<Event, "id" | "title" | "slug" | "description">[]) if (row.slug) records.set(`event:${row.id}`, { id: row.id, title: row.title, excerpt: row.description, href: `/events/${row.slug}`, type: "event", created_at: "" });
  return (saves ?? []).map((row) => { const type = row.content_type as SavedContentType; const item = records.get(`${type}:${row.content_id}`); return item ? { ...item, created_at: row.created_at as string } : null; }).filter((item): item is SavedContentItem => Boolean(item));
}

export async function removeSavedContent(kind: "likes" | "saves", contentType: SavedContentType, contentId: string) {
  const { supabase, user } = await currentUser();
  if (!user) throw new Error("Sign in to use this feature.");
  const table = kind === "likes" ? "content_likes" : "content_saves";
  const { error } = await supabase.from(table).delete().eq("user_id", user.id).eq("content_type", contentType).eq("content_id", contentId);
  if (error) throw error;
}
