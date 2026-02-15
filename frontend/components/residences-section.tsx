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
    image: '/assets/residence-1.jpg',
  },
  {
    name: 'Parc du Lac',
    location: 'Tunis, Les Berges du Lac',
    units: 32,
    image: '/assets/residence-2.jpg',
  },
  {
    name: 'Les Palmiers',
    location: 'Sousse, Centre Ville',
    units: 18,
    image: '/assets/residence-3.jpg',
  },
  {
    name: 'Résidence Carthage',
    location: 'Carthage, Byrsa',
    units: 28,
    image: '/assets/4.jpg',
  },
  {
    name: 'El Manar Premium',
    location: 'Tunis, El Manar',
    units: 22,
    image: '/assets/5.jpg',
  },
]

export function ResidencesSection() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const mobileAutoScrollRef = useRef<NodeJS.Timeout | null>(null)
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()
  const { ref: carouselRef, isVisible: carouselVisible } = useScrollAnimation()

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return

    // Arrêter l'auto-scroll lors de l'interaction manuelle
    setIsAutoScrolling(false)
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current)
    }

    const scrollAmount = isMobile ? 280 : 320
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

    // Mobile: Animation card par card
    if (isMobile) {
      mobileAutoScrollRef.current = setInterval(() => {
        setCurrentCardIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % residences.length
          
          // Scroll to the card
          if (scrollContainerRef.current) {
            const cardWidth = 280
            const targetPosition = nextIndex * cardWidth
            scrollContainerRef.current.scrollTo({
              left: targetPosition,
              behavior: 'smooth',
            })
            setScrollPosition(targetPosition)
          }
          
          return nextIndex
        })
      }, 3000) // Change card every 3 seconds
    } else {
      // Desktop: Auto-scroll existant
      const startAutoScroll = () => {
        autoScrollIntervalRef.current = setInterval(() => {
          if (scrollContainerRef.current && isAutoScrolling) {
            const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
            const scrollStep = isMobile ? 280 : 320
            
            if (scrollPosition >= maxScroll) {
              // Retour au début
              scrollContainerRef.current.scrollTo({
                left: 0,
                behavior: 'smooth',
              })
              setScrollPosition(0)
            } else {
              scrollContainerRef.current.scrollTo({
                left: scrollPosition + scrollStep,
                behavior: 'smooth',
              })
              setScrollPosition(prev => prev + scrollStep)
            }
          }
        }, 3000) // Scroll toutes les 3 secondes
      }

      startAutoScroll()
    }

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
      }
      if (mobileAutoScrollRef.current) {
        clearInterval(mobileAutoScrollRef.current)
      }
    }
  }, [isAutoScrolling, scrollPosition, isMobile])

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
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-8 sm:mb-12 scroll-fade-in ${sectionVisible ? 'visible' : ''}`} ref={sectionRef}>
          <div className="mb-4">
            <h1 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-primary/80 text-center mb-2 tracking-wider uppercase">
              RÉSIDENCES GÉRÉES
            </h1>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-foreground mb-6 sm:mb-12 px-4">
              Les résidences qui nous font confiance
            </h2>
          </div>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className={`relative mb-8 sm:mb-12 scroll-fade-in ${carouselVisible ? 'visible' : ''}`}>
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scroll-smooth gap-3 sm:gap-6 pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [-ms-overflow-style:none]"
            style={{ scrollBehavior: 'smooth' }}
          >
            {residences.map((residence, index) => (
              <Card
                key={index}
                className={`flex-shrink-0 w-64 h-64 sm:w-80 sm:h-80 overflow-hidden bg-white border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group scroll-fade-in ${carouselVisible ? 'visible' : ''} ${
                  isMobile 
                    ? `transform transition-all duration-500 ease-out ${
                        index === currentCardIndex 
                          ? 'scale-105 opacity-100 z-10' 
                          : index === (currentCardIndex - 1 + residences.length) % residences.length || index === (currentCardIndex + 1) % residences.length
                          ? 'scale-95 opacity-60' 
                          : 'scale-90 opacity-30'
                      }`
                    : ''
                }`}
                style={{ 
                  transitionDelay: isMobile ? `${index * 50}ms` : `${index * 100}ms`,
                  transform: isMobile ? `translateX(${(index - currentCardIndex) * 20}px)` : undefined
                }}
              >
                <div className="relative w-full h-full">
                  <img 
                    src={residence.image}
                    alt={residence.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                    <h3 className="font-heading font-semibold text-base sm:text-lg mb-2 line-clamp-1 drop-shadow-lg">
                      {residence.name}
                    </h3>
                    <p className="text-xs sm:text-sm mb-3 flex items-center gap-2 drop-shadow-md">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="line-clamp-1">{residence.location}</span>
                    </p>
                    <div className="pt-3 border-t border-white/20">
                      <p className="text-xs sm:text-sm font-medium drop-shadow-md">
                        {residence.units} appartements
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Navigation buttons - Mobile optimized */}
          {/* Mobile: Swipe indicators with animation */}
          {isMobile && (
            <div className="flex justify-center gap-2 sm:gap-3 mt-6">
              {residences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentCardIndex(index)
                    setIsAutoScrolling(false)
                    if (mobileAutoScrollRef.current) {
                      clearInterval(mobileAutoScrollRef.current)
                    }
                    if (scrollContainerRef.current) {
                      const cardWidth = 280
                      const targetPosition = index * cardWidth
                      scrollContainerRef.current.scrollTo({
                        left: targetPosition,
                        behavior: 'smooth',
                      })
                      setScrollPosition(targetPosition)
                    }
                    // Restart auto-scroll after 10 seconds
                    setTimeout(() => {
                      setIsAutoScrolling(true)
                    }, 10000)
                  }}
                  className={`transition-all duration-300 ease-out ${
                    index === currentCardIndex 
                      ? 'w-8 h-2 bg-primary rounded-full shadow-lg scale-110' 
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400 rounded-full'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Desktop/Tablet: Navigation arrows */}
          {!isMobile && (
            <>
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
            </>
          )}
        </div>
      </div>
    </section>
  )
}
