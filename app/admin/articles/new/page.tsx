import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function NewArticlePage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  if (!user) return <main className="admin-shell"><p>Please sign in again.</p></main>;
  return <main className="admin-shell"><ArticleEditor userId={user.id} /></main>;
}
