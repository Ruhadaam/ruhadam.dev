"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Heading } from "@/src/components/ui/heading";
import { Text } from "@/src/components/ui/text";
import { ArrowRight } from "lucide-react";
import { Link } from "@/src/i18n/routing";
import { ExperienceTimeline } from "@/src/components/ui/experience-timeline";
import { AboutSection } from "@/src/components/ui/about-section";

export default function Home() {
  const t = useTranslations("Index");

  return (
    <div className="w-full min-h-full flex flex-col items-center justify-center lg:items-start lg:justify-start px-6 lg:px-12 lg:py-20 py-10 gap-48">
      {/* Hero Section */}
      <div className="max-w-2xl space-y-8">
        {/* ... existing hero code ... */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.3em] uppercase text-[0.65rem]">
              {t("slogan")}
            </span>
          </motion.div>

          <Heading
            delay={0.2}
            className="text-4xl md:text-6xl lg:text-7xl leading-tight"
          >
            {t("heroTitle1")} {t("heroTitle2")}
            <br />
            <span className="bg-linear-to-r from-indigo-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent animate-gradient-slow">
              {t("heroTitleSoul")}
            </span>
          </Heading>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex flex-wrap gap-6 items-center"
        >
          <Link
            href="/resume"
            className="group animate-glow flex items-center gap-3 px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold hover:scale-[1.02] active:scale-95 transition-all duration-700 ease-[0.23,1,0.32,1] shadow-xl hover:shadow-2xl hover:shadow-blue-500/30"
          >
            {t("heroCta")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
          </Link>

          <Link
            href="/github"
            className="group font-bold text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            {t("heroSecondaryCta")}
          </Link>

          <Link
            href="/contact"
            className="group font-bold text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
          >
            {t("contactCta")}
            <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* About Sections */}
      <div className="w-full max-w-3xl">
        <AboutSection />
      </div>

      {/* Experience Timeline Integration */}
      <div className="w-full max-w-2xl">
        <ExperienceTimeline showTitle={true} />
      </div>
    </div>
  );
}
