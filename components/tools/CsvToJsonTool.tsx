"use client";
import { useState, useCallback } from "react";
import { Copy, Download, Trash2, Play, CheckCheck, Upload } from "lucide-react";

const SAMPLE = `name,age,city,score
Alice,28,Mumbai,94.5
Bob,34,Delhi,87
Charlie,22,Bangalore,91.3
Diana,30,Chennai,78.9`;

function parseCSV(text: string, delim: string): string[][] {
  return text.trim().split(/\r?\n/).map(line => {
    const result: string[] = [];
    let cur = "", inQ = false;
    for (const c of line) {
      if (c === '"') { inQ = !inQ; }
      else if (c === delim && !inQ) { result.push(cur.trim()); cur = ""; }
      else { cur += c; }
    }
    result.push(cur.trim());
    return result;
  });
}

function tryNum(val: string, auto: boolean): string | number {
  if (!auto || val === "") return val;
  const n = Number(val);
  return isNaN(n) ? val : n;
}

export default function CsvToJsonTool() {
  const [csv, setCsv] = useState("");
  const [json, setJson] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [format, setFormat] = useState<"array" | "keyed">("array");
  const [autoNum, setAutoNum] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState<{ rows: number; cols: number; size: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const convert = useCallback(() => {
    setError("");
    setStats(null);
    if (!csv.trim()) { setError("Paste some CSV first."); return; }
    try {
      const rows = parseCSV(csv, delimiter);
      if (rows.length < 2) { setError("Need at least a header row and one data row."); return; }
      const headers = rows[0];
      const dataRows = rows.slice(1).filter(r => r.some(c => c !== ""));

      let result: unknown;
      if (format === "array") {
        result = dataRows.map(row => {
          const obj: Record<string, unknown> = {};
          headers.forEach((h, i) => { obj[h] = tryNum(row[i] ?? "", autoNum); });
          return obj;
        });
      } else {
        const keyed: Record<string, unknown> = {};
        dataRows.forEach(row => {
          const key = row[0];
          const obj: Record<string, unknown> = {};
          headers.slice(1).forEach((h, i) => { obj[h] = tryNum(row[i + 1] ?? "", autoNum); });
          keyed[key] = obj;
        });
        result = keyed;
      }

      const output = JSON.stringify(result, null, 2);
      setJson(output);
      setStats({ rows: dataRows.length, cols: headers.length, size: (output.length / 1024).toFixed(1) });
    } catch (e) {
      setError("Parse error: " + (e as Error).message);
    }
  }, [csv, delimiter, format, autoNum]);

  const copy = () => {
    if (!json) return;
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const download = () => {
    if (!json) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([json], { type: "application/json" }));
    a.download = "output.json";
    a.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => { setCsv(ev.target?.result as string); };
    reader.readAsText(file);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", height: 280, padding: 14, fontFamily: "var(--mono)",
    fontSize: 13, lineHeight: 1.6, resize: "vertical", borderRadius: 10,
    background: "var(--bg-input)", border: "1px solid var(--border)",
    color: "var(--text-primary)",
  };

  return (
    <div>
      {/* Options bar */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 16, padding: "12px 16px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label style={{ fontSize: 13, color: "var(--text-secondary)" }}>Delimiter</label>
          <select value={delimiter} onChange={e => setDelimiter(e.target.value)}
            style={{ fontSize: 13, padding: "4px 10px", borderRadius: 7, background: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }}>
            <option value=",">Comma  ,</option>
            <option value=";">Semicolon  ;</option>
            <option value={"\t"}>Tab</option>
            <option value="|">Pipe  |</option>
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label style={{ fontSize: 13, color: "var(--text-secondary)" }}>Output</label>
          <select value={format} onChange={e => setFormat(e.target.value as "array" | "keyed")}
            style={{ fontSize: 13, padding: "4px 10px", borderRadius: 7, background: "var(--bg-input)", border: "1px solid var(--border)", color: "var(--text-primary)" }}>
            <option value="array">Array of objects</option>
            <option value="keyed">Keyed by first column</option>
          </select>
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-secondary)", cursor: "pointer" }}>
          <input type="checkbox" checked={autoNum} onChange={e => setAutoNum(e.target.checked)} /> Auto-detect numbers
        </label>
        <label className="btn" style={{ cursor: "pointer", marginLeft: "auto" }}>
          <Upload size={13} /> Upload CSV
          <input type="file" accept=".csv,.tsv,.txt" onChange={handleFileUpload} style={{ display: "none" }} />
        </label>
      </div>

      {/* Editor panels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.07em", textTransform: "uppercase" }}>CSV Input</span>
            <button className="btn" style={{ padding: "3px 10px", fontSize: 12 }} onClick={() => { setCsv(SAMPLE); }}>Load sample</button>
          </div>
          <textarea style={inputStyle} value={csv} onChange={e => setCsv(e.target.value)} placeholder={"name,age,city\nAlice,28,Mumbai\nBob,34,Delhi"} spellCheck={false} />
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.07em", textTransform: "uppercase" }}>JSON Output</span>
            <button className="btn" style={{ padding: "3px 10px", fontSize: 12 }} onClick={copy} disabled={!json}>
              {copied ? <><CheckCheck size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
            </button>
          </div>
          <textarea style={{ ...inputStyle, background: json ? "var(--bg-input)" : "var(--bg-card)", cursor: "default" }} value={json} readOnly placeholder="JSON output appears here..." spellCheck={false} />
        </div>
      </div>

      {/* Action bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
        <button className="btn btn-primary" style={{ padding: "9px 22px", fontSize: 14 }} onClick={convert}>
          <Play size={14} /> Convert
        </button>
        <button className="btn" onClick={download} disabled={!json}><Download size={13} /> Download .json</button>
        <button className="btn" onClick={() => { setCsv(""); setJson(""); setError(""); setStats(null); }}>
          <Trash2 size={13} /> Clear
        </button>
      </div>

      {/* Error */}
      {error && (
        <div style={{ marginTop: 12, padding: "10px 16px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, fontSize: 13, color: "#f87171" }}>
          {error}
        </div>
      )}

      {/* Stats */}
      {stats && (
        <div style={{ marginTop: 12, display: "flex", gap: 20, padding: "10px 16px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8 }}>
          {[["Rows", stats.rows], ["Columns", stats.cols], ["Output size", `${stats.size} KB`]].map(([label, val]) => (
            <div key={label as string} style={{ display: "flex", gap: 6, fontSize: 13 }}>
              <span style={{ color: "var(--text-muted)" }}>{label}</span>
              <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{val}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
