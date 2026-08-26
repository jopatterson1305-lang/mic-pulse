import { Reveal } from "@/components/motion/Reveal";
import { NewsletterForm } from "./NewsletterForm";

export function Newsletter() {
  return <section className="section newsletter" id="newsletter"><div className="mic-container newsletter-inner">
    <Reveal><p className="eyebrow">MIC PULSE</p><h2 className="display display-lg">Stay close to<br /><span>what's next.</span></h2><p className="section-lede">Tech. AI. Business. Markets. Opportunities. Get the context in your inbox.</p><NewsletterForm /></Reveal>
  </div></section>;
}
