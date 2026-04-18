"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Linkedin, 
  ExternalLink 
} from "lucide-react";
import Image from "next/image";
import { Card } from "@/src/components/ui/card";
import { Heading } from "@/src/components/ui/heading";
import { Text } from "@/src/components/ui/text";
import { ExperienceTimeline } from "@/src/components/ui/experience-timeline";
import { skills } from "@/src/constants/resume-data";

export const ResumeSection = () => {
  const tIndex = useTranslations("Index");

  return (
    <div className="w-full max-w-2xl px-6 lg:px-8 py-10 flex flex-col gap-12 self-start ml-0 lg:ml-4 text-left">
      
      {/* LinkedIn Profile Card (Header) */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Card 
          onClick={() => window.open("https://www.linkedin.com/in/alperen-gokcek/", "_blank")}
          className="group relative p-6 bg-blue-500/5 dark:bg-blue-500/10 border-blue-500/20 dark:border-blue-500/20 
                     overflow-hidden cursor-pointer hover:bg-blue-500/10 dark:hover:bg-blue-500/15 
                     transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10"
        >
          {/* Animated Background Glow */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 blur-[80px] group-hover:bg-blue-500/20 transition-all duration-700" />
          
          <div className="relative flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-white dark:ring-zinc-900 shadow-xl">
              <Image
                src="/images/avatar.png"
                alt="Alperen Gökçek"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-transparent transition-colors" />
            </div>
            
            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Heading className="text-2xl" animateLetters={false}>
                  {tIndex("linkedinProfileCard.title")}
                </Heading>
                <Linkedin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {tIndex("linkedinProfileCard.subtitle")}
              </p>
              <div className="pt-2 flex items-center justify-center sm:justify-start gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                <span>{tIndex("linkedinProfileCard.cta")}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Experience Timeline */}
      <ExperienceTimeline showTitle={true} />

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
        className="space-y-6 pb-20"
      >
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
          <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 bg-white/0 px-4">
            {tIndex("techStackTitle")}
          </h4>
          <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
          {skills.map((skill, idx) => (
            <motion.span
              key={skill}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: idx * 0.03, duration: 0.4 }}
              className="px-4 py-2 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200/50 dark:border-white/5 
                         text-xs font-medium text-zinc-600 dark:text-zinc-300 backdrop-blur-sm
                         hover:border-blue-500/30 hover:text-blue-500 dark:hover:text-blue-400 
                         transition-all duration-300 cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
