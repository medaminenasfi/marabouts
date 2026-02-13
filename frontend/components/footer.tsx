import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Logo } from '@/components/logo'

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          
          {/* Logo & Description - Desktop gauche, mobile caché */}
          <div className="hidden md:block">
            <div className="mb-6">
              <Logo variant="dark" />
            </div>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              La gestion de syndic professionnelle, transparente et réactive.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:+33123456789" className="text-sm text-background/70 hover:text-background transition-colors">
                  +216 00 000 000
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:contact@marabouts.fr" className="text-sm text-background/70 hover:text-background transition-colors">
                  contact@marabouts.tn
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-background/70">
                  Tunis, Tunis
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links - Desktop centre, mobile centré */}
          <div className="text-center md:text-left">
            <h3 className="font-heading font-semibold text-lg text-background mb-6">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="#services" className="text-background/70 hover:text-background transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#solution" className="text-background/70 hover:text-background transition-colors text-sm">
                  Solution
                </Link>
              </li>
              <li>
                <Link href="#for-who" className="text-background/70 hover:text-background transition-colors text-sm">
                  Pour qui
                </Link>
              </li>
              <li>
                <Link href="#process" className="text-background/70 hover:text-background transition-colors text-sm">
                  Processus
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-background/70 hover:text-background transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal - Desktop droite, mobile caché */}
          <div className="hidden md:block">
            <h3 className="font-heading font-semibold text-lg text-background mb-6">
              Mentions légales
            </h3>
            <ul className="space-y-3">
            
              <li>
                <Link href="#" className="text-background/70 hover:text-background transition-colors text-sm">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/70 hover:text-background transition-colors text-sm">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/70 hover:text-background transition-colors text-sm">
                  Politique de cookies
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright - Responsive */}
        <div className="border-t border-background/10 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-background/70">
          <p>&copy; 2026 Marabouts. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
