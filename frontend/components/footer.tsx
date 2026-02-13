import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Logo } from '@/components/logo'

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-8 sm:py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mb-6 sm:mb-8 md:mb-12">
          
          {/* Logo & Description - Mobile visible, desktop gauche */}
          <div className="text-center md:text-left">
            <div className="mb-4 sm:mb-6">
              <Logo variant="dark" />
            </div>
            <p className="text-background/70 text-sm leading-relaxed mb-4 sm:mb-6">
              La gestion de syndic professionnelle, transparente et réactive.
            </p>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:+33123456789" className="text-xs sm:text-sm text-background/70 hover:text-background transition-colors">
                  +216 00 000 000
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:contact@marabouts.fr" className="text-xs sm:text-sm text-background/70 hover:text-background transition-colors">
                  contact@marabouts.tn
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm text-background/70">
                  Tunis, Tunis
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links - Mobile visible, desktop centre */}
          <div className="text-center md:text-left">
            <h3 className="font-heading font-semibold text-base sm:text-lg text-background mb-4 sm:mb-6">
              Navigation
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="#services" className="text-background/70 hover:text-background transition-colors text-xs sm:text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#solution" className="text-background/70 hover:text-background transition-colors text-xs sm:text-sm">
                  Solution
                </Link>
              </li>
              <li>
                <Link href="#for-who" className="text-background/70 hover:text-background transition-colors text-xs sm:text-sm">
                  Pour qui
                </Link>
              </li>
              <li>
                <Link href="#process" className="text-background/70 hover:text-background transition-colors text-xs sm:text-sm">
                  Processus
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-background/70 hover:text-background transition-colors text-xs sm:text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal - Mobile visible, desktop droite */}
          <div className="text-center md:text-left">
            <h3 className="font-heading font-semibold text-base sm:text-lg text-background mb-4 sm:mb-6">
              Mentions légales
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="#" className="text-background/70 hover:text-background transition-colors text-xs sm:text-sm">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/70 hover:text-background transition-colors text-xs sm:text-sm">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/70 hover:text-background transition-colors text-xs sm:text-sm">
                  Politique de cookies
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright - Responsive */}
        <div className="border-t border-background/10 pt-4 sm:pt-6 md:pt-8 text-center text-xs sm:text-sm text-background/70">
          <p>&copy; 2026 Marabouts. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
