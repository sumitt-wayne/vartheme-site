"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CustomColors {
  primary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
}

const PRESETS = [
  {
    name: "Violet",
    primary: "#7C3AED",
    accent: "#06B6D4",
    background: "#0A0A0F",
    surface: "#111118",
    text: "#F8FAFC",
  },
  {
    name: "Ocean",
    primary: "#0284C7",
    accent: "#0D9488",
    background: "#0C1A2E",
    surface: "#0F2744",
    text: "#E0F2FE",
  },
  {
    name: "Forest",
    primary: "#16A34A",
    accent: "#84CC16",
    background: "#0A1F0F",
    surface: "#0F2D17",
    text: "#DCFCE7",
  },
  {
    name: "Sunset",
    primary: "#EA580C",
    accent: "#DB2777",
    background: "#1A0A00",
    surface: "#2D1200",
    text: "#FFEDD5",
  },
  {
    name: "Rose",
    primary: "#E11D48",
    accent: "#BE185D",
    background: "#1A0008",
    surface: "#2D000F",
    text: "#FFE4E6",
  },
];

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  const hNorm = h / 360,
    sNorm = s / 100,
    lNorm = l / 100;
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  let r, g, b;
  if (sNorm === 0) {
    r = g = b = lNorm;
  } else {
    const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
    const p = 2 * lNorm - q;
    r = hue2rgb(p, q, hNorm + 1 / 3);
    g = hue2rgb(p, q, hNorm);
    b = hue2rgb(p, q, hNorm - 1 / 3);
  }
  return `#${Math.round(r * 255)
    .toString(16)
    .padStart(2, "0")}${Math.round(g * 255)
    .toString(16)
    .padStart(2, "0")}${Math.round(b * 255)
    .toString(16)
    .padStart(2, "0")}`;
}

export default function NotFound() {
  const [colors, setColors] = useState<CustomColors>(PRESETS[0]);
  const [hue, setHue] = useState(270);
  const [sat, setSat] = useState(70);
  const [lit, setLit] = useState(60);
  const [accentHue, setAccentHue] = useState(190);
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState("Violet");

  useEffect(() => {
    const primary = hslToHex(hue, sat, lit);
    const accent = hslToHex(accentHue, sat, lit);
    setColors((prev) => ({ ...prev, primary, accent }));
  }, [hue, sat, lit, accentHue]);

  const generatedCode = `<ThemeProvider
  theme="custom"
  colors={{
    primary: "${colors.primary}",
    accent:  "${colors.accent}",
  }}
>
  <App />
</ThemeProvider>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePreset = (preset: (typeof PRESETS)[0]) => {
    setColors(preset);
    setActivePreset(preset.name);
    const [h, s, l] = hexToHsl(preset.primary);
    const [ah] = hexToHsl(preset.accent);
    setHue(h);
    setSat(s);
    setLit(l);
    setAccentHue(ah);
  };

  const sliders = [
    {
      label: "Primary Hue",
      value: hue,
      set: setHue,
      min: 0,
      max: 360,
      color: colors.primary,
    },
    {
      label: "Saturation",
      value: sat,
      set: setSat,
      min: 0,
      max: 100,
      color: colors.primary,
    },
    {
      label: "Lightness",
      value: lit,
      set: setLit,
      min: 20,
      max: 80,
      color: colors.primary,
    },
    {
      label: "Accent Hue",
      value: accentHue,
      set: setAccentHue,
      min: 0,
      max: 360,
      color: colors.accent,
    },
  ];

  return (
    <>
      <style>{`
        @keyframes orb1 { 0%,100%{transform:translate(0,0)}50%{transform:translate(40px,-40px)} }
        @keyframes orb2 { 0%,100%{transform:translate(0,0)}50%{transform:translate(-40px,40px)} }
        @keyframes fade-up { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)} }
        @keyframes blink { 0%,100%{opacity:1}50%{opacity:0} }
        @keyframes spin-slow { from{transform:rotate(0deg)}to{transform:rotate(360deg)} }
        .slider-track { -webkit-appearance:none; appearance:none; height:6px; border-radius:4px; outline:none; cursor:pointer; transition:all 0.3s ease; }
        .slider-track::-webkit-slider-thumb { -webkit-appearance:none; width:18px; height:18px; border-radius:50%; cursor:pointer; border:2px solid white; box-shadow:0 2px 8px rgba(0,0,0,0.4); }
        .preset-btn:hover { transform:translateY(-2px); }
        .copy-btn:hover { filter:brightness(1.1); transform:translateY(-1px); }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: colors.background,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          transition: "background 0.4s ease",
          padding: "40px 24px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle, ${colors.primary}33 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
            opacity: 0.4,
            transition: "all 0.4s ease",
            pointerEvents: "none",
          }}
        />

        {/* Orbs */}
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "5%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${colors.primary}22, transparent 65%)`,
            filter: "blur(60px)",
            animation: "orb1 8s ease-in-out infinite",
            transition: "background 0.4s ease",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            right: "5%",
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${colors.accent}22, transparent 65%)`,
            filter: "blur(60px)",
            animation: "orb2 10s ease-in-out infinite",
            transition: "background 0.4s ease",
            pointerEvents: "none",
          }}
        />

        {/* Spinning rings */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            border: `1px solid ${colors.primary}18`,
            animation: "spin-slow 25s linear infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 450,
            height: 450,
            borderRadius: "50%",
            border: `1px dashed ${colors.accent}18`,
            animation: "spin-slow 18s linear infinite reverse",
            pointerEvents: "none",
          }}
        />

        {/* Back link */}
        <Link
          href="/"
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            color: colors.primary,
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: `${colors.surface}CC`,
            border: `1px solid ${colors.primary}44`,
            borderRadius: 10,
            padding: "8px 16px",
            backdropFilter: "blur(12px)",
            transition: "all 0.3s ease",
            zIndex: 10,
          }}
        >
          ← Home
        </Link>

        {/* Main card */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: 900,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            animation: "fade-up 0.6s ease both",
          }}
        >
          {/* Left — Controls */}
          <div
            style={{
              background: `${colors.surface}CC`,
              border: `1px solid ${colors.primary}33`,
              borderRadius: 24,
              padding: 28,
              backdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {/* Header */}
            <div>
              <div
                style={{
                  fontSize: "clamp(72px, 12vw, 120px)",
                  fontWeight: 900,
                  letterSpacing: "-4px",
                  lineHeight: 1,
                  marginBottom: 8,
                  backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  transition: "all 0.4s ease",
                  fontFamily: "monospace",
                }}
              >
                404
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: colors.accent,
                  fontWeight: 700,
                  letterSpacing: 2,
                  marginBottom: 6,
                  fontFamily: "monospace",
                }}
              >
                PAGE NOT FOUND
              </div>
              <h1
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  letterSpacing: "-1px",
                  lineHeight: 1.1,
                  color: colors.text,
                }}
              >
                Theme
                <span style={{ color: colors.primary }}> Mixer</span>
                <br />
                Lab 🧪
              </h1>
              <p
                style={{
                  color: colors.text,
                  opacity: 0.5,
                  fontSize: 13,
                  marginTop: 8,
                  lineHeight: 1.6,
                }}
              >
                You got lost — but now you can build your own theme! Tweak the
                sliders and copy the code.
              </p>
            </div>

            {/* Presets */}
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: colors.text,
                  opacity: 0.4,
                  marginBottom: 10,
                  fontFamily: "monospace",
                }}
              >
                PRESETS
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {PRESETS.map((p) => (
                  <button
                    key={p.name}
                    className="preset-btn"
                    onClick={() => handlePreset(p)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 100,
                      border: `2px solid ${activePreset === p.name ? p.primary : `${colors.text}22`}`,
                      background:
                        activePreset === p.name
                          ? `${p.primary}22`
                          : "transparent",
                      color: activePreset === p.name ? p.primary : colors.text,
                      fontSize: 12,
                      fontWeight: activePreset === p.name ? 700 : 400,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      opacity: activePreset === p.name ? 1 : 0.6,
                    }}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div
                style={{
                  fontSize: 11,
                  color: colors.text,
                  opacity: 0.4,
                  fontFamily: "monospace",
                }}
              >
                CUSTOMIZE
              </div>
              {sliders.map((s) => (
                <div key={s.label}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{ fontSize: 12, color: colors.text, opacity: 0.7 }}
                    >
                      {s.label}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        color: s.color,
                        fontWeight: 700,
                        fontFamily: "monospace",
                      }}
                    >
                      {s.value}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={s.min}
                    max={s.max}
                    value={s.value}
                    onChange={(e) => s.set(Number(e.target.value))}
                    className="slider-track"
                    style={{
                      width: "100%",
                      background: `linear-gradient(90deg, ${s.color} ${((s.value - s.min) / (s.max - s.min)) * 100}%, ${colors.primary}33 0%)`,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Color preview dots */}
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div
                style={{
                  fontSize: 11,
                  color: colors.text,
                  opacity: 0.4,
                  fontFamily: "monospace",
                }}
              >
                COLORS
              </div>
              {[colors.primary, colors.accent, colors.surface, colors.text].map(
                (c, i) => (
                  <div
                    key={i}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: c,
                      border: `1px solid ${colors.primary}33`,
                      boxShadow: `0 4px 12px ${c}44`,
                      transition: "all 0.3s ease",
                    }}
                  />
                ),
              )}
            </div>
          </div>

          {/* Right — Preview + Code */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Live Preview */}
            <div
              style={{
                background: `${colors.surface}CC`,
                border: `1px solid ${colors.primary}33`,
                borderRadius: 24,
                padding: 24,
                backdropFilter: "blur(20px)",
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: colors.text,
                  opacity: 0.4,
                  marginBottom: 16,
                  fontFamily: "monospace",
                }}
              >
                LIVE PREVIEW
              </div>

              {/* Mock UI */}
              <div
                style={{
                  background: colors.background,
                  border: `1px solid ${colors.primary}22`,
                  borderRadius: 16,
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
              >
                {/* Mock navbar */}
                <div
                  style={{
                    padding: "12px 16px",
                    borderBottom: `1px solid ${colors.primary}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: `${colors.surface}88`,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      color: colors.primary,
                      fontSize: 13,
                      transition: "color 0.3s ease",
                    }}
                  >
                    MyApp
                  </div>
                  <div
                    style={{
                      background: colors.primary,
                      color: "white",
                      borderRadius: 6,
                      padding: "3px 10px",
                      fontSize: 11,
                      fontWeight: 600,
                      transition: "background 0.3s ease",
                    }}
                  >
                    Get Started
                  </div>
                </div>

                {/* Mock content */}
                <div style={{ padding: 16 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: `${colors.primary}33`,
                      marginBottom: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                    }}
                  >
                    🎨
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: colors.text,
                      fontSize: 14,
                      marginBottom: 6,
                    }}
                  >
                    Your Theme
                  </div>
                  <div
                    style={{
                      color: colors.text,
                      opacity: 0.5,
                      fontSize: 12,
                      lineHeight: 1.6,
                      marginBottom: 12,
                    }}
                  >
                    This is how your app will look with the custom theme
                    applied.
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <div
                      style={{
                        background: colors.primary,
                        color: "white",
                        borderRadius: 8,
                        padding: "6px 14px",
                        fontSize: 11,
                        fontWeight: 600,
                        transition: "background 0.3s ease",
                        boxShadow: `0 4px 12px ${colors.primary}44`,
                      }}
                    >
                      Primary
                    </div>
                    <div
                      style={{
                        background: colors.accent,
                        color: "white",
                        borderRadius: 8,
                        padding: "6px 14px",
                        fontSize: 11,
                        fontWeight: 600,
                        transition: "background 0.3s ease",
                        boxShadow: `0 4px 12px ${colors.accent}44`,
                      }}
                    >
                      Accent
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Generated Code */}
            <div
              style={{
                background: `${colors.surface}CC`,
                border: `1px solid ${colors.primary}33`,
                borderRadius: 24,
                padding: 24,
                backdropFilter: "blur(20px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: colors.text,
                    opacity: 0.4,
                    fontFamily: "monospace",
                  }}
                >
                  YOUR THEME CODE
                </div>
                <button
                  className="copy-btn"
                  onClick={handleCopy}
                  style={{
                    background: copied
                      ? "#10B981"
                      : `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 16px",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: `0 4px 16px ${colors.primary}44`,
                  }}
                >
                  {copied ? "Copied ✓" : "Copy Code"}
                </button>
              </div>

              {/* Code block */}
              <pre
                style={{
                  background: colors.background,
                  border: `1px solid ${colors.primary}22`,
                  borderRadius: 12,
                  padding: 16,
                  fontSize: 12,
                  lineHeight: 1.8,
                  color: colors.text,
                  fontFamily: "monospace",
                  overflow: "auto",
                  margin: 0,
                }}
              >
                <code>
                  <span style={{ color: colors.accent }}>
                    {"<ThemeProvider"}
                  </span>
                  {"\n"}
                  {"  "}
                  <span style={{ color: colors.text, opacity: 0.6 }}>
                    theme
                  </span>
                  =<span style={{ color: "#10B981" }}>"custom"</span>
                  {"\n"}
                  {"  "}
                  <span style={{ color: colors.text, opacity: 0.6 }}>
                    colors
                  </span>
                  ={"{{"}
                  {"\n"}
                  {"    "}
                  <span style={{ color: colors.text, opacity: 0.6 }}>
                    primary
                  </span>
                  : <span style={{ color: "#10B981" }}>"{colors.primary}"</span>
                  ,{"\n"}
                  {"    "}
                  <span style={{ color: colors.text, opacity: 0.6 }}>
                    accent
                  </span>
                  : <span style={{ color: "#10B981" }}>"{colors.accent}"</span>,
                  {"\n"}
                  {"  "}
                  {"}}>"}
                  {"\n"}
                  {"  "}
                  <span style={{ color: colors.primary }}>{"<App />"}</span>
                  {"\n"}
                  <span style={{ color: colors.accent }}>
                    {"</ThemeProvider>"}
                  </span>
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            marginTop: 24,
            textAlign: "center",
            animation: "fade-up 0.6s ease 0.3s both",
          }}
        >
          <span style={{ color: colors.text, opacity: 0.3, fontSize: 13 }}>
            You found the secret lab 🧪 —
          </span>
          <Link
            href="/"
            style={{
              color: colors.primary,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            {" "}
            Go back home →
          </Link>
        </div>
      </div>
    </>
  );
}
