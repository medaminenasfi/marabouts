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
    <section className="py-20 px-6 bg-gradient-to-br from-primary/8 via-accent/5 to-primary/8">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className={`bg-white/90 backdrop-blur-md rounded-3xl border border-border/50 shadow-2xl p-8 md:p-16 scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
            {kpis.map((kpi, index) => (
              <div 
                key={index} 
                className={`space-y-4 kpi-counter ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="text-6xl md:text-7xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {kpi.value}
                </div>
                <div className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
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
