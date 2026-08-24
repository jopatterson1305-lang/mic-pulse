import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { createServerSupabaseClient } from "@/lib/supabase-server";

type CommunityStory = { id: string; title: string; organization: string; founder_name: string | null; summary: string; website: string | null; location: string | null };

export async function CommunityShowcase() {
  const supabase = await createServerSupabaseClient();
  const { data } = supabase ? await supabase.from("community_stories").select("id,title,organization,founder_name,summary,website,location").eq("published", true).order("created_at", { ascending: false }).limit(6) : { data: [] };
  const stories = (data ?? []) as CommunityStory[];
  return <section className="reference-community"><div className="reference-container"><Reveal className="reference-section-head"><div><p className="eyebrow">05 / THE COMMUNITY</p><h2 className="reference-heading">Built here.<br /><span>Moving forward.</span></h2></div><p>Real stories from the Tanzanian builders and teams turning ambition into useful work.</p></Reveal>{stories.length ? <div className="reference-community-grid">{stories.map((story) => <Reveal className="reference-community-card glass-surface" key={story.id}><div className="reference-community-meta"><span>{story.location ?? "Tanzania"}</span><span>Community story</span></div><h3>{story.title}</h3><p className="reference-community-organization">{story.organization}{story.founder_name ? ` · ${story.founder_name}` : ""}</p><p>{story.summary}</p>{story.website && <a className="text-link" href={story.website} target="_blank" rel="noreferrer">Visit the work ↗</a>}</Reveal>)}</div> : <Reveal className="reference-community-empty glass-surface"><p className="eyebrow">EDITORIAL SHOWCASE</p><h3>The first community stories are taking shape.</h3><p>MIC will publish verified founder and innovator stories here as the ecosystem comes into focus.</p><Link className="text-link" href="/apply?type=founder">Share what you are building ↗</Link></Reveal>}</div></section>;
}
