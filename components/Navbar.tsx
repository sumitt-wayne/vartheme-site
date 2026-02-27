"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        padding: "0 16px",
        pointerEvents: "none",
      }}
    >
      <nav
        style={{
          width: "100%",
          maxWidth: 900,
          pointerEvents: "auto",
          border: "1px solid var(--border)",
          borderRadius: 16,
          background: "color-mix(in srgb, var(--background) 10%, transparent)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          transition: "background 0.4s ease, border 0.4s ease",
        }}
      >
        <div
          style={{
            padding: "0 28px",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.5px", transition: "color 0.4s ease" }}>
              var<span style={{ color: "var(--primary)", transition: "color 0.4s ease" }}>theme</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="vt-desktop" style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <NavLink href="/docs" label="Docs" external={false} />
            <NavLink href="https://www.npmjs.com/package/vartheme" label="npm" />
            <NavLink href="https://github.com/sumitt-wayne/vartheme" label="GitHub" />
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "6px 14px",
              fontSize: 13,
              fontFamily: "var(--font-geist-mono)",
              color: "var(--primary)",
              transition: "all 0.4s ease",
            }}>
              npm i vartheme
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="vt-mobile"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text)",
              fontSize: 22,
              display: "none",
              padding: 4,
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="vt-mobile" style={{
            padding: "16px 28px",
            borderTop: "1px solid var(--border)",
            display: "none",
            flexDirection: "column",
            gap: 16,
          }}>
            <NavLink href="/docs" label="Docs" external={false} />
            <NavLink href="https://www.npmjs.com/package/vartheme" label="npm" />
            <NavLink href="https://github.com/sumitt-wayne/vartheme" label="GitHub" />
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "8px 14px",
              fontSize: 13,
              fontFamily: "var(--font-geist-mono)",
              color: "var(--primary)",
              textAlign: "center",
            }}>
              npm i vartheme
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 640px) {
          .vt-desktop { display: none !important; }
          .vt-mobile  { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

function NavLink({ href, label, external = true }: { href: string; label: string; external?: boolean }) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : "_self"}
      style={{
        color: "var(--text-muted)",
        textDecoration: "none",
        fontSize: 14,
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--text)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--text-muted)";
        e.currentTarget.style.transform = "translateY(0px)";
      }}
    >
      {label}
    </Link>
  );
}