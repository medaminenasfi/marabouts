'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, X } from 'lucide-react'
import Link from 'next/link'
import { SmoothScrollLink } from '@/components/smooth-scroll-link'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

export function CtaSection() {
  const [showCalendly, setShowCalendly] = useState(false)
  const { ref, isVisible } = useScrollAnimation()

  const openCalendly = () => {
    setShowCalendly(true)
  }

  const closeCalendly = () => {
    setShowCalendly(false)
  }

  return (
    <>
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-accent p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl scroll-fade-in ${isVisible ? 'visible' : ''}`} ref={ref}>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSI3IiBjeT0iNyIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative text-center">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 sm:mb-6 px-4">
                Passez à une gestion structurée et transparente
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-4">
                Obtenez un devis adapté à votre résidence en quelques minutes
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                <Link href="/demandedevis">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 group w-full sm:w-auto">
                    <span className="flex items-center justify-center">
                      Demander un devis
                      <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white bg-white text-primary hover:bg-white/90 hover:border-primary/30 rounded-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg transition-all duration-200 hover:-translate-y-0.5 group w-full sm:w-auto"
                  onClick={openCalendly}
                >
                  <span className="flex items-center justify-center">
                    <Calendar className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Planifier un rendez-vous</span>
                    <span className="sm:hidden">Rendez-vous</span>
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

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
    </>
  )
}
