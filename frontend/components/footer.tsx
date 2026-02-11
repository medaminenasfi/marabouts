import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">M</span>
              </div>
              <span className="font-heading font-bold text-lg text-background">Marabouts</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed mb-4">
              La gestion de syndic professionnelle, transparente et réactive.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:+33123456789" className="text-sm text-background/70 hover:text-background transition-colors">
                  +33 1 23 45 67 89
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:contact@marabouts.fr" className="text-sm text-background/70 hover:text-background transition-colors">
                  contact@marabouts.fr
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-background/70">
                  Paris, France
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
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

          {/* Legal */}
          <div>
            <h3 className="font-heading font-semibold text-lg text-background mb-6">
              Légal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-background/70 hover:text-background transition-colors text-sm">
                  Mentions légales
                </Link>
              </li>
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

        {/* Copyright */}
        <div className="border-t border-background/10 pt-8 text-center text-sm text-background/70">
          <p>&copy; 2025 Marabouts. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
