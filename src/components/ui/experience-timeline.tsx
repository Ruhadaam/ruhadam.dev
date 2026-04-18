"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle2
} from "lucide-react";
import { Card } from "@/src/components/ui/card";
import { Heading } from "@/src/components/ui/heading";
import { Text } from "@/src/components/ui/text";

const ResumeItemIds = [
  { id: "exp1", type: "experience", tech: ["React.js", "Next.js", "TypeScript"] },
  { id: "exp2", type: "experience", tech: ["React Native", "Expo", "Redux", "Firebase"] },
  { id: "exp3", type: "experience", tech: ["Photoshop", "Illustrator", "Figma"] },
  { id: "exp4", type: "experience", tech: ["CSS", "Photoshop", "HTML"] },
  { id: "edu1", type: "education" }
] as const;

interface ExperienceTimelineProps {
  showTitle?: boolean;
}

export const ExperienceTimeline = ({ showTitle = true }: ExperienceTimelineProps) => {
  const t = useTranslations("Resume");
  const tIndex = useTranslations("Index");

  return (
    <div className="flex flex-col gap-12 w-full max-w-2xl px-2">
      {/* Header Info */}
      {showTitle && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start gap-2"
        >
          <Heading className="text-3xl md:text-4xl" animateLetters={false}>
            {tIndex("resumeTitle")}
          </Heading>
          <Text className="text-[0.65rem] uppercase tracking-[0.2em] font-bold text-blue-600 dark:text-blue-400 opacity-80">
            {tIndex("resumeSubtitle")}
          </Text>
        </motion.div>
      )}

      {/* Timeline Section */}
      <div className="relative space-y-8 pl-4 border-l border-zinc-200/50 dark:border-white/10 ml-2">
        {ResumeItemIds.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ delay: idx * 0.05, duration: 0.5 }}
            className="relative"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[25px] top-6 w-4 h-4 rounded-full bg-white dark:bg-zinc-900 border-2 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] z-10" />

            <Card
              className="p-6 transition-all duration-300 shadow-none
                         bg-white/10 dark:bg-black/20 backdrop-blur-lg
                         border border-white/20 dark:border-white/10
                         hover:bg-white/15 dark:hover:bg-black/30 
                         hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5"
            >
              <div className="flex flex-col gap-4">
                {/* Type & Date */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    {item.type === "experience" ? (
                      <Briefcase className="w-3 h-3" />
                    ) : (
                      <GraduationCap className="w-3 h-3" />
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {item.type === "experience" ? t("labels.experience") : t("labels.education")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {t(`${item.id}.date`)}
                  </div>
                </div>

                {/* Title & Organization */}
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white leading-tight">
                    {t(`${item.id}.title`)}
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-300">
                    <span>{t(`${item.id}.org`)}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    <span className="flex items-center gap-1 opacity-70">
                      <MapPin className="w-3 h-3" />
                      {t(`${item.id}.loc`)}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <ul className="space-y-2">
                  {[0, 1, 2].map(i => {
                    try {
                        const desc = t.raw(`${item.id}.desc`)[i];
                        if (!desc) return null;
                        return (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-500 dark:text-zinc-400">
                              <CheckCircle2 className="w-4 h-4 mt-0.5 text-blue-500/60 shrink-0" />
                              <span>{desc}</span>
                            </li>
                        );
                    } catch { return null; }
                  })}
                </ul>

                {/* Technologies */}
                {"tech" in item && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-semibold bg-zinc-100 dark:bg-white/5 border border-zinc-200/50 dark:border-white/5 rounded-md text-zinc-600 dark:text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
