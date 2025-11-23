import HeroSection from "@/components/home/HeroSection";
import GuideSection from "@/components/home/GuideSection";
import DepartmentsSection from "@/components/home/DepartmentsSection";
import EventList from "@/components/home/EventList";
import { useTranslation } from "@/app/i18n";
import { GraduationCap, Users, Briefcase } from "lucide-react";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { t } = await useTranslation(locale, "Home");

  const departments = [
    {
      key: "internal",
      title: t("internalDivision"),
      description: t("internalDesc"),
      link: `/${locale}/about`,
      icon: <GraduationCap className="w-10 h-10" />
    },
    {
      key: "external",
      title: t("externalDivision"),
      description: t("externalDesc"),
      link: `/${locale}/about`,
      icon: <Users className="w-10 h-10" />
    },
    {
      key: "executive",
      title: t("executiveDivision"),
      description: t("executiveDesc"),
      link: `/${locale}/about`,
      icon: <Briefcase className="w-10 h-10" />
    },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <HeroSection 
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        ctaPrimary={t("viewEvents")}
        ctaSecondary={t("aboutUs")}
        locale={locale}
      />

      <GuideSection 
        title={t("newToUofT")}
        description={t("guideDescription")}
        cta={t("downloadGuide")}
        year={t("guideYear")}
        locale={locale}
      />

      <DepartmentsSection 
        title={t("ourDivisions")}
        departments={departments}
      />

      <section className="py-24 bg-page-background">
        <div className="container mx-auto px-6">
          <EventList />
        </div>
      </section>
    </main>
  );
}
