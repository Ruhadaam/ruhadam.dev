"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
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

  // Mouse follow logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top } = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className={cn(
        "relative flex flex-col min-h-screen items-center justify-center bg-adaptive overflow-hidden antialiased transition-colors duration-1000 cursor-pointer",
        !isMounted && "opacity-0",
        className,
      )}
      {...props}
    >
      {/* SVG Metaball Filter */}
      {/* GÜNCELLENMİŞ SVG Metaball Filter */}
      <svg className="hidden">
        <defs>
          <filter id="liquid-essence" colorInterpolationFilters="sRGB">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="20"
              result="blur"
            />
            {/* Sayıları biraz daha yumuşattık (30 ve -10) */}
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -10"
              result="liquid"
            />
            {/* Tırtıklanmayı önlemek için orijinal grafikle daha yumuşak birleştiriyoruz */}
            <feBlend in="SourceGraphic" in2="liquid" mode="normal" />
          </filter>
        </defs>
      </svg>

      {/* Layer 1: Liquid Blobs Container (Prismatic Atmosphere) */}
      <div className="absolute inset-0 pointer-events-none filter-[blur(60px)] md:filter-[url(#liquid-essence)] opacity-40 dark:opacity-80 transition-opacity duration-1000">
        {" "}
        {/* Floating Blob 1 - Indigo */}
        <motion.div
          animate={{
            x: [0, 150, -80, 0],
            y: [0, -200, 100, 0],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          style={{ background: "var(--nebula-2)" }}
          className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full opacity-40 dark:opacity-40"
        />

        {/* Floating Blob 2 - Rose (New) */}
        <motion.div
          animate={{
            x: [0, 200, -100, 0],
            y: [0, 100, -200, 0],
            scale: [0.8, 1.1, 0.9, 0.8],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          style={{ background: "var(--nebula-vibrant-1)" }}
          className="absolute top-1/3 right-1/4 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full opacity-30 dark:opacity-30"
        />

        {/* Floating Blob 3 - Emerald (New) */}
        <motion.div
          animate={{
            x: [0, -150, 200, 0],
            y: [0, 250, -100, 0],
            scale: [1, 0.9, 1.2, 1],
          }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          style={{ background: "var(--nebula-vibrant-2)" }}
          className="absolute bottom-1/4 left-1/3 w-[220px] h-[220px] md:w-[450px] md:h-[450px] rounded-full opacity-35 dark:opacity-25"
        />

        {/* Floating Blob 4 - Deep Violet */}
        <motion.div
          animate={{
            x: [0, -180, 120, 0],
            y: [0, 150, -150, 0],
            scale: [1, 0.9, 1.2, 1],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ background: "var(--nebula-4)" }}
          className="absolute bottom-1/4 right-1/4 w-[280px] h-[280px] md:w-[550px] md:h-[550px] rounded-full opacity-30 dark:opacity-20 translate-z-0"
        />

        {/* Floating Blob 5 - Slate Accents */}
        <motion.div
          animate={{
            x: [0, 120, -150, 0],
            y: [0, 200, -80, 0],
          }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          style={{ background: "var(--nebula-1)" }}
          className="absolute top-1/3 left-1/2 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full opacity-25 dark:opacity-10"
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

      {/* Layer 4: High-End Film Grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] mix-blend-multiply dark:mix-blend-screen transition-opacity duration-1000 z-40 hidden md:block"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      {/* Layer 5: Content */}
      <div className="relative z-50 w-full h-full flex flex-col items-center justify-center pointer-events-none">
        <div className="pointer-events-auto w-full h-full flex flex-col items-center justify-center">
          {children}
        </div>
      </div>

      {/* Layer 6: Global Mouse Torch Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[100] overflow-hidden hidden md:block">
        <motion.div
          style={{
            left: smoothX,
            top: smoothY,
            x: "-50%",
            y: "-50%",
          }}
          className="absolute w-[450px] h-[450px] bg-indigo-500/10 dark:bg-indigo-400/10 rounded-full blur-[80px] mix-blend-plus-lighter"
        />
      </div>
    </div>
  );
};
