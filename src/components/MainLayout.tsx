"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { ProfileSection } from "@/src/components/ui/profile-section";
import { ThemeSwitcher } from "@/src/components/ui/theme-switcher";
import { LocaleSwitcher } from "@/src/components/ui/locale-switcher";
import { MidnightCyberBackground } from "@/src/components/ui/MidnightCyberBackground";
import { Text } from "@/src/components/ui/text";
import { usePathname } from "@/src/i18n/routing";
import { useTranslations } from "next-intl";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("Footer");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const scrollContainerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  // View değiştikçe sağ paneli en üste kaydırır
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  // Animation trigger for background transition
  const isHome = pathname === "/" || pathname === "/tr" || pathname === "/en";

  return (
    <main className="relative min-h-screen lg:h-screen w-full lg:overflow-hidden bg-white/0 dark:bg-zinc-950/0 font-sans antialiased text-zinc-900 dark:text-zinc-50">
      {/* Midnight Cyber Background (Previously Aurora) */}
      <div className="fixed inset-0 z-0">
        <MidnightCyberBackground className="opacity-100" />
      </div>

      {/* 40/60 Split Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[40%_60%] h-full">
        {/* Left Side: Sidebar (Static on desktop, scrollable on mobile) */}
        <section className="relative flex items-center justify-center lg:justify-end h-auto lg:h-full lg:overflow-y-auto">
          <ProfileSection />
        </section>

        {/* Right Side: Dynamic Content (Scrollable) */}
        <section
          ref={scrollContainerRef}
          className="relative h-auto lg:h-full lg:overflow-y-auto lg:overflow-x-hidden pt-10 pb-32 lg:pb-20"
        >
          {children}
        </section>
      </div>

      {/* Footer Controls */}
      <footer className="fixed bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 z-50 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0 pointer-events-none">
        {/* Center: Quote */}
        <div className="pointer-events-auto flex-1 flex items-center justify-center text-center px-2 order-1 md:order-2">
          <p className="text-[0.55rem] md:text-[0.6rem] text-zinc-500 dark:text-zinc-400 font-medium leading-tight max-w-3xl">
            <span className="italic">"{t("quote")}"</span>
            <span className="mx-1.5 md:mx-2 text-zinc-300 dark:text-zinc-700 font-light">
              |
            </span>
            <span className="opacity-80 font-semibold tracking-wider uppercase text-[0.45rem] md:text-[0.5rem]">
              {t("author")}, {t("book")}
            </span>
          </p>
        </div>

        {/* Mobile Row: Copyright & Controls together */}
        <div className="pointer-events-auto w-full md:w-auto flex flex-row items-center justify-between md:contents order-2">
          {/* Left: Copyright */}
          <div className="md:w-[250px] flex justify-start md:order-1">
            <Text className="text-[0.55rem] md:text-[0.65rem] font-medium text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
              © 2026 <span className="hidden sm:inline">ruhadam.dev</span>
            </Text>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-2 md:gap-3 md:w-[250px] justify-end md:order-3">
            <ThemeSwitcher />
            <LocaleSwitcher />
          </div>
        </div>
      </footer>
    </main>
  );
}
