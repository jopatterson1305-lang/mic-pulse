export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(47,124,255,0.18),transparent_35%)]" />
      <div className="mic-container relative flex min-h-screen items-end pb-20 pt-32">
        <div className="max-w-5xl">
          <p className="mb-6 text-sm uppercase tracking-[0.28em] text-mic-blue">MIC Pulse</p>
          <h1 className="text-6xl font-semibold leading-[0.9] tracking-[-0.05em] md:text-8xl lg:text-[9rem]">
            THE INTELLIGENCE BEHIND EAST AFRICA&apos;S NEXT GENERATION.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-mic-muted md:text-xl">
            Business, technology, finance and opportunity intelligence for the people building East Africa&apos;s future.
          </p>
        </div>
      </div>
    </section>
  );
}
