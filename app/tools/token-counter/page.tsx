import type { Metadata } from "next";
import TokenCounterTool from "@/components/tools/TokenCounterTool";

export const metadata: Metadata = {
  title: "LLM Token Counter – Free Online Tool | DevToolkit",
  description: "Estimate token counts for GPT-4, Claude, and Llama models. See cost estimates and context window usage before sending your prompt.",
};

export default function TokenCounterPage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Tools</span>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>/</span>
          <span style={{ fontSize: 12, color: "var(--accent)" }}>Token Counter</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: 8 }}>
          LLM Token Counter
        </h1>
        <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 600 }}>
          Paste your prompt and instantly see estimated token counts, cost estimates, and context window usage for GPT-4o, Claude, Llama, and more. Runs entirely in your browser.
        </p>
      </div>

      <TokenCounterTool />

      <article style={{ marginTop: 64, maxWidth: 720 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: 16 }}>
          What are LLM tokens?
        </h2>
        <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 16 }}>
          Large language models don&apos;t process text word by word — they break it into <strong style={{ color: "var(--text-primary)" }}>tokens</strong>, which are chunks of characters. A token is roughly 4 characters or ¾ of a word in English. The word &quot;developer&quot; might be 1 token, while &quot;tokenization&quot; could be 2-3.
        </p>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--text-primary)", margin: "24px 0 10px" }}>Why token count matters</h3>
        <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 16 }}>
          Every LLM API charges per token, and each model has a maximum context window. Knowing your token count helps you estimate costs before running expensive batch jobs, and avoid hitting context limits mid-conversation.
        </p>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--text-primary)", margin: "24px 0 10px" }}>Count tokens in Python</h3>
        <pre style={{ background: "var(--bg-input)", border: "1px solid var(--border)", borderRadius: 10, padding: 20, fontSize: 13, overflowX: "auto", fontFamily: "var(--mono)", lineHeight: 1.7, color: "var(--text-primary)" }}>
{`# For OpenAI models use tiktoken
pip install tiktoken

import tiktoken

enc = tiktoken.encoding_for_model("gpt-4o")
tokens = enc.encode("Your prompt text here")
print(f"Token count: {len(tokens)}")`}
        </pre>
      </article>
    </div>
  );
}
