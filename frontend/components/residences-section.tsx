'use client'

import { Card } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const residences = [
  {
    name: 'Résidence Les Jardins',
    location: 'Tunis, El Menzah',
    units: 24,
    image: '/assests/residence-1.jpg',
  },
  {
    name: 'Parc du Lac',
    location: 'Tunis, Les Berges du Lac',
    units: 32,
    image: '/assests/residence-2.jpg',
  },
  {
    name: 'Les Palmiers',
    location: 'Sousse, Centre Ville',
    units: 18,
    image: '/assests/residence-3.jpg',
  },
  {
    name: 'Résidence Carthage',
    location: 'Carthage, Byrsa',
    units: 28,
    image: '/assests/residence-1.jpg',
  },
  {
    name: 'El Manar Premium',
    location: 'Tunis, El Manar',
    units: 22,
    image: '/assests/residence-2.jpg',
  },
]

export function ResidencesSection() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()
  const { ref: carouselRef, isVisible: carouselVisible } = useScrollAnimation()

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return

    // Arrêter l'auto-scroll lors de l'interaction manuelle
    setIsAutoScrolling(false)
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current)
    }

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

    // Redémarrer l'auto-scroll après 10 secondes d'inactivité
    setTimeout(() => {
      setIsAutoScrolling(true)
    }, 10000)
  }

  // Auto-scroll automatique
  useEffect(() => {
    if (!isAutoScrolling) return

    const startAutoScroll = () => {
      autoScrollIntervalRef.current = setInterval(() => {
        if (scrollContainerRef.current && isAutoScrolling) {
          const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
          if (scrollPosition >= maxScroll) {
            // Retour au début
            scrollContainerRef.current.scrollTo({
              left: 0,
              behavior: 'smooth',
            })
            setScrollPosition(0)
          } else {
            scrollContainerRef.current.scrollTo({
              left: scrollPosition + 320,
              behavior: 'smooth',
            })
            setScrollPosition(prev => prev + 320)
          }
        }
      }, 3000) // Scroll toutes les 3 secondes
    }

    startAutoScroll()

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
      }
    }
  }, [isAutoScrolling, scrollPosition])

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
        <div className={`text-center mb-12 scroll-fade-in ${sectionVisible ? 'visible' : ''}`} ref={sectionRef}>
          <div className="mb-4">
            <h1 className="font-heading font-bold text-2xl md:text-3xl text-primary/80 text-center mb-2 tracking-wider uppercase">RÉSIDENCES GÉRÉES</h1>
            <h2 className="font-heading font-bold text-4xl text-foreground mb-12">
              Les résidences qui nous font confiance
            </h2>
          </div>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className={`relative mb-12 scroll-fade-in ${carouselVisible ? 'visible' : ''}`}>
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scroll-smooth gap-6 pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [-ms-overflow-style:none]"
            style={{ scrollBehavior: 'smooth' }}
          >
            {residences.map((residence, index) => (
              <Card
                key={index}
                className={`flex-shrink-0 w-80 overflow-hidden bg-white border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group scroll-fade-in ${carouselVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
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
                  <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
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
