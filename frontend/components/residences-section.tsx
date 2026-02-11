'use client'

import { Card } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const residences = [
  {
    name: 'Residence Soleil',
    location: 'Paris 16ème',
    units: 24,
  },
  {
    name: 'Parc Verdure',
    location: 'Boulogne-Billancourt',
    units: 32,
  },
  {
    name: 'Les Terrasses',
    location: 'Neuilly-sur-Seine',
    units: 18,
  },
  {
    name: 'Villa Prestige',
    location: 'Saint-Cloud',
    units: 28,
  },
  {
    name: 'Residence Lumière',
    location: 'Versailles',
    units: 22,
  },
]

const kpis = [
  { number: '15', label: 'Résidences gérées' },
  { number: '152', label: 'Tickets de maintenance traités' },
  { number: '36%', label: 'Taux de recouvrement' },
]

export function ResidencesSection() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return

    const scrollAmount = 320
    const newPosition =
      direction === 'left'
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount

    scrollContainerRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth',
    })
    setScrollPosition(newPosition)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      setScrollPosition(container.scrollLeft)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading font-bold text-4xl text-foreground mb-12">
          Les résidences qui nous font confiance
        </h2>

        {/* Carousel */}
        <div className="relative mb-12">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scroll-smooth gap-6 pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [-ms-overflow-style:none]"
            style={{ scrollBehavior: 'smooth' }}
          >
            {residences.map((residence, index) => (
              <Card
                key={index}
                className="flex-shrink-0 w-80 p-6 bg-gradient-to-br from-white to-primary/5 border border-border hover:shadow-lg transition-all duration-200"
              >
                <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-heading font-bold text-primary/30">🏢</div>
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {residence.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  📍 {residence.location}
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium text-foreground">
                    {residence.units} appartements
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 p-2 bg-white border border-border rounded-full hover:bg-primary hover:text-white transition-all duration-200 z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 p-2 bg-white border border-border rounded-full hover:bg-primary hover:text-white transition-all duration-200 z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-3 gap-6 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 rounded-xl p-8 border border-border">
          {kpis.map((kpi, index) => (
            <div key={index} className="text-center">
              <div className="font-heading font-bold text-4xl md:text-5xl text-primary mb-2">
                {kpi.number}
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                {kpi.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
