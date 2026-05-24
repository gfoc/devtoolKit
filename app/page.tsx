import Link from "next/link";
import { FileJson, Braces, Regex, Hash, ArrowRight, Zap, Globe, Shield } from "lucide-react";
import ToolCard from "@/components/ToolCard";

const tools = [
  { icon: "FileJson", label: "CSV to JSON", desc: "Convert CSV files to clean JSON instantly. Supports custom delimiters and nested output.", href: "/tools/csv-to-json", badge: "Popular" },
  { icon: "Braces", label: "JSON Formatter", desc: "Beautify, minify, and validate JSON. Spot errors with clear inline highlighting.", href: "/tools/json-formatter", badge: null },
  { icon: "Regex", label: "Regex Tester", desc: "Test regular expressions live with match highlighting and plain-English explanations.", href: "/tools/regex-tester", badge: "Coming soon" },
  { icon: "Hash", label: "Token Counter", desc: "Count LLM tokens for GPT, Claude, and Llama models before sending your prompt.", href: "/tools/token-counter", badge: null },
];

const features = [
  { icon: Zap, title: "Instant results", desc: "Everything runs in your browser. No server round-trips, no waiting." },
  { icon: Globe, title: "No signup needed", desc: "All tools are free and open. Just open and use." },
  { icon: Shield, title: "Privacy-first", desc: "Your data never leaves your browser. We don't log or store anything." },
];

export default function Home() {
  return (
    <>
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--accent-dim)", border: "1px solid rgba(108,99,255,0.3)", borderRadius: 100, padding: "4px 12px", marginBottom: 24 }}>
          <Zap size={12} color="var(--accent)" />
          <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 500 }}>Free tools, no signup required</span>
        </div>
        <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 20, color: "var(--text-primary)" }}>
          Developer tools that<br />
          <span style={{ color: "var(--accent)" }}>actually work fast</span>
        </h1>
        <p style={{ fontSize: 18, color: "var(--text-secondary)", maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.6 }}>
          Instant, browser-based utilities for everyday dev tasks. No ads in your face, no login walls, no nonsense.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/tools/csv-to-json" className="btn btn-primary" style={{ padding: "10px 22px", fontSize: 14 }}>
            Try CSV to JSON <ArrowRight size={14} />
          </Link>
          <Link href="/tools" className="btn" style={{ padding: "10px 22px", fontSize: 14 }}>
            Browse all tools
          </Link>
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>
        <h2 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>Tools</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {tools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>

      <section style={{ borderTop: "1px solid var(--border)", background: "var(--bg-card)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 32 }}>
          {features.map((f) => (
            <div key={f.title} style={{ display: "flex", gap: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--accent-dim)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <f.icon size={18} color="var(--accent)" />
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", marginBottom: 4 }}>{f.title}</p>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
