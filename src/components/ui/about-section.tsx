"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { Heading } from "@/src/components/ui/heading";
import { Text } from "@/src/components/ui/text";

export const AboutSection = () => {
  const t = useTranslations("Index");
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const storyOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 0.1, 0]);
  const passionX = useTransform(scrollYProgress, [0.3, 0.9], [50, -50]);

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-32 py-10 relative overflow-hidden">
      
      {/* Section 1: About Me (The Story) */}
      <div className="relative group">
        {/* Large Floating Background Label */}
        <motion.div 
          style={{ opacity: storyOpacity }}
          className="absolute -top-12 -left-10 text-[8rem] md:text-[12rem] font-black text-zinc-900 dark:text-white pointer-events-none select-none tracking-tighter"
        >
          {t("about.backgroundLabel")}
        </motion.div>

        <div className="relative z-10 flex flex-col items-start gap-8">
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-blue-500/50" />
            <Text className="text-[0.6rem] uppercase tracking-[0.4em] font-bold text-blue-500">
              01 / {t("about.title")}
            </Text>
          </div>

          <div className="pl-6 md:pl-16 border-l border-zinc-200 dark:border-white/10 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
              <Text className="text-lg md:text-xl leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium italic">
                "{t("about.text")}"
              </Text>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section 2: Passion (The Craft) */}
      <div className="relative group self-end text-right flex flex-col items-end">
        {/* Large Floating Background Label */}
        <motion.div 
          style={{ x: passionX, opacity: 0.05 }}
          className="absolute -top-20 -right-20 text-[6rem] md:text-[10rem] font-black text-blue-500 pointer-events-none select-none tracking-tighter"
        >
          {t("passion.backgroundLabel")}
        </motion.div>

        <div className="relative z-10 flex flex-col items-end gap-8 max-w-2xl">
          <div className="flex items-center gap-4">
            <Text className="text-[0.6rem] uppercase tracking-[0.4em] font-bold text-zinc-500">
              02 / {t("passion.title")}
            </Text>
            <div className="h-px w-12 bg-zinc-200 dark:bg-white/20" />
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-end gap-2 text-blue-500/80 font-mono text-xs italic">
              <span className="opacity-50">//</span>
              <span>{t("passion.codeTag")}</span>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <Text className="text-base md:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 font-normal">
                {t("passion.text")}
              </Text>
              
              {/* Artistic Accent */}
              <div className="absolute -right-4 top-0 bottom-0 w-1 bg-linear-to-b from-blue-500/50 to-transparent rounded-full" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Global Aesthetic Decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
};
