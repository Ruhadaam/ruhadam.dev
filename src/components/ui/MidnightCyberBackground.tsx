"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface MidnightCyberBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
}

export const MidnightCyberBackground = ({
  className,
  children,
  ...props
}: MidnightCyberBackgroundProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Mouse follow — only on pointer:fine (desktop) devices
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only attach on true pointer devices (not touch)
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top } = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, shouldReduceMotion]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || shouldReduceMotion) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
  };

  // Shared blob animation — disabled when user prefers reduced motion
  const blobTransition = (duration: number) =>
    shouldReduceMotion
      ? { duration: 0 }
      : { duration, repeat: Infinity, ease: "linear" as const };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      style={{ position: "relative" }}
      className={cn(
        "flex flex-col min-h-screen items-center justify-center bg-adaptive overflow-hidden antialiased transition-colors duration-1000",
        !isMounted && "opacity-0",
        className,
      )}
      {...props}
    >
      {/* Layer 1: Liquid Blobs — 3 blobs (down from 5), GPU-composited */}
      <div className="absolute inset-0 pointer-events-none blur-[60px] opacity-40 dark:opacity-80 transition-opacity duration-1000">
        {/* Blob 1 — Indigo */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : { x: [0, 120, -60, 0], y: [0, -150, 80, 0], scale: [1, 1.2, 0.9, 1] }
          }
          transition={blobTransition(35)}
          style={{ background: "var(--nebula-2)", willChange: "transform" }}
          className="absolute top-1/4 left-1/4 w-[260px] h-[260px] md:w-[520px] md:h-[520px] rounded-full opacity-40 dark:opacity-40"
        />
        {/* Blob 2 — Rose */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : { x: [0, 160, -80, 0], y: [0, 80, -160, 0], scale: [0.9, 1.1, 0.85, 0.9] }
          }
          transition={blobTransition(28)}
          style={{ background: "var(--nebula-vibrant-1)", willChange: "transform" }}
          className="absolute top-1/3 right-1/4 w-[220px] h-[220px] md:w-[440px] md:h-[440px] rounded-full opacity-30 dark:opacity-30"
        />
        {/* Blob 3 — Emerald */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : { x: [0, -120, 160, 0], y: [0, 200, -80, 0], scale: [1, 0.85, 1.15, 1] }
          }
          transition={blobTransition(32)}
          style={{ background: "var(--nebula-vibrant-2)", willChange: "transform" }}
          className="absolute bottom-1/4 left-1/3 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full opacity-30 dark:opacity-25"
        />
      </div>

      {/* Layer 2: Tactile Ripple Layer */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                left: ripple.x,
                top: ripple.y,
                transform: "translate(-50%, -50%)",
                willChange: "transform, opacity",
              }}
              className="absolute w-20 h-20 border border-zinc-500/30 dark:border-white/20 rounded-full blur-[2px]"
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Layer 3: Adaptive Vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-80 transition-all duration-1000 z-30"
        style={{
          background:
            "radial-gradient(circle at center, transparent 20%, var(--background) 100%)",
        }}
      />

      {/* Layer 4: CSS Film Grain (no external request) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.04] z-40 hidden md:block"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Layer 5: Content */}
      <div className="relative z-50 w-full h-full flex flex-col items-center justify-center pointer-events-none">
        <div className="pointer-events-auto w-full h-full flex flex-col items-center justify-center">
          {children}
        </div>
      </div>

      {/* Layer 6: Mouse Torch — desktop (pointer:fine) only */}
      <div className="absolute inset-0 pointer-events-none z-[100] overflow-hidden hidden md:block">
        <motion.div
          style={{
            left: smoothX,
            top: smoothY,
            x: "-50%",
            y: "-50%",
          }}
          className="absolute w-[400px] h-[400px] bg-indigo-500/8 dark:bg-indigo-400/8 rounded-full blur-[80px] mix-blend-plus-lighter"
        />
      </div>
    </div>
  );
};
