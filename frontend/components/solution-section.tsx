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
    <section id="solution" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-white via-white to-primary/5 relative overflow-hidden">
      {/* Background Collage Design */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Pattern subtil */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230B5D43' fill-opacity='0.03'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        
        {/* Éléments décoratifs flottants */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-20 w-24 h-24 bg-accent/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-accent/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        {/* Lignes décoratives */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        
        {/* Cercles décoratifs */}
        <div className="absolute top-1/3 right-10 w-2 h-2 bg-primary/20 rounded-full" />
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-primary/15 rounded-full" />
        <div className="absolute top-1/3 right-32 w-1.5 h-1.5 bg-primary/10 rounded-full" />
        
        <div className="absolute bottom-1/3 left-10 w-2 h-2 bg-accent/20 rounded-full" />
        <div className="absolute bottom-1/3 left-20 w-1 h-1 bg-accent/15 rounded-full" />
        <div className="absolute bottom-1/3 left-32 w-1.5 h-1.5 bg-accent/10 rounded-full" />
        
        {/* Formes géométriques */}
        <div className="absolute top-10 right-1/4 w-16 h-16 border border-primary/10 transform rotate-45" />
        <div className="absolute bottom-10 left-1/4 w-12 h-12 border border-accent/10 transform rotate-12" />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
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
          <Link href="/demandedevis">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white rounded-lg font-semibold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-6 text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto">
              Demander un devis
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
