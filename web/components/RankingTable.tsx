import Link from "next/link";
import type { Agent } from "@/lib/data";

export function RankingTable({ agents }: { agents: Agent[] }) {
  return (
    <div className="card" style={{ overflow: "auto", padding: 0 }}>
      <table className="ranking">
        <thead>
          <tr>
            <th style={{ width: 60 }}>#</th>
            <th>Agent</th>
            <th>类别</th>
            <th>总分</th>
            <th>完成度</th>
            <th>专业度</th>
            <th>准确性</th>
            <th>易用性</th>
            <th>耗时</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((a) => (
            <tr key={a.slug}>
              <td style={{ fontSize: "1.1rem", fontWeight: 700, color: a.rank <= 3 ? "var(--accent)" : "var(--text-muted)" }}>
                {a.rank === 1 ? "🥇" : a.rank === 2 ? "🥈" : a.rank === 3 ? "🥉" : a.rank}
              </td>
              <td>
                <Link href={`/agents/${a.slug}`} style={{ display: "flex", alignItems: "center", gap: ".6rem", fontWeight: 500 }}>
                  <span style={{ fontSize: "1.3rem" }}>{a.icon}</span>
                  <span>{a.name}</span>
                </Link>
              </td>
              <td>
                <span className={a.category === "research" ? "tag tag-research" : "tag tag-ops"}>
                  {a.category === "research" ? "研究 / 覆盖" : "财务 / 运营"}
                </span>
              </td>
              <td style={{ fontWeight: 700, color: "var(--accent)" }}>{a.total.toFixed(2)}</td>
              <td>{a.completeness.toFixed(1)}</td>
              <td>{a.professionalism.toFixed(1)}</td>
              <td>{a.accuracy.toFixed(1)}</td>
              <td>{a.usability.toFixed(1)}</td>
              <td className="muted">{a.speed_sec}s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
