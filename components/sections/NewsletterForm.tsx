"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState(""); const [status, setStatus] = useState<"idle" | "busy" | "success" | "error">("idle"); const [message, setMessage] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setStatus("busy"); setMessage(""); const response = await fetch("/api/newsletter", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email }) }); const data = await response.json(); if (!response.ok) { setStatus("error"); setMessage(data.error ?? "Unable to subscribe."); } else { setStatus("success"); setMessage(data.duplicate ? "You are already on the MIC list." : "You are on the list."); setEmail(""); } }
  return <><form className="newsletter-form" onSubmit={submit}><input aria-label="Email address" required type="email" placeholder="Your email address" value={email} onChange={event => setEmail(event.target.value)} /><button type="submit" disabled={status === "busy"}>{status === "busy" ? "Joining…" : "Join MIC ↗"}</button></form>{message && <p className={status === "error" ? "admin-error" : "admin-success"} role="status">{message}</p>}</>;
}
