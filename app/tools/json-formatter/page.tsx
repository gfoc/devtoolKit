import type { Metadata } from "next";
import JsonFormatterTool from "@/components/tools/JsonFormatterTool";


export const metadata: Metadata = {
  title: "JSON Formatter & Validator – Free Online Tool | DevToolkit",
  description: "Beautify, minify, and validate JSON instantly. Highlights errors with clear messages. Free, runs entirely in your browser.",
};

export default function JsonFormatterPage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Tools</span>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>/</span>
          <span style={{ fontSize: 12, color: "var(--accent)" }}>JSON Formatter</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: 8 }}>
          JSON Formatter & Validator
        </h1>
        <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 600 }}>
          Paste your JSON to beautify or minify it instantly. Invalid JSON is caught with a clear error message pointing to the exact problem. Runs entirely in your browser — nothing is sent to any server.
        </p>
      </div>

      <JsonFormatterTool />

      <article style={{ marginTop: 64, maxWidth: 720 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: 16 }}>
          What is JSON formatting?
        </h2>
        <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 16 }}>
          JSON (JavaScript Object Notation) is the universal data format for APIs and web applications. Raw JSON from an API is often minified — all on one line, no spaces — which makes it impossible to read. A formatter adds proper indentation so you can inspect the structure clearly.
        </p>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--text-primary)", margin: "24px 0 10px" }}>Beautify vs Minify</h3>
        <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 16 }}>
          <strong style={{ color: "var(--text-primary)" }}>Beautify</strong> adds indentation and line breaks — useful for debugging and reading API responses. <strong style={{ color: "var(--text-primary)" }}>Minify</strong> removes all whitespace — useful for reducing payload size before sending data over the network.
        </p>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--text-primary)", margin: "24px 0 10px" }}>Format JSON in Python</h3>
        <pre style={{ background: "var(--bg-input)", border: "1px solid var(--border)", borderRadius: 10, padding: 20, fontSize: 13, overflowX: "auto", fontFamily: "var(--mono)", lineHeight: 1.7, color: "var(--text-primary)" }}>
{`import json

raw = '{"name":"Alice","age":28,"city":"Mumbai"}'

# Beautify
pretty = json.dumps(json.loads(raw), indent=2)
print(pretty)

# Minify
minified = json.dumps(json.loads(raw), separators=(',', ':'))
print(minified)`}
        </pre>
      </article>
    </div>
  );
}
