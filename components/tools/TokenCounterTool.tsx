"use client";
import { useState, useEffect } from "react";
import { Trash2, Info } from "lucide-react";

const MODELS = [
  { id: "gpt-4o", label: "GPT-4o", provider: "OpenAI", costIn: 0.0025, costOut: 0.01 },
  { id: "gpt-4-turbo", label: "GPT-4 Turbo", provider: "OpenAI", costIn: 0.01, costOut: 0.03 },
  { id: "gpt-3.5-turbo", label: "GPT-3.5 Turbo", provider: "OpenAI", costIn: 0.0005, costOut: 0.0015 },
  { id: "claude-sonnet", label: "Claude Sonnet", provider: "Anthropic", costIn: 0.003, costOut: 0.015 },
  { id: "claude-haiku", label: "Claude Haiku", provider: "Anthropic", costIn: 0.00025, costOut: 0.00125 },
  { id: "llama-3", label: "Llama 3 70B", provider: "Meta", costIn: 0.00059, costOut: 0.00079 },
];

// Approximation: ~4 chars per token (industry standard estimate)
function estimateTokens(text: string): number {
  if (!text) return 0;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const chars = text.length;
  // Weighted estimate: blend word-based and char-based
  return Math.round((words * 1.3 + chars / 4) / 2);
}

export default function TokenCounterTool() {
  const [text, setText] = useState("");
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const tokens = estimateTokens(text);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const costIn = ((tokens / 1000) * selectedModel.costIn).toFixed(6);
  const costOut = ((tokens / 1000) * selectedModel.costOut).toFixed(6);

  const contextPercent = Math.min((tokens / 128000) * 100, 100);

  return (
    <div>
      {/* Model selector */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        {MODELS.map(m => (
          <button key={m.id} onClick={() => setSelectedModel(m)}
            style={{ padding: "5px 14px", borderRadius: 8, fontSize: 13, cursor: "pointer", border: "1px solid", borderColor: selectedModel.id === m.id ? "var(--accent)" : "var(--border)", background: selectedModel.id === m.id ? "var(--accent-dim)" : "var(--bg-card)", color: selectedModel.id === m.id ? "var(--accent)" : "var(--text-secondary)", fontWeight: selectedModel.id === m.id ? 600 : 400, transition: "all 0.15s" }}>
            {m.label}
            <span style={{ fontSize: 11, marginLeft: 5, opacity: 0.6 }}>{m.provider}</span>
          </button>
        ))}
      </div>

      {/* Text input */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.07em", textTransform: "uppercase" }}>Your Prompt / Text</span>
          <button className="btn" style={{ padding: "3px 10px", fontSize: 12 }} onClick={() => setText("")}><Trash2 size={12} /> Clear</button>
        </div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste your prompt or text here to count tokens..."
          style={{ width: "100%", height: 220, padding: 14, fontFamily: "inherit", fontSize: 14, lineHeight: 1.7, resize: "vertical", borderRadius: 10, background: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
          spellCheck={false}
        />
      </div>

      {/* Stats cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12, marginBottom: 16 }}>
        {[
          { label: "Tokens (est.)", value: tokens.toLocaleString(), highlight: true },
          { label: "Words", value: words.toLocaleString(), highlight: false },
          { label: "Characters", value: chars.toLocaleString(), highlight: false },
          { label: "Cost (input)", value: `$${costIn}`, highlight: false },
          { label: "Cost (output)", value: `$${costOut}`, highlight: false },
        ].map(stat => (
          <div key={stat.label} style={{ background: stat.highlight ? "var(--accent-dim)" : "var(--bg-card)", border: `1px solid ${stat.highlight ? "rgba(108,99,255,0.3)" : "var(--border)"}`, borderRadius: 10, padding: "14px 16px" }}>
            <p style={{ fontSize: 12, color: stat.highlight ? "var(--accent)" : "var(--text-muted)", marginBottom: 4, fontWeight: 500 }}>{stat.label}</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: stat.highlight ? "var(--accent)" : "var(--text-primary)", fontFamily: "var(--mono)" }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Context window bar */}
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Context window usage <span style={{ color: "var(--text-muted)", fontSize: 12 }}>(~128k tokens)</span></span>
          <span style={{ fontSize: 13, fontWeight: 600, color: contextPercent > 80 ? "#f87171" : contextPercent > 50 ? "#f59e0b" : "var(--success)" }}>{contextPercent.toFixed(1)}%</span>
        </div>
        <div style={{ background: "var(--bg-input)", borderRadius: 100, height: 8, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${contextPercent}%`, borderRadius: 100, background: contextPercent > 80 ? "#ef4444" : contextPercent > 50 ? "#f59e0b" : "var(--accent)", transition: "width 0.3s" }} />
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ display: "flex", gap: 8, marginTop: 12, padding: "10px 14px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8 }}>
        <Info size={14} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: 1 }} />
        <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>
          Token counts are <strong style={{ color: "var(--text-secondary)" }}>estimates</strong> based on the ~4 chars/token heuristic. Exact counts vary by model tokenizer. For production use, call the model&apos;s tokenizer API directly.
        </p>
      </div>
    </div>
  );
}
