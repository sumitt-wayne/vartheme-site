"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CodeBlock from "@/components/CodeBlock";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

const INSTALL_CODE = `npm install vartheme`;

const USAGE_CODE = `import { ThemeProvider, ThemeToggle } from 'vartheme'

export default function App() {
  return (
    <ThemeProvider theme="ocean" mode="dark">
      <YourApp />
    </ThemeProvider>
  )
}`;

const HOOK_CODE = `import { useThemeContext } from 'vartheme'

function Navbar() {
  const { resolvedMode, toggle, setTheme } = useThemeContext()

  return (
    <div>
      <button onClick={toggle}>
        {resolvedMode === 'dark' ? '☀️' : '🌙'}
      </button>

      <button onClick={() => setTheme('ocean')}>
        Ocean
      </button>
    </div>
  )
}`;

const CSS_CODE = `.card {
  background: var(--vt-surface);
  color: var(--vt-text);
  border: 1px solid var(--vt-border);
}

.button {
  background: var(--vt-primary);
  color: white;
}`;

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Stats />

      {/* Code Section */}
      <section
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "80px 24px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              marginBottom: 16,
            }}
          >
            Simple <span style={{ color: "var(--primary)" }}>by design.</span>
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 16,
              lineHeight: 1.7,
            }}
          >
            Get started in minutes. No boilerplate, no complexity.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 13,
                marginBottom: 10,
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              01 — Install
            </p>
            <CodeBlock code={INSTALL_CODE} language="bash" />
          </div>

          <div>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 13,
                marginBottom: 10,
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              02 — Wrap your app
            </p>
            <CodeBlock code={USAGE_CODE} language="tsx" />
          </div>

          <div>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 13,
                marginBottom: 10,
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              03 — Use the hook
            </p>
            <CodeBlock code={HOOK_CODE} language="tsx" />
          </div>

          <div>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 13,
                marginBottom: 10,
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              04 — Use CSS variables
            </p>
            <CodeBlock code={CSS_CODE} language="css" />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
