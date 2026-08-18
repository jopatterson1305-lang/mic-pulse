import { notFound } from "next/navigation";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  if (!supabase) return <main className="admin-shell"><p>Supabase is not configured.</p></main>;
  const [{ data: { user } }, { data: article }] = await Promise.all([supabase.auth.getUser(), supabase.from("articles").select("*").eq("id", id).maybeSingle()]);
  if (!user) return <main className="admin-shell"><p>Please sign in again.</p></main>;
  if (!article) notFound();
  return <main className="admin-shell"><ArticleEditor userId={user.id} initial={article} /></main>;
}
