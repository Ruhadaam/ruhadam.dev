"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: ReactNode;
}

export const MidnightCyberBackground = ({
  className,
  children,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col min-h-screen items-center justify-center bg-black overflow-hidden antialiased",
        className
      )}
      {...props}
    >
      {/* Aurora Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -inset-[50%] opacity-70 blur-[80px] md:blur-[120px] animate-aurora will-change-transform"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 100% 0%, var(--aurora-1) 0%, transparent 50%),
              radial-gradient(ellipse at 0% 100%, var(--aurora-2) 0%, transparent 50%),
              radial-gradient(ellipse at 0% 0%, var(--aurora-3) 0%, transparent 50%),
              radial-gradient(ellipse at 100% 100%, var(--aurora-4) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, var(--aurora-2) 0%, transparent 50%)
            `,
            backgroundSize: "300% 300%",
          }}
        />
      </div>

      {/* Surface Grain Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-screen"
        style={{
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      {/* Vignette Overlay (Daha geniş merkezi alan) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)] opacity-70" />

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};
