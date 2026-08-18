export function Navigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#070b12]/75 backdrop-blur-xl">
      <div className="mic-container flex h-20 items-center justify-between">
        <a href="/" className="text-xl font-bold tracking-[-0.04em]">MIC</a>
        <nav className="hidden gap-7 text-sm text-mic-muted md:flex">
          <a href="#intelligence">Intelligence</a>
          <a href="#business">Business</a>
          <a href="#finance">Finance</a>
          <a href="#technology">Technology</a>
          <a href="#opportunities">Opportunities</a>
        </nav>
        <a href="#newsletter" className="rounded-full border border-white/15 px-5 py-2 text-sm transition hover:border-mic-blue hover:text-mic-blue">Join MIC</a>
      </div>
    </header>
  );
}
