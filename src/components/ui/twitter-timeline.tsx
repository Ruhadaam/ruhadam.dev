"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

// Twitter widget'larını yönetmek için global tip tanımı
declare global {
  interface Window {
    twttr: {
      widgets: {
        load: (element?: HTMLElement | null) => void;
      };
    };
  }
}

interface TwitterTimelineProps {
  username: string;
}

export const TwitterTimeline = ({ username }: TwitterTimelineProps) => {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);

  // 1. Mount Kontrolü (Hydration Hatasını Çözer)
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    
    // Script zaten varsa tekrar ekleme
    if (!document.getElementById("twitter-wjs")) {
      const script = document.createElement("script");
      script.id = "twitter-wjs";
      script.setAttribute("src", "https://platform.twitter.com/widgets.js");
      script.setAttribute("async", "true");
      script.setAttribute("charset", "utf-8");
      document.head.appendChild(script);
    }

    return () => cancelAnimationFrame(frame);
  }, []);

  // 2. Tema veya Mount durumu değiştiğinde widget'ı render et
  useEffect(() => {
    if (mounted && containerRef.current && window.twttr) {
      containerRef.current.innerHTML = ""; // Temizle
      const anchor = document.createElement("a");
      anchor.setAttribute("class", "twitter-timeline");
      anchor.setAttribute("data-theme", resolvedTheme === "dark" ? "dark" : "light");
      anchor.setAttribute("data-chrome", "noheader nofooter noborders transparent noscrollbar");
      anchor.setAttribute("href", `https://twitter.com/${username}?ref_src=twsrc%5Etfw`);
      anchor.innerText = `Tweets by ${username}`;
      containerRef.current.appendChild(anchor);
      
      window.twttr.widgets.load(containerRef.current);
    }
  }, [mounted, resolvedTheme, username]);

  // Sunucu tarafında veya henüz mount olmamışsa boş bir kutu göster
  if (!mounted) {
    return (
      <div className="w-full min-h-[400px] rounded-2xl bg-white/5 dark:bg-black/10 animate-pulse" />
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="w-full min-h-[400px] overflow-hidden rounded-2xl bg-white/5 dark:bg-black/10 backdrop-blur-md border border-white/10"
    >
      {/* İskelet veya yedek yazı */}
      <div className="p-8 text-center text-zinc-500 text-xs">
        Twitter akışı yükleniyor...
      </div>
    </div>
  );
};
