import Link from "next/link";

export default function CasePage() {
  return (
    <div className="container" style={{ paddingTop: "2.5rem", maxWidth: 920 }}>
      <div className="tag" style={{ marginBottom: "1rem" }}>深度案例</div>
      <h1 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.6rem)", fontWeight: 800, marginBottom: ".75rem", letterSpacing: "-.01em" }}>
        当 <span className="gradient-text">Valuation Reviewer</span> 接手一个<br />
        看似漂亮但内核破碎的 DCF 模型
      </h1>
      <p className="muted" style={{ fontSize: "1.05rem", maxWidth: 720, lineHeight: 1.6, marginBottom: "2.5rem" }}>
        模型审查 agent 在 38 秒内识别出 3 个植入错误（其中 1 个数学崩溃级），
        把"投决可过"的 USD 142/股 价格修正为 USD 38/股——下调 73%。
      </p>

      {/* timeline */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.25rem" }}>📅 时间线</h2>
        <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {[
            { t: "T+0s", title: "Agent 接收 .xlsx + 任务描述", desc: "用户上传 ProjectFlux DCF 模型，请求 second-opinion review" },
            { t: "T+8s", title: "全 sheet 公式追溯完成", desc: "扫描 1,847 个公式，hard-coded cells、circular ref、broken link 标记" },
            { t: "T+15s", title: "结构化提取核心假设", desc: "WACC 9%, terminal g 11%, 5-yr FCF CAGR 35%, EV/Rev mid 12.5x" },
            { t: "T+22s", title: "🔴 数学崩溃 #1 命中", desc: "g (11%) > WACC (9%) → 终值公式分母为负，TV 计算无意义" },
            { t: "T+27s", title: "🟡 口径不一致 #2 命中", desc: "FCF 公式中 D&A 取数前后两口径——前 2 年含租赁折旧、后 3 年仅 PP&E" },
            { t: "T+34s", title: "🟡 Comp set cherry-pick #3 命中", desc: "选 CRWD/PANW/NET/ZS 给中等增长 vertical SaaS——估值过度乐观" },
            { t: "T+38s", title: "✅ 修正方案 + 量化 impact 输出", desc: "g 下调至 2.5%、统一 D&A 口径、替换 comps；implied price USD 142 → USD 38" },
          ].map((s) => (
            <li key={s.t} style={{ display: "flex", gap: "1rem", padding: "1rem 0", borderTop: "1px solid var(--border)" }}>
              <div style={{ flexShrink: 0, fontFamily: "ui-monospace, monospace", fontSize: ".85rem", color: "var(--accent)", minWidth: 56 }}>{s.t}</div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: ".25rem" }}>{s.title}</div>
                <div className="muted" style={{ fontSize: ".9rem", lineHeight: 1.55 }}>{s.desc}</div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* before/after */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.25rem" }}>⚖️ 修正前后对照</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="card" style={{ borderColor: "rgba(239,68,68,.4)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".75rem" }}>
              <div style={{ color: "var(--red)", fontWeight: 600 }}>原模型（漂亮但破碎）</div>
              <div style={{ fontSize: "1.6rem" }}>📉</div>
            </div>
            <BeforeRow k="Terminal growth" v="11.0%" highlight />
            <BeforeRow k="Implied TV" v="数学崩溃 (g>WACC)" highlight />
            <BeforeRow k="FCF (year-3 base)" v="USD 51 mm" />
            <BeforeRow k="Comps EV/Rev mid" v="12.5x (security)" />
            <BeforeRow k="Implied price (DCF)" v="USD 142" highlight big />
            <BeforeRow k="Implied price (comps)" v="USD 165" big />
          </div>
          <div className="card" style={{ borderColor: "rgba(16,185,129,.4)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".75rem" }}>
              <div style={{ color: "var(--green)", fontWeight: 600 }}>修正后（数学自洽）</div>
              <div style={{ fontSize: "1.6rem" }}>✅</div>
            </div>
            <BeforeRow k="Terminal growth" v="2.5%" />
            <BeforeRow k="Implied TV" v="USD 980 mm" />
            <BeforeRow k="FCF (year-3 base)" v="USD 47 mm" />
            <BeforeRow k="Comps EV/Rev mid" v="6.5x (vertical SaaS)" />
            <BeforeRow k="Implied price (DCF)" v="USD 38" big green />
            <BeforeRow k="Implied price (comps)" v="USD 52" big green />
          </div>
        </div>
      </section>

      {/* impact box */}
      <section className="card" style={{ marginBottom: "3rem", background: "linear-gradient(135deg, rgba(239,68,68,.08), rgba(245,158,11,.04))", borderColor: "rgba(239,68,68,.3)" }}>
        <div className="muted" style={{ fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".1em" }}>商业 impact</div>
        <div style={{ fontSize: "2.2rem", fontWeight: 800, marginTop: ".4rem", color: "var(--red)" }}>
          ↓ 73%
        </div>
        <div style={{ fontSize: "1rem", lineHeight: 1.6, color: "var(--text)" }}>
          修正后估值下降 73%。如果原模型直接进 IC 投决，组合可能以高出 4× 估值参与一笔投资。
          <strong style={{ color: "var(--accent)" }}> 38 秒的审查避免了 4× 资金风险敞口。</strong>
        </div>
      </section>

      {/* deeper learning */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.25rem" }}>🧠 这个案例告诉我们什么</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          {[
            { title: "数学错误最难被发现", body: "g > WACC 在 Excel 里不会报错——只会出一个看似合理的负数 TV 或巨大正数。人眼扫一遍 deck 不会注意。" },
            { title: "comp set bias 是隐形杀手", body: "选错 comp 集 → 整个 valuation 框架失真。Vertical SaaS 的 SMB 客户经济学和 horizontal security 完全不同。" },
            { title: "D&A 口径混用属系统性 bug", body: "IFRS 16 后租赁折旧入 D&A，多数模型都漏一致性检查。前 2 年用一套、后 3 年另一套，FCF 失真 6-8%。" },
            { title: "Agent 价值在审查不在生成", body: "Agent 把高频低增量的 audit 工作量从 4 小时压到 38 秒。analyst 的时间释放出来做更高价值的判断。" },
          ].map((c) => (
            <div key={c.title} className="card" style={{ padding: "1.1rem" }}>
              <div style={{ fontWeight: 600, marginBottom: ".5rem", color: "var(--accent)" }}>{c.title}</div>
              <div style={{ fontSize: ".9rem", lineHeight: 1.6, color: "var(--text-muted)" }}>{c.body}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Link href="/agents/valuation-reviewer" className="btn">查看完整评测 →</Link>
        <Link href="/" className="btn btn-outline">回到榜单</Link>
      </section>
    </div>
  );
}

function BeforeRow({ k, v, highlight, big, green }: { k: string; v: string; highlight?: boolean; big?: boolean; green?: boolean }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: ".55rem 0",
      borderTop: "1px solid var(--border)",
      fontSize: big ? "1rem" : ".85rem",
    }}>
      <span className="muted">{k}</span>
      <span style={{
        fontWeight: big ? 700 : 500,
        color: green ? "var(--green)" : highlight ? "var(--red)" : "var(--text)",
      }}>{v}</span>
    </div>
  );
}
