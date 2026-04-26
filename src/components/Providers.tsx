"use client";

import { ThemeProvider } from "./ThemeProvider";
import { NextIntlClientProvider } from "next-intl";

interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
  messages: any;
}

export function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class" storageKey="theme">
      <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Istanbul">
        {children}
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
