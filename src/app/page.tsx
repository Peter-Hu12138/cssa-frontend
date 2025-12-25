import HeroSection from "@/components/home/HeroSection";
import GuideSection from "@/components/home/GuideSection";
import DepartmentsSection from "@/components/home/DepartmentsSection";
import EventList from "@/components/home/EventList";
import SponsorsSection from "@/components/home/SponsorsSection";
import { useTranslation as getServerTranslation } from "@/app/i18n";
import { getLocale } from "@/app/i18n/server-utils";
import { GraduationCap, Users, Briefcase } from "lucide-react";

export default async function Home() {
  const locale = await getLocale();
  const { t } = await getServerTranslation(locale, "Home");

  const departments = [
    {
      key: "internal",
      title: t("internalDivision"),
      description: t("internalDesc"),
      link: "/about",
      icon: <GraduationCap className="w-10 h-10" />
    },
    {
      key: "external",
      title: t("externalDivision"),
      description: t("externalDesc"),
      link: "/about",
      icon: <Users className="w-10 h-10" />
    },
    {
      key: "executive",
      title: t("executiveDivision"),
      description: t("executiveDesc"),
      link: "/about",
      icon: <Briefcase className="w-10 h-10" />
    },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-canvas">
      <HeroSection 
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        ctaPrimary={t("viewEvents")}
        ctaSecondary={t("aboutUs")}
      />

      <GuideSection 
        title={t("newToUofT")}
        description={t("guideDescription")}
        cta={t("downloadGuide")}
        year={t("guideYear")}
      />

      <DepartmentsSection 
        title={t("ourDivisions")}
        departments={departments}
      />

      <section className="py-24 bg-canvas">
        <div className="container mx-auto px-6">
          <EventList />
        </div>
      </section>

      <SponsorsSection 
        title={t("ourSponsors")}
        subtitle={t("sponsorsSubtitle")}
        locale={locale}
      />
    </main>
  );
}
