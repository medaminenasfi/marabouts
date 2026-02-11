'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-heading font-bold text-lg">M</span>
          </div>
          <span className="font-heading font-bold text-xl text-foreground hidden sm:inline">
            Marabouts
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#services" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
            Services
          </Link>
          <Link href="#transparency" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
            Transparence
          </Link>
          <Link href="#for-who" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
            Pour qui
          </Link>
          <Link href="#contact" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
            Contact
          </Link>
        </div>

        {/* CTA Button */}
        <Button className="bg-primary hover:bg-primary/90 text-white font-medium rounded-full px-6">
          Demander un audit
        </Button>
      </nav>
    </header>
  )
}
