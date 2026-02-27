"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "60px 24px",
      background: "var(--background)",
      position: "relative",
    }}>
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "32px",
      }}>
        
        {/* Logo Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 900,
            fontSize: 18,
            boxShadow: "0 0 20px var(--primary-glow)"
          }}>
            v
          </div>
          <span style={{ 
            fontSize: 20, 
            fontWeight: 800, 
            letterSpacing: "-0.5px",
            color: "var(--text)"
          }}>
            var<span style={{ color: "var(--primary)" }}>theme</span>
          </span>
        </div>

        {/* Minimal Links */}
        <nav style={{ 
          display: "flex", 
          gap: "24px", 
          alignItems: "center",
          fontSize: 14,
          fontWeight: 500
        }}>
          {[
            { label: "NPM", href: "https://www.npmjs.com/package/vartheme" },
            { label: "GITHUB", href: "https://github.com/sumitt-wayne/vartheme" },
            { label: "SOURCE", href: "https://github.com/sumitt-wayne" }
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--text-muted)",
                textDecoration: "none",
                letterSpacing: "1px",
                transition: "all 0.3s ease",
                position: "relative",
                padding: "4px 0"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--primary)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright Badge */}
        <div style={{
          fontSize: 12,
          color: "var(--text-muted)",
          background: "var(--surface)",
          padding: "8px 16px",
          borderRadius: "100px",
          border: "1px solid var(--border)",
          fontFamily: "var(--font-geist-mono), monospace",
        }}>
          MIT // {currentYear} // <span style={{ color: "var(--text)" }}>@sumitt-wayne</span>
        </div>
      </div>

      {/* Responsive Styles (Inline) */}
      <style>{`
        @media (max-width: 640px) {
          footer > div {
            flex-direction: column !important;
            text-align: center !important;
            justify-content: center !important;
          }
          nav {
            order: 2;
          }
          div:last-child {
            order: 3;
          }
        }
      `}</style>
    </footer>
  );
}