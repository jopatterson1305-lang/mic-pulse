import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

type MarketUpdate = { id: string; title: string; metric?: string | null; value?: string | number | null; change_percentage?: number | null; slug?: string | null; published_at?: string | null };

export async function MarketPulse() {
  const supabase = await createServerSupabaseClient();
  const { data } = supabase ? await supabase.from("market_updates").select("id,title,metric,value,change_percentage,slug,published_at").eq("published", true).order("published_at", { ascending: false }).limit(3) : { data: [] };
  const signals = (data ?? []) as MarketUpdate[];
  return <section className="section section-dark" id="market-pulse">
    <div className="mic-container">
      <Reveal><p className="eyebrow">03 / MARKET PULSE</p><h2 className="display display-md">Know the signal<br /><span>before the noise.</span></h2><p className="section-lede">Sourced market context for people making consequential moves across East Africa.</p></Reveal>
      <div className="signal-grid">{signals.length ? signals.map(signal => <Reveal key={signal.id} className="signal-card"><div><span className="signal-name">{signal.metric ?? "MARKET UPDATE"}</span><p>{signal.title}</p></div><div className="signal-value"><strong>{signal.value ?? "—"}{signal.change_percentage != null ? ` (${signal.change_percentage}%)` : ""}</strong>{signal.slug && <Link className="text-link" href={`/pages/${signal.slug}`}>Read update ↗</Link>}</div></Reveal>) : <Reveal className="empty-state"><h3>The next sourced update is being prepared.</h3><p>Browse the published archive while the editorial desk prepares the next market context.</p><Link className="text-link" href="/articles">Open the archive ↗</Link></Reveal>}</div>
    </div>
  </section>;
}
