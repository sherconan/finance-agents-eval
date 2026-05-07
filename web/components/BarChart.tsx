"use client";

import { Bar, BarChart as BC, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Cell } from "recharts";

type Item = { name: string; value: number; slug?: string };

export function HBarChart({ items, color = "#f59e0b", height = 360 }: { items: Item[]; color?: string; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BC data={items} layout="vertical" margin={{ top: 4, right: 24, bottom: 4, left: 16 }}>
        <CartesianGrid stroke="#243044" strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" domain={[0, 10]} tick={{ fill: "#94a3b8", fontSize: 11 }} />
        <YAxis type="category" dataKey="name" tick={{ fill: "#e5e7eb", fontSize: 12 }} width={150} />
        <Tooltip
          contentStyle={{ background: "#111827", border: "1px solid #243044", borderRadius: 8 }}
          labelStyle={{ color: "#e5e7eb" }}
          cursor={{ fill: "rgba(245,158,11,0.06)" }}
        />
        <Bar dataKey="value" radius={[0, 6, 6, 0]}>
          {items.map((_, idx) => (
            <Cell key={idx} fill={idx < 3 ? "#f59e0b" : color} />
          ))}
        </Bar>
      </BC>
    </ResponsiveContainer>
  );
}
