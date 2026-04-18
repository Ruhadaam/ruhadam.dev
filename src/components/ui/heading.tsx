"use client";
import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeadingProps extends HTMLMotionProps<"h1"> {
  children: React.ReactNode;
  delay?: number;
  animateLetters?: boolean;
}

export const Heading = ({ children, className, delay = 0, animateLetters = true, ...props }: HeadingProps) => {
  const text = typeof children === "string" ? children : "";
  const characters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: delay },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      x: -10,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200,
      },
    },
  };

  if (!animateLetters || typeof children !== "string") {
    return (
      <motion.h1
        initial={{ x: -25, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
        className={cn(
          "text-4xl font-bold tracking-tight text-zinc-900 dark:text-white font-sans antialiased",
          className
        )}
        {...props}
      >
        {children}
      </motion.h1>
    );
  }

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className={cn(
        "text-4xl font-bold tracking-tight text-zinc-900 dark:text-white font-sans antialiased",
        className
      )}
      {...props}
    >
      {characters.map((char, index) => (
        <motion.span key={index} variants={child} className="inline-block whitespace-pre">
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
};
