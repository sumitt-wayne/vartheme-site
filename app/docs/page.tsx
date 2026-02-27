"use client";

import { useEffect, useState } from "react";
import CodeBlock from "@/components/CodeBlock";

const STORAGE_KEY_THEME = "vartheme-site-theme";
const STORAGE_KEY_MODE = "vartheme-site-mode";

const THEMES_COLORS: Record<string, { primary: string; background: string; surface: string; text: string; border: string; muted: string }> = {
  default: { primary: "#A78BFA", background: "#0A0A0F", surface: "#111118", text: "#F8FAFC", border: "#2A2A3A", muted: "#64748B" },
  ocean:   { primary: "#38BDF8", background: "#0C1A2E", surface: "#0F2744", text: "#E0F2FE", border: "#1E3A5F", muted: "#4A7A9B" },
  forest:  { primary: "#4ADE80", background: "#0A1F0F", surface: "#0F2D17", text: "#DCFCE7", border: "#166534", muted: "#4A7A5A" },
  sunset:  { primary: "#FB923C", background: "#1A0A00", surface: "#2D1200", text: "#FFEDD5", border: "#7C2D12", muted: "#8B5A3A" },
  rose:    { primary: "#FB7185", background: "#1A0008", surface: "#2D000F", text: "#FFE4E6", border: "#881337", muted: "#8B3A4A" },
};

const THEMES_LIGHT: Record<string, { primary: string; background: string; surface: string; text: string; border: string; muted: string }> = {
  default: { primary: "#7C3AED", background: "#FFFFFF", surface: "#F8FAFC", text: "#0F172A", border: "#E2E8F0", muted: "#94A3B8" },
  ocean:   { primary: "#0284C7", background: "#F0F9FF", surface: "#E0F2FE", text: "#0C4A6E", border: "#BAE6FD", muted: "#7CB9D8" },
  forest:  { primary: "#16A34A", background: "#F0FDF4", surface: "#DCFCE7", text: "#14532D", border: "#BBF7D0", muted: "#7AAF8A" },
  sunset:  { primary: "#EA580C", background: "#FFF7ED", surface: "#FFEDD5", text: "#431407", border: "#FED7AA", muted: "#B8845A" },
  rose:    { primary: "#E11D48", background: "#FFF1F2", surface: "#FFE4E6", text: "#4C0519", border: "#FECDD3", muted: "#B87A8A" },
};

const sections = [
  { id: "installation", label: "Installation" },
  { id: "basic-usage", label: "Basic Usage" },
  { id: "themes", label: "Themes" },
  { id: "hook", label: "useThemeContext" },
  { id: "css-variables", label: "CSS Variables" },
  { id: "tailwind", label: "Tailwind Plugin" },
  { id: "typescript", label: "TypeScript" },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("installation");
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [activeTheme, setActiveTheme] = useState("default");
  
  // New state for installation tabs
  const [installMethod, setInstallMethod] = useState<"npm" | "yarn" | "pnpm">("npm");

  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
    const savedMode = localStorage.getItem(STORAGE_KEY_MODE);
    if (savedTheme) setActiveTheme(savedTheme);
    if (savedMode === "light" || savedMode === "dark") setMode(savedMode);
  }, []);

  const colors = mode === "dark"
    ? THEMES_COLORS[activeTheme] || THEMES_COLORS.default
    : THEMES_LIGHT[activeTheme] || THEMES_LIGHT.default;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--background", colors.background);
    root.style.setProperty("--surface", colors.surface);
    root.style.setProperty("--border", colors.border);
    root.style.setProperty("--text", colors.text);
    root.style.setProperty("--text-muted", colors.muted);
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--primary-glow", `${colors.primary}44`);
    document.body.style.background = colors.background;
    document.body.style.color = colors.text;
  }, [activeTheme, mode, colors]);

  const codeHelper = (c: string) => (
    <code style={{
      color: colors.primary,
      background: `${colors.primary}18`,
      padding: "2px 8px",
      borderRadius: 4,
      fontSize: 13,
    }}>{c}</code>
  );

  const installCommands = {
    npm: "npm install vartheme",
    yarn: "yarn add vartheme",
    pnpm: "pnpm add vartheme"
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", color: "var(--text)", transition: "all 0.4s ease" }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "100px 24px 80px",
        display: "flex", gap: 48,
      }}>

        {/* Sidebar */}
        <aside style={{
          width: 220, flexShrink: 0,
          position: "sticky", top: 100,
          height: "fit-content",
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          <div style={{ fontSize: 11, color: colors.muted, fontWeight: 600, letterSpacing: 1, marginBottom: 12, textTransform: "uppercase" }}>
            Documentation
          </div>
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setActiveSection(s.id)}
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                fontSize: 14,
                color: activeSection === s.id ? colors.primary : colors.muted,
                background: activeSection === s.id ? `${colors.primary}18` : "transparent",
                border: `1px solid ${activeSection === s.id ? colors.primary + "44" : "transparent"}`,
                textDecoration: "none",
                transition: "all 0.2s ease",
                fontWeight: activeSection === s.id ? 600 : 400,
              }}
            >
              {s.label}
            </a>
          ))}

          <div style={{ height: 1, background: colors.border, margin: "16px 0" }} />

          <a href="https://www.npmjs.com/package/vartheme" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: colors.muted, textDecoration: "none", padding: "6px 14px" }}>
            📦 npm
          </a>
          <a href="https://github.com/sumitt-wayne/vartheme" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: colors.muted, textDecoration: "none", padding: "6px 14px" }}>
            🔷 GitHub
          </a>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 72 }}>

          {/* Page Title */}
          <div>
            <h1 style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 16, color: colors.text }}>
              Documentation
            </h1>
            <p style={{ color: colors.muted, fontSize: 18, lineHeight: 1.8, maxWidth: 600 }}>
              Build beautiful, themeable React interfaces with minimal effort. Vartheme handles the heavy lifting of CSS variables and state management.
            </p>
          </div>

          {/* Installation Section with Tabs */}
          <section id="installation">
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, color: colors.text, letterSpacing: "-0.5px" }}>
              Installation
            </h2>
            <p style={{ color: colors.muted, marginBottom: 24, lineHeight: 1.7 }}>
              Install the package via your preferred package manager.
            </p>
            
            <div style={{ 
              background: colors.surface, 
              border: `1px solid ${colors.border}`, 
              borderRadius: 12,
              overflow: "hidden" 
            }}>
              {/* Tab Headers */}
              <div style={{ 
                display: "flex", 
                gap: 4, 
                padding: "12px 16px 0", 
                borderBottom: `1px solid ${colors.border}`,
                background: `${colors.background}50`
              }}>
                {(["npm", "yarn", "pnpm"] as const).map((method) => (
                  <button
                    key={method}
                    onClick={() => setInstallMethod(method)}
                    style={{
                      padding: "8px 16px",
                      fontSize: 13,
                      fontWeight: 600,
                      background: installMethod === method ? colors.background : "transparent",
                      color: installMethod === method ? colors.primary : colors.muted,
                      border: "none",
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                      borderBottom: installMethod === method ? `2px solid ${colors.primary}` : "2px solid transparent",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {method}
                  </button>
                ))}
              </div>
              {/* Code Area */}
              <div style={{ padding: 20 }}>
                <CodeBlock 
                  code={installCommands[installMethod]} 
                  language="bash" 
                />
              </div>
            </div>
          </section>

          {/* Basic Usage */}
          <section id="basic-usage">
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, color: colors.text, letterSpacing: "-0.5px" }}>
              Basic Usage
            </h2>
            <p style={{ color: colors.muted, marginBottom: 20, lineHeight: 1.7 }}>
              Simply wrap your root component with {codeHelper("ThemeProvider")}. This provides the context for themes and handles automatic CSS variable injection.
            </p>
            <CodeBlock
              code={`import { ThemeProvider, ThemeToggle } from 'vartheme'

export default function App() {
  return (
    <ThemeProvider theme="ocean" mode="dark">
      <YourApp />
    </ThemeProvider>
  )
}`}
              language="tsx"
            />
            <p style={{ color: colors.muted, marginTop: 24, marginBottom: 20, lineHeight: 1.7 }}>
              Add the built-in animated toggle anywhere:
            </p>
            <CodeBlock
              code={`import { ThemeToggle } from 'vartheme'

function Navbar() {
  return (
    <nav>
      <h1>My App</h1>
      <ThemeToggle size={48} />
    </nav>
  )
}`}
              language="tsx"
            />
          </section>

          {/* Themes */}
          <section id="themes">
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, color: colors.text, letterSpacing: "-0.5px" }}>
              Themes
            </h2>
            <p style={{ color: colors.muted, marginBottom: 24, lineHeight: 1.7 }}>
              Vartheme comes with 5 hand-crafted color palettes.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
              {[
                { name: "default", primary: "#7C3AED", label: "Modern Purple" },
                { name: "ocean",   primary: "#0284C7", label: "Deep Sea" },
                { name: "forest",  primary: "#16A34A", label: "Evergreen" },
                { name: "sunset",  primary: "#EA580C", label: "Evening Glow" },
                { name: "rose",    primary: "#E11D48", label: "Velvet Rose" },
              ].map((t) => (
                <div key={t.name} onClick={() => setActiveTheme(t.name)} style={{
                  background: colors.surface,
                  border: `1px solid ${activeTheme === t.name ? colors.primary : colors.border}`,
                  borderRadius: 14, padding: 20,
                  display: "flex", flexDirection: "column", gap: 12,
                  cursor: "pointer", transition: "all 0.2s"
                }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: t.primary, boxShadow: `0 0 15px ${t.primary}44` }} />
                  <div>
                    <div style={{ fontSize: 14, color: colors.text, fontWeight: 700 }}>{t.name.charAt(0).toUpperCase() + t.name.slice(1)}</div>
                    <div style={{ fontSize: 11, color: colors.muted }}>{t.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <CodeBlock
              code={`// Easily switch between presets:
<ThemeProvider theme="rose">
<ThemeProvider theme="sunset">
<ThemeProvider theme="forest">`}
              language="tsx"
            />
          </section>

          {/* Hook */}
          <section id="hook">
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, color: colors.text, letterSpacing: "-0.5px" }}>
              useThemeContext
            </h2>
            <p style={{ color: colors.muted, marginBottom: 20, lineHeight: 1.7 }}>
              Access theme state and controls from any component.
            </p>
            <CodeBlock
              code={`import { useThemeContext } from 'vartheme'

function CustomControls() {
  const { mode, theme, toggle, setTheme } = useThemeContext()

  return (
    <button onClick={toggle}>Toggle Appearance</button>
  )
}`}
              language="tsx"
            />
          </section>

          {/* CSS Variables */}
          <section id="css-variables">
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, color: colors.text, letterSpacing: "-0.5px" }}>
              CSS Variables
            </h2>
            <div style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 16, overflow: "hidden", marginBottom: 24 }}>
              {[
                { var: "--vt-primary",    desc: "The core brand color" },
                { var: "--vt-background", desc: "Base page color" },
                { var: "--vt-surface",    desc: "Cards and Modals" },
                { var: "--vt-text",       desc: "Primary text color" },
              ].map((v, i) => (
                <div key={v.var} style={{ display: "flex", justifyContent: "space-between", padding: "16px 24px", borderBottom: i < 3 ? `1px solid ${colors.border}` : "none" }}>
                  <code style={{ fontSize: 13, color: colors.primary }}>{v.var}</code>
                  <span style={{ fontSize: 13, color: colors.muted }}>{v.desc}</span>
                </div>
              ))}
            </div>
            <CodeBlock
              code={`.card { background: var(--vt-surface); color: var(--vt-text); }`}
              language="css"
            />
          </section>

          {/* Tailwind Plugin */}
          <section id="tailwind">
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, color: colors.text, letterSpacing: "-0.5px" }}>
              Tailwind Plugin
            </h2>
            <CodeBlock
              code={`// tailwind.config.js
const { varthemePlugin } = require('vartheme/tailwind')

module.exports = {
  plugins: [varthemePlugin],
}`}
              language="js"
            />
            <p style={{ color: colors.muted, marginTop: 24, marginBottom: 16 }}>Example usage:</p>
            <CodeBlock
              code={`<div className="bg-vt-surface text-vt-primary">Hello World</div>`}
              language="tsx"
            />
          </section>

          {/* TypeScript */}
          <section id="typescript">
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, color: colors.text, letterSpacing: "-0.5px" }}>
              TypeScript
            </h2>
            <CodeBlock
              code={`import { ThemeName, ThemeColors } from 'vartheme'`}
              language="tsx"
            />
          </section>

          <div style={{ height: 100 }} />
        </main>
      </div>
    </div>
  );
}