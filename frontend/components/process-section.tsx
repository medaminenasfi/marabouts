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
    <section id="process" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
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
