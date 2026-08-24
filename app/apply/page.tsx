import type { Metadata } from "next";
import { CommunityApplicationForm } from "@/components/community/CommunityApplicationForm";

export const metadata: Metadata = { title: "Apply to MIC — MIC Pulse", description: "Apply to connect your work with the MIC ecosystem." };
type SearchParams = Promise<{ type?: string | string[] }>;
export default async function ApplyPage({ searchParams }: { searchParams: SearchParams }) { const params = await searchParams; const raw = Array.isArray(params.type) ? params.type[0] : params.type; const type = raw === "investor" ? "investor" : "founder"; return <main className="account-shell application-shell"><div className="application-intro"><p className="eyebrow">MIC PULSE / THE COMMUNITY</p><h1>Build closer<br /><span>to the signal.</span></h1><p className="section-lede">MIC connects founders and investors to the people, opportunities, and context that can move useful work forward across Tanzania and East Africa.</p></div><CommunityApplicationForm initialType={type} /></main>; }
