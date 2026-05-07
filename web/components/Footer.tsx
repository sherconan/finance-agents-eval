export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", marginTop: "5rem", padding: "2rem 0", color: "var(--text-muted)", fontSize: ".85rem" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>独立第三方评测 · 与 Anthropic 无关 · 仅供研究使用</div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href="/changelog">Changelog</a>
          <a href="/stats">Stats</a>
          <a href="/downloads">下载</a>
          <span>评测窗口 2026-05-08 01:30 → 08:30</span>
        </div>
      </div>
    </footer>
  );
}
