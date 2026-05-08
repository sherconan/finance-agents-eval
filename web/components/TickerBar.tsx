"use client";

import { useEffect, useState } from "react";

type Quote = {
  ticker: string;
  name: string;
  currency: "USD" | "CNY";
  price: number;
  change_pct: number;
  market_cap?: number;
};

export function TickerBar() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const r = await fetch("/api/quotes", { cache: "no-store" });
        const j = await r.json();
        if (mounted) setQuotes(j.quotes || []);
      } catch {}
    }
    load();
    const t = setInterval(load, 5 * 60 * 1000);
    return () => {
      mounted = false;
      clearInterval(t);
    };
  }, []);

  if (hidden || quotes.length === 0) return null;

  // Duplicate the list to make the marquee seamless when looping
  const items = [...quotes, ...quotes];

  return (
    <div
      style={{
        background: "linear-gradient(90deg, #050913 0%, #0a0e1a 30%, #0a0e1a 70%, #050913 100%)",
        borderBottom: "1px solid var(--border)",
        height: 36,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
      aria-label="实时行情条"
    >
      {/* Pulse dot + label */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          gap: ".5rem",
          padding: "0 1rem",
          background: "linear-gradient(90deg, #050913 70%, transparent)",
          zIndex: 2,
          fontSize: ".7rem",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: ".08em",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--green)",
            boxShadow: "0 0 0 3px rgba(16,185,129,.18)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
        Live
      </div>

      {/* Close button */}
      <button
        onClick={() => setHidden(true)}
        aria-label="关闭行情条"
        style={{
          position: "absolute",
          right: 8,
          top: "50%",
          transform: "translateY(-50%)",
          background: "transparent",
          border: "none",
          color: "var(--text-muted)",
          cursor: "pointer",
          fontSize: "1rem",
          padding: ".25rem .5rem",
          zIndex: 2,
        }}
      >
        ✕
      </button>

      {/* Marquee */}
      <div
        style={{
          display: "inline-flex",
          paddingLeft: 80,
          gap: "2.2rem",
          animation: "scroll-left 60s linear infinite",
          whiteSpace: "nowrap",
          fontSize: ".82rem",
          fontFamily: "ui-monospace, SFMono-Regular, monospace",
        }}
      >
        {items.map((q, i) => {
          const up = q.change_pct >= 0;
          const sym = q.currency === "USD" ? "$" : "¥";
          const capStr =
            q.market_cap && q.market_cap >= 1e12
              ? `${sym}${(q.market_cap / 1e12).toFixed(2)}T`
              : q.market_cap && q.market_cap >= 1e9
              ? `${sym}${(q.market_cap / 1e9).toFixed(1)}B`
              : "";
          return (
            <span key={`${q.ticker}-${i}`} style={{ display: "inline-flex", gap: ".5rem", alignItems: "baseline" }}>
              <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>{q.ticker}</span>
              <span style={{ color: "var(--text)", fontWeight: 600 }}>{sym}{q.price.toFixed(2)}</span>
              <span style={{ color: up ? "var(--green)" : "var(--red)" }}>
                {up ? "▲" : "▼"} {Math.abs(q.change_pct).toFixed(2)}%
              </span>
              {capStr && <span style={{ color: "var(--text-muted)", fontSize: ".75rem" }}>{capStr}</span>}
            </span>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(16,185,129,.18); }
          50% { box-shadow: 0 0 0 6px rgba(16,185,129,.06); }
        }
        @media (prefers-reduced-motion: reduce) {
          div :global([style*="animation"]) {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
