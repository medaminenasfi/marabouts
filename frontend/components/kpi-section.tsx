'use client'

import { useEffect, useState } from 'react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

export function KpiSection() {
  const { ref, isVisible } = useScrollAnimation()
  const [counters, setCounters] = useState([0, 0, 0])
  const [hasAnimated, setHasAnimated] = useState(false)
  
  const kpis = [
    { value: 15, label: 'Résidences gérées', suffix: '' },
    { value: 152, label: 'Tickets de maintenance traités', suffix: '' },
    { value: 36, label: 'Taux de recouvrement', suffix: '%' },
  ]

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true)
      
      kpis.forEach((kpi, index) => {
        const duration = 2000 // 2 seconds
        const steps = 60 // 60 steps for smooth animation
        const increment = kpi.value / steps
        let current = 0
        let step = 0

        const timer = setInterval(() => {
          step++
          current = Math.min(Math.floor(increment * step), kpi.value)
          
          setCounters(prev => {
            const newCounters = [...prev]
            newCounters[index] = current
            return newCounters
          })

          if (step >= steps || current >= kpi.value) {
            clearInterval(timer)
            setCounters(prev => {
              const newCounters = [...prev]
              newCounters[index] = kpi.value
              return newCounters
            })
          }
        }, duration / steps)
      })
    }
  }, [isVisible, hasAnimated, kpis])

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
                  <span className="inline-block min-w-[1.2em] text-right">
                    {counters[index]}
                  </span>
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                    {kpi.suffix}
                  </span>
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
