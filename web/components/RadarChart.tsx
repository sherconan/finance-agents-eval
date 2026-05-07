"use client";

import {
  Radar,
  RadarChart as RC,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type Series = {
  name: string;
  color: string;
  values: { dim: string; value: number }[];
};

export function RadarChart({
  series,
  height = 320,
}: {
  series: Series[];
  height?: number;
}) {
  const dims = series[0]?.values.map((v) => v.dim) ?? [];
  const data = dims.map((dim) => {
    const row: Record<string, string | number> = { dim };
    series.forEach((s) => {
      row[s.name] = s.values.find((v) => v.dim === dim)?.value ?? 0;
    });
    return row;
  });

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RC data={data}>
        <PolarGrid stroke="#243044" />
        <PolarAngleAxis dataKey="dim" tick={{ fill: "#94a3b8", fontSize: 12 }} />
        <PolarRadiusAxis domain={[0, 10]} tick={{ fill: "#475569", fontSize: 10 }} />
        {series.map((s) => (
          <Radar
            key={s.name}
            name={s.name}
            dataKey={s.name}
            stroke={s.color}
            fill={s.color}
            fillOpacity={0.18}
          />
        ))}
        <Legend wrapperStyle={{ color: "#e5e7eb" }} />
        <Tooltip
          contentStyle={{ background: "#111827", border: "1px solid #243044", borderRadius: 8 }}
          labelStyle={{ color: "#e5e7eb" }}
        />
      </RC>
    </ResponsiveContainer>
  );
}
