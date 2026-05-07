import { data } from "@/lib/data";
import { AgentDuel } from "@/components/AgentDuel";

export default function DuelPage() {
  return (
    <div className="container" style={{ paddingTop: "2.5rem" }}>
      <div className="tag" style={{ marginBottom: "1rem" }}>1 vs 1</div>
      <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-.01em", marginBottom: ".75rem" }}>
        Agent <span className="gradient-text">Duel</span>
      </h1>
      <p className="muted" style={{ maxWidth: 720, lineHeight: 1.6, marginBottom: "2rem" }}>
        从 10 个 agent 中任选 2 个，4 维度逐项 PK。差距 ≥ 1 分会高亮——帮你在 IB 还是 Audit、Pitch 还是 Model 这种纠结时一锤定音。
      </p>

      <AgentDuel agents={data.results} />
    </div>
  );
}
