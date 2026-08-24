import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MIC Pulse — Pre-Launch Audit",
  description: "An evidence-based pre-launch product, design, accessibility, and engineering audit of MIC Pulse.",
};

const topProblems = [
  ["01", "Core public archives are empty", "Articles, Business, Opportunities, and Events all report zero published items in production.", "Publish a minimum credible inventory or label the product as a beta/private preview."],
  ["02", "Trust links are broken", "Privacy, Terms, and Contact appear on every public page but resolve to 404 destinations.", "Create and test legal/contact routes before any external sharing."],
  ["03", "Two detail routes can crash", "Unknown event and opportunity URLs return HTTP 500 rather than a controlled not-found state.", "Align route keys with the live schema and add route-level tests."],
  ["04", "Schema contract is unstable", "Events and opportunities are queried as if they have slugs, but the live schema does not provide them.", "Generate types from production schema and fail CI on field drift."],
  ["05", "The product is visually ahead of its proof", "A high-polish editorial shell promises an active intelligence platform before the inventory supports it.", "Put live evidence near the top of the experience; reduce empty decorative surfaces."],
  ["06", "Navigation is overcrowded", "Nine persistent navigation and utility choices compete in the same top chrome.", "Reduce top-level destinations and move secondary choices into context."],
  ["07", "Glass is used on task surfaces", "Forms, applications, and admin entry points inherit the same translucent image-backed treatment as marketing panels.", "Reserve glass for navigation, hero context, and transient overlays; use stable opaque form surfaces."],
  ["08", "Search states are too vague", "No match, no inventory, and service failure are not clearly differentiated.", "Create distinct search states with recovery paths and content-type context."],
  ["09", "Reader workflows are not proven", "Protected redirects work, but a complete authenticated save/profile/application journey was not validated end-to-end.", "Add browser tests for signup, login, save, profile, notifications, application, and logout."],
  ["10", "Footer density amplifies the failure", "The footer repeats navigation and places broken legal links in the most trust-sensitive area.", "Reduce the footer to working, high-value destinations only."],
] as const;

const p0 = [
  ["Broken legal routes", "Launch trust failure", "Create and test Privacy, Terms, and Contact destinations."],
  ["Slug-driven 500 errors", "Malformed or shared Event and Opportunity links produce a server failure", "Use stable slugs or ID-based routes, then update helpers, cards, metadata, search, and tests together."],
  ["Empty editorial core", "The product promise is visibly unfulfilled", "Publish real inventory or present the site explicitly as beta/private preview."],
  ["Raw data exceptions", "Users receive generic runtime failure instead of recovery", "Add route-level error boundaries and safe not-found/error mapping."],
  ["Schema drift", "Production regressions recur when code assumes columns that do not exist", "Validate generated Supabase types against the live schema in CI."],
] as const;

const p1 = [
  ["Internal CMS empty copy", "It makes a public product look unfinished", "Replace editor-facing language with useful visitor next actions."],
  ["Unverified authentication journey", "Account reliability is unknown", "Automate signup, confirmation, login, save, profile, avatar, notifications, applications, and logout."],
  ["Incomplete dialog accessibility", "Keyboard users can lose context in search", "Trap focus, return focus to the trigger, and test Tab/Shift+Tab/Escape."],
  ["Glass behind forms", "Contrast and trust are fragile on busy images", "Use opaque surfaces and stronger field/focus states."],
  ["Invisible policy boundaries", "Signup and application expectations are under-explained", "State password rules, confirmation behavior, privacy, and next step before submission."],
] as const;

const pageReviews = [
  ["Home", "Strongest visual page. It is also too campaign-led: image, motion, and stacked calls-to-action arrive before proof that the platform is active."],
  ["Business + Articles", "Good editorial framing, but zero published content turns each route into an expensive empty state."],
  ["Opportunities + Events", "The purpose is easy to understand. Public empty copy leaks internal CMS language, and detail architecture is not production-safe."],
  ["Search", "The direct query works, but the zero-result state does not differentiate no matches from no inventory."],
  ["Login + Signup", "Recognizable forms with labels and recovery links; image-backed glass undermines task focus and the onboarding explanation is too thin."],
  ["Profile + Library", "Unauthenticated protection works. Authenticated profile, saves, notifications, and upload flows need full real-user validation."],
  ["Applications", "Account-gating is sensible. The visual gate is low-contrast and looks like a marketing panel rather than a high-trust form workflow."],
  ["Admin", "Server-side route protection works. The authenticated CMS journey, role behaviors, publishing, and failure states remain unverified."],
  ["Directories", "The company, startup, and founder shells render, but they need real inventory and a stronger taxonomy before they can operate as serious discovery tools."],
  ["Footer", "Over-dense, repetitive, and currently the source of three global 404s."],
] as const;

const references = [
  ["Production deployment", "https://mic-pulse-q5lkd7p6m-mic-4614.vercel.app/"],
  ["Audited repository commit", "https://github.com/jopatterson1305-lang/mic-pulse/tree/82d0075"],
  ["Content query helpers", "https://github.com/jopatterson1305-lang/mic-pulse/blob/82d0075/lib/content.ts"],
  ["Global header and search overlay", "https://github.com/jopatterson1305-lang/mic-pulse/blob/82d0075/components/site/GlobalHeader.tsx"],
  ["Shared footer", "https://github.com/jopatterson1305-lang/mic-pulse/blob/82d0075/components/sections/Footer.tsx"],
] as const;

function SeverityList({ title, items, level }: { title: string; items: readonly (readonly [string, string, string])[]; level: "p0" | "p1" }) {
  return <section className={`audit-priority-section audit-priority-${level}`}>
    <div className="audit-section-kicker"><span>{level.toUpperCase()}</span><p>{title}</p></div>
    <div className="audit-priority-list">
      {items.map(([problem, why, fix], index) => <article className="audit-priority-card" key={problem}>
        <span className="audit-priority-index">{String(index + 1).padStart(2, "0")}</span>
        <div><h3>{problem}</h3><p><strong>Why it matters:</strong> {why}</p><p><strong>Exact fix:</strong> {fix}</p></div>
      </article>)}
    </div>
  </section>;
}

export default function AuditPage() {
  return <main className="audit-site" id="top">
    <header className="audit-topbar">
      <a className="audit-wordmark" href="#top" aria-label="Return to audit start"><span>MIC</span> PRE-LAUNCH AUDIT</a>
      <a className="audit-topbar-link" href="#fixes">View prioritized fixes <span aria-hidden="true">↓</span></a>
    </header>

    <section className="audit-hero">
      <div className="audit-gridline" aria-hidden="true" />
      <div className="audit-hero-copy">
        <p className="audit-eyebrow">INDEPENDENT PRODUCT REVIEW / AUGUST 2026</p>
        <h1>The website is<br /><em>beautifully unfinished.</em></h1>
        <p className="audit-hero-lede">An evidence-based pre-launch audit of MIC Pulse across product, design, accessibility, engineering, content, and production behavior.</p>
      </div>
      <aside className="audit-score-card" aria-label="Overall audit score">
        <p>PRE-LAUNCH SCORE</p>
        <strong>47<span>/100</span></strong>
        <div className="audit-score-rule" />
        <p className="audit-score-caption">Strong visual ambition. Weak launch proof.</p>
      </aside>
      <div className="audit-hero-meta">
        <span>MIC PULSE</span><span>PRODUCTION REVIEW</span><span>PUBLIC SHARE EDITION</span>
      </div>
    </section>

    <div className="audit-layout">
      <aside className="audit-side-nav" aria-label="Audit sections">
        <p>REPORT INDEX</p>
        <a href="#verdict">01 / Verdict</a>
        <a href="#problems">02 / Top 10</a>
        <a href="#critical">03 / Critical bugs</a>
        <a href="#experience">04 / Experience</a>
        <a href="#design">05 / Design system</a>
        <a href="#working">06 / What works</a>
        <a href="#pages">07 / Page review</a>
        <a href="#technical">08 / Technical audit</a>
        <a href="#fixes">09 / Fix list</a>
      </aside>

      <div className="audit-report">
        <section id="verdict" className="audit-section audit-verdict">
          <p className="audit-eyebrow">01 / BRUTAL OVERALL VERDICT</p>
          <h2>This is a high-end shell around a product that is not yet ready to be believed.</h2>
          <div className="audit-verdict-columns">
            <p>MIC Pulse has real visual direction: its blue palette, regional anchor, display typography, and hero art direction are deliberate. The problem is that the experience claims operational maturity before the underlying product proves it.</p>
            <p>Core public archives are empty. Trust links are broken. Two content detail patterns can produce server errors. The route and schema contract is inconsistent. The visual system is doing more work than the content, reliability, and trust layers underneath it.</p>
          </div>
          <blockquote>“The site is visually ahead of its operational truth.”</blockquote>
          <div className="audit-score-grid">
            {[['Brand identity','72'],['Visual art direction','70'],['Content readiness','20'],['UX clarity','51'],['Accessibility','48'],['Functional reliability','38'],['Production readiness','32']].map(([label, score]) => <div key={label}><span>{label}</span><strong>{score}</strong><i style={{ width: `${score}%` }} /></div>)}
          </div>
        </section>

        <section id="problems" className="audit-section">
          <p className="audit-eyebrow">02 / TOP 10 PROBLEMS</p>
          <h2>Where MIC Pulse will lose credibility first.</h2>
          <div className="audit-problem-list">
            {topProblems.map(([number, title, why, fix]) => <article className="audit-problem" key={number}>
              <span>{number}</span><div><h3>{title}</h3><p>{why}</p><p className="audit-exact-fix"><b>Exact fix</b>{fix}</p></div>
            </article>)}
          </div>
        </section>

        <section id="critical" className="audit-section audit-critical">
          <p className="audit-eyebrow">03 / CRITICAL BUGS</p>
          <h2>These are not polish issues.</h2>
          <div className="audit-critical-grid">
            <article><span>HTTP 404</span><h3>Privacy, Terms, and Contact are exposed globally but do not exist.</h3><p>Every public footer renders these destinations. Broken trust infrastructure is a pre-launch failure.</p></article>
            <article><span>HTTP 500</span><h3>Event and Opportunity detail links are not aligned with the live database shape.</h3><p>Unknown slugs crash instead of returning a controlled not-found experience.</p></article>
            <article><span>00 PUBLISHED</span><h3>The central product inventory is visibly empty.</h3><p>Editorial, business, opportunity, and event routes currently prove absence rather than utility.</p></article>
          </div>
        </section>

        <section id="experience" className="audit-section audit-split-section">
          <div><p className="audit-eyebrow">04 / MAJOR UX PROBLEMS</p><h2>Too many paths. Not enough proof.</h2></div>
          <div className="audit-prose"><p>The home experience asks a visitor to choose among exploration, search, applications, newsletter, sections, and directories before showing enough live material to justify those paths. The global navigation compresses a sitemap into a luxury glass bar.</p><p>Search works, but its states are vague. The account and application gates are sensible, yet their visual language resembles marketing more than a high-trust workflow. Empty-state copy repeatedly exposes MIC Admin, which is an internal implementation detail rather than a visitor benefit.</p></div>
        </section>

        <section id="design" className="audit-section">
          <p className="audit-eyebrow">05 / DESIGN SYSTEM REVIEW</p>
          <h2>Liquid Glass: convincing in moments, overused in workflows.</h2>
          <div className="audit-design-grid">
            <article><span>TYPE</span><h3>Editorial display type is doing too much.</h3><p>Oversized display headlines are used for home, archives, forms, recovery, applications, and admin. The signature becomes noise when every page shouts with equal intensity.</p></article>
            <article><span>SPACE</span><h3>Whitespace becomes evidence of missing inventory.</h3><p>The large archive frames look premium only when they contain real content. With zero records, they read as expensive emptiness.</p></article>
            <article><span>GLASS</span><h3>Forms should not compete with photography.</h3><p>Image-backed translucent forms are less readable and less trustworthy than opaque task surfaces. Glass works best in the header, hero panel, and search overlay.</p></article>
            <article><span>MOTION</span><h3>Motion cannot manufacture product depth.</h3><p>GSAP, Lenis, magnetic controls, and reveal effects need strict reduced-motion gates and should recede until core content and reliability exist.</p></article>
            <article><span>MOBILE</span><h3>Media queries are not a mobile quality guarantee.</h3><p>The floating header, search panel, event timeline, footer, applications, and profile workspace need actual 320–390px testing with long content and 44px touch targets.</p></article>
            <article><span>ACCESSIBILITY</span><h3>Helpful foundations, incomplete keyboard journey.</h3><p>Labels, an accessible search trigger, Escape handling, and some pressed states exist. Explicit focus trapping, focus return, image-safe contrast, and visible focus rings still need proof.</p></article>
          </div>
        </section>

        <section id="working" className="audit-section audit-working">
          <p className="audit-eyebrow">06 / WHAT ACTUALLY LOOKS GOOD</p>
          <h2>The potential is real. That is why the gap matters.</h2>
          <div className="audit-working-grid">
            <article><span>IDENTITY</span><h3>MIC is more coherent than a generic startup template.</h3><p>“Motivate · Innovate · Create” is legible, the blue-only palette is disciplined, and the Dar es Salaam night image gives the platform a distinctive regional anchor.</p></article>
            <article><span>HERO + SEARCH</span><h3>Two interaction patterns have genuine art direction.</h3><p>The home hero has a deliberate composition. The search overlay opens, focuses the query input, locks scroll, and closes on Escape.</p></article>
            <article><span>SECURITY BOUNDARY</span><h3>Unauthenticated protected-route handling is sound.</h3><p>Profile and Admin routes redirect on the server rather than leaking protected pages. That is foundational engineering worth retaining.</p></article>
          </div>
        </section>

        <section id="pages" className="audit-section">
          <p className="audit-eyebrow">07 / PAGE-BY-PAGE CRITICISM</p>
          <h2>What each surface is actually communicating.</h2>
          <div className="audit-page-grid">
            {pageReviews.map(([name, assessment], index) => <article key={name}><span>{String(index + 1).padStart(2, "0")}</span><h3>{name}</h3><p>{assessment}</p></article>)}
          </div>
        </section>

        <section id="technical" className="audit-section audit-technical">
          <p className="audit-eyebrow">08 / TECHNICAL & ACCESSIBILITY AUDIT</p>
          <h2>The compilation is healthy. The product contract is not.</h2>
          <div className="audit-technical-table" role="table" aria-label="Technical audit findings">
            <div role="row" className="audit-table-head"><span role="columnheader">Area</span><span role="columnheader">Finding</span><span role="columnheader">Risk</span></div>
            {[
              ["Data contract", "Events and opportunities are coded as slug routes although live tables do not expose slug columns.", "Server errors and broken deep links."],
              ["Route protection", "Unauthenticated Profile and Admin routes redirect server-side as expected.", "Good foundation; authenticated behavior still requires proof."],
              ["Testing", "No repository test suite covers auth, saves, RLS, profile, applications, or route failures.", "Regression risk is high."],
              ["Dialog accessibility", "Search supports Escape and input focus, but focus trapping/return are not explicitly handled.", "Keyboard users can lose context."],
              ["Responsive design", "Breakpoints exist, but the dense nav, footer, timeline, and long forms require real 320–390px testing.", "Mobile usability remains unproven."],
              ["Performance", "The visual system is motion-heavy; compile success is not a substitute for mobile LCP, INP, and CLS measurement.", "Premium feel may degrade on real networks."],
            ].map(([area, finding, risk]) => <div role="row" key={area}><span role="cell">{area}</span><span role="cell">{finding}</span><span role="cell">{risk}</span></div>)}
          </div>
        </section>

        <section id="fixes" className="audit-section audit-fix-list">
          <p className="audit-eyebrow">09 / EXACT FIX LIST</p>
          <h2>Fix the truth layer before touching another animation.</h2>
          <SeverityList title="Fix immediately" level="p0" items={p0} />
          <SeverityList title="Fix before launch" level="p1" items={p1} />
          <section className="audit-next-steps">
            <div><span>P2</span><h3>Improve soon</h3><p>Reduce navigation load, clarify Markets versus Finance, remove decorative interludes, differentiate search states, and make account navigation feel like one workspace.</p></div>
            <div><span>P3</span><h3>Nice to have</h3><p>Add analytics for dead-end searches, content filters only when inventory merits them, and visual regression checks at mobile, tablet, and desktop widths.</p></div>
          </section>
        </section>

        <section className="audit-section audit-conclusion">
          <p className="audit-eyebrow">FINAL RECOMMENDATION</p>
          <h2>Do not redesign. Stabilize.</h2>
          <p>MIC Pulse does not need more glass, more sections, or more motion. It needs working trust links, schema-safe routes, verified authentication, a minimum real content inventory, deliberate error states, and a genuine mobile/accessibility pass. Once those exist, the visual ambition will have something credible underneath it.</p>
        </section>

        <footer className="audit-footer">
          <div><span>MIC</span><p>Pre-launch audit<br />Public share edition</p></div>
          <div><p>Evidence reviewed</p>{references.map(([label, href], index) => <a href={href} key={href} target="_blank" rel="noreferrer">{String(index + 1).padStart(2, "0")} / {label} <span>↗</span></a>)}</div>
        </footer>
      </div>
    </div>
  </main>;
}
