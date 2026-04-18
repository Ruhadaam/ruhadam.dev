"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { ProfileSection } from "@/src/components/ui/profile-section";
import { ThemeSwitcher } from "@/src/components/ui/theme-switcher";
import { LocaleSwitcher } from "@/src/components/ui/locale-switcher";
import { MidnightCyberBackground } from "@/src/components/ui/aurora-background";
import { Text } from "@/src/components/ui/text";
import { usePathname } from "@/src/i18n/routing";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <main className="relative h-screen w-full overflow-hidden bg-white/0 dark:bg-zinc-950/0 font-sans antialiased text-zinc-900 dark:text-zinc-50">
      {/* Midnight Cyber Background (Previously Aurora) */}
      <div className="fixed inset-0 z-0">
        <MidnightCyberBackground className="opacity-100" />
      </div>

      {/* 40/60 Split Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[40%_60%] h-full">
        {/* Left Side: Sidebar (Static) */}
        <section className="relative flex items-center justify-center lg:justify-end h-full overflow-y-auto">
          <ProfileSection />
        </section>

        {/* Right Side: Dynamic Content (Scrollable) */}
        <section
          ref={scrollContainerRef}
          className="relative h-full overflow-y-auto overflow-x-hidden pt-10 pb-32 lg:pb-20"
        >
          {children}
        </section>
      </div>

      {/* Footer Controls */}
      <footer className="fixed bottom-8 left-8 right-8 z-50 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <Text className="text-[0.65rem] font-medium text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
            © 2026 ruhadam.dev
          </Text>
        </div>
        <div className="flex items-center gap-3 pointer-events-auto">
          <ThemeSwitcher />
          <LocaleSwitcher />
        </div>
      </footer>
    </main>
  );
}
