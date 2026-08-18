"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setError("");
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) { setError(error.message); setBusy(false); return; }
      const next = new URLSearchParams(window.location.search).get("next");
      window.location.href = next?.startsWith("/admin") ? next : "/admin";
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to connect to Supabase Auth.");
      setBusy(false);
    }
  }

  return <main className="admin-shell admin-centered"><form className="admin-card admin-form" onSubmit={submit}><p className="eyebrow">MIC PULSE</p><h1>Admin sign in</h1><p>Manage stories, opportunities and events from one command center.</p><label>Email<input type="email" required value={email} onChange={e => setEmail(e.target.value)} /></label><label>Password<input type="password" required value={password} onChange={e => setPassword(e.target.value)} /></label>{error && <p className="admin-error">{error}</p>}<button className="admin-button" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button></form></main>;
}
