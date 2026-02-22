"use client";

import { useState, useEffect } from "react";
import { Highlight, themes } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // localStorage se mode lo
    const saved = localStorage.getItem("vartheme-site-mode");
    if (saved === "light" || saved === "dark") setMode(saved);

    // Real time update ke liye CSS variable watch karo
    const observer = new MutationObserver(() => {
      const bg = getComputedStyle(document.documentElement)
        .getPropertyValue("--background")
        .trim();
      // Light backgrounds white/light hote hain
      setMode(bg === "#FFFFFF" || bg.startsWith("#F") ? "light" : "dark");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightTheme = mode === "light" ? themes.oneLight : themes.nightOwl;

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 16,
        overflow: "hidden",
        fontFamily: "var(--font-geist-mono)",
        transition: "border 0.4s ease",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
          transition: "background 0.4s ease",
        }}
      >
        {/* Mac dots */}
        <div style={{ display: "flex", gap: 8 }}>
          {["#FF5F57", "#FFBD2E", "#28C840"].map((c, i) => (
            <div
              key={i}
              style={{ width: 12, height: 12, borderRadius: "50%", background: c }}
            />
          ))}
        </div>

        {/* Language + Copy */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
            {language}
          </span>
          <button
            onClick={handleCopy}
            style={{
              background: copied ? "#10B98122" : "var(--surface)",
              border: `1px solid ${copied ? "#10B981" : "var(--border)"}`,
              borderRadius: 6,
              padding: "4px 12px",
              fontSize: 12,
              color: copied ? "#10B981" : "var(--text-muted)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontFamily: "inherit",
            }}
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
      </div>

      {/* Highlighted Code */}
      <Highlight
        theme={highlightTheme}
        code={code.trim()}
        language={language as any}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            style={{
              ...style,
              margin: 0,
              padding: "24px",
              fontSize: 14,
              lineHeight: 1.8,
              overflowX: "auto",
              transition: "background 0.4s ease",
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span
                  style={{
                    userSelect: "none",
                    marginRight: 24,
                    fontSize: 12,
                    opacity: 0.4,
                    minWidth: 16,
                    display: "inline-block",
                    textAlign: "right",
                  }}
                >
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}