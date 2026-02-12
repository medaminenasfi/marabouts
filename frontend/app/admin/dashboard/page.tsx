'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { AdminRoute } from '@/components/protected-routes'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, 
  Users, 
  LogOut, 
  Eye, 
  BarChart3
} from 'lucide-react'
import { apiClient } from '@/lib/api-client'
import { Logo } from '@/components/logo'

interface DashboardStats {
  totalForms: number
  newForms: number
  processedForms: number
  totalAdmins: number
}

interface ContactFormSubmission {
  id: string
  building: any
  request: any
  identity: any
  status: string
  createdAt: string
}

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalForms: 0,
    newForms: 0,
    processedForms: 0,
    totalAdmins: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      console.log('🔍 Récupération des données du dashboard...')
      
      // Récupérer seulement les formulaires de contact
      const contactFormsData = await apiClient.getContactForms()
      
      console.log('✅ Données des formulaires:', contactFormsData)

      const contactForms = contactFormsData as ContactFormSubmission[]

      setStats({
        totalForms: contactForms.length,
        newForms: contactForms.filter(form => form.status === 'NEW').length,
        processedForms: contactForms.filter(form => form.status !== 'NEW').length,
        totalAdmins: 1
      })
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des données:', error)
      // Valeurs par défaut en cas d'erreur
      setStats({
        totalForms: 0,
        newForms: 0,
        processedForms: 0,
        totalAdmins: 1
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'bg-destructive text-white'
      case 'HIGH': return 'bg-orange-500 text-white'
      case 'MEDIUM': return 'bg-yellow-500 text-white'
      case 'LOW': return 'bg-green-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-destructive/10 text-destructive border-destructive/20'
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'RESOLVED': return 'bg-green-100 text-green-800 border-green-200'
      case 'CLOSED': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <AdminRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-white border-b border-border sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Logo />
              <h1 className="text-2xl font-bold text-foreground">Tableau de Bord Admin</h1>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push('/admin/forms')}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total des Formulaires</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalForms}</div>
                <p className="text-xs text-muted-foreground">Total des soumissions</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nouveaux Formulaires</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{stats.newForms}</div>
                <p className="text-xs text-muted-foreground">En attente de validation</p>
              </CardContent>
            </Card>
          </div>

          {/* Message d'information */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-semibold mb-2">Tableau de Bord Administrateur</h3>
                <p className="text-muted-foreground mb-4">
                  Cliquez sur "Total des Formulaires" pour voir toutes les personnes qui ont rempli le formulaire de contact
                </p>
                <Button onClick={() => router.push('/admin/forms')} className="mt-2">
                  <Eye className="w-4 h-4 mr-2" />
                  Voir tous les formulaires
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminRoute>
  )
}
