'use client'

import { Card } from '@/components/ui/card'
import { Users, Building2, Home } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const audiences = [
  {
    icon: Users,
    title: 'Présidents de syndic',
    description: 'Moins de conflits. Plus de visibilité. Plus de contrôle.',
    gradient: 'from-primary/10 to-accent/10',
  },
  {
    icon: Building2,
    title: 'Promoteurs immobiliers',
    description: 'Passation structurée et image valorisée.',
    gradient: 'from-accent/10 to-primary/10',
  },
  {
    icon: Home,
    title: 'Résidents',
    description: 'Réactivité et transparence.',
    gradient: 'from-primary/10 to-accent/10',
  },
]

export function ForWhoSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation()

  return (
    <section id="for-who" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-8 sm:mb-12 scroll-fade-in ${sectionVisible ? 'visible' : ''}`} ref={sectionRef}>
          <div className="mb-4">
            <h1 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-primary/80 text-center mb-2 tracking-wider uppercase">POUR QUI ?</h1>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 px-4">
              Une solution adaptée à chaque acteur
            </h2>
          </div>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
            Une approche sur mesure pour chaque type de client
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {audiences.map((audience, index) => {
            const Icon = audience.icon
            return (
              <Card
                key={index}
                className={`group relative p-4 sm:p-6 lg:p-8 bg-white border-2 border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-300 hover:translate-y-[-4px] sm:hover:translate-y-[-6px] overflow-hidden scroll-fade-in ${cardsVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${audience.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary group-hover:text-primary-dark transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-bold text-base sm:text-lg lg:text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {audience.title}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {audience.description}
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
