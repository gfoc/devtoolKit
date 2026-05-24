"use client";
import Link from "next/link";
import { FileJson, Braces, Regex, Hash } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { FileJson, Braces, Regex, Hash };

interface Props { icon: string; label: string; desc: string; href: string; badge: string | null; }

export default function ToolCard({ icon, label, desc, href, badge }: Props) {
  const Icon = iconMap[icon];
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: 20, height: "100%", cursor: "pointer", transition: "border-color 0.15s" }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)"; }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--accent-dim)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {Icon && <Icon size={18} color="var(--accent)" />}
          </div>
          {badge && (
            <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 100, background: badge === "Popular" ? "rgba(34,197,94,0.12)" : "var(--accent-dim)", color: badge === "Popular" ? "var(--success)" : "var(--accent)" }}>
              {badge}
            </span>
          )}
        </div>
        <p style={{ fontWeight: 600, fontSize: 15, color: "var(--text-primary)", marginBottom: 6 }}>{label}</p>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{desc}</p>
      </div>
    </Link>
  );
}
