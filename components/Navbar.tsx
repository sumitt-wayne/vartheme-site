"use client";
import Link from "next/link";

export default function Navbar() {
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
        pointerEvents: "none",
      }}
    >
      <nav
        style={{
          width: "fit-content",
          minWidth: 900,
          pointerEvents: "auto",
          border: "1px solid var(--border)",
          borderRadius: 16,
          background: "color-mix(in srgb, var(--background) 10%, transparent)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
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
            gap: 40,
          }}
        >
          {/* Logo */}
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "var(--text)",
              letterSpacing: "-0.5px",
              transition: "color 0.4s ease",
            }}
          >
            var
            <span
              style={{ color: "var(--primary)", transition: "color 0.4s ease" }}
            >
              theme
            </span>
          </div>

          {/* Links */}
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <NavLink
              href="https://www.npmjs.com/package/vartheme"
              label="npm"
            />
            <NavLink
              href="https://github.com/sumitt-wayne/vartheme"
              label="GitHub"
            />

            {/* Install badge */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "6px 14px",
                fontSize: 13,
                fontFamily: "var(--font-geist-mono)",
                color: "var(--primary)",
                transition: "all 0.4s ease",
              }}
            >
              npm i vartheme
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      target="_blank"
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
