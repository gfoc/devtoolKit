"use client";
import { useState, useCallback } from "react";
import { Copy, Download, Trash2, CheckCheck, Minimize2, Maximize2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"beautify" | "minify">("beautify");
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const format = useCallback(() => {
    setError("");
    setIsValid(null);
    if (!input.trim()) { setError("Paste some JSON first."); return; }
    try {
      const parsed = JSON.parse(input);
      setIsValid(true);
      if (mode === "beautify") setOutput(JSON.stringify(parsed, null, indent));
      else setOutput(JSON.stringify(parsed));
    } catch (e) {
      setIsValid(false);
      setError((e as Error).message);
      setOutput("");
    }
  }, [input, mode, indent]);

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const download = () => {
    if (!output) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([output], { type: "application/json" }));
    a.download = "formatted.json";
    a.click();
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", height: 300, padding: 14, fontFamily: "var(--mono)",
    fontSize: 13, lineHeight: 1.6, resize: "vertical", borderRadius: 10,
    background: "var(--bg-input)", border: `1px solid ${isValid === false ? "rgba(239,68,68,0.5)" : isValid === true ? "rgba(34,197,94,0.4)" : "var(--border)"}`,
    color: "var(--text-primary)",
  };

  return (
    <div>
      {/* Options */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 16, padding: "12px 16px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {(["beautify", "minify"] as const).map(m => (
            <button key={m} onClick={() => setMode(m)} style={{ padding: "4px 14px", borderRadius: 7, fontSize: 13, cursor: "pointer", border: "1px solid", borderColor: mode === m ? "var(--accent)" : "var(--border)", background: mode === m ? "var(--accent-dim)" : "var(--bg-input)", color: mode === m ? "var(--accent)" : "var(--text-secondary)", fontWeight: mode === m ? 600 : 400, display: "flex", alignItems: "center", gap: 6 }}>
              {m === "beautify" ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
        {mode === "beautify" && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <label style={{ fontSize: 13, color: "var(--text-secondary)" }}>Indent</label>
            <select value={indent} onChange={e => setIndent(Number(e.target.value))}
              style={{ fontSize: 13, padding: "4px 10px", borderRadius: 7, background: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }}>
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={1}>1 tab</option>
            </select>
          </div>
        )}
        {isValid !== null && (
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: isValid ? "var(--success)" : "#f87171" }}>
            {isValid ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
            {isValid ? "Valid JSON" : "Invalid JSON"}
          </div>
        )}
      </div>

      {/* Panels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.07em", textTransform: "uppercase" }}>Input</span>
            <button className="btn" style={{ padding: "3px 10px", fontSize: 12 }} onClick={() => { setInput(""); setOutput(""); setError(""); setIsValid(null); }}>Clear</button>
          </div>
          <textarea style={inputStyle} value={input} onChange={e => { setInput(e.target.value); setIsValid(null); }} placeholder={'{\n  "name": "Alice",\n  "age": 28\n}'} spellCheck={false} />
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.07em", textTransform: "uppercase" }}>Output</span>
            <button className="btn" style={{ padding: "3px 10px", fontSize: 12 }} onClick={copy} disabled={!output}>
              {copied ? <><CheckCheck size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
            </button>
          </div>
          <textarea style={{ ...inputStyle, background: output ? "var(--bg-input)" : "var(--bg-card)", border: "1px solid var(--border)", cursor: "default" }} value={output} readOnly placeholder="Formatted JSON appears here..." spellCheck={false} />
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
        <button className="btn btn-primary" style={{ padding: "9px 22px", fontSize: 14 }} onClick={format}>
          {mode === "beautify" ? <Maximize2 size={14} /> : <Minimize2 size={14} />} {mode === "beautify" ? "Beautify" : "Minify"}
        </button>
        <button className="btn" onClick={download} disabled={!output}><Download size={13} /> Download .json</button>
        <button className="btn" onClick={() => { setInput(""); setOutput(""); setError(""); setIsValid(null); }}><Trash2 size={13} /> Clear</button>
      </div>

      {error && (
        <div style={{ marginTop: 12, padding: "10px 16px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, fontSize: 13, color: "#f87171", fontFamily: "var(--mono)" }}>
          ✖ {error}
        </div>
      )}
    </div>
  );
}
