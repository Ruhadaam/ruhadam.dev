"use client";

import { motion } from "framer-motion";
import { Github, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";

export function SmallBar() {
  const t = useTranslations("Index");

  return (
    <div className="fixed top-8 left-0 right-0 z-50 flex justify-center px-6">
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative group"
      >
        {/* Apple Glass Capsule */}
        <div className="flex items-center gap-6 px-6 py-2.5 rounded-full bg-white/5 dark:bg-black/20 backdrop-blur-2xl border border-white/10 dark:border-white/5 shadow-[0_16px_32px_-8px_rgba(0,0,0,0.2),inset_0_1px_1px_0_rgba(255,255,255,0.05)] overflow-hidden">
          {/* Subtle light hit */}
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-stone-500 animate-pulse ring-4 ring-stone-900/5 dark:ring-white/5" />
            <span className="text-xs font-bold tracking-tight text-zinc-900 dark:text-white font-sans antialiased">
              {t("barLogo")}<span className="text-stone-500 font-medium">{t("barExt")}</span>
            </span>
          </div>
          
          <div className="w-px h-3 bg-zinc-200 dark:bg-zinc-800" />
          
          <div className="flex items-center gap-5">
            <Github className="w-3.5 h-3.5 text-zinc-500 hover:text-stone-500 dark:hover:text-white cursor-pointer transition-all hover:scale-110" />
            <Twitter className="w-3.5 h-3.5 text-zinc-500 hover:text-stone-500 dark:hover:text-white cursor-pointer transition-all hover:scale-110" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
