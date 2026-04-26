"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Heart, MessageCircle, Grid, Play, UserCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Heading } from "@/src/components/ui/heading";
import { Text } from "@/src/components/ui/text";

export const InstagramGrid = () => {
  const t = useTranslations("Index");
  const instagramData = t.raw("instagramProfile");

  // Pure deterministic "random" values based on index
  const gridData = useMemo(() => {
    const placeholders = [
      "bg-gradient-to-br from-indigo-500 to-purple-600",
      "bg-gradient-to-br from-pink-500 to-orange-400",
      "bg-gradient-to-br from-blue-400 to-cyan-300",
      "bg-gradient-to-br from-emerald-400 to-teal-500",
      "bg-gradient-to-br from-amber-200 to-yellow-500",
      "bg-gradient-to-br from-rose-400 to-red-500",
      "bg-gradient-to-br from-violet-600 to-indigo-900",
      "bg-gradient-to-br from-slate-700 to-slate-900",
      "bg-gradient-to-br from-fuchsia-500 to-pink-500",
    ];
    return placeholders.map((bgClass, idx) => ({
      bgClass,
      likes: 120 + ((idx * 47) % 380),
      comments: 8 + ((idx * 19) % 42),
    }));
  }, []);

  return (
    <div className="w-full max-w-2xl px-6 lg:px-8 py-10 flex flex-col gap-8 self-start ml-0 lg:ml-4 text-left">
      {/* Instagram Profile Header */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start px-2">
        <div className="relative w-32 h-32 rounded-full p-1 bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600">
          <div className="w-full h-full rounded-full border-4 border-white dark:border-zinc-950 overflow-hidden relative bg-white dark:bg-zinc-800">
            <Image
              src="/images/avatar.jpeg"
              alt={instagramData.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1 items-center md:items-start text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Heading
              className="text-xl md:text-2xl mb-0"
              animateLetters={false}
            >
              {instagramData.title}
            </Heading>
            <div className="flex gap-2">
              <button className="px-5 py-1.5 rounded-lg bg-blue-500 text-white text-xs font-bold hover:bg-blue-600 transition-colors">
                {instagramData.cta}
              </button>
              <button className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                <UserCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-6 text-sm">
            <div className="flex gap-1 items-center">
              <span className="font-bold text-zinc-900 dark:text-white">
                {instagramData.posts}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400">Gönderi</span>
            </div>
            <div className="flex gap-1 items-center">
              <span className="font-bold text-zinc-900 dark:text-white">
                {instagramData.followers}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400">Takipçi</span>
            </div>
            <div className="flex gap-1 items-center">
              <span className="font-bold text-zinc-900 dark:text-white">
                {instagramData.following}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400">Takip</span>
            </div>
          </div>

          <div className="max-w-sm">
            <Text
              className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
              animateLetters={false}
            >
              {instagramData.bio}
            </Text>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-zinc-200 dark:border-white/10 pt-4 flex justify-center gap-12">
        <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white border-t border-zinc-900 dark:border-white pt-3 -mt-[17px]">
          <Grid className="w-3.5 h-3.5" />
          Gönderiler
        </button>
        <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 pt-3">
          <Play className="w-3.5 h-3.5" />
          Reels
        </button>
        <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 pt-3">
          <UserCircle className="w-3.5 h-3.5" />
          Etiketlenenler
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-1 md:gap-4 lg:gap-6 px-1">
        {gridData.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05, duration: 0.5 }}
            className={`aspect-square relative group cursor-pointer rounded-lg md:rounded-xl overflow-hidden shadow-lg ${item.bgClass}`}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-white font-bold text-sm">
              <span className="flex items-center gap-1">
                <Heart className="w-5 h-5 fill-white" />
                {item.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-5 h-5 fill-white" />
                {item.comments}
              </span>
            </div>

            {/* Glossy Overlay for Premium Look */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/10 to-transparent pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
