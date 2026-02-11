'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'

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
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between" style={{ height: '72px' }}>
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
          <Logo />
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
            Promoteurs
          </Link>
          <Link href="#contact" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
            Contact
          </Link>
        </div>

        {/* CTA Button */}
        <Button className="bg-primary hover:bg-primary/90 text-white font-medium rounded-full px-6 h-12">
          <a href="/admin/login" className="flex items-center">
            Admin
          </a>
        </Button>
      </nav>
    </header>
  )
}
