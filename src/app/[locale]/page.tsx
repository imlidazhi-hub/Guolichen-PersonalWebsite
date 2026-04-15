import { setRequestLocale } from 'next-intl/server'
import HeroSection from '@/components/sections/home/HeroSection'
import SkillsPreviewSection from '@/components/sections/home/SkillsPreviewSection'
import ProjectsPreviewSection from '@/components/sections/home/ProjectsPreviewSection'
import ContactPreviewSection from '@/components/sections/home/ContactPreviewSection'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <HeroSection locale={locale} />

      <div className="section-divider" />

      <SkillsPreviewSection locale={locale} />

      <div className="section-divider" />

      <ProjectsPreviewSection locale={locale} />

      <div className="section-divider" />

      <ContactPreviewSection locale={locale} />

      {/* Footer */}
      <footer className="py-8 px-6 text-center">
        <p className="cyber-label text-white/20">
          © 2025 果粒尘 · GUOLI · BUILT WITH NEXT.JS + PERSONA THEME
        </p>
      </footer>
    </>
  )
}
