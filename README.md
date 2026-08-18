# MIC Pulse

MIC Pulse is an East African business, technology, finance and opportunity intelligence platform.

## Product direction

**THE INTELLIGENCE BEHIND EAST AFRICA'S NEXT GENERATION.**

MIC helps people building East Africa understand the businesses, markets, technology, founders and opportunities shaping the region.

## Stack

- Next.js + React + TypeScript
- Tailwind CSS
- GSAP / ScrollTrigger-ready motion architecture
- Lenis-ready smooth scrolling
- React Three Fiber / Three.js for selective high-value 3D
- Lucide React

## Design references

The project uses implementation patterns inspired by these open-source ecosystems. They should be adapted to MIC rather than copied wholesale:

- React Bits — https://github.com/DavidHDev/react-bits
- Magic UI — https://github.com/magicuidesign/magicui
- Motion Primitives — https://github.com/itsjwill/motion-primitives-website
- Aceternity UI — https://github.com/aceternity-ui/ui

## Design principles

Deep navy / near-black, electric blue, editorial typography, strong hierarchy, generous whitespace, purposeful motion and data-driven visual storytelling.

Avoid generic AI SaaS aesthetics, excessive glassmorphism, purple gradients, random 3D and animation without purpose.

## Current structure

```text
app/
components/
  ui/
  motion/
  hero/
  sections/
lib/
public/
styles/
MIC-PREMIUM-WEB-SKILL/
```

## Development

Install dependencies with `npm install`, then use `npm run dev` for local development. Before production deployment, run the production build and verify responsive, accessibility and reduced-motion behavior.
