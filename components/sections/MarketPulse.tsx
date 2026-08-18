import { Reveal } from "@/components/motion/Reveal";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function MarketPulse() {
  const supabase = await createServerSupabaseClient();
  const { data } = supabase ? await supabase.from("market_updates").select("id,title,metric,value,change_percentage").eq("published", true).order("published_at", { ascending: false }).limit(3) : { data: [] };
  const signals = data ?? [];
  return <section className="section section-dark" id="market-pulse">
    <div className="mic-container">
      <Reveal><p className="eyebrow">03 / MARKET PULSE</p><h2 className="display display-md">Know the signal<br /><span>before the noise.</span></h2></Reveal>
      <div className="signal-grid">{signals.length ? signals.map(signal => <Reveal key={signal.id} className="signal-card"><div><span className="signal-name">{signal.metric ?? "MARKET"}</span><p>{signal.title}</p></div><strong>{signal.value ?? "—"}{signal.change_percentage != null ? ` (${signal.change_percentage}%)` : ""}</strong></Reveal>) : <div className="empty-state"><h3>Market intelligence is being verified.</h3><p>Editors will publish sourced market updates here. MIC does not invent market numbers.</p></div>}</div>
    </div>
  </section>;
}
