import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy | DevToolkit", description: "Privacy policy for DevToolkit." };
export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px 80px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 24, color: "var(--text-primary)" }}>Privacy Policy</h1>
      {[
        ["Data collection", "DevToolkit does not collect, store, or transmit any personal data. All tool operations run entirely within your browser."],
        ["Cookies", "We may use minimal cookies for analytics (e.g. page view counts) once ads are enabled. No personally identifiable information is stored."],
        ["Third-party ads", "This site may display ads served by third-party networks (such as Ezoic or Google AdSense). These networks may use cookies to serve relevant ads. Please refer to their respective privacy policies for details."],
        ["Contact", "For privacy concerns, contact us via the Contact page."],
      ].map(([title, body]) => (
        <div key={title as string} style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>{title}</h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8 }}>{body}</p>
        </div>
      ))}
    </div>
  );
}
