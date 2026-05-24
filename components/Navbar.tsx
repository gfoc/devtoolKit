import Link from "next/link";
import { Terminal } from "lucide-react";

export default function Navbar() {
  return (
    <nav style={{
      borderBottom: "1px solid var(--border)",
      background: "rgba(15,17,23,0.85)",
      backdropFilter: "blur(12px)",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
         
            <img src="logo.png" alt="DevToolkit logo" style={{ width: 35, height: 35, borderRadius: 7, objectFit: "cover" }} />
         
          <span style={{ fontWeight: 700, fontSize: 16, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>DevToolkit</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Link href="/" style={{ padding: "6px 12px", borderRadius: 6, fontSize: 13, color: "var(--text-secondary)", textDecoration: "none" }}>Home</Link>
          <Link href="/tools" style={{ padding: "6px 12px", borderRadius: 6, fontSize: 13, color: "var(--text-secondary)", textDecoration: "none" }}>Tools</Link>
          <Link href="/blog" style={{ padding: "6px 12px", borderRadius: 6, fontSize: 13, color: "var(--text-secondary)", textDecoration: "none" }}>Blog</Link>
        </div>
      </div>
    </nav>
  );
}
