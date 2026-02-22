"use client";

const features = [
  {
    icon: "⚡",
    title: "Zero Config",
    desc: "No setup, no configuration. Just wrap your app and you're done.",
  },
  {
    icon: "🎨",
    title: "5 Built-in Themes",
    desc: "Default, Ocean, Forest, Sunset, Rose — beautiful out of the box.",
  },
  {
    icon: "🌙",
    title: "Animated Toggle",
    desc: "Smooth sun to moon animation. No external icon library needed.",
  },
  {
    icon: "💾",
    title: "Persistent",
    desc: "Theme saved in localStorage. Survives page refresh automatically.",
  },
  {
    icon: "🖥️",
    title: "System Detection",
    desc: "Detects OS dark/light preference and applies it automatically.",
  },
  {
    icon: "📦",
    title: "Under 7kb",
    desc: "Tiny bundle size. Won't slow down your app. Zero dependencies.",
  },
  {
    icon: "🔷",
    title: "TypeScript Ready",
    desc: "Full TypeScript support with types included out of the box.",
  },
  {
    icon: "🎯",
    title: "CSS Variables",
    desc: "Auto injects CSS variables. Use them anywhere in your styles.",
  },
];

export default function Features() {
  return (
    <section
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "80px 24px",
      }}
    >
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-1px",
            marginBottom: 16,
          }}
        >
          Everything you need,{" "}
          <span style={{ color: "var(--primary)" }}>nothing you don't.</span>
        </h2>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: 16,
            maxWidth: 480,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          vartheme is focused, small, and does one thing really well —
          beautiful theming with zero effort.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20,
        }}
      >
        {features.map((f, i) => (
          <div
            key={i}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: "28px 24px",
              transition: "border-color 0.3s ease, transform 0.3s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--primary)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                marginBottom: 8,
                color: "var(--text)",
              }}
            >
              {f.title}
            </div>
            <div
              style={{
                fontSize: 14,
                color: "var(--text-muted)",
                lineHeight: 1.7,
              }}
            >
              {f.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}