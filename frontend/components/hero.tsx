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
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden pt-20 pb-20">
      {/* Background with image overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="relative w-full h-full">
          <img 
            src="/assests/hero-building.jpg"
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
        <div className="absolute inset-0 bg-gradient-to-br from-white/92 via-white/95 to-primary/8" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div ref={heroRef} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div ref={badgeRef} className={`flex justify-center mb-6 scroll-fade-in ${badgeVisible ? 'visible' : ''}`} style={{ transitionDelay: '100ms' }}>
          <Badge variant="outline" className="bg-accent/15 text-accent-foreground border-accent/30 px-4 py-2 rounded-full">
            <span className="inline-block w-2 h-2 bg-accent rounded-full mr-2" />
            Supervision terrain 7j/7 • Gestion structurée • Transparence totale
          </Badge>
        </div>

        {/* Heading */}
        <div ref={contentRef} className={`scroll-fade-in ${contentVisible ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
          <h1 className="font-heading font-bold text-5xl md:text-6xl leading-tight tracking-tight text-foreground mb-6 text-balance">
            La gestion de syndic professionnelle, transparente et réactive
          </h1>

          {/* Subheading */}
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto text-balance leading-relaxed">
            Marabouts prend en charge l'intégralité de votre copropriété : gestion administrative, maintenance, recouvrement et organisation terrain — avec un système digital fiable.
          </p>
        </div>

        {/* Bullets */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto scroll-fade-in ${contentVisible ? 'visible' : ''}`} style={{ transitionDelay: '300ms' }}>
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <span className="text-sm text-foreground">Superviseurs terrain présents 7j/7</span>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <span className="text-sm text-foreground">Maintenance suivie et contrôlée</span>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <span className="text-sm text-foreground">Reporting clair et traçabilité complète</span>
          </div>
        </div>

        {/* CTAs */}
        <div ref={buttonsRef} className={`flex flex-col sm:flex-row gap-4 justify-center scroll-fade-in ${buttonsVisible ? 'visible' : ''}`} style={{ transitionDelay: '400ms' }}>
          <SmoothScrollLink href="#contact">
            <Button size="lg" className="bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold px-8 transition-all duration-200 hover:-translate-y-0.5">
              Demander un devis
            </Button>
          </SmoothScrollLink>
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-lg font-semibold px-8 bg-transparent transition-all duration-200 hover:-translate-y-0.5"
            onClick={openCalendly}
          >
            Planifier un rendez-vous
          </Button>
        </div>
      </div>

      {/* Calendly Modal */}
      {showCalendly && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-foreground">Planifier un rendez-vous</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={closeCalendly}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="h-[600px] overflow-auto">
              <iframe 
                src={process.env.NEXT_PUBLIC_CALENDLY_URL + "?embed_domain=localhost%3A6001&embed_type=Inline&utm_source=marabouts-website&utm_medium=landing-page&utm_campaign=consultation-request"}
                width="100%"
                height="100%"
                frameBorder="0"
                className="min-h-[600px]"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
