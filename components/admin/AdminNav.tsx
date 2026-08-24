import Link from "next/link";

const links = [["Overview", "/admin"], ["Articles", "/admin/articles"], ["Opportunities", "/admin/opportunities"], ["Events", "/admin/events"], ["Companies", "/admin/companies"], ["Startups", "/admin/startups"], ["Founders", "/admin/founders"], ["Community", "/admin/community"], ["Applications", "/admin/applications"], ["Market", "/admin/market"], ["Media", "/admin/media"], ["Newsletter", "/admin/newsletter"], ["Pages", "/admin/pages"], ["Users", "/admin/users"], ["Settings", "/admin/settings"]] as const;

export function AdminNav() {
  return <aside className="admin-nav"><Link className="brand-mark" href="/">MIC<span>•</span></Link><nav aria-label="Admin navigation">{links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav></aside>;
}
