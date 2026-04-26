import { getTranslations } from "next-intl/server";
import { HeroAnimations } from "@/src/components/ui/hero-animations";
import { ExperienceTimeline } from "@/src/components/ui/experience-timeline";
import { AboutSection } from "@/src/components/ui/about-section";

export default async function Home() {
  const t = await getTranslations("Index");

  return (
    <div className="w-full min-h-full flex flex-col items-center justify-center lg:items-start lg:justify-start px-6 lg:px-12 lg:py-20 py-10 gap-48">
      {/* Hero Section */}
      <HeroAnimations
        slogan={t("slogan")}
        heroTitle={`${t("heroTitle1")} ${t("heroTitle2")}`}
        heroTitleSoul={t("heroTitleSoul")}
        heroCta={t("heroCta")}
        heroSecondaryCta={t("heroSecondaryCta")}
        contactCta={t("contactCta")}
      />

      {/* About Sections */}
      <div className="relative w-full max-w-3xl">
        <AboutSection />
      </div>

      {/* Experience Timeline Integration */}
      <div className="w-full max-w-2xl">
        <ExperienceTimeline showTitle={true} />
      </div>
    </div>
  );
}
