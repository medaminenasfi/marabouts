'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import { SmoothScrollLink } from '@/components/smooth-scroll-link'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-border/50'
            : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 flex-shrink-0 group">
            <div className="transform transition-all duration-300 group-hover:scale-105">
              <Logo />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            <SmoothScrollLink 
              href="#services" 
              className="relative text-foreground hover:text-primary transition-all duration-300 text-sm font-medium group py-2"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </SmoothScrollLink>
            <SmoothScrollLink 
              href="#solution" 
              className="relative text-foreground hover:text-primary transition-all duration-300 text-sm font-medium group py-2"
            >
              Transparence
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </SmoothScrollLink>
            <SmoothScrollLink 
              href="#for-who" 
              className="relative text-foreground hover:text-primary transition-all duration-300 text-sm font-medium group py-2"
            >
              Pour qui
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </SmoothScrollLink>
            <SmoothScrollLink 
              href="#contact" 
              className="relative text-foreground hover:text-primary transition-all duration-300 text-sm font-medium group py-2"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </SmoothScrollLink>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Espace Client Button */}
            <a 
              href="https://e-syndic.tn/System/Mobile.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-transparent hover:bg-gray-50 text-gray-700 font-semibold rounded-xl px-4 sm:px-6 lg:px-6 xl:px-8 h-12 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group relative overflow-hidden border-2 border-green-600 hover:border-green-700">
                <span className="relative z-10 text-sm sm:text-base">Espace client</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </a>
            
            {/* CTA Button */}
            <a 
              href="https://wa.me/21652768999?text=Bonjour%2C%20je%20souhaite%20parler%20%C3%A0%20un%20conseiller"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl px-4 sm:px-6 lg:px-6 xl:px-8 h-12 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group relative overflow-hidden flex items-center gap-2 border-2 border-green-600 hover:border-green-700">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="relative z-10 text-sm sm:text-base whitespace-nowrap">Parler à un conseiller</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            {/* Hamburger Menu */}
            <button
              onClick={toggleMobileMenu}
              className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border/50 bg-white/95 backdrop-blur-lg shadow-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-2">
              {/* Mobile Navigation Links */}
              <div className="space-y-1">
                <SmoothScrollLink 
                  href="#services" 
                  className="block py-4 px-6 text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300 text-base font-medium group"
                  onClick={closeMobileMenu}
                >
                  <div className="flex items-center justify-between">
                    <span>Services</span>
                    <div className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4"></div>
                  </div>
                </SmoothScrollLink>
                <SmoothScrollLink 
                  href="#solution" 
                  className="block py-4 px-6 text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300 text-base font-medium group"
                  onClick={closeMobileMenu}
                >
                  <div className="flex items-center justify-between">
                    <span>Transparence</span>
                    <div className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4"></div>
                  </div>
                </SmoothScrollLink>
                <SmoothScrollLink 
                  href="#for-who" 
                  className="block py-4 px-6 text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300 text-base font-medium group"
                  onClick={closeMobileMenu}
                >
                  <div className="flex items-center justify-between">
                    <span>Pour qui</span>
                    <div className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4"></div>
                  </div>
                </SmoothScrollLink>
                <SmoothScrollLink 
                  href="#contact" 
                  className="block py-4 px-6 text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300 text-base font-medium group"
                  onClick={closeMobileMenu}
                >
                  <div className="flex items-center justify-between">
                    <span>Contact</span>
                    <div className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4"></div>
                  </div>
                </SmoothScrollLink>
              </div>

              {/* Mobile CTA Buttons */}
              <div className="pt-6 px-6 space-y-3">
                {/* Espace Client Button */}
                <a 
                  href="https://e-syndic.tn/System/Mobile.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                >
                  <Button className="w-full bg-transparent hover:bg-gray-50 text-gray-700 font-semibold rounded-xl h-14 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group relative overflow-hidden border-2 border-green-600 hover:border-green-700">
                    <span className="relative z-10">Espace client</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </a>
                
                {/* WhatsApp Button */}
                <a 
                  href="https://wa.me/21652768999?text=Bonjour%2C%20je%20souhaite%20parler%20%C3%A0%20un%20conseiller"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                >
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl h-14 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group relative overflow-hidden flex items-center justify-center gap-2 border-2 border-green-600 hover:border-green-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span className="relative z-10">Parler à un conseiller</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300" 
          onClick={closeMobileMenu}
        />
      )}
    </>
  )
}
