"use client";

import { useEffect, useState } from "react";

type Quote = {
  ticker: string;
  name: string;
  exchange: string;
  currency: "USD" | "CNY";
  price: number;
  change_pct: number;
  change_abs: number;
  market_cap?: number;
};

export function LiveTicker() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [refreshedAt, setRefreshedAt] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const r = await fetch("/api/quotes", { cache: "no-store" });
        const j = await r.json();
        if (!mounted) return;
        setQuotes(j.quotes || []);
        setRefreshedAt(j.refreshed_at);
        setLoading(false);
      } catch {
        if (mounted) setLoading(false);
      }
    }
    load();
    const t = setInterval(load, 5 * 60 * 1000);
    return () => {
      mounted = false;
      clearInterval(t);
    };
  }, []);

  const fmtCap = (cap: number, cur: "USD" | "CNY") => {
    const sym = cur === "USD" ? "$" : "¥";
    if (cap >= 1e12) return `${sym}${(cap / 1e12).toFixed(2)}T`;
    if (cap >= 1e9) return `${sym}${(cap / 1e9).toFixed(2)}B`;
    return `${sym}${cap.toLocaleString()}`;
  };

  return (
    <div
      className="card"
      style={{
        padding: "1rem 1.25rem",
        background: "linear-gradient(135deg, rgba(16,185,129,.06), rgba(245,158,11,.04))",
        borderColor: "rgba(16,185,129,.3)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".75rem", flexWrap: "wrap", gap: ".5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: loading ? "#94a3b8" : "var(--green)",
              boxShadow: loading ? "none" : "0 0 0 4px rgba(16,185,129,.2)",
            }}
          />
          <span style={{ fontSize: ".85rem", fontWeight: 600 }}>实时市场数据</span>
          <span className="muted" style={{ fontSize: ".75rem" }}>
            {refreshedAt ? `· ${new Date(refreshedAt).toLocaleTimeString("zh-CN")}` : "· 加载中"}
          </span>
        </div>
        <span className="muted" style={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: ".05em" }}>
          5min cache · Yahoo + Tencent
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: ".9rem" }}>
        {loading && [1, 2, 3, 4, 5, 6].map((k) => (
          <div key={k} style={{ height: 78, background: "var(--bg-elev)", borderRadius: 8, opacity: .5 }} />
        ))}
        {quotes.map((q) => {
          const isUp = q.change_pct >= 0;
          const sym = q.currency === "USD" ? "$" : "¥";
          return (
            <div key={q.ticker} style={{ borderLeft: `3px solid ${isUp ? "var(--green)" : "var(--red)"}`, paddingLeft: ".8rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: 600 }}>{q.name}</span>
                <span className="muted" style={{ fontSize: ".75rem", fontFamily: "ui-monospace, monospace" }}>{q.ticker}</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: ".75rem", marginTop: ".25rem" }}>
                <span style={{ fontSize: "1.4rem", fontWeight: 700 }}>{sym}{q.price.toFixed(2)}</span>
                <span style={{ fontSize: ".9rem", fontWeight: 600, color: isUp ? "var(--green)" : "var(--red)" }}>
                  {isUp ? "▲" : "▼"} {q.change_pct.toFixed(2)}% ({isUp ? "+" : ""}{q.change_abs.toFixed(2)})
                </span>
              </div>
              {q.market_cap && (
                <div className="muted" style={{ fontSize: ".75rem", marginTop: ".25rem" }}>
                  市值 {fmtCap(q.market_cap, q.currency)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="muted" style={{ fontSize: ".75rem", marginTop: ".75rem", lineHeight: 1.5 }}>
        本评测引用的真实数据锚点。Anthropic finance agents 的 connector 接入 FactSet/Bloomberg/LSEG 后，可获得机构级数据流——本站这里只是公开 API 演示。
      </div>
    </div>
  );
}
