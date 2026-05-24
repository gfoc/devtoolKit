import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | DevToolkit",
  description: "About DevToolkit — free browser-based tools for developers.",
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px 80px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 24, color: "var(--text-primary)" }}>
        About DevToolkit
      </h1>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 16 }}>
        <strong style={{ color: "var(--text-primary)" }}>DevToolkit</strong> is a collection of free, fast, browser-based utilities built for developers who hate wasting time on repetitive tasks.
      </p>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 16 }}>
        Whether you&apos;re converting a CSV file, validating JSON, testing a regex pattern, or counting tokens before firing off an LLM prompt — these are the small but annoying jobs that eat into your real work. DevToolkit handles them instantly, right in your browser, so you can get back to building.
      </p>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 16 }}>
        Every tool runs entirely in your browser. No data is sent to any server, no account is needed, and there&apos;s no bloat. Just open the tool and use it. Your data stays on your machine — always.
      </p>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 16 }}>
        We built DevToolkit because most online tools are either paywalled, slow, riddled with ads, or require you to sign up just to paste some JSON. That&apos;s frustrating. Developers deserve better.
      </p>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8 }}>
        New tools are added regularly, driven by real developer needs. Have a tool you&apos;d like to see? Reach out via the{" "}
        <a href="/contact" style={{ color: "var(--accent)", textDecoration: "none" }}>Contact</a>— we&apos;d love to hear from you.
      </p>
    </div>
  );
}