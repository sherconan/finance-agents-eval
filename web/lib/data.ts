import results from "@/data/results.json";
import deepDive from "@/data/agent-deep-dive.json";
import fs from "node:fs";
import path from "node:path";

export type AgentCase = {
  name: string;
  input: string;
  process: string;
  output: string;
  result: string;
  score: number;
  took: string;
};

export type AgentDeepDive = {
  what_it_does_1line: string;
  non_tech_explanation: string;
  technical_breakdown: {
    composes_skills: string[];
    subagents_used: string[];
    connectors_optional: string[];
    compute_pattern: string;
  };
  inputs_required: string[];
  outputs_produced: string[];
  cases: AgentCase[];
};

export function getDeepDive(slug: string): AgentDeepDive | undefined {
  const all = (deepDive as { agents: Record<string, AgentDeepDive> }).agents;
  return all[slug];
}

export type Agent = {
  slug: string;
  name: string;
  category: "research" | "operations";
  icon: string;
  rank: number;
  total: number;
  completeness: number;
  professionalism: number;
  accuracy: number;
  usability: number;
  speed_sec: number;
  strengths: string[];
  weaknesses: string[];
  verdict: string;
  best_for: string;
  artifact_path: string;
  evaluated_at: string;
};

export type Aggregate = {
  version: string;
  generated_at: string;
  evaluator: string;
  release: {
    vendor: string;
    release_date: string;
    source_url: string;
    claude_code_version: string;
  };
  rubric: Record<string, number>;
  summary: {
    agents_evaluated: number;
    avg_total: number;
    top_3: string[];
    bottom_3: string[];
  };
  results: Agent[];
};

export const data: Aggregate = results as unknown as Aggregate;

export function getAgent(slug: string): Agent | undefined {
  return data.results.find((a) => a.slug === slug);
}

export function getArtifact(slug: string): string {
  const agent = getAgent(slug);
  if (!agent) return "";
  const filename = agent.artifact_path.split("/").pop()!;
  const p = path.join(process.cwd(), "public", "artifacts", filename);
  try {
    return fs.readFileSync(p, "utf-8");
  } catch {
    return "";
  }
}
