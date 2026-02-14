'use client'

import { Card } from '@/components/ui/card'
import { AlertCircle, TrendingDown, Users, Eye } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const problems = [
  {
    icon: Eye,
    title: 'Manque de transparence',
    description: 'Difficulté à suivre les finances et les décisions.',
  },
  {
    icon: AlertCircle,
    title: 'Maintenance non pilotée',
    description: 'Pannes répétitives, absence de suivi structuré.',
  },
  {
    icon: TrendingDown,
    title: 'Recouvrement faible',
    description: 'Les impayés fragilisent l\'équilibre financier.',
  },
  {
    icon: Users,
    title: 'Absence de supervision terrain',
    description: 'Manque de contrôle et de coordination.',
  },
]

export function ProblemsSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation()
  const { ref: statementRef, isVisible: statementVisible } = useScrollAnimation()

  return (
    <section id="problems" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className={`text-center mb-8 sm:mb-12 md:mb-16 scroll-fade-in ${titleVisible ? 'visible' : ''}`} style={{ transitionDelay: '100ms' }}>
          <div className="mb-4 sm:mb-6">
            <h1 className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-primary/80 text-center mb-2 sm:mb-3 tracking-wider uppercase"> PROBLÈMES</h1>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 text-foreground px-2 sm:px-4">
              Ce que vivent trop de copropriétés
            </h2>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 sm:px-6 leading-relaxed">
            Des problématiques récurrentes qui impactent la valeur de votre patrimoine
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <Card 
                key={index} 
                className={`problem-card group p-4 sm:p-6 bg-white border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] relative overflow-hidden ${cardsVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-primary/5 rounded-full blur-2xl transform translate-x-8 sm:translate-x-10 lg:translate-x-12 -translate-y-8 sm:-translate-y-10 lg:-translate-y-12 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-base sm:text-lg text-foreground mb-2 sm:mb-3 line-clamp-2 leading-tight">
                    {problem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Statement card - same style as problem cards */}
        <Card 
          ref={statementRef}
          className={`group p-6 sm:p-8 lg:p-12 bg-white border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] relative overflow-hidden scroll-fade-in ${statementVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '500ms' }}
        >
          {/* Background decoration - same style as cards */}
          <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-primary/5 rounded-full blur-2xl transform translate-x-10 sm:translate-x-12 lg:translate-x-16 -translate-y-10 sm:-translate-y-12 lg:-translate-y-16 group-hover:scale-150 transition-transform duration-500" />
          <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-accent/5 rounded-full blur-2xl transform -translate-x-8 sm:-translate-x-10 lg:-translate-x-12 translate-y-8 sm:translate-y-10 lg:translate-y-12 group-hover:scale-150 transition-transform duration-500" />
          
          {/* Content - same structure as cards */}
          <div className="relative z-10 text-center">
            {/* Main text */}
            <h3 className="font-heading font-semibold text-base sm:text-lg lg:text-xl xl:text-2xl text-foreground mb-3 sm:mb-4 lg:mb-6 leading-relaxed px-2 sm:px-4">
              Une copropriété se valorise quand sa gestion est structurée et visible.
            </h3>
          </div>
        </Card>
      </div>
    </section>
  )
}
