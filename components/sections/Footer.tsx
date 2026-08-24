import Link from "next/link";

const columns = [
  { title: "Explore", links: [["Business", "/business"], ["Technology", "/technology"], ["Finance", "/finance"], ["Startups", "/startups"]] },
  { title: "Network", links: [["Companies", "/companies"], ["Founders", "/founders"], ["Opportunities", "/opportunities"], ["Events", "/events"], ["About MIC", "/about"]] },
  { title: "Reader", links: [["Newsletter", "/#newsletter"], ["Sign in", "/login"], ["Profile", "/profile"], ["Search", "/search"]] },
];

export function Footer() {
  return <footer className="footer"><div className="footer-inner mic-container"><div className="footer-brand"><Link href="/" className="brand-mark">MIC<span>•</span></Link><p>Motivate. Innovate. Create.</p><p>Business, technology and opportunity reporting from East Africa.</p></div><div className="footer-links">{columns.map((column) => <div key={column.title}><p className="footer-label">{column.title}</p>{column.links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>)}</div></div><div className="mic-container footer-bottom"><span>East Africa · © {new Date().getFullYear()} MIC Pulse</span><span><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><a href="mailto:hello@micpulse.co.tz">Contact</a></span></div></footer>;
}
