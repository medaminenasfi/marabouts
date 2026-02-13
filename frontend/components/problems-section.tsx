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
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation()

  return (
    <section id="problems" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div ref={sectionRef} className={`text-center mb-8 sm:mb-12 scroll-fade-in ${sectionVisible ? 'visible' : ''}`}>
          <div className="mb-4">
            <h1 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-primary/80 text-center mb-2 tracking-wider uppercase"> PROBLÈMES</h1>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 text-foreground px-4">
              Ce que vivent trop de copropriétés
            </h2>
          </div>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
            Des problématiques récurrentes qui impactent la valeur de votre patrimoine
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <Card 
                key={index} 
                className={`problem-card group p-4 sm:p-6 bg-white border border-border hover:border-destructive/30 hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] relative overflow-hidden ${cardsVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-destructive/5 rounded-full blur-2xl transform translate-x-8 sm:translate-x-10 lg:translate-x-12 -translate-y-8 sm:-translate-y-10 lg:-translate-y-12 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg bg-destructive/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-destructive" />
                  </div>
                  <h3 className="font-heading font-semibold text-base sm:text-lg text-foreground mb-2 sm:mb-3 line-clamp-2">
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

        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20 p-4 sm:p-6 lg:p-8 scroll-fade-in">
          <div className={`relative flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 ${sectionVisible ? 'visible' : ''}`}>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwQjVENDMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iNyIgY3k9IjciIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
            <div className="w-0.5 h-8 sm:w-1 sm:h-10 lg:h-12 bg-gradient-to-b sm:bg-gradient-to-r from-primary to-accent rounded-full" />
            <p className="text-foreground font-semibold text-sm sm:text-base lg:text-lg text-center px-4">
              Une copropriété se valorise quand sa gestion est structurée et visible.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
