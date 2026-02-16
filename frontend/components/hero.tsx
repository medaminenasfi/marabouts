'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, X } from 'lucide-react'
import Link from 'next/link'
import { SmoothScrollLink } from '@/components/smooth-scroll-link'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

export function Hero() {
  const [showCalendly, setShowCalendly] = useState(false)
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation()
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollAnimation()
  const { ref: buttonsRef, isVisible: buttonsVisible } = useScrollAnimation()

  const openCalendly = () => {
    setShowCalendly(true)
  }

  const closeCalendly = () => {
    setShowCalendly(false)
  }
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden pt-16 sm:pt-20 pb-12 sm:pb-20">
      {/* Background with image overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="relative w-full h-full">
          <img 
            src="/assets/3.jpg"
            alt="Background building"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to gradient background if image fails
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.className += ' bg-gradient-to-br from-background via-background to-primary/5';
              }
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 sm:w-80 sm:h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div ref={heroRef} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div ref={badgeRef} className={`flex justify-center mb-4 sm:mb-6 scroll-fade-in ${badgeVisible ? 'visible' : ''}`} style={{ transitionDelay: '100ms' }}>
          <div className="inline-flex items-center bg-primary/20 backdrop-blur-sm border border-primary/40 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium">
            <span className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary rounded-full mr-2 sm:mr-2.5 animate-pulse" />
            <span className="text-white font-medium">
              <span className="hidden sm:inline">Supervision terrain 7j/7 • Gestion structurée • Transparence totale</span>
              <span className="sm:hidden">Supervision 7j/7 • Gestion • Transparence</span>
            </span>
          </div>
        </div>

        {/* Heading */}
        <div ref={contentRef} className={`scroll-fade-in ${contentVisible ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-white mb-4 sm:mb-6 text-balance px-2 drop-shadow-lg">
            La gestion de syndic professionnelle, transparente et réactive
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base lg:text-lg text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto text-balance leading-relaxed px-4 drop-shadow-md">
            Marabouts prend en charge l'intégralité de votre copropriété : gestion administrative, maintenance, recouvrement et organisation terrain — avec un système digital fiable.
          </p>
        </div>

        {/* Bullets */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-2xl mx-auto scroll-fade-in ${contentVisible ? 'visible' : ''}`} style={{ transitionDelay: '300ms' }}>
          <div className="flex items-start space-x-2 sm:space-x-3">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5 sm:mt-1" />
            <span className="text-xs sm:text-sm text-white/95 font-medium">Superviseurs terrain présents 7j/7</span>
          </div>
          <div className="flex items-start space-x-2 sm:space-x-3">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5 sm:mt-1" />
            <span className="text-xs sm:text-sm text-white/95 font-medium">Maintenance suivie et contrôlée</span>
          </div>
          <div className="flex items-start space-x-2 sm:space-x-3 sm:col-span-2 lg:col-span-1">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5 sm:mt-1" />
            <span className="text-xs sm:text-sm text-white/95 font-medium">Reporting clair et traçabilité complète</span>
          </div>
        </div>

        {/* CTAs */}
        <div ref={buttonsRef} className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center scroll-fade-in ${buttonsVisible ? 'visible' : ''}`} style={{ transitionDelay: '400ms' }}>
          <Link href="/demandedevis">
            <Button size="lg" className="bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto">
              Demander un devis
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-transparent transition-all text-white duration-200 hover:-translate-y-0.5 w-full sm:w-auto"
            onClick={openCalendly}
          >
            <span className="hidden sm:inline  text-white">Planifier un rendez-vous</span>
            <span className="sm:hidden">Rendez-vous</span>
          </Button>
        </div>
      </div>

      {/* Calendly Modal */}
      {showCalendly && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-3 sm:p-4 border-b">
              <h3 className="text-base sm:text-lg font-semibold text-foreground">Planifier un rendez-vous</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={closeCalendly}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="h-[500px] sm:h-[600px] overflow-auto">
              <iframe 
                src={process.env.NEXT_PUBLIC_CALENDLY_URL + "?embed_domain=localhost%3A6001&embed_type=Inline&utm_source=marabouts-website&utm_medium=landing-page&utm_campaign=consultation-request"}
                width="100%"
                height="100%"
                frameBorder="0"
                className="min-h-[500px] sm:min-h-[600px]"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
