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
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
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
              Promoteurs
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
          <div className="hidden lg:flex items-center">
            {/* CTA Button */}
            <SmoothScrollLink href="#contact">
              <Button className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl px-6 xl:px-8 h-12 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group relative overflow-hidden">
                <span className="relative z-10">Demander un audit</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </SmoothScrollLink>
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
                    <span>Promoteurs</span>
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

              {/* Mobile CTA Button */}
              <div className="pt-6 px-6">
                <SmoothScrollLink href="#contact" onClick={closeMobileMenu}>
                  <Button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl h-14 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group relative overflow-hidden">
                    <span className="relative z-10">Demander un audit</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </SmoothScrollLink>
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
