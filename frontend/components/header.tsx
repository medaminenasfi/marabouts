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
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between" style={{ height: '72px' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <SmoothScrollLink href="#services" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
              Services
            </SmoothScrollLink>
            <SmoothScrollLink href="#solution" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
              Solution
            </SmoothScrollLink>
            <SmoothScrollLink href="#for-who" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
              Promoteurs
            </SmoothScrollLink>
            <SmoothScrollLink href="#contact" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
              Contact
            </SmoothScrollLink>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center">
            {/* CTA Button */}
            <SmoothScrollLink href="#contact">
              <Button className="bg-primary hover:bg-primary-dark text-white font-medium rounded-lg px-4 xl:px-6 h-10 transition-all duration-200 hover:-translate-y-0.5">
                <span className="hidden xl:inline">Demander un audit</span>
                <span className="xl:hidden">Audit</span>
              </Button>
            </SmoothScrollLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            {/* Hamburger Menu */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
          <div className="lg:hidden border-t border-border bg-white/95 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-1">
              {/* Mobile Navigation Links */}
              <SmoothScrollLink 
                href="#services" 
                className="block py-3 px-4 text-foreground hover:text-primary hover:bg-gray-50 rounded-lg transition-colors text-base font-medium"
                onClick={closeMobileMenu}
              >
                Services
              </SmoothScrollLink>
              <SmoothScrollLink 
                href="#solution" 
                className="block py-3 px-4 text-foreground hover:text-primary hover:bg-gray-50 rounded-lg transition-colors text-base font-medium"
                onClick={closeMobileMenu}
              >
                Solution
              </SmoothScrollLink>
              <SmoothScrollLink 
                href="#for-who" 
                className="block py-3 px-4 text-foreground hover:text-primary hover:bg-gray-50 rounded-lg transition-colors text-base font-medium"
                onClick={closeMobileMenu}
              >
                Promoteurs
              </SmoothScrollLink>
              <SmoothScrollLink 
                href="#contact" 
                className="block py-3 px-4 text-foreground hover:text-primary hover:bg-gray-50 rounded-lg transition-colors text-base font-medium"
                onClick={closeMobileMenu}
              >
                Contact
              </SmoothScrollLink>
              
              {/* Mobile CTA Button */}
              <div className="pt-4 border-t border-border">
                <SmoothScrollLink href="#contact" onClick={closeMobileMenu}>
                  <Button className="w-full bg-primary hover:bg-primary-dark text-white font-medium rounded-lg h-12 transition-all duration-200 hover:-translate-y-0.5">
                    Demander un audit
                  </Button>
                </SmoothScrollLink>
              </div>

              {/* Mobile Contact Info */}
          
            </div>
          </div>
        )}
      </header>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40" 
          onClick={closeMobileMenu}
        />
      )}
    </>
  )
}
