// Public read-only API for the evaluation results.
// Stable JSON contract for downstream dashboards / Slack bots / GH Actions.

import { NextResponse } from "next/server";
import { data } from "@/lib/data";

export const revalidate = 3600;

export async function GET() {
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
