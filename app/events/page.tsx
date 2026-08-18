import Link from "next/link";
import { getPublishedEvents } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await getPublishedEvents();
  return <main className="content-shell"><Link className="brand-mark" href="/">MIC<span>•</span></Link><header className="content-header"><p className="eyebrow">06 / EVENTS</p><h1 className="display display-lg">What&apos;s moving<br /><span>in the region.</span></h1><p className="section-lede">A considered calendar of conversations, launches and gatherings shaping East Africa.</p></header><section className="content-grid">{events.map(event => <article className="content-card" key={event.id}><p className="eyebrow">{event.location ?? "East Africa"}</p><h2>{event.title}</h2>{event.description && <p>{event.description}</p>}{event.starts_at && <p>{new Date(event.starts_at).toLocaleString("en", { dateStyle: "medium", timeStyle: "short" })}</p>}{event.url && <a className="text-link" href={event.url} target="_blank" rel="noreferrer">Event details ↗</a>}</article>)}{events.length === 0 && <div className="empty-state"><h2>No upcoming events yet.</h2><p>Editors can publish the next event from MIC Admin.</p></div>}</section></main>;
}
