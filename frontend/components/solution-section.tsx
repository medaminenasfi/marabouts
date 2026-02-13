'use client'

import { Button } from '@/components/ui/button'
import { Eye, Wrench, DollarSign, Database } from 'lucide-react'
import Link from 'next/link'
import { SmoothScrollLink } from '@/components/smooth-scroll-link'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const solutions = [
  {
    number: 1,
    icon: Eye,
    title: 'Supervision terrain 7j/7',
    description: 'Présence régulière, contrôles qualité, coordination des interventions.',
  },
  {
    number: 2,
    icon: Wrench,
    title: 'Maintenance & organisation',
    description: 'Préventif, correctif, gestion des prestataires et suivi après intervention.',
  },
  {
    number: 3,
    icon: DollarSign,
    title: 'Recouvrement structuré',
    description: 'Process clair, relances organisées, reporting régulier.',
  },
  {
    number: 4,
    icon: Database,
    title: 'Système d\'information fiable',
    description: 'Traçabilité, accès aux documents, visibilité sur les actions.',
  },
]

export function SolutionSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation()

  return (
    <section id="solution" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-8 sm:mb-12 scroll-fade-in ${sectionVisible ? 'visible' : ''}`} ref={sectionRef}>
          <div className="mb-4">
            <h1 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-primary/80 text-center mb-2 tracking-wider uppercase">SOLUTION MARABOUTS</h1>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 px-4">
              Une gestion complète. Une méthode claire.
            </h2>
          </div>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
            Notre approche structurée pour une copropriété performante
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {solutions.map((solution, index) => {
            const Icon = solution.icon
            return (
              <div key={index} className={`group flex gap-3 sm:gap-4 lg:gap-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-border bg-gradient-to-br from-white to-primary/5 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:translate-x-1 sm:hover:translate-x-2 scroll-fade-in ${cardsVisible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 150}ms` }}>
                <div className="flex-shrink-0">
                  <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="font-heading font-bold text-sm sm:text-base sm:text-xl text-white">
                      {solution.number}
                    </span>
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-white/20 group-hover:bg-white/30 transition-colors duration-300" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 sm:gap-3 mb-2">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 sm:mt-1 flex-shrink-0" />
                    <h3 className="font-heading font-semibold text-base sm:text-lg lg:text-xl text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {solution.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center px-4">
          <SmoothScrollLink href="#contact">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white rounded-lg font-semibold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-6 text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto">
              Demander un audit
            </Button>
          </SmoothScrollLink>
        </div>
      </div>
    </section>
  )
}
