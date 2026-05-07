// Live quotes endpoint — fetches NVDA + 茅台 from public APIs
// Cached 5 min via Next.js fetch cache.

import { NextResponse } from "next/server";

export const revalidate = 300; // 5 min ISR
export const dynamic = "force-dynamic";

type Quote = {
  ticker: string;
  name: string;
  exchange: string;
  currency: "USD" | "CNY";
  price: number;
  change_pct: number;
  change_abs: number;
  market_cap?: number;
  fifty_two_week_low?: number;
  fifty_two_week_high?: number;
  source: string;
  fetched_at: string;
};

async function fetchNVDA(): Promise<Quote | null> {
  try {
    const res = await fetch(
      "https://query1.finance.yahoo.com/v8/finance/chart/NVDA?range=5d&interval=1d",
      {
        headers: { "User-Agent": "Mozilla/5.0" },
        next: { revalidate: 300 },
      },
    );
    if (!res.ok) return null;
    const j = await res.json();
    const meta = j.chart?.result?.[0]?.meta;
    const closes = j.chart?.result?.[0]?.indicators?.quote?.[0]?.close ?? [];
    if (!meta) return null;
    const last = meta.regularMarketPrice;
    const prev = closes.length >= 2 ? closes[closes.length - 2] : meta.previousClose;
    const change_abs = last - prev;
    const change_pct = (change_abs / prev) * 100;
    // NVDA: ~24.4B shares post-Jun-2024 10-for-1 split (anchor for cap calc)
    const NVDA_SHARES = 24_400_000_000;
    return {
      ticker: "NVDA",
      name: "NVIDIA",
      exchange: "NASDAQ",
      currency: "USD",
      price: last,
      change_pct: Number(change_pct.toFixed(2)),
      change_abs: Number(change_abs.toFixed(2)),
      market_cap: Math.round(last * NVDA_SHARES),
      fifty_two_week_low: meta.fiftyTwoWeekLow,
      fifty_two_week_high: meta.fiftyTwoWeekHigh,
      source: "Yahoo Finance v8",
      fetched_at: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

async function fetchMoutai(): Promise<Quote | null> {
  try {
    const res = await fetch("https://qt.gtimg.cn/q=sh600519", {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const txt = await res.text();
    // v_sh600519="1~name~code~price~prevClose~open~vol~..."
    const m = txt.match(/="([^"]+)"/);
    if (!m) return null;
    const fields = m[1].split("~");
    const price = parseFloat(fields[3]);
    const prev = parseFloat(fields[4]);
    const change_abs = price - prev;
    const change_pct = (change_abs / prev) * 100;
    // Tencent format: fields[44] = 总市值 in 亿元 (e.g. 17169.25 → ¥1.717T)
    const capYi = parseFloat(fields[44]) || 0;
    const market_cap = Math.round(capYi * 1e8);
    return {
      ticker: "600519.SH",
      name: "贵州茅台",
      exchange: "Shanghai",
      currency: "CNY",
      price,
      change_pct: Number(change_pct.toFixed(2)),
      change_abs: Number(change_abs.toFixed(2)),
      market_cap: Math.round(market_cap),
      source: "Tencent qt.gtimg.cn",
      fetched_at: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const [nvda, moutai] = await Promise.all([fetchNVDA(), fetchMoutai()]);
  const quotes = [nvda, moutai].filter(Boolean) as Quote[];
  return NextResponse.json({
    quotes,
    refreshed_at: new Date().toISOString(),
  });
}
