'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

export function Hero() {
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

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <Badge variant="outline" className="bg-accent/15 text-accent-foreground border-accent/30 px-4 py-2 rounded-full">
            <span className="inline-block w-2 h-2 bg-accent rounded-full mr-2" />
            Supervision terrain 7j/7 • Gestion structurée • Transparence totale
          </Badge>
        </div>

        {/* Heading */}
        <h1 className="font-heading font-bold text-5xl md:text-6xl leading-tight tracking-tight text-foreground mb-6 text-balance">
          La gestion de syndic professionnelle, transparente et réactive
        </h1>

        {/* Subheading */}
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto text-balance leading-relaxed">
          Marabouts prend en charge l'intégralité de votre copropriété : gestion administrative, maintenance, recouvrement et organisation terrain — avec un système digital fiable.
        </p>

        {/* Bullets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold px-8">
            Demander un devis
          </Button>
          <Button size="lg" variant="outline" className="rounded-lg font-semibold px-8 bg-transparent">
            Planifier un rendez-vous
          </Button>
        </div>
      </div>
    </section>
  )
}
