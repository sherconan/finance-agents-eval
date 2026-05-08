import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TickerBar } from "@/components/TickerBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://finance-agents-eval.vercel.app"),
  title: "Anthropic Finance Agents 评测站",
  description:
    "Anthropic 2026-05-05 发布的 10 个金融 Agent Templates 独立第三方评测——5 维评分 + 真实 artifact + 横向对比。",
  openGraph: {
    title: "Anthropic Finance Agents 评测站",
    description: "10 个金融 Agent Templates 独立第三方评测——5 维评分 + 真实 artifact + 横向对比。",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <TickerBar />
        <Header />
        <main style={{ minHeight: "calc(100vh - 200px)", paddingBottom: "3rem" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
