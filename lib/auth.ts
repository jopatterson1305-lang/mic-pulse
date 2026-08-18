import { createServerSupabaseClient } from "./supabase-server";

export async function getCurrentProfile() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from("profiles").select("id,full_name,role").eq("id", user.id).maybeSingle();
  return profile ? { ...profile, email: user.email ?? "" } : null;
}

export async function requireAdmin() {
  const profile = await getCurrentProfile();
  return profile?.role === "admin" ? profile : null;
}
