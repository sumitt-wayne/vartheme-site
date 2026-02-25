"use client";

import { useEffect, useState } from "react";

interface StatsData {
  stars: number;
  downloads: number;
}

export default function Stats() {
  const [stats, setStats] = useState<StatsData>({ stars: 0, downloads: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        // GitHub stars
        const ghRes = await fetch(
          "https://api.github.com/repos/sumitt-wayne/vartheme"
        );
        const ghData = await ghRes.json();

        // npm downloads
        const npmRes = await fetch(
          "https://api.npmjs.org/downloads/point/last-month/vartheme"
        );
        const npmData = await npmRes.json();

        setStats({
          stars: ghData.stargazers_count || 0,
          downloads: npmData.downloads || 0,
        });
        setLoaded(true);
      } catch (err) {
        console.error("Stats fetch failed", err);
        setLoaded(true);
      }
    }

    fetchStats();
  }, []);

  const items = [
    {
      label: "GitHub Stars",
      value: stats.stars,
      icon: "⭐",
      suffix: "",
    },
    {
      label: "npm Downloads",
      value: stats.downloads,
      icon: "📦",
      suffix: " / month",
    },
    {
      label: "Bundle Size",
      value: 7,
      icon: "⚡",
      suffix: "kb",
    },
    {
      label: "Dependencies",
      value: 0,
      icon: "🎯",
      suffix: "",
    },
  ];

  return (
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 20,
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 20,
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              transition: "all 0.4s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--primary)";
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 20px 60px var(--primary-glow)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Glow top */}
            <div style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: 2,
              background: `linear-gradient(90deg, transparent, var(--primary), transparent)`,
              opacity: 0.6,
            }} />

            <div style={{ fontSize: 28 }}>{item.icon}</div>
            <div style={{
              fontSize: 36,
              fontWeight: 800,
              color: "var(--primary)",
              letterSpacing: "-1px",
              transition: "color 0.4s ease",
            }}>
              {loaded ? item.value.toLocaleString() : "—"}
              <span style={{ fontSize: 18, fontWeight: 600 }}>{item.suffix}</span>
            </div>
            <div style={{
              fontSize: 14,
              color: "var(--text-muted)",
              transition: "color 0.4s ease",
            }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}