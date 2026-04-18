"use client";
import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextProps extends HTMLMotionProps<"p"> {
  children: React.ReactNode;
  delay?: number;
  animateLetters?: boolean;
}

export const Text = ({ children, className, delay = 0, animateLetters = false, ...props }: TextProps) => {
  const text = typeof children === "string" ? children : "";
  const characters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.01, delayChildren: delay },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 5,
      x: -2,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200,
      },
    },
  };

  if (!animateLetters || typeof children !== "string") {
    return (
      <motion.p
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
        className={cn(
          "text-zinc-500 dark:text-zinc-400 font-medium text-sm tracking-wide leading-relaxed antialiased",
          className
        )}
        {...props}
      >
        {children}
      </motion.p>
    );
  }

  return (
    <motion.p
      variants={container}
      initial="hidden"
      animate="visible"
      className={cn(
        "text-zinc-500 dark:text-zinc-400 font-medium text-sm tracking-wide leading-relaxed antialiased",
        className
      )}
      {...props}
    >
      {characters.map((char, index) => (
        <motion.span key={index} variants={child} className="inline-block whitespace-pre">
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
};
