"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

type ApplicationType = "founder" | "investor";

export function CommunityApplicationForm({ initialType }: { initialType: ApplicationType }) {
  const [type, setType] = useState<ApplicationType>(initialType);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [website, setWebsite] = useState("");
  const [stage, setStage] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "busy" | "success" | "error">("idle");
  const [notice, setNotice] = useState("");
  useEffect(() => { let active = true; void createClient().auth.getUser().then(({ data }) => { if (!active) return; setUserId(data.user?.id ?? null); setEmail(data.user?.email ?? ""); setFullName(String(data.user?.user_metadata?.full_name ?? "")); }); return () => { active = false; }; }, []);
  async function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); if (!userId) { setStatus("error"); setNotice("Sign in before sending an application."); return; } setStatus("busy"); setNotice(""); const { error } = await createClient().from("community_applications").insert({ applicant_id: userId, application_type: type, full_name: fullName.trim(), email: email.trim(), organization: organization.trim() || null, website: website.trim() || null, stage: stage.trim() || null, message: message.trim() }); if (error) { setStatus("error"); setNotice(error.message); } else { setStatus("success"); setNotice("Your application is with the MIC team. We will review it and follow up by email."); setMessage(""); } }
  if (!userId) return <div className="reference-application-card glass-surface"><p className="eyebrow">MIC COMMUNITY</p><h2>Sign in to apply.</h2><p>Applications are connected to your MIC reader account so you can keep your contact details private and receive a clear response.</p><Link className="reference-primary magnetic-button" href={`/login?next=${encodeURIComponent(`/apply?type=${type}`)}`}>Sign in to continue <span>↗</span></Link></div>;
  return <form className="reference-application-card glass-surface" onSubmit={submit}><div className="reference-application-header"><div><p className="eyebrow">MIC COMMUNITY / APPLICATION</p><h2>Bring the work<br /><span>closer to the signal.</span></h2></div><label className="application-switch">I am a<select value={type} onChange={(event) => setType(event.target.value as ApplicationType)}><option value="founder">Founder</option><option value="investor">Investor</option></select></label></div><div className="account-form-grid"><label>Full name<input required minLength={2} value={fullName} onChange={(event) => setFullName(event.target.value)} autoComplete="name" /></label><label>Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" /></label><label>Organization<input value={organization} onChange={(event) => setOrganization(event.target.value)} /></label><label>Website<input type="url" value={website} onChange={(event) => setWebsite(event.target.value)} placeholder="https://" /></label><label>Stage or focus<input value={stage} onChange={(event) => setStage(event.target.value)} placeholder={type === "founder" ? "Idea, early traction, growth…" : "Sector, stage, geography…"} /></label></div><label>What are you building or looking to support?<textarea required minLength={20} rows={6} value={message} onChange={(event) => setMessage(event.target.value)} /></label>{notice && <p className={status === "error" ? "form-error" : "form-message"} role={status === "error" ? "alert" : "status"}>{notice}</p>}<button className="primary-button" disabled={status === "busy"}>{status === "busy" ? "Sending…" : status === "success" ? "Application sent" : "Send application"}</button></form>;
}
