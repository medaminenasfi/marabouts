'use client'

import { useScrollAnimation } from '@/hooks/use-scroll-animation'

export function KpiSection() {
  const { ref, isVisible } = useScrollAnimation()
  
  const kpis = [
    {
      value: '15',
      label: 'Résidences gérées',
    },
    {
      value: '152',
      label: 'Tickets de maintenance traités',
    },
    {
      value: '36%',
      label: 'Taux de recouvrement',
    },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-primary/8 via-accent/5 to-primary/8">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-border/50 shadow-xl sm:shadow-2xl p-4 sm:p-6 md:p-8 lg:p-16 scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 text-center">
            {kpis.map((kpi, index) => (
              <div 
                key={index} 
                className={`space-y-3 sm:space-y-4 kpi-counter ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {kpi.value}
                </div>
                <div className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground font-medium leading-relaxed px-2">
                  {kpi.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
