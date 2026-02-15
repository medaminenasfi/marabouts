'use client'

import { useRouter } from 'next/navigation'

interface LogoImageOnlyProps {
  onClick?: () => void
}

export function LogoImageOnly({ onClick }: LogoImageOnlyProps) {
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
      className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src="/assets/marabouts-logo.webp"
          alt="Marabouts"
          width={120}
          height={120}
          className="object-contain"
          onError={(e) => {
            console.log('Image failed to load, showing fallback')
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLDivElement;
            if (fallback) fallback.style.display = 'flex';
          }}
          onLoad={() => {
            console.log('Image loaded successfully')
          }}
        />
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center" style={{ display: 'none' }}>
          <span className="text-white font-heading font-bold text-3xl">M</span>
        </div>
      </div>
    </div>
  )
}
