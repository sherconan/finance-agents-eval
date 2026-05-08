// Live quotes endpoint — fetches 5 US AI/tech megacaps + Kweichow Moutai (A-share).
// Cached 5 min via Next.js fetch cache.

import { NextResponse } from "next/server";

export const revalidate = 300;
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

// Shares outstanding (rough, post-recent splits/buybacks) for cap derivation
const US_TICKERS: Array<{ ticker: string; name: string; shares: number }> = [
  { ticker: "NVDA",  name: "NVIDIA",   shares: 24.4e9 },   // post-Jun-2024 10:1 split
  { ticker: "AAPL",  name: "Apple",    shares: 14.94e9 },
  { ticker: "MSFT",  name: "Microsoft", shares: 7.43e9 },
  { ticker: "GOOGL", name: "Alphabet",  shares: 12.30e9 },
  { ticker: "META",  name: "Meta",      shares: 2.52e9 },
];

async function fetchYahoo(t: { ticker: string; name: string; shares: number }): Promise<Quote | null> {
  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${t.ticker}?range=5d&interval=1d`,
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
    const last = meta.regularMarketPrice as number;
    const prev = (closes.length >= 2 && closes[closes.length - 2]) ? closes[closes.length - 2] : meta.previousClose;
    const change_abs = last - prev;
    const change_pct = (change_abs / prev) * 100;
    return {
      ticker: t.ticker,
      name: t.name,
      exchange: "NASDAQ",
      currency: "USD",
      price: last,
      change_pct: Number(change_pct.toFixed(2)),
      change_abs: Number(change_abs.toFixed(2)),
      market_cap: Math.round(last * t.shares),
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
    const m = txt.match(/="([^"]+)"/);
    if (!m) return null;
    const fields = m[1].split("~");
    const price = parseFloat(fields[3]);
    const prev = parseFloat(fields[4]);
    const change_abs = price - prev;
    const change_pct = (change_abs / prev) * 100;
    // fields[44] = 总市值 in 亿元
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
      market_cap,
      source: "Tencent qt.gtimg.cn",
      fetched_at: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const all = await Promise.all([
    ...US_TICKERS.map((t) => fetchYahoo(t)),
    fetchMoutai(),
  ]);
  const quotes = all.filter(Boolean) as Quote[];
  return NextResponse.json(
    {
      quotes,
      refreshed_at: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=120, s-maxage=300",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
