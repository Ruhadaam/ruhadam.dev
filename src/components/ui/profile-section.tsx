"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Instagram, MessageSquare } from "lucide-react";
import { Heading } from "@/src/components/ui/heading";
import { Text } from "@/src/components/ui/text";
import { Link } from "@/src/i18n/routing";

export const ProfileSection = () => {
  const t = useTranslations("Index");

  // Explicitly fetch social data with fallbacks to prevent ReferenceErrors
  const twitterData = t.raw("twitterProfile") || { handle: "" };
  const instagramData = t.raw("instagramProfile") || { title: "" };

  return (
    <div className="w-full max-w-lg px-8 lg:px-12 py-10 lg:py-16 flex flex-col items-center lg:items-start text-center lg:text-left">
      {/* Profile Image & Brand */}
      <div className="w-full mb-10 flex flex-col items-center lg:items-start gap-8">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="group relative w-full max-w-[200px] md:max-w-[280px] aspect-square rounded-[3rem] overflow-hidden shadow-xl dark:shadow-2xl ring-1 ring-black/5 dark:ring-white/10 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1"
        >
          <Link href="/">
            <Image
              src="/images/avatar.jpeg"
              alt="Professional Avatar"
              fill
              className="object-cover grayscale-0 lg:grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-105 group-hover:contrast-110 transition-all duration-700 scale-100 group-hover:scale-110"
              sizes="280px"
              priority
            />
          </Link>
        </motion.div>

        {/* Identity Section */}
        <div className="space-y-2">
          <Heading delay={0.1} className="text-3xl md:text-4xl">
            {t("brandName")}
          </Heading>
          <Text
            delay={0.3}
            className="text-zinc-800 dark:text-zinc-400 font-bold tracking-[0.2em] uppercase text-[0.65rem]"
          >
            {t("role")}
          </Text>
        </div>
      </div>

      {/* Social Buttons (Circular Style) */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="flex justify-center lg:justify-start gap-3 mb-10"
      >
        <a
          href="https://github.com/ruhadaam"
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn w-10 h-10 flex items-center justify-center rounded-full bg-zinc-600/5 dark:bg-white/5 border border-zinc-200/50 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-600/10 dark:hover:bg-white/10 backdrop-blur-md transition-all duration-300 cursor-pointer hover:-translate-y-1.5 hover:shadow-lg active:scale-90"
        >
          <Github className="w-4.5 h-4.5 transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:rotate-12" />
        </a>

        <a
          href="https://www.linkedin.com/in/alperen-gokcek/"
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn w-10 h-10 flex items-center justify-center rounded-full bg-zinc-600/5 dark:bg-white/5 border border-zinc-200/50 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-600/10 dark:hover:bg-white/10 backdrop-blur-md transition-all duration-300 cursor-pointer hover:-translate-y-1.5 hover:shadow-lg active:scale-90"
        >
          <Linkedin className="w-4.5 h-4.5 transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:rotate-12" />
        </a>

        <a
          href={`https://x.com/${twitterData.handle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn w-10 h-10 flex items-center justify-center rounded-full bg-zinc-600/5 dark:bg-white/5 border border-zinc-200/50 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-600/10 dark:hover:bg-white/10 backdrop-blur-md transition-all duration-300 cursor-pointer hover:-translate-y-1.5 hover:shadow-lg active:scale-90"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="w-4 h-4 fill-current transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:rotate-12"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.34l4.71 6.223L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
          </svg>
        </a>

        <a
          href={`https://instagram.com/${instagramData.title}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn w-10 h-10 flex items-center justify-center rounded-full bg-zinc-600/5 dark:bg-white/5 border border-zinc-200/50 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-600/10 dark:hover:bg-white/10 backdrop-blur-md transition-all duration-300 cursor-pointer hover:-translate-y-1.5 hover:shadow-lg active:scale-90"
        >
          <Instagram className="w-4.5 h-4.5 transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:rotate-12" />
        </a>
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mb-8 w-full md:w-auto"
      >
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-blue-500 text-white font-bold text-sm hover:bg-blue-600 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-blue-500/20"
        >
          <MessageSquare className="w-4 h-4" />
          {t("contactCta")}
        </Link>
      </motion.div>

      {/* Short Bio Section */}
      <div className="max-w-md">
        <Text
          delay={0.6}
          className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed opacity-90"
          animateLetters={false}
        >
          {t("bio")}
        </Text>
      </div>
    </div>
  );
};
