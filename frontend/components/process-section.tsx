'use client'

import { CheckCircle2 } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const steps = [
  {
    number: 1,
    title: 'Audit initial',
  },
  {
    number: 2,
    title: 'Plan d\'action structuré',
  },
  {
    number: 3,
    title: 'Mise en place des outils & organisation',
  },
  {
    number: 4,
    title: 'Suivi continu & reporting',
  },
]

export function ProcessSection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollAnimation()

  return (
    <section id="process" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
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
        <div className={`text-center mb-12 sm:mb-16 scroll-fade-in ${sectionVisible ? 'visible' : ''}`} ref={sectionRef}>
          <div className="mb-4">
            <h1 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-primary/80 text-center mb-2 tracking-wider uppercase">PROCESSUS</h1>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 px-4">
              Comment nous prenons en charge votre copropriété
            </h2>
          </div>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
            Un processus structuré en 4 étapes pour une transition en douceur
          </p>
        </div>

        <div ref={stepsRef} className="relative">
          {/* Connection line - Desktop only */}
          <div className="hidden md:block absolute top-8 sm:top-10 left-0 right-0 h-0.5">
            <div className="h-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
          </div>

          {/* Mobile vertical line */}
          <div className="md:hidden absolute top-0 bottom-0 left-8 w-0.5">
            <div className="h-full bg-gradient-to-b from-transparent via-primary to-transparent opacity-30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className={`group flex flex-col md:flex-col items-center scroll-fade-in ${stepsVisible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 200}ms` }}>
                <div className="mb-4 sm:mb-6 flex items-center justify-center">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg sm:shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                    <span className="font-heading font-bold text-2xl sm:text-3xl text-white relative z-10">
                      {step.number}
                    </span>
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white/20 group-hover:bg-white/30 transition-colors duration-300" />
                    <CheckCircle2 className="absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 text-accent bg-white rounded-full p-0.5 sm:p-1 shadow-md" />
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-sm sm:text-base lg:text-lg text-foreground text-center group-hover:text-primary transition-colors duration-300 px-2 sm:px-4 line-clamp-2">
                  {step.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
