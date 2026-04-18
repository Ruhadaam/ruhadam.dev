"use client";

import React from "react";
import { Twitter, Verified } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/src/components/ui/card";
import { Heading } from "@/src/components/ui/heading";
import { Text } from "@/src/components/ui/text";
import Image from "next/image";
import { TwitterTimeline } from "@/src/components/ui/twitter-timeline";

export const TwitterProfile = () => {
  const t = useTranslations("Index");
  const twitterData = t.raw("twitterProfile");

  return (
    <div className="w-full max-w-2xl px-6 lg:px-8 py-10 flex flex-col gap-6 self-start ml-0 lg:ml-4 text-left">
      {/* Profile Header Card */}
      <Card className="p-0 overflow-hidden border-none shadow-2xl bg-zinc-50/50 dark:bg-zinc-900/50 mb-4">
        {/* Banner */}
        <div className="h-32 w-full bg-linear-to-r from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-900 opacity-80" />
        
        <div className="px-6 pb-6 relative">
          {/* Avatar */}
          <div className="absolute -top-12 left-6">
            <div className="relative w-24 h-24 rounded-full border-4 border-white dark:border-zinc-900 overflow-hidden bg-white dark:bg-zinc-800 shadow-xl">
              <Image
                src="/images/avatar.png"
                alt={twitterData.title}
                fill
                sizes="(max-width: 96px) 100vw, 96px"
                priority
                className="object-cover"
              />
            </div>
          </div>

          <div className="pt-14 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-1">
                <Heading className="text-xl md:text-2xl mb-0" animateLetters={false}>
                  {twitterData.title}
                </Heading>
                <Verified className="w-5 h-5 text-blue-500 fill-blue-500/20" />
              </div>
              <Text className="text-sm text-zinc-500 dark:text-zinc-400">
                @{twitterData.handle}
              </Text>
            </div>
            
            <a 
              href={`https://twitter.com/${twitterData.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-4 py-1.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-bold hover:opacity-80 transition-opacity"
            >
              Takip Et
            </a>
          </div>

          <div className="mt-4">
            <Text className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {twitterData.bio}
            </Text>
          </div>

          <div className="mt-4 flex gap-4 text-sm">
            <div className="flex gap-1 items-center">
              <span className="font-bold text-zinc-900 dark:text-white">{twitterData.following}</span>
              <span className="text-zinc-500 dark:text-zinc-400">Takip Edilen</span>
            </div>
            <div className="flex gap-1 items-center">
              <span className="font-bold text-zinc-900 dark:text-white">{twitterData.followers}</span>
              <span className="text-zinc-500 dark:text-zinc-400">Takipçi</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Real-time Twitter Timeline */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1 opacity-60">
          <Twitter className="w-4 h-4 text-blue-500" />
          <span className="text-[0.65rem] uppercase font-bold tracking-widest text-zinc-500 dark:text-zinc-400">
            Canlı Akış (X)
          </span>
        </div>

        <TwitterTimeline username={twitterData.handle} />
      </div>
    </div>
  );
};
