import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { getMessages } from "next-intl/server";
import { Providers } from "@/src/components/Providers";
import MainLayout from "@/src/components/MainLayout";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ruhadam.dev",
  description: "Digital Soul & Craft",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased font-sans tracking-tight relative`}
        suppressHydrationWarning
      >
        <Providers locale={locale} messages={messages}>
          <MainLayout>{children}</MainLayout>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
