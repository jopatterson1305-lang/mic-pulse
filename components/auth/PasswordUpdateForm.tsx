"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase";

export function PasswordUpdateForm() {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  async function submit(event: FormEvent) { event.preventDefault(); setError(""); setMessage(""); if (password.length < 8 || password !== confirmation) { setError(password !== confirmation ? "Passwords do not match." : "Use at least 8 characters."); return; } setBusy(true); const { error: updateError } = await createClient().auth.updateUser({ password }); if (updateError) setError(updateError.message); else { setMessage("Your password has been updated. You can return to your account."); setPassword(""); setConfirmation(""); } setBusy(false); }
  return <main className="account-shell"><div className="account-auth-card liquid-glass"><p className="eyebrow">MIC PULSE / ACCOUNT SECURITY</p><h1>Choose a new password.</h1><p className="section-lede">Use a strong password you do not reuse elsewhere.</p><form className="account-form" onSubmit={submit}><label>New password<input type="password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" /></label><label>Confirm password<input type="password" required minLength={8} value={confirmation} onChange={(event) => setConfirmation(event.target.value)} autoComplete="new-password" /></label>{error && <p className="form-error" role="alert">{error}</p>}{message && <p className="form-message" role="status">{message}</p>}<button className="primary-button" disabled={busy}>{busy ? "Updating…" : "Update password"}</button></form><p className="muted"><Link className="text-link" href="/profile">Open your account ↗</Link></p></div></main>;
}
