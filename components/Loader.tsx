"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const irisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Iris wipe effect before closing
          gsap.to(irisRef.current, {
            scale: 100,
            duration: 1.2,
            ease: "expo.inOut",
            onComplete: () => setVisible(false)
          });
        }
      });

      // 1. Initial State
      tl.set(".letter", { y: 20, opacity: 0 });
      tl.set(".small-orb", { scale: 0, opacity: 0 });

      // 2. Orbs "Snap" into center
      tl.to(".small-orb", {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      });

      // 3. Letters "Reveal" with GSAP stagger
      tl.to(".letter", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "power4.out"
      }, "-=0.4");

      // 4. Subtle rotation of the whole system
      gsap.to(orbRef.current, {
        rotate: 360,
        duration: 8,
        repeat: -1,
        ease: "none"
      });

      // 5. Breathing glow
      gsap.to(".glow-pulse", {
        scale: 1.2,
        opacity: 0.6,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#050505",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}
    >
      {/* 🔮 Iris Wipe Element */}
      <div 
        ref={irisRef}
        style={{
          position: "absolute",
          width: "40px",
          height: "40px",
          background: "#000", // Reveal color
          borderRadius: "50%",
          transform: "scale(0)",
          zIndex: 100,
          pointerEvents: "none"
        }}
      />

      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
        
        {/* Orbital System */}
        <div ref={orbRef} style={{ position: "relative", width: 100, height: 100 }}>
          {/* Main Core */}
          <div className="glow-pulse" style={{
            position: "absolute",
            inset: 0,
            margin: "auto",
            width: 30, height: 30,
            borderRadius: "50%",
            background: "var(--primary, #A78BFA)",
            filter: "blur(15px)",
          }} />
          
          <div style={{
            position: "absolute",
            inset: 0,
            margin: "auto",
            width: 14, height: 14,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 0 20px var(--primary)",
            zIndex: 10
          }} />

          {/* Atomic Dots */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="small-orb"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: i % 2 === 0 ? "var(--primary)" : "var(--accent, #22D3EE)",
                marginLeft: -3,
                marginTop: -3,
                transform: `rotate(${i * 60}deg) translateX(40px)`
              }}
            />
          ))}
        </div>

        {/* Text Reveal Section */}
        <div ref={textRef} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 900, letterSpacing: "-1.5px" }}>
            {"vartheme".split("").map((char, i) => (
              <span 
                key={i} 
                className="letter" 
                style={{ 
                  color: i > 2 ? "var(--primary, #A78BFA)" : "#fff",
                  display: "inline-block"
                }}
              >
                {char}
              </span>
            ))}
          </div>
          
          {/* Progress Line */}
          <div style={{
            width: 40,
            height: 2,
            background: "var(--border, #2A2A3A)",
            marginTop: 12,
            position: "relative",
            overflow: "hidden",
            borderRadius: 10
          }}>
            <div style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "var(--primary)",
              left: "-100%",
              animation: "loading-bar 2s infinite ease-in-out"
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { left: -100%; }
          50% { left: 0%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
}