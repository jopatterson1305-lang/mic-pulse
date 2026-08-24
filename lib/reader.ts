import { createClient } from "./supabase";

export type EngagementState = { liked: boolean; saved: boolean };

async function currentUser() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return { supabase, user: data.user };
}

export async function getArticleEngagement(articleId: string): Promise<EngagementState> {
  const { supabase, user } = await currentUser();
  if (!user) return { liked: false, saved: false };
  const [{ data: like }, { data: save }] = await Promise.all([
    supabase.from("content_likes").select("id").eq("user_id", user.id).eq("content_type", "article").eq("content_id", articleId).maybeSingle(),
    supabase.from("content_saves").select("id").eq("user_id", user.id).eq("content_type", "article").eq("content_id", articleId).maybeSingle(),
  ]);
  return { liked: Boolean(like), saved: Boolean(save) };
}

export async function toggleArticleEngagement(articleId: string, kind: "like" | "save", active: boolean) {
  const { supabase, user } = await currentUser();
  if (!user) throw new Error("Sign in to use this feature.");
  const table = kind === "like" ? "content_likes" : "content_saves";
  if (active) {
    const { error } = await supabase.from(table).insert({ user_id: user.id, content_type: "article", content_id: articleId });
    if (error && error.code !== "23505") throw error;
  } else {
    const { error } = await supabase.from(table).delete().eq("user_id", user.id).eq("content_type", "article").eq("content_id", articleId);
    if (error) throw error;
  }
}

export async function getSavedArticleIds(kind: "likes" | "saves") {
  const { supabase, user } = await currentUser();
  if (!user) return [] as string[];
  const table = kind === "likes" ? "content_likes" : "content_saves";
  const { data, error } = await supabase.from(table).select("content_id").eq("user_id", user.id).eq("content_type", "article").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => row.content_id as string);
}
