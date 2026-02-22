"use client";

import { useState, useEffect } from "react";

const THEMES = [
  {
    name: "default", label: "Default",
    light: { primary: "#7C3AED", background: "#FFFFFF", surface: "#F8FAFC", text: "#0F172A", border: "#E2E8F0", accent: "#06B6D4", muted: "#94A3B8" },
    dark:  { primary: "#A78BFA", background: "#0A0A0F", surface: "#111118", text: "#F8FAFC", border: "#2A2A3A", accent: "#22D3EE", muted: "#64748B" },
  },
  {
    name: "ocean", label: "Ocean",
    light: { primary: "#0284C7", background: "#F0F9FF", surface: "#E0F2FE", text: "#0C4A6E", border: "#BAE6FD", accent: "#0D9488", muted: "#7CB9D8" },
    dark:  { primary: "#38BDF8", background: "#0C1A2E", surface: "#0F2744", text: "#E0F2FE", border: "#1E3A5F", accent: "#2DD4BF", muted: "#4A7A9B" },
  },
  {
    name: "forest", label: "Forest",
    light: { primary: "#16A34A", background: "#F0FDF4", surface: "#DCFCE7", text: "#14532D", border: "#BBF7D0", accent: "#84CC16", muted: "#7AAF8A" },
    dark:  { primary: "#4ADE80", background: "#0A1F0F", surface: "#0F2D17", text: "#DCFCE7", border: "#166534", accent: "#A3E635", muted: "#4A7A5A" },
  },
  {
    name: "sunset", label: "Sunset",
    light: { primary: "#EA580C", background: "#FFF7ED", surface: "#FFEDD5", text: "#431407", border: "#FED7AA", accent: "#DB2777", muted: "#B8845A" },
    dark:  { primary: "#FB923C", background: "#1A0A00", surface: "#2D1200", text: "#FFEDD5", border: "#7C2D12", accent: "#F472B6", muted: "#8B5A3A" },
  },
  {
    name: "rose", label: "Rose",
    light: { primary: "#E11D48", background: "#FFF1F2", surface: "#FFE4E6", text: "#4C0519", border: "#FECDD3", accent: "#BE185D", muted: "#B87A8A" },
    dark:  { primary: "#FB7185", background: "#1A0008", surface: "#2D000F", text: "#FFE4E6", border: "#881337", accent: "#F472B6", muted: "#8B3A4A" },
  },
];

const STORAGE_KEY_THEME = "vartheme-site-theme";
const STORAGE_KEY_MODE  = "vartheme-site-mode";

export default function Hero() {
  const [copied, setCopied]           = useState(false);
  const [activeTheme, setActiveTheme] = useState("default");
  const [mode, setMode]               = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
    const savedMode  = localStorage.getItem(STORAGE_KEY_MODE);
    if (savedTheme) setActiveTheme(savedTheme);
    if (savedMode === "light" || savedMode === "dark") setMode(savedMode);
  }, []);

  const theme  = THEMES.find((t) => t.name === activeTheme)!;
  const colors = mode === "dark" ? theme.dark : theme.light;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--background",    colors.background);
    root.style.setProperty("--surface",       colors.surface);
    root.style.setProperty("--surface-2",     colors.surface);
    root.style.setProperty("--border",        colors.border);
    root.style.setProperty("--text",          colors.text);
    root.style.setProperty("--text-muted",    colors.muted);
    root.style.setProperty("--primary",       colors.primary);
    root.style.setProperty("--primary-glow",  `${colors.primary}44`);
    root.style.setProperty("--accent",        colors.accent);
    document.body.style.background = colors.background;
    document.body.style.color      = colors.text;
    localStorage.setItem(STORAGE_KEY_THEME, activeTheme);
    localStorage.setItem(STORAGE_KEY_MODE,  mode);
  }, [activeTheme, mode, colors]);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install vartheme");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-18px) rotate(-2deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(2deg); }
          50%       { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50%       { transform: translateY(-20px) rotate(-1deg); }
        }
        @keyframes float4 {
          0%, 100% { transform: translateY(0px) rotate(3deg); }
          50%       { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0.7; transform: scale(1.08); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 80px",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.5s ease",
        }}
      >
        {/* Big background glow */}
        <div style={{
          position: "absolute",
          top: "30%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700, height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.primary}30, transparent 65%)`,
          transition: "background 0.6s ease",
          pointerEvents: "none",
          animation: "pulse-glow 4s ease-in-out infinite",
          zIndex: 0,
        }} />

        {/* ── Floating Cards ── */}

        {/* Card 1 — top left — mock navbar */}
        <div style={{
          position: "absolute",
          top: "12%", left: "4%",
          width: 260,
          background: `${colors.surface}CC`,
          border: `1px solid ${colors.border}`,
          borderRadius: 16,
          padding: "14px 18px",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: `0 20px 60px ${colors.primary}22`,
          animation: "float1 5s ease-in-out infinite",
          transition: "all 0.5s ease",
          zIndex: 1,
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontWeight: 700, color: colors.primary, fontSize: 14, transition: "color 0.5s ease" }}>MyApp</div>
            <div style={{ display: "flex", gap: 8 }}>
              {["Home", "Docs"].map(l => (
                <span key={l} style={{ fontSize: 11, color: colors.muted }}>{l}</span>
              ))}
              <div style={{ background: colors.primary, color: "#fff", borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 600, transition: "background 0.5s ease" }}>
                Start
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 — top right — color palette */}
        <div style={{
          position: "absolute",
          top: "10%", right: "4%",
          width: 220,
          background: `${colors.surface}CC`,
          border: `1px solid ${colors.border}`,
          borderRadius: 16,
          padding: "16px 18px",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: `0 20px 60px ${colors.primary}22`,
          animation: "float2 6s ease-in-out infinite",
          transition: "all 0.5s ease",
          zIndex: 1,
        }}>
          <div style={{ fontSize: 11, color: colors.muted, marginBottom: 12 }}>Active Theme</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[colors.primary, colors.accent, colors.surface, colors.border, colors.text].map((c, i) => (
              <div key={i} style={{
                width: 28, height: 28, borderRadius: 8,
                background: c,
                border: `1px solid ${colors.border}`,
                transition: "background 0.5s ease",
              }} />
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: colors.primary, fontWeight: 600, transition: "color 0.5s ease" }}>
            {activeTheme.charAt(0).toUpperCase() + activeTheme.slice(1)}
          </div>
        </div>

        {/* Card 3 — left middle — stat card */}
        <div style={{
          position: "absolute",
          top: "52%", left: "2%",
          width: 200,
          background: `${colors.surface}CC`,
          border: `1px solid ${colors.border}`,
          borderRadius: 16,
          padding: "18px",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: `0 20px 60px ${colors.primary}22`,
          animation: "float3 7s ease-in-out infinite",
          transition: "all 0.5s ease",
          zIndex: 1,
        }}>
          <div style={{ fontSize: 11, color: colors.muted, marginBottom: 6 }}>Bundle Size</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: colors.primary, transition: "color 0.5s ease" }}>~7kb</div>
          <div style={{ fontSize: 11, color: colors.muted, marginTop: 4 }}>Zero dependencies</div>
          <div style={{
            marginTop: 12,
            height: 4, borderRadius: 4,
            background: colors.border,
            overflow: "hidden",
          }}>
            <div style={{
              width: "25%", height: "100%",
              background: colors.primary,
              borderRadius: 4,
              transition: "background 0.5s ease",
            }} />
          </div>
        </div>

        {/* Card 4 — right middle — code snippet */}
        <div style={{
          position: "absolute",
          top: "50%", right: "2%",
          width: 240,
          background: `${colors.surface}CC`,
          border: `1px solid ${colors.border}`,
          borderRadius: 16,
          padding: "16px 18px",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: `0 20px 60px ${colors.primary}22`,
          animation: "float4 5.5s ease-in-out infinite",
          transition: "all 0.5s ease",
          zIndex: 1,
          fontFamily: "monospace",
        }}>
          <div style={{ fontSize: 10, color: colors.muted, marginBottom: 10 }}>Quick Start</div>
          <div style={{ fontSize: 12, lineHeight: 1.8 }}>
            <span style={{ color: colors.accent }}>import</span>
            <span style={{ color: colors.text }}> {"{ "}</span>
            <span style={{ color: colors.primary }}>ThemeProvider</span>
            <span style={{ color: colors.text }}>{" }"}</span>
            <br />
            <span style={{ color: colors.accent }}>from</span>
            <span style={{ color: "#10B981" }}> 'vartheme'</span>
            <br /><br />
            <span style={{ color: colors.text }}>{"<"}</span>
            <span style={{ color: colors.primary }}>ThemeProvider</span>
            <br />
            <span style={{ color: colors.muted, paddingLeft: 12 }}>theme</span>
            <span style={{ color: colors.text }}>="</span>
            <span style={{ color: "#10B981" }}>{activeTheme}</span>
            <span style={{ color: colors.text }}>"</span>
            <br />
            <span style={{ color: colors.text }}>{">"}</span>
          </div>
        </div>

        {/* Card 5 — bottom left — toggle preview */}
        <div style={{
          position: "absolute",
          bottom: "12%", left: "6%",
          width: 180,
          background: `${colors.surface}CC`,
          border: `1px solid ${colors.border}`,
          borderRadius: 16,
          padding: "16px 18px",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: `0 20px 60px ${colors.primary}22`,
          animation: "float2 8s ease-in-out infinite",
          transition: "all 0.5s ease",
          zIndex: 1,
        }}>
          <div style={{ fontSize: 11, color: colors.muted, marginBottom: 12 }}>Theme Toggle</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{
              width: 42, height: 42, borderRadius: "50%",
              background: mode === "dark"
                ? `radial-gradient(circle, #1E293B, #0F172A)`
                : `radial-gradient(circle, #FEF3C7, #FDE68A)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20,
              boxShadow: mode === "dark"
                ? `0 0 16px ${colors.primary}66`
                : `0 0 16px #FCD34D88`,
              transition: "all 0.5s ease",
            }}>
              {mode === "dark" ? "🌙" : "☀️"}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: colors.text }}>
                {mode === "dark" ? "Dark" : "Light"}
              </div>
              <div style={{ fontSize: 10, color: colors.muted }}>Auto saved</div>
            </div>
          </div>
        </div>

        {/* Card 6 — bottom right — themes count */}
        <div style={{
          position: "absolute",
          bottom: "10%", right: "5%",
          width: 200,
          background: `${colors.surface}CC`,
          border: `1px solid ${colors.border}`,
          borderRadius: 16,
          padding: "16px 18px",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: `0 20px 60px ${colors.primary}22`,
          animation: "float1 6.5s ease-in-out infinite",
          transition: "all 0.5s ease",
          zIndex: 1,
        }}>
          <div style={{ fontSize: 11, color: colors.muted, marginBottom: 10 }}>Built-in Themes</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {THEMES.map((t) => {
              const tc = mode === "dark" ? t.dark : t.light;
              return (
                <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: tc.primary,
                    transition: "background 0.5s ease",
                    boxShadow: activeTheme === t.name ? `0 0 6px ${tc.primary}` : "none",
                  }} />
                  <span style={{
                    fontSize: 12,
                    color: activeTheme === t.name ? tc.primary : colors.muted,
                    fontWeight: activeTheme === t.name ? 600 : 400,
                    transition: "color 0.5s ease",
                  }}>
                    {t.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Center Content ── */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: `${colors.surface}CC`,
            border: `1px solid ${colors.border}`,
            borderRadius: 100, padding: "6px 16px",
            fontSize: 13, color: colors.muted,
            marginBottom: 32,
            backdropFilter: "blur(8px)",
            animation: "fade-up 0.6s ease forwards",
            transition: "all 0.5s ease",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
            v0.1.0 — Now Live on npm
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 800,
            textAlign: "center",
            letterSpacing: "-2px",
            lineHeight: 1.1,
            marginBottom: 24,
            color: colors.text,
            maxWidth: 700,
            animation: "fade-up 0.6s ease 0.1s both",
            transition: "color 0.5s ease",
          }}>
            Dark mode for React,{" "}
            <span style={{ color: colors.primary, transition: "color 0.5s ease" }}>
              finally simple.
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 18,
            color: colors.muted,
            textAlign: "center",
            maxWidth: 480,
            lineHeight: 1.7,
            marginBottom: 40,
            animation: "fade-up 0.6s ease 0.2s both",
            transition: "color 0.5s ease",
          }}>
            Zero config, CSS variable based theme switching.
            5 beautiful themes. Animated toggle. Under 7kb.
          </p>

          {/* Install command */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            marginBottom: 40,
            animation: "fade-up 0.6s ease 0.3s both",
          }}>
            <div style={{
              background: `${colors.surface}CC`,
              border: `1px solid ${colors.border}`,
              borderRadius: 12, padding: "14px 24px",
              fontFamily: "monospace", fontSize: 15,
              color: colors.text,
              display: "flex", alignItems: "center", gap: 10,
              backdropFilter: "blur(8px)",
              transition: "all 0.5s ease",
            }}>
              <span style={{ color: colors.muted }}>$</span>
              npm install vartheme
            </div>
            <button
              onClick={handleCopy}
              style={{
                background: copied ? "#10B981" : colors.primary,
                color: "white", border: "none",
                borderRadius: 12, padding: "14px 24px",
                fontSize: 15, fontWeight: 600, cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: `0 8px 24px ${colors.primary}44`,
              }}
            >
              {copied ? "Copied! ✓" : "Copy"}
            </button>
          </div>

          {/* Light/Dark toggle */}
          <div style={{
            display: "flex",
            background: `${colors.surface}CC`,
            border: `1px solid ${colors.border}`,
            borderRadius: 100, padding: 4, gap: 4,
            marginBottom: 16,
            backdropFilter: "blur(8px)",
            animation: "fade-up 0.6s ease 0.4s both",
            transition: "all 0.5s ease",
          }}>
            {(["light", "dark"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)} style={{
                padding: "6px 20px", borderRadius: 100, border: "none",
                background: mode === m ? colors.primary : "transparent",
                color: mode === m ? "white" : colors.muted,
                fontSize: 14, fontWeight: mode === m ? 600 : 400,
                cursor: "pointer", transition: "all 0.3s ease",
              }}>
                {m === "light" ? "☀️ Light" : "🌙 Dark"}
              </button>
            ))}
          </div>

          {/* Theme switcher */}
          <div style={{
            display: "flex", gap: 10,
            flexWrap: "wrap", justifyContent: "center",
            animation: "fade-up 0.6s ease 0.5s both",
          }}>
            {THEMES.map((t) => {
              const tc = mode === "dark" ? t.dark : t.light;
              return (
                <button key={t.name} onClick={() => setActiveTheme(t.name)} style={{
                  padding: "8px 20px", borderRadius: 100,
                  border: `2px solid ${activeTheme === t.name ? tc.primary : colors.border}`,
                  background: activeTheme === t.name ? `${tc.primary}22` : `${colors.surface}CC`,
                  color: activeTheme === t.name ? tc.primary : colors.muted,
                  fontSize: 14, fontWeight: activeTheme === t.name ? 600 : 400,
                  cursor: "pointer", transition: "all 0.3s ease",
                  backdropFilter: "blur(8px)",
                }}>
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}