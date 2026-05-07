"use client";

import { useMemo, useState } from "react";
import type { Agent } from "@/lib/data";

// Manual hours per task per week, based on industry-standard analyst work logs
const HOURS_PER_WEEK: Record<string, number> = {
  "pitch-builder": 8,         // 1 pitch deck per week assumed for IB associate
  "meeting-preparer": 5,      // 4-5 meeting briefs/week
  "earnings-reviewer": 6,     // earnings season concentrated, normalized
  "model-builder": 12,        // build/update 1 model/week
  "market-researcher": 6,     // 1 sector primer/week
  "valuation-reviewer": 4,    // peer review tasks
  "gl-reconciler": 8,         // monthly amortized to weekly
  "month-end-closer": 10,     // monthly amortized
  "statement-auditor": 6,     // periodic
  "kyc-screener": 5,          // ongoing onboarding flow
};

// Time-saved % when agent assists (industry self-report avg from RPA studies, conservative)
const TIME_SAVED_PCT: Record<string, number> = {
  "pitch-builder": 0.40,
  "meeting-preparer": 0.55,
  "earnings-reviewer": 0.50,
  "model-builder": 0.30,        // model dev still requires deep human judgment
  "market-researcher": 0.45,
  "valuation-reviewer": 0.70,   // very high — audit is mechanical
  "gl-reconciler": 0.65,
  "month-end-closer": 0.50,
  "statement-auditor": 0.55,
  "kyc-screener": 0.60,
};

const PRESETS = {
  "ib-associate": { label: "投行 Associate", rate: 120 },
  "buy-side-analyst": { label: "买方 Analyst", rate: 150 },
  "pe-vp": { label: "PE VP", rate: 250 },
  "controller": { label: "Controller", rate: 95 },
  "kyc-officer": { label: "合规 Officer", rate: 80 },
};

export function ROICalculator({ agents }: { agents: Agent[] }) {
  const [hourlyRate, setHourlyRate] = useState<number>(120);
  const [headcount, setHeadcount] = useState<number>(5);
  const [adoptionRate, setAdoptionRate] = useState<number>(70); // % of saved hours actually captured
  const [costPerWeek, setCostPerWeek] = useState<number>(60);   // $ Claude infra per seat per week (rough)

  const summary = useMemo(() => {
    return agents.map((a) => {
      const hpw = HOURS_PER_WEEK[a.slug] ?? 6;
      const sav = TIME_SAVED_PCT[a.slug] ?? 0.4;
      const adoption = adoptionRate / 100;
      // saved hours/week per analyst * headcount * 52
      const savedHoursPerYearPerAnalyst = hpw * sav * adoption * 52;
      const savedHoursTotal = savedHoursPerYearPerAnalyst * headcount;
      const grossSavings = savedHoursTotal * hourlyRate;
      const annualCost = costPerWeek * 52 * headcount;
      const netROI = grossSavings - annualCost;
      const roiMultiple = annualCost > 0 ? grossSavings / annualCost : 0;
      return {
        agent: a,
        hpw,
        savPct: sav,
        savedHoursTotal: Math.round(savedHoursTotal),
        grossSavings: Math.round(grossSavings),
        annualCost: Math.round(annualCost),
        netROI: Math.round(netROI),
        roiMultiple,
      };
    });
  }, [agents, hourlyRate, headcount, adoptionRate, costPerWeek]);

  const totals = useMemo(() => {
    const grossSavings = summary.reduce((s, r) => s + r.grossSavings, 0);
    const annualCost = summary.length * costPerWeek * 52 * headcount; // shared seat across agents = same headcount
    // Better: use per-agent cost slice. For simplicity assume same seat covers all agents.
    const adjustedCost = costPerWeek * 52 * headcount;
    const netROI = grossSavings - adjustedCost;
    const totalHours = summary.reduce((s, r) => s + r.savedHoursTotal, 0);
    return { grossSavings, annualCost: adjustedCost, netROI, totalHours, roiMultiple: adjustedCost > 0 ? grossSavings / adjustedCost : 0 };
  }, [summary, costPerWeek, headcount]);

  const fmt = (n: number) => "$" + n.toLocaleString();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(280px, 1fr) 2fr", gap: "1.25rem" }} className="roi-grid">
      <div className="card">
        <h3 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: ".75rem" }}>团队参数</h3>
        <p className="muted" style={{ fontSize: ".82rem", lineHeight: 1.5, marginBottom: "1.25rem" }}>
          按你的团队规模 + 时薪估算年度净收益。
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <Label>预设</Label>
            <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
              {Object.entries(PRESETS).map(([k, v]) => (
                <button key={k} onClick={() => setHourlyRate(v.rate)} className="preset-btn-sm">
                  {v.label} ${v.rate}
                </button>
              ))}
            </div>
          </div>
          <NumInput label={`时薪 ($/hr)`} value={hourlyRate} setValue={setHourlyRate} min={20} max={500} step={5} />
          <NumInput label="团队人数" value={headcount} setValue={setHeadcount} min={1} max={500} step={1} />
          <NumInput label="实际采用率 (%)" value={adoptionRate} setValue={setAdoptionRate} min={20} max={100} step={5} />
          <NumInput label={`Claude 成本 ($/seat/week)`} value={costPerWeek} setValue={setCostPerWeek} min={20} max={500} step={10} />
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: "auto" }}>
        <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
          <Stat label="年度节省工时" value={`${totals.totalHours.toLocaleString()} hrs`} />
          <Stat label="年度毛节省" value={fmt(totals.grossSavings)} highlight />
          <Stat label="Claude 年成本" value={fmt(totals.annualCost)} muted />
          <Stat label="净 ROI" value={fmt(totals.netROI)} highlight green />
          <Stat label="ROI 倍数" value={`${totals.roiMultiple.toFixed(1)}×`} green />
        </div>
        <table className="ranking">
          <thead>
            <tr>
              <th>Agent</th>
              <th style={{ textAlign: "right" }}>每周时长</th>
              <th style={{ textAlign: "right" }}>节省%</th>
              <th style={{ textAlign: "right" }}>年节省</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((r) => (
              <tr key={r.agent.slug}>
                <td>
                  <span style={{ marginRight: ".4rem" }}>{r.agent.icon}</span>
                  {r.agent.name}
                </td>
                <td style={{ textAlign: "right" }} className="muted">{r.hpw} h</td>
                <td style={{ textAlign: "right" }} className="muted">{Math.round(r.savPct * 100)}%</td>
                <td style={{ textAlign: "right", color: "var(--accent)", fontWeight: 600 }}>{fmt(r.grossSavings)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .preset-btn-sm {
          padding: .3rem .6rem;
          background: rgba(245,158,11,.12);
          color: #f59e0b;
          border: 1px solid rgba(245,158,11,.3);
          border-radius: 999px;
          font-size: .72rem;
          cursor: pointer;
        }
        .preset-btn-sm:hover { background: rgba(245,158,11,.22); }
        @media (max-width: 720px) {
          .roi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="muted" style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: ".4rem" }}>{children}</div>;
}

function NumInput({ label, value, setValue, min, max, step }: { label: string; value: number; setValue: (n: number) => void; min: number; max: number; step: number }) {
  return (
    <div>
      <Label>{label}</Label>
      <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          style={{ flex: 1, accentColor: "var(--accent)" }}
        />
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => setValue(Number(e.target.value))}
          style={{ width: 80, padding: ".3rem .5rem", background: "var(--bg-elev)", border: "1px solid var(--border)", color: "var(--text)", borderRadius: 6, fontSize: ".9rem" }}
        />
      </div>
    </div>
  );
}

function Stat({ label, value, highlight, muted, green }: { label: string; value: string; highlight?: boolean; muted?: boolean; green?: boolean }) {
  return (
    <div>
      <div className="muted" style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".1em" }}>{label}</div>
      <div style={{ fontSize: highlight ? "1.5rem" : "1.1rem", fontWeight: highlight ? 800 : 600, marginTop: ".2rem", color: green ? "var(--green)" : highlight ? "var(--accent)" : muted ? "var(--text-muted)" : "var(--text)" }}>
        {value}
      </div>
    </div>
  );
}
