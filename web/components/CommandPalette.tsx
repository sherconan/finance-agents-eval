"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Agent } from "@/lib/data";

type Item = {
  id: string;
  group: "页面" | "Agent" | "动作";
  title: string;
  hint?: string;
  icon?: string;
  href?: string;
  onSelect?: () => void;
};

const PAGES: Item[] = [
  { id: "home", group: "页面", title: "榜单首页", icon: "🏠", href: "/" },
  { id: "compare", group: "页面", title: "横向对比矩阵", icon: "📊", href: "/compare" },
  { id: "duel", group: "页面", title: "Agent 1v1 PK", icon: "🥊", href: "/duel" },
  { id: "case", group: "页面", title: "深度案例", icon: "📖", href: "/case" },
  { id: "roi", group: "页面", title: "ROI 计算器", icon: "💰", href: "/roi" },
  { id: "vs", group: "页面", title: "vs 同行", icon: "⚔️", href: "/vs" },
  { id: "artifacts", group: "页面", title: "产出文档", icon: "📄", href: "/artifacts" },
  { id: "downloads", group: "页面", title: "下载包", icon: "📦", href: "/downloads" },
  { id: "changelog", group: "页面", title: "Changelog", icon: "🕒", href: "/changelog" },
  { id: "faq", group: "页面", title: "FAQ", icon: "❓", href: "/faq" },
  { id: "methodology", group: "页面", title: "方法论", icon: "🔬", href: "/methodology" },
];

const ACTIONS: Item[] = [
  { id: "official", group: "动作", title: "Anthropic 官方公告", icon: "↗", href: "https://www.anthropic.com/news/finance-agents" },
  { id: "github", group: "动作", title: "GitHub 源码", icon: "⌥", href: "https://github.com/sherconan/finance-agents-eval" },
  { id: "api", group: "动作", title: "/api/quotes 实时行情", icon: "⚡", href: "/api/quotes" },
  { id: "results-json", group: "动作", title: "/api/results 评测 JSON", icon: "📊", href: "/api/results" },
];

export function CommandPalette({ agents }: { agents: Agent[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const allItems: Item[] = useMemo(() => {
    const agentItems: Item[] = agents.map((a) => ({
      id: `agent-${a.slug}`,
      group: "Agent",
      title: `${a.name} · 总分 ${a.total.toFixed(2)}`,
      hint: `#${a.rank} ${a.category === "research" ? "研究" : "运营"} · ${a.verdict.slice(0, 36)}…`,
      icon: a.icon,
      href: `/agents/${a.slug}`,
    }));
    return [...PAGES, ...agentItems, ...ACTIONS];
  }, [agents]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems;
    return allItems.filter((it) =>
      [it.title, it.hint, it.id].filter(Boolean).join(" ").toLowerCase().includes(q),
    );
  }, [allItems, query]);

  // Group filtered
  const grouped = useMemo(() => {
    const groups: Record<string, Item[]> = { 页面: [], Agent: [], 动作: [] };
    filtered.forEach((it) => groups[it.group].push(it));
    return groups;
  }, [filtered]);

  useEffect(() => setActiveIdx(0), [query, open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((s) => !s);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(filtered.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const it = filtered[activeIdx];
        if (it) {
          if (it.href) {
            if (it.href.startsWith("http") || it.href.startsWith("/api")) {
              window.location.href = it.href;
            } else {
              router.push(it.href);
            }
          } else if (it.onSelect) {
            it.onSelect();
          }
          setOpen(false);
          setQuery("");
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, activeIdx, filtered, router]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (!open) {
    return (
      <button
        className="cmdk-trigger"
        onClick={() => setOpen(true)}
        aria-label="打开命令面板"
      >
        <span style={{ marginRight: 6 }}>🔍</span>
        <span>快速跳转</span>
        <kbd>⌘K</kbd>
        <style jsx>{`
          .cmdk-trigger {
            display: inline-flex;
            align-items: center;
            gap: .3rem;
            padding: .35rem .8rem;
            background: var(--bg-elev);
            color: var(--text-muted);
            border: 1px solid var(--border);
            border-radius: 999px;
            font-size: .85rem;
            cursor: pointer;
            transition: border-color .15s;
          }
          .cmdk-trigger:hover {
            border-color: var(--accent);
            color: var(--text);
          }
          .cmdk-trigger kbd {
            margin-left: .4rem;
            padding: .05rem .35rem;
            font-family: ui-monospace, monospace;
            font-size: .72rem;
            background: var(--border);
            border-radius: 4px;
          }
        `}</style>
      </button>
    );
  }

  let runningIdx = 0;
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,.6)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "10vh 1rem 1rem",
      }}
    >
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          width: "100%",
          maxWidth: 600,
          maxHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: ".75rem 1rem", borderBottom: "1px solid var(--border)" }}>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="跳转页面、查找 agent、搜索动作..."
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--text)",
              fontSize: "1rem",
            }}
          />
        </div>
        <div style={{ overflowY: "auto", flex: 1 }}>
          {(["页面", "Agent", "动作"] as const).map((g) => {
            const items = grouped[g];
            if (items.length === 0) return null;
            return (
              <div key={g}>
                <div className="muted" style={{ padding: ".5rem 1rem", fontSize: ".7rem", textTransform: "uppercase", letterSpacing: ".1em", background: "var(--bg-elev)" }}>{g}</div>
                {items.map((it) => {
                  const idx = runningIdx++;
                  const active = idx === activeIdx;
                  return (
                    <Link
                      key={it.id}
                      href={it.href ?? "#"}
                      onClick={() => setOpen(false)}
                      onMouseEnter={() => setActiveIdx(idx)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".75rem",
                        padding: ".7rem 1rem",
                        background: active ? "rgba(245,158,11,.1)" : "transparent",
                        borderLeft: `3px solid ${active ? "var(--accent)" : "transparent"}`,
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontSize: "1.1rem", width: 24, textAlign: "center" }}>{it.icon}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 500, color: "var(--text)" }}>{it.title}</div>
                        {it.hint && <div className="muted" style={{ fontSize: ".8rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it.hint}</div>}
                      </div>
                      {active && <span style={{ color: "var(--accent)" }}>↵</span>}
                    </Link>
                  );
                })}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="muted" style={{ padding: "2rem", textAlign: "center", fontSize: ".9rem" }}>
              没有匹配项。试试 “DCF”、“KYC”、“ROI”…
            </div>
          )}
        </div>
        <div style={{ padding: ".5rem 1rem", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", fontSize: ".7rem", color: "var(--text-muted)" }}>
          <span>↑↓ 导航 · ↵ 跳转 · esc 关闭</span>
          <span>共 {filtered.length} 项</span>
        </div>
      </div>
    </div>
  );
}
