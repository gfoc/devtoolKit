import Link from "next/link";
import { Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", marginTop: 80 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Terminal size={14} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>DevToolkit</span>
          </div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", maxWidth: 260 }}>Free, fast developer tools that run in your browser. No signup needed.</p>
        </div>
        <div style={{ display: "flex", gap: 40 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.08em", marginBottom: 12, textTransform: "uppercase" }}>Tools</p>
            {[["CSV to JSON", "/tools/csv-to-json"], ["JSON Formatter", "/tools/json-formatter"], ["Regex Tester", "/tools/regex-tester"], ["Token Counter", "/tools/token-counter"]].map(([label, href]) => (
              <div key={href} style={{ marginBottom: 8 }}>
                <Link href={href} style={{ fontSize: 13, color: "var(--text-secondary)", textDecoration: "none" }}>{label}</Link>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.08em", marginBottom: 12, textTransform: "uppercase" }}>Site</p>
            {[["Privacy Policy", "/privacy"], ["About", "/about"], ["Blog", "/blog"], ["Contact", "/contact"]].map(([label, href]) => (
              <div key={href} style={{ marginBottom: 8 }}>
                <Link href={href} style={{ fontSize: 13, color: "var(--text-secondary)", textDecoration: "none" }}>{label}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--border)", padding: "16px 24px", textAlign: "center" }}>
        <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ScholarBoard. All rights reserved.
          </p>
      </div>
    </footer>
  );
}
