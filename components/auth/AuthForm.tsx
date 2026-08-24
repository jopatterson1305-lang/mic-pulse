"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase";

type AuthMode = "login" | "signup" | "reset";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const signup = mode === "signup";
  const reset = mode === "reset";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    try {
      const formData = new FormData(event.currentTarget);
      const submittedEmail = String(formData.get("email") ?? email).trim();
      const submittedPassword = String(formData.get("password") ?? password);
      const submittedName = String(formData.get("name") ?? name).trim();
      if (!submittedEmail) throw new Error("Enter your email address.");
      if (!reset && !submittedPassword) throw new Error("Enter your password.");
      const supabase = createClient();
      if (reset) {
        const redirectTo = `${window.location.origin}/auth/update-password`;
        const result = await supabase.auth.resetPasswordForEmail(submittedEmail, { redirectTo });
        if (result.error) throw result.error;
        setMessage("If an account matches that email, we sent a password reset link.");
        setBusy(false); return;
      }
      const result = signup ? await supabase.auth.signUp({ email: submittedEmail, password: submittedPassword, options: { data: { full_name: submittedName } } }) : await supabase.auth.signInWithPassword({ email: submittedEmail, password: submittedPassword });
      if (result.error) throw result.error;
      if (signup && !result.data.session) { setMessage("Check your email to confirm your account, then sign in."); setBusy(false); return; }
      const next = new URLSearchParams(window.location.search).get("next");
      const safeNext = next && next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/admin") ? next : "/profile";
      window.location.href = safeNext;
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Authentication could not be completed."); setBusy(false); }
  }

  return <main className="account-shell"><div className="account-auth-card liquid-glass"><p className="eyebrow">MIC PULSE / READER ACCOUNT</p><h1>{reset ? "Reset your password." : signup ? "Join the newsroom." : "Welcome back."}</h1><p className="section-lede">{reset ? "We will send a secure recovery link to your email." : signup ? "Save the stories and signals that matter to you." : "Sign in to continue your reading library."}</p><form className="account-form" method="post" action="/login" onSubmit={submit}>{signup && <label>Name<input name="name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" /></label>}<label>Email<input name="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" /></label>{!reset && <label>Password<div className="password-field"><input name="password" type={showPassword ? "text" : "password"} required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={signup ? "new-password" : "current-password"} /><button type="button" className="password-toggle" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "Hide" : "Show"}</button></div></label>}{error && <p className="form-error" role="alert">{error}</p>}{message && <p className="form-message" role="status">{message}</p>}<button className="primary-button" disabled={busy}>{busy ? "Working…" : reset ? "Send reset link" : signup ? "Create account" : "Sign in"}</button></form><p className="muted">{reset ? <><Link className="text-link" href="/login">Return to sign in</Link></> : <>{signup ? "Already have an account? " : "New to MIC Pulse? "}<Link className="text-link" href={signup ? "/login" : "/signup"}>{signup ? "Sign in" : "Create an account"}</Link>{!signup && <> · <Link className="text-link" href="/reset-password">Forgot password?</Link></>}</>}</p></div></main>;
}
