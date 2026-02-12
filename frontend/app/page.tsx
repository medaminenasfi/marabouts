import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { ProblemsSection } from '@/components/problems-section'
import { SolutionSection } from '@/components/solution-section'
import { ServicesSection } from '@/components/services-section'
import { ForWhoSection } from '@/components/for-who-section'
import { ProcessSection } from '@/components/process-section'
import { ResidencesSection } from '@/components/residences-section'
import { KpiSection } from '@/components/kpi-section'
import { CtaSection } from '@/components/cta-section'
import { ContactForm } from '@/components/contact-form'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'

export default function Page() {
  return (
    <div className="w-full">
      <Header />
      <Hero />
      <ProblemsSection />
      <SolutionSection />
      <ServicesSection />
      <ForWhoSection />
      <ProcessSection />
      <ResidencesSection />
      <KpiSection />
      <CtaSection />
      <ContactForm />
      <Footer />
      <ScrollToTop />
    </div>
  )
}
