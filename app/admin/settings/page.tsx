import { requireAdmin } from "@/lib/auth";

export default async function SettingsAdminPage() {
  const admin = await requireAdmin();
  if (!admin) return <main className="admin-shell"><div className="admin-card"><h1>Admin access required</h1><p>Only administrators can change system settings.</p></div></main>; return <main className="admin-shell"><header className="admin-header"><div><p className="eyebrow">SYSTEM / SETTINGS</p><h1>Settings</h1><p>Operational configuration for the MIC Pulse publishing system.</p></div></header><section className="admin-card"><h2>Environment</h2><p>Supabase connection is controlled by deployment environment variables. Service-role credentials are intentionally not accepted by the browser application.</p><h2>Security model</h2><p>Admin and editor permissions are enforced by Supabase RLS. Editors manage content but cannot manage users or system configuration.</p></section></main>; }
