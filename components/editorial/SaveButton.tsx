"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { getContentEngagement, toggleContentEngagement, type SavedContentType } from "@/lib/reader";

export function SaveButton({ contentType, contentId }: { contentType: SavedContentType; contentId: string }) {
  const [saved, setSaved] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => { let active = true; void createClient().auth.getUser().then(({ data }) => { if (!active) return; setSignedIn(Boolean(data.user)); if (data.user) void getContentEngagement(contentType, contentId).then((state) => active && setSaved(state.saved)).catch(() => undefined); }); return () => { active = false; }; }, [contentId, contentType]);
  async function toggle() {
    if (!signedIn) { setNotice("Sign in to save this to your library."); return; }
    const next = !saved; setSaved(next); setNotice("");
    try { await toggleContentEngagement(contentType, contentId, "save", next); setNotice(next ? "Saved." : "Removed."); } catch { setSaved(!next); setNotice("That action could not be completed."); }
  }
  return <span className="save-control"><button type="button" className={`engagement-button ${saved ? "active" : ""}`} onClick={() => void toggle()} aria-pressed={saved}>{saved ? "Saved" : "Save"}</button>{notice && <span className="sr-only" role="status">{notice}</span>}</span>;
}
