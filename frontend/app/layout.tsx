import React from "react"
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'

import './globals.css'
import { AuthProvider } from '@/contexts/auth-context'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk'
})
const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Marabouts - Gestion de Syndic Professionnelle',
  description: 'Supervision terrain 7j/7 • Gestion structurée • Transparence totale',
  generator: 'v0.app',
  icons: {
    icon: '/assests/marabouts-logo.webp',
  },
}

export const viewport: Viewport = {
  themeColor: '#0B5D43',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" style={{ colorScheme: 'light' }}>
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
