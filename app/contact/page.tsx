import type { Metadata } from "next";
export const metadata: Metadata = { title: "Contact | DevToolkit", description: "Get in touch with DevToolkit." };
export default function ContactPage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px 80px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16, color: "var(--text-primary)" }}>Contact</h1>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 24 }}>Have a suggestion, bug report, or want a new tool added? Reach out.</p>
      <p style={{ fontSize: 15, color: "var(--text-secondary)" }}>Email: <a href="mailto:hello@devtoolkit.io" style={{ color: "var(--accent)" }}>imperial7knight@gmail.com</a></p>
    </div>
  );
}
