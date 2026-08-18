import { Reveal } from "@/components/motion/Reveal";

export function Newsletter() {
  return <section className="section newsletter" id="newsletter"><div className="mic-container newsletter-inner">
    <Reveal><p className="eyebrow">08 / MIC PULSE</p><h2 className="display display-lg">Stay close to<br /><span>what's next.</span></h2><p className="section-lede">Tech. AI. Business. Finance. Opportunities. Get the signal in your inbox.</p><form className="newsletter-form"><input aria-label="Email address" type="email" placeholder="Your email address" /><button type="submit">Join MIC ↗</button></form></Reveal>
  </div></section>;
}
