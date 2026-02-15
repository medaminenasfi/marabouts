'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, ArrowRight, Sparkles } from 'lucide-react'
import { Logo } from '@/components/logo'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

export function Footer() {
  const { ref: footerRef, isVisible: footerVisible } = useScrollAnimation()
  const { ref: logoRef, isVisible: logoVisible } = useScrollAnimation()
  const { ref: navRef, isVisible: navVisible } = useScrollAnimation()
  const { ref: legalRef, isVisible: legalVisible } = useScrollAnimation()
  const { ref: copyrightRef, isVisible: copyrightVisible } = useScrollAnimation()

  return (
    <footer ref={footerRef} className="bg-foreground text-background py-8 sm:py-12 md:py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mb-6 sm:mb-8 md:mb-12">
          
          {/* Logo & Description - Mobile visible, desktop gauche */}
          <div 
            ref={logoRef}
            className={`text-center md:text-left scroll-fade-in ${logoVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="mb-4 sm:mb-6 group">
              <div className="transform transition-all duration-300 group-hover:scale-105 inline-block">
                <Logo variant="dark" />
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed mb-4 sm:mb-6 group-hover:text-background/80 transition-colors duration-300">
              La gestion de syndic professionnelle, transparente et réactive.
            </p>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <a 
                  href="tel:+33123456789" 
                  className="text-xs sm:text-sm text-background/70 hover:text-background transition-all duration-300 group-hover:translate-x-1 inline-block"
                >
                  +216 00 000 000
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <a 
                  href="mailto:contact@marabouts.fr" 
                  className="text-xs sm:text-sm text-background/70 hover:text-background transition-all duration-300 group-hover:translate-x-1 inline-block"
                >
Commercial@marabouts.tn                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs sm:text-sm text-background/70 group-hover:text-background/80 transition-colors duration-300">
                  Tunis, Tunis
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links - Mobile visible, desktop centre */}
          <div 
            ref={navRef}
            className={`text-center md:text-left scroll-fade-in ${navVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="mb-4 sm:mb-6 group">
              <h3 className="font-heading font-semibold text-base sm:text-lg text-background flex items-center justify-center md:justify-start gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Navigation
                <div className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-8"></div>
              </h3>
            </div>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { href: "#services", text: "Services" },
                { href: "#solution", text: "Solution" },
                { href: "#for-who", text: "Pour qui" },
                { href: "#process", text: "Processus" },
                { href: "#contact", text: "Contact" }
              ].map((link, index) => (
                <li key={link.text}>
                  <Link 
                    href={link.href} 
                    className="text-background/70 hover:text-background transition-all duration-300 text-xs sm:text-sm group flex items-center justify-center md:justify-start gap-2"
                    style={{ transitionDelay: `${200 + index * 50}ms` }}
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                      {link.text}
                    </span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal - Mobile visible, desktop droite */}
          <div 
            ref={legalRef}
            className={`text-center md:text-left scroll-fade-in ${legalVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="mb-4 sm:mb-6 group">
              <h3 className="font-heading font-semibold text-base sm:text-lg text-background flex items-center justify-center md:justify-start gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Mentions légales
                <div className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-8"></div>
              </h3>
            </div>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { href: "#", text: "Politique de confidentialité" },
                { href: "#", text: "Conditions d'utilisation" },
                { href: "#", text: "Politique de cookies" }
              ].map((link, index) => (
                <li key={link.text}>
                  <Link 
                    href={link.href} 
                    className="text-background/70 hover:text-background transition-all duration-300 text-xs sm:text-sm group flex items-center justify-center md:justify-start gap-2"
                    style={{ transitionDelay: `${300 + index * 50}ms` }}
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                      {link.text}
                    </span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Copyright - Responsive */}
        <div 
          ref={copyrightRef}
          className={`border-t border-background/10 pt-4 sm:pt-6 md:pt-8 text-center text-xs sm:text-sm text-background/70 scroll-fade-in ${copyrightVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '400ms' }}
        >
          <p className="group-hover:text-background/80 transition-colors duration-300 inline-block">
            &copy; 2026 Marabouts. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
