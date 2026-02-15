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
    <section id="for-who" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-white via-white to-primary/5 relative overflow-hidden">
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
