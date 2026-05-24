import type { Metadata } from "next";
import Link from "next/link";
import { FileJson, Braces, Regex, Hash } from "lucide-react";

export const metadata: Metadata = {
  title: "All Developer Tools | DevToolkit",
  description: "Browse all free developer tools — CSV to JSON, JSON Formatter, Regex Tester, Token Counter and more.",
};

const tools = [
  { icon: FileJson, label: "CSV to JSON", desc: "Convert CSV to JSON with custom delimiters and output formats.", href: "/tools/csv-to-json", status: "live" },
  { icon: Braces, label: "JSON Formatter", desc: "Beautify, minify, and validate JSON with error highlighting.", href: "/tools/json-formatter", status: "live" },
  { icon: Regex, label: "Regex Tester", desc: "Live regex testing with match highlighting and explanations.", href: "/tools/regex-tester", status: "soon" },
  { icon: Hash, label: "Token Counter", desc: "Count tokens for GPT, Claude, and Llama models.", href: "/tools/token-counter", status: "live" },
];

export default function ToolsPage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8, color: "var(--text-primary)" }}>All Tools</h1>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 36 }}>Free, browser-based utilities for developers.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {tools.map(t => (
          <Link key={t.href} href={t.status === "live" ? t.href : "#"} style={{ textDecoration: "none" }}>
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: 20, opacity: t.status === "soon" ? 0.6 : 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--accent-dim)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <t.icon size={18} color="var(--accent)" />
                </div>
                    {t.status === "soon" && <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 100, background: "var(--accent-dim)", color: "var(--accent)", fontWeight: 600 }}>Coming soon</span>}
                    {t.status === "live" && <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 100, background: "rgba(34,197,94,0.12)", color: "#22c55e", fontWeight: 600 }}>Live</span>}
              </div>
              <p style={{ fontWeight: 600, fontSize: 15, color: "var(--text-primary)", marginBottom: 6 }}>{t.label}</p>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{t.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
