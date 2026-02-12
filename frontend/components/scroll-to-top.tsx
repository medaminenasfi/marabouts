'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronUp } from 'lucide-react'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 bg-primary hover:bg-primary-dark text-white rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 group"
          aria-label="Retour en haut"
        >
          <ChevronUp className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform duration-200" />
        </Button>
      )}
    </>
  )
}
