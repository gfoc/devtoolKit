import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Blog | DevToolkit", description: "Developer tutorials and guides." };
const posts = [
  { title: "How to convert CSV to JSON in Python", slug: "csv-to-json-python", date: "2024-01-10", desc: "A complete guide to converting CSV files to JSON using Python's built-in csv and json modules." },
];
export default function BlogPage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px 80px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8, color: "var(--text-primary)" }}>Blog</h1>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 36 }}>Developer guides and tutorials.</p>
      {posts.map(p => (
        <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: "none", display: "block", marginBottom: 20 }}>
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, padding: 20 }}>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>{p.date}</p>
            <p style={{ fontWeight: 600, fontSize: 16, color: "var(--text-primary)", marginBottom: 6 }}>{p.title}</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>{p.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
