'use client'

import { Card } from '@/components/ui/card'
import { BarChart3, Hammer, Shield, Banknote } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const services = [
  {
    icon: BarChart3,
    title: 'Gestion administrative & financière',
    description: 'Budgets, appels de fonds, assemblées générales, comptabilité.',
  },
  {
    icon: Hammer,
    title: 'Maintenance & suivi technique',
    description: 'Interventions rapides, suivi des prestataires, contrôle qualité.',
  },
  {
    icon: Shield,
    title: 'Gardiennage & organisation',
    description: 'Supervision terrain, coordination des équipes.',
  },
  {
    icon: Banknote,
    title: 'Recouvrement',
    description: 'Suivi des impayés, procédures structurées, reporting.',
  },
]

export function ServicesSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation()

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-8 sm:mb-12 scroll-fade-in ${sectionVisible ? 'visible' : ''}`} ref={sectionRef}>
          <div className="mb-4">
            <h1 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-primary/80 text-center mb-2 tracking-wider uppercase">
              SERVICES
            </h1>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 text-center px-4">
              Une gestion complète, sans zones d'ombre
            </h2>
          </div>
          <p className="text-center text-muted-foreground text-base sm:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            Tous les aspects de votre copropriété pris en charge avec professionnalisme
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className={`group relative p-4 sm:p-6 lg:p-8 bg-white border border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-300 hover:translate-y-[-4px] overflow-hidden scroll-fade-in ${cardsVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-2xl transform translate-x-8 -translate-y-8 sm:translate-x-12 sm:-translate-y-12 lg:translate-x-16 lg:-translate-y-16 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-base sm:text-lg lg:text-xl text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
