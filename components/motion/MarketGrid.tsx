"use client";

export function MarketGrid() {
  return (
    <div className="market-grid" aria-hidden="true">
      {Array.from({ length: 42 }).map((_, i) => <span key={i} style={{ animationDelay: `${(i % 7) * 90}ms` }} />)}
    </div>
  );
}
