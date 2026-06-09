"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Target date: June 20, 2026 11:00:00 (UTC+3)
const TARGET_DATE = new Date("2026-06-20T11:00:00+03:00").getTime();

const AnimatedNumber = ({ value }: { value: number | string }) => {
  return (
    <span className="relative inline-flex items-center justify-center overflow-hidden min-w-[2ch]">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = TARGET_DATE - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft(); // Initial calculation
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return null; // Avoid hydration mismatch by returning null until mounted
  }

  // Format with leading zeros for hours, minutes, seconds
  const pad = (num: number) => num.toString().padStart(2, "0");

  return (
    <span className="inline-flex items-center gap-0.5 md:gap-1 text-[0.65rem] md:text-[0.75rem] font-mono text-zinc-500 dark:text-zinc-400 ml-1.5 md:ml-2">
      <span className="text-zinc-700 dark:text-zinc-300 font-semibold flex items-center">
        <AnimatedNumber value={timeLeft.days} />d
      </span>
      <span className="opacity-50">:</span>
      <span className="text-zinc-700 dark:text-zinc-300 flex items-center">
        <AnimatedNumber value={pad(timeLeft.hours)} />h
      </span>
      <span className="opacity-50">:</span>
      <span className="text-zinc-700 dark:text-zinc-300 flex items-center">
        <AnimatedNumber value={pad(timeLeft.minutes)} />m
      </span>
      <span className="opacity-50">:</span>
      <span className="text-zinc-700 dark:text-zinc-300 flex items-center">
        <AnimatedNumber value={pad(timeLeft.seconds)} />s
      </span>
    </span>
  );
}
