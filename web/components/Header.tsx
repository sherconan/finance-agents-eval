import Link from "next/link";
import { CommandPalette } from "@/components/CommandPalette";
import { data } from "@/lib/data";

export function Header() {
  return (
    <header
      style={{
        borderBottom: "1px solid var(--border)",
        background: "rgba(255,255,255,.92)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 1px 3px rgba(17,24,39,.04)",
      }}
    >
      <div
        className="container header-row"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.5rem",
          gap: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        {/* Site title block */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".75rem",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #d97706 0%, #ea580c 100%)",
              color: "#fff",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: ".95rem",
              boxShadow: "0 2px 6px rgba(217,119,6,.3)",
            }}
            aria-hidden
          >
            FA
          </span>
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
            <span style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text)" }}>
              Anthropic Finance Agents
            </span>
            <span style={{ fontSize: ".75rem", color: "var(--text-muted)" }}>
              独立第三方评测 · 10 agents · 30 cases
            </span>
          </span>
        </Link>

        {/* Nav */}
        <nav
          className="nav-row"
          style={{
            display: "flex",
            gap: "1.25rem",
            fontSize: ".95rem",
            flexWrap: "nowrap",
            alignItems: "center",
          }}
        >
          <Link
            href="/results"
            style={{
              color: "var(--accent)",
              fontWeight: 600,
              padding: ".3rem .7rem",
              borderRadius: 6,
              background: "rgba(217,119,6,.08)",
              border: "1px solid rgba(217,119,6,.2)",
            }}
          >
            ★ 评测结果
          </Link>
          <Link href="/">榜单</Link>
          <Link href="/compare">对比</Link>
          <Link href="/case">案例</Link>
          <Link href="/roi">ROI</Link>
          <Link href="/duel" className="hide-on-mobile">Duel</Link>
          <Link href="/vs" className="hide-on-mobile">VS</Link>
          <Link
            href="https://www.anthropic.com/news/finance-agents"
            target="_blank"
            rel="noopener"
            className="hide-on-mobile"
            style={{ color: "var(--text-muted)" }}
          >
            官方公告 ↗
          </Link>
          <CommandPalette agents={data.results} />
        </nav>
      </div>
    </header>
  );
}
