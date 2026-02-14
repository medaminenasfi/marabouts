'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Eye, EyeOff, Shield, X } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { login } = useAuth()
  const router = useRouter()

  const handleClose = () => {
    router.push('/')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)


    try {
      await login(email, password)
      router.push('/admin/dashboard')
    } catch (err: any) {
      setError(err.message || 'Identifiants incorrects. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwQjVENDMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iNyIgY3k9IjciIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
      
      {/* Floating elements - responsive */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[24rem] lg:h-[24rem] xl:w-96 xl:h-96 bg-primary/8 rounded-full blur-2xl sm:blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-72 lg:h-72 xl:w-80 xl:h-80 bg-accent/10 rounded-full blur-2xl sm:blur-3xl" />
      
      {/* Overlay pour fermer en cliquant à l'extérieur - mobile uniquement */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-0 sm:hidden" 
        onClick={handleClose}
      />
      
      <div className="relative w-full max-w-sm sm:max-w-md px-3 sm:px-4 md:px-6 lg:px-8 z-10">
        {/* Espace Admin - responsive */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <Shield className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 text-primary" />
            <h1 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight">
              Espace Admin
            </h1>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-xs sm:max-w-sm md:max-w-md mx-auto leading-relaxed">
            Accès sécurisé au tableau de bord
          </p>
        </div>

        <Card className="shadow-xl border-border/50 backdrop-blur-sm bg-white/95 relative">
          {/* Bouton de fermeture - visible sur mobile */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 p-1.5 sm:p-2 rounded-full bg-background/80 hover:bg-background border border-border/50 hover:border-border transition-all duration-200 sm:hidden"
            aria-label="Fermer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
          </button>
          
          <CardHeader className="space-y-1 pb-3 sm:pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
            <CardTitle className="text-lg sm:text-xl md:text-2xl font-heading text-center leading-tight pr-8 sm:pr-0">
              Connexion Sécurisée
            </CardTitle>
            <CardDescription className="text-center text-xs sm:text-sm leading-relaxed">
              Identifiants administrateurs uniquement
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 px-4 sm:px-6">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {error && (
                <div className="flex items-start gap-2 p-2 sm:p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs sm:text-sm">
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="email" className="text-xs sm:text-sm font-medium">Email professionnel</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@marabouts.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10 sm:h-11 md:h-12 border-border/50 focus:border-primary focus:ring-primary/20 text-sm sm:text-base"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="password" className="text-xs sm:text-sm font-medium">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-10 sm:h-11 md:h-12 pr-10 sm:pr-12 border-border/50 focus:border-primary focus:ring-primary/20 text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors p-1"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-10 sm:h-11 md:h-12 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl text-sm sm:text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs sm:text-sm">Connexion en cours...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">Se connecter</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Security notice - responsive */}
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border/50">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
                <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span className="text-center">Connexion sécurisée • Données protégées</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Footer - responsive */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">
            © 2026 • Gestion de syndic professionnelle
          </p>
        </div>
      </div>
    </div>
  )
}
