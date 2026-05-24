import type { Metadata } from "next";
import CsvToJsonTool from "@/components/tools/CsvToJsonTool";

export const metadata: Metadata = {
  title: "CSV to JSON Converter – Free Online Tool | DevToolkit",
  description: "Convert CSV files to JSON instantly. Supports custom delimiters (comma, semicolon, tab, pipe), auto number detection, and multiple output formats. Free, runs in your browser.",
};

export default function CsvToJsonPage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Tools</span>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>/</span>
          <span style={{ fontSize: 12, color: "var(--accent)" }}>CSV to JSON</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: 8 }}>
          CSV to JSON Converter
        </h1>
        <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 600 }}>
          Paste or upload a CSV file and get clean JSON output instantly. Supports custom delimiters, auto number detection, and multiple output formats. Runs entirely in your browser — nothing is sent to any server.
        </p>
      </div>

      {/* Tool */}
      <CsvToJsonTool />

      {/* SEO article content — important for Ezoic */}
      <article style={{ marginTop: 64, maxWidth: 720 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: 16 }}>
          How to convert CSV to JSON
        </h2>
        <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 16 }}>
          CSV (Comma-Separated Values) is one of the most common data formats for spreadsheets and databases. JSON (JavaScript Object Notation) is the standard format for APIs and web applications. Converting between them is a daily task for many developers.
        </p>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--text-primary)", margin: "24px 0 10px" }}>
          Using this tool
        </h3>
        <ol style={{ paddingLeft: 20, color: "var(--text-secondary)", fontSize: 15, lineHeight: 2 }}>
          <li>Paste your CSV into the left panel (or click <strong style={{ color: "var(--text-primary)" }}>Load sample</strong> to try it)</li>
          <li>Choose your delimiter — comma, semicolon, tab, or pipe</li>
          <li>Pick an output format: array of objects, or keyed by first column</li>
          <li>Click <strong style={{ color: "var(--text-primary)" }}>Convert</strong> — the JSON appears instantly on the right</li>
          <li>Copy to clipboard or download as a <code style={{ background: "var(--bg-input)", padding: "1px 6px", borderRadius: 4, fontSize: 13 }}>.json</code> file</li>
        </ol>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--text-primary)", margin: "24px 0 10px" }}>
          Converting CSV to JSON in Python
        </h3>
        <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 12 }}>
          If you need to do this programmatically, Python makes it easy with the built-in <code style={{ background: "var(--bg-input)", padding: "1px 6px", borderRadius: 4, fontSize: 13 }}>csv</code> and <code style={{ background: "var(--bg-input)", padding: "1px 6px", borderRadius: 4, fontSize: 13 }}>json</code> modules:
        </p>
        <pre style={{ background: "var(--bg-input)", border: "1px solid var(--border)", borderRadius: 10, padding: 20, fontSize: 13, overflowX: "auto", fontFamily: "var(--mono)", lineHeight: 1.7, color: "var(--text-primary)" }}>
{`import csv
import json

with open("data.csv", "r") as f:
    reader = csv.DictReader(f)
    rows = list(reader)

with open("output.json", "w") as f:
    json.dump(rows, f, indent=2)

print(f"Converted {len(rows)} rows to JSON")`}
        </pre>
      </article>
    </div>
  );
}
