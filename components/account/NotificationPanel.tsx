"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

type Notification = { id: string; title: string; body: string | null; href: string | null; read_at: string | null; created_at: string };

export function NotificationPanel() {
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    const supabase = createClient();
    const { data, error: loadError } = await supabase.from("user_notifications").select("id,title,body,href,read_at,created_at").order("created_at", { ascending: false }).limit(20);
    if (loadError) setError(loadError.message); else setItems((data ?? []) as Notification[]);
    setLoading(false);
  }

  useEffect(() => { void load(); }, []);

  async function markRead(id: string) {
    const { error: updateError } = await createClient().from("user_notifications").update({ read_at: new Date().toISOString() }).eq("id", id);
    if (updateError) setError(updateError.message); else setItems((current) => current.map((item) => item.id === id ? { ...item, read_at: new Date().toISOString() } : item));
  }

  async function remove(id: string) {
    const { error: deleteError } = await createClient().from("user_notifications").delete().eq("id", id);
    if (deleteError) setError(deleteError.message); else setItems((current) => current.filter((item) => item.id !== id));
  }

  return <section className="notification-panel glass-surface" aria-labelledby="notifications-title"><div className="notification-panel-header"><div><p className="eyebrow">ACCOUNT / NOTIFICATIONS</p><h2 id="notifications-title">Stay close to the signal.</h2></div><span className="notification-count">{items.filter((item) => !item.read_at).length} unread</span></div>{loading ? <p className="account-muted">Loading your notifications…</p> : error ? <p className="form-error" role="alert">{error}</p> : items.length === 0 ? <p className="account-muted">You&apos;re all caught up. New MIC updates will appear here.</p> : <div className="notification-list">{items.map((item) => <article className={`notification-item ${item.read_at ? "is-read" : ""}`} key={item.id}><div><div className="notification-item-meta"><span>{new Date(item.created_at).toLocaleDateString()}</span>{!item.read_at && <b>New</b>}</div><h3>{item.title}</h3>{item.body && <p>{item.body}</p>}</div><div className="notification-item-actions">{item.href && <a href={item.href} onClick={() => void markRead(item.id)}>Open <span>↗</span></a>}{!item.read_at && <button type="button" onClick={() => void markRead(item.id)}>Mark read</button>}<button type="button" onClick={() => void remove(item.id)} aria-label={`Remove ${item.title}`}>Remove</button></div></article>)}</div>}</section>;
}
