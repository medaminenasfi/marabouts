'use client'

import { useRouter } from 'next/navigation'

export function Logo({ 
  variant = 'light', 
  onClick 
}: { 
  variant?: 'light' | 'dark'
  onClick?: () => void 
}) {
  const router = useRouter()
  
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      router.push('/')
    }
  }

  return (
    <div 
      className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
      onClick={handleClick}
    >
      <div className="relative">
        <img 
          src="/assets/marabouts-logo.webp"
          alt="Marabouts"
          className="h-10 w-auto"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLDivElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center" style={{ display: 'none' }}>
          <span className="text-white font-heading font-bold text-lg">M</span>
        </div>
      </div>
      <span className={`font-heading font-bold text-xl hidden sm:inline ${
        variant === 'dark' ? 'text-background' : 'text-foreground'
      }`}>
        MARABOUTS
      </span>
    </div>
  )
}
