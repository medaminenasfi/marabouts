'use client'

import { Card } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const residences = [
  {
    name: 'Residence Soleil',
    location: 'Paris 16ème',
    units: 24,
    image: '/assests/residence-1.jpg',
  },
  {
    name: 'Parc Verdure',
    location: 'Boulogne-Billancourt',
    units: 32,
    image: '/assests/residence-2.jpg',
  },
  {
    name: 'Les Terrasses',
    location: 'Neuilly-sur-Seine',
    units: 18,
    image: '/assests/residence-3.jpg',
  },
  {
    name: 'Villa Prestige',
    location: 'Saint-Cloud',
    units: 28,
    image: '/assests/residence-1.jpg',
  },
  {
    name: 'Residence Lumière',
    location: 'Versailles',
    units: 22,
    image: '/assests/residence-2.jpg',
  },
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
                className="flex-shrink-0 w-80 overflow-hidden bg-white border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-full h-40 overflow-hidden">
                  <img 
                    src={residence.image}
                    alt={residence.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {residence.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex items-center">
                    <span className="mr-2">📍</span>
                    {residence.location}
                  </p>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-medium text-foreground">
                      {residence.units} appartements
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 p-3 bg-white/90 backdrop-blur-sm border border-border rounded-full hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300 shadow-lg z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 p-3 bg-white/90 backdrop-blur-sm border border-border rounded-full hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300 shadow-lg z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
