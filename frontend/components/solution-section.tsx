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
    <section id="solution" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-12 scroll-fade-in ${sectionVisible ? 'visible' : ''}`} ref={sectionRef}>
          <div className="mb-4">
            <h1 className="font-heading font-bold text-2xl md:text-3xl text-primary/80 text-center mb-2 tracking-wider uppercase">SOLUTION MARABOUTS</h1>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
              Une gestion complète. Une méthode claire.
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Notre approche structurée pour une copropriété performante
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {solutions.map((solution, index) => {
            const Icon = solution.icon
            return (
              <div key={index} className={`group flex gap-6 p-6 rounded-2xl border border-border bg-gradient-to-br from-white to-primary/5 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:translate-x-2 scroll-fade-in ${cardsVisible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 150}ms` }}>
                <div className="flex-shrink-0">
                  <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="font-heading font-bold text-xl text-white">
                      {solution.number}
                    </span>
                    <div className="absolute inset-0 rounded-xl bg-white/20 group-hover:bg-white/30 transition-colors duration-300" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <Icon className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <h3 className="font-heading font-semibold text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                      {solution.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center">
          <SmoothScrollLink href="#contact">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white rounded-lg font-semibold px-10 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5">
              Demander un audit
            </Button>
          </SmoothScrollLink>
        </div>
      </div>
    </section>
  )
}
