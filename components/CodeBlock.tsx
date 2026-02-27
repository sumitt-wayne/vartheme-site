"use client";

import { useState, useEffect, useRef } from "react";
import { Highlight, themes } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - left, y: e.clientY - top });
  };

  useEffect(() => {
    const saved = localStorage.getItem("vartheme-site-mode");
    if (saved === "light" || saved === "dark") setMode(saved);

    const observer = new MutationObserver(() => {
      const bg = getComputedStyle(document.documentElement)
        .getPropertyValue("--background")
        .trim();
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
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        border: "1px solid var(--border)",
        borderRadius: 24,
        overflow: "hidden",
        fontFamily: "var(--font-geist-mono), monospace",
        transition: "border 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        position: "relative",
        background: mode === "dark" ? "#0A0A0F" : "#F8FAFC",
      }}
    >
      {/* 🔮 Interactive Spotlight Glow */}
      <div
        style={{
          position: "absolute",
          top: mousePos.y - 150,
          left: mousePos.x - 150,
          width: 300,
          height: 300,
          background: "var(--primary-glow)",
          filter: "blur(80px)",
          borderRadius: "50%",
          pointerEvents: "none",
          opacity: 0.4,
          zIndex: 0,
        }}
      />

      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
          backdropFilter: "blur(8px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["#FF5F57", "#FFBD2E", "#28C840"].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <div style={{ width: 1, height: 16, background: "var(--border)", margin: "0 8px" }} />
          <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 700, letterSpacing: 1 }}>
            {language.toUpperCase()}
          </span>
        </div>

        <button
          onClick={handleCopy}
          style={{
            background: copied ? "var(--primary)" : "transparent",
            border: `1px solid ${copied ? "var(--primary)" : "var(--border)"}`,
            borderRadius: 8,
            padding: "6px 14px",
            fontSize: 12,
            fontWeight: 600,
            color: copied ? "#fff" : "var(--text)",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code Area */}
      <Highlight theme={highlightTheme} code={code.trim()} language={language as any}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            style={{
              ...style,
              margin: 0,
              padding: "32px 24px",
              fontSize: 14,
              lineHeight: 2,
              overflowX: "auto",
              position: "relative",
              zIndex: 1,
              // FIX: Background conflict solved here
              backgroundColor: "transparent",
              background: "transparent",
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} style={{ display: "flex" }}>
                <span
                  style={{
                    userSelect: "none",
                    marginRight: 24,
                    fontSize: 11,
                    color: "var(--text-muted)",
                    opacity: 0.3,
                    width: 20,
                    textAlign: "right",
                  }}
                >
                  {i + 1}
                </span>
                <div style={{ flex: 1 }}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              </div>
            ))}
          </pre>
        )}
      </Highlight>

      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        height: 2,
        width: "100%",
        background: `linear-gradient(90deg, transparent, var(--primary), transparent)`,
        opacity: 0.3
      }} />
    </div>
  );
}