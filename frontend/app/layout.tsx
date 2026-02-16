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
  title: 'Marabouts - Gestion de Syndic Professionnelle | Demande de devis',
  description: 'Supervision terrain 7j/7 • Gestion structurée • Transparence totale',
  icons: {
    icon: '/assets/marabouts-logo.webp',
  },
}

export const viewport: Viewport = {
  themeColor: '#0B5D43',
  userScalable: true,
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" style={{ colorScheme: 'light' }}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body 
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
