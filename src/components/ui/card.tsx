"use client";
import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
}

export const Card = ({ children, className, delay = 0, ...props }: CardProps) => (
  <motion.div
    initial={{ x: -15, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    viewport={{ once: false, margin: "-50px" }}
    transition={{ duration: 1, delay, ease: [0.23, 1, 0.32, 1] }}
    className={cn(
      "rounded-2xl border border-zinc-200/50 dark:border-white/5 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md p-6 shadow-sm hover:shadow-md transition-all duration-500",
      className
    )}
    {...props}
  >
    {children}
  </motion.div>
);
