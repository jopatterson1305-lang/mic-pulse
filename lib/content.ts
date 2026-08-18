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
};

export type Opportunity = {
  id: string;
  title: string;
  description: string | null;
  type: string;
  organization: string | null;
  url: string | null;
  deadline: string | null;
  published: boolean;
};

export type Event = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  starts_at: string | null;
  url: string | null;
  published: boolean;
};

export async function getPublishedArticles(category?: string) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [] as Article[];
  let query = supabase.from("articles").select("*").eq("published", true).order("published_at", { ascending: false });
  if (category) query = query.eq("category", category);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Article[];
}

export async function getPublishedArticle(slug: string) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase.from("articles").select("*").eq("slug", slug).eq("published", true).maybeSingle();
  if (error) throw error;
  return data as Article | null;
}

export async function getPublishedOpportunities() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [] as Opportunity[];
  const { data, error } = await supabase.from("opportunities").select("*").eq("published", true).order("deadline", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Opportunity[];
}

export async function getPublishedEvents() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [] as Event[];
  const { data, error } = await supabase.from("events").select("*").eq("published", true).order("starts_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Event[];
}

export async function getPublishedRecord(table: "companies" | "startups" | "founders" | "market_updates" | "pages", slug: string) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase.from(table).select("*").eq("slug", slug).eq("published", true).maybeSingle();
  if (error) throw error;
  return data;
}
