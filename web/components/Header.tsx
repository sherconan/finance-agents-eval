import Link from "next/link";

export function Header() {
  return (
    <header style={{ borderBottom: "1px solid var(--border)", background: "rgba(10,14,26,.85)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50 }}>
      <div className="container header-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", gap: "1rem", flexWrap: "wrap" }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: "1.05rem", whiteSpace: "nowrap" }}>
          <span className="gradient-text">Finance Agents</span>
          <span className="muted" style={{ marginLeft: 6, fontWeight: 400 }}>· Eval</span>
        </Link>
        <nav className="nav-row" style={{ display: "flex", gap: "1.25rem", fontSize: ".95rem", flexWrap: "nowrap" }}>
          <Link href="/">榜单</Link>
          <Link href="/compare">对比</Link>
          <Link href="/case">案例</Link>
          <Link href="/roi">ROI</Link>
          <Link href="/vs">VS</Link>
          <Link href="/artifacts" className="hide-on-mobile">产出</Link>
          <Link href="/faq" className="hide-on-mobile">FAQ</Link>
          <Link href="/methodology" className="hide-on-mobile">方法论</Link>
          <Link href="https://www.anthropic.com/news/finance-agents" target="_blank" rel="noopener" className="hide-on-mobile">
            官方公告 ↗
          </Link>
        </nav>
      </div>
    </header>
  );
}
