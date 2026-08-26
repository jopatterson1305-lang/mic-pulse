import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export default async function FoundersDirectoryPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = supabase
    ? await supabase.from("founders").select("id,name,slug,bio,role,location").eq("published", true).order("name")
    : { data: [] };
  const founders = data ?? [];

  return <main className="content-shell directory-shell founder-directory-shell"><Link className="brand-mark" href="/">MIC<span>•</span></Link><header className="content-header"><p className="eyebrow">DIRECTORY / FOUNDERS</p><h1 className="display display-lg">The people<br /><span>moving East Africa.</span></h1><p className="section-lede">A growing directory of the people building companies, products, and communities across the region.</p></header><section className="content-grid" aria-label="Founder directory">{founders.length > 0 ? founders.map((founder) => <article className="content-card" key={founder.id}><p className="eyebrow">{founder.role ?? founder.location ?? "FOUNDER"}</p><h2><Link href={`/founders/${founder.slug}`}>{founder.name}</Link></h2><p>{founder.bio}</p><Link className="text-link" href={`/founders/${founder.slug}`}>View profile ↗</Link></article>) : <div className="empty-state"><h2>The directory is taking shape.</h2><p>Verified founder profiles will appear here as they are published. Explore the wider MIC ecosystem or share what you are building.</p><Link className="text-link" href="/apply?type=founder">Share what you are building ↗</Link></div>}</section></main>;
}
