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
    <section id="for-who" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-12 scroll-fade-in ${sectionVisible ? 'visible' : ''}`} ref={sectionRef}>
          <div className="mb-4">
            <h1 className="font-heading font-bold text-2xl md:text-3xl text-primary/80 text-center mb-2 tracking-wider uppercase">POUR QUI ?</h1>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
              Une solution adaptée à chaque acteur
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Une approche sur mesure pour chaque type de client
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => {
            const Icon = audience.icon
            return (
              <Card
                key={index}
                className={`group relative p-8 bg-white border-2 border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-300 hover:translate-y-[-6px] overflow-hidden scroll-fade-in ${cardsVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${audience.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon className="w-8 h-8 text-primary group-hover:text-primary-dark transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {audience.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
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
