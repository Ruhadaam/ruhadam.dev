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
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ruhadam.dev — Design. Code. Soul.",
    template: "%s | ruhadam.dev",
  },
  description:
    "Alperen Gökcek — Full-stack developer crafting elegant digital experiences. Specializing in Next.js, TypeScript, and modern UI design.",
  metadataBase: new URL("https://ruhadam.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ruhadam.dev",
    siteName: "ruhadam.dev",
    title: "ruhadam.dev — Design. Code. Soul.",
    description:
      "Alperen Gökcek — Full-stack developer crafting elegant digital experiences.",
    images: [{ url: "/images/avatar.webp", width: 560, height: 560, alt: "ruhadam.dev" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ruhadam.dev — Design. Code. Soul.",
    description: "Full-stack developer crafting elegant digital experiences.",
    images: ["/images/avatar.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
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
