'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { AdminRoute } from '@/components/protected-routes'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Eye, Building2, User, Phone, Mail, Calendar } from 'lucide-react'
import { apiClient } from '@/lib/api-client'
import { Logo } from '@/components/logo'
import { ScrollToTop } from '@/components/scroll-to-top'

interface ContactFormSubmission {
  id: string
  building: any
  request: any
  identity: any
  status: string
  createdAt: string
  updatedAt?: string
}

// Fonctions pour convertir les codes en libellés lisibles
const getRoleLabel = (role: string) => {
  const roleMap: { [key: string]: string } = {
    'president': 'Président du syndic',
    'tresorier': 'Trésorier',
    'resident': 'Résident',
    'promoter': 'Promoteur immobilier',
    'other': 'Autre'
  }
  
  // Handle "Autre: custom text" format - show only custom text
  if (role?.startsWith('Autre:')) {
    return role.replace('Autre: ', '')
  }
  
  return roleMap[role] || role
}

const getSituationLabel = (situation: string) => {
  const situationMap: { [key: string]: string } = {
    'gestion': 'Déjà en gestion externe',
    'auto': 'Auto-gestion',
    'change': 'Changement de syndic',
    'autres': 'Autres'
  }
  
  // Handle "Autres: custom text" format - show only custom text
  if (situation?.startsWith('Autres:')) {
    return situation.replace('Autres: ', '')
  }
  
  return situationMap[situation] || situation
}

const getMotifLabel = (motif: string) => {
  const motifMap: { [key: string]: string } = {
    'maintenance': 'Améliorer la maintenance',
    'transparency': 'Augmenter la transparence',
    'recovery': 'Améliorer le recouvrement',
    'supervision': 'Superviser le terrain',
    'autre': 'Autre'
  }
  
  // Handle "Autre: custom text" format - show only custom text
  if (motif?.startsWith('Autre:')) {
    return motif.replace('Autre: ', '')
  }
  
  return motifMap[motif] || motif
}

export default function AdminFormsPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [forms, setForms] = useState<ContactFormSubmission[]>([])
  const [selectedForm, setSelectedForm] = useState<ContactFormSubmission | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchForms()
    }
  }, [user])

  const fetchForms = async () => {
    try {
      console.log('🔍 Récupération des formulaires...')
      const formsData = await apiClient.getContactForms()
      setForms(formsData as ContactFormSubmission[])
    } catch (error) {
      console.error(' Erreur lors de la récupération des formulaires:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const handleBack = () => {
    router.push('/admin/dashboard')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <>
      <AdminRoute>
        <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-white border-b border-border sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-8 h-8 sm:w-auto sm:h-auto">
                <Logo />
              </div>
              <h1 className="text-lg sm:text-2xl font-bold text-foreground truncate">
                <span className="hidden sm:inline">Tous les Formulaires</span>
                <span className="sm:hidden">Formulaires</span>
              </h1>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleBack}
                className="hidden sm:flex"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au tableau de bord
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleBack}
                className="sm:hidden px-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="hidden sm:flex"
              >
                Déconnexion
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="sm:hidden px-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-3xl font-bold text-foreground mb-2">
              Personnes ayant rempli le formulaire
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              {forms.length} personne(s) ont soumis le formulaire de contact
            </p>
          </div>

          {/* Liste des formulaires */}
          <div className="space-y-3 sm:space-y-4">
            {forms.map((form) => (
              <Card 
                key={form.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedForm(form)}
              >
                <CardContent className="p-4 sm:pt-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                          {form.identity?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-base sm:text-lg text-foreground truncate">
                            {form.identity?.name || 'Personne inconnue'}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {getRoleLabel(form.identity?.role) || 'Rôle non spécifié'} • {form.building?.name || 'Bâtiment inconnu'}
                          </p>
                          {/* Afficher les options principales */}
                          <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                            {form.building?.situation && (
                              <span className="text-xs bg-primary/10 text-primary px-1.5 sm:px-2 py-1 rounded">
                                {getSituationLabel(form.building.situation)}
                              </span>
                            )}
                            {form.building?.motif && (
                              <span className="text-xs bg-accent/15 text-accent-foreground px-1.5 sm:px-2 py-1 rounded">
                                {getMotifLabel(form.building.motif)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
                          <span className="truncate">{form.identity?.email || 'Email non fourni'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
                          <span className="truncate">{form.identity?.phone || 'Téléphone non fourni'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
                          <span>{new Date(form.createdAt).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedForm(form)
                        }}
                        className="shrink-0"
                      >
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Afficher les détails</span>
                        <span className="sm:hidden">Voir</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {forms.length === 0 && (
              <Card>
                <CardContent className="pt-8 sm:pt-12 pb-8 sm:pb-12">
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl mb-4">📋</div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">Aucun formulaire</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Personne n'a encore rempli le formulaire de contact
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Popup pour les détails */}
        {selectedForm && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50"
            onClick={() => setSelectedForm(null)}
          >
            <div 
              className="bg-white rounded-lg w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-2xl font-bold text-foreground">
                    Détails du formulaire
                  </h2>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedForm(null)}
                    className="shrink-0"
                  >
                    ✕
                  </Button>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {/* Étape 1: Informations du bâtiment */}
                  <div className="bg-accent/5 rounded-lg p-3 sm:p-4 border border-accent/10">
                    <h3 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent-foreground shrink-0" />
                      <span className="truncate">Étape 1 — Informations du bâtiment</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div><strong>Nom de la résidence :</strong> {selectedForm.building?.name || 'Non fourni'}</div>
                      <div><strong>Adresse:</strong> {selectedForm.building?.address || 'Non fourni'}</div>
                      <div><strong>Nombre d'appartements:</strong> {selectedForm.building?.units || 'Non fourni'}</div>
                    </div>
                    {selectedForm.building?.situation && (
                      <div className="mt-2 sm:mt-3 text-xs sm:text-sm">
                        <strong>Situation actuelle:</strong> {getSituationLabel(selectedForm.building.situation)}
                      </div>
                    )}
                    {selectedForm.building?.description && (
                      <div className="mt-2 text-xs sm:text-sm break-words">
                        <strong>Description:</strong> {selectedForm.building.description}
                      </div>
                    )}
                  </div>

                  {/* Étape 2: Nature de la demande */}
                  <div className="bg-warning/5 rounded-lg p-3 sm:p-4 border border-warning/20">
                    <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">📝 Étape 2 — Nature de la demande</h3>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                      <div><strong>Sujet:</strong> {selectedForm.request?.subject || 'Non fourni'}</div>
                      {selectedForm.building?.motif && (
                        <div className="mt-1 sm:mt-2">
                          <strong>Motif:</strong> {getMotifLabel(selectedForm.building.motif)}
                        </div>
                      )}
                      {selectedForm.request?.description && (
                        <div className="break-words">
                          <strong>Description:</strong> {selectedForm.request.description}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Étape 3: Informations personnelles */}
                  <div className="bg-primary/5 rounded-lg p-3 sm:p-4 border border-primary/10">
                    <h3 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                      <span className="truncate">Étape 3 — Informations personnelles</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div><strong>Nom:</strong> {selectedForm.identity?.name || 'Non fourni'}</div>
                      <div><strong>Rôle:</strong> {getRoleLabel(selectedForm.identity?.role) || 'Non fourni'}</div>
                      <div><strong>Email:</strong> {selectedForm.identity?.email || 'Non fourni'}</div>
                      <div><strong>Téléphone:</strong> {selectedForm.identity?.phone || 'Non fourni'}</div>
                    </div>
                  </div>

                  {/* Métadonnées */}
                  <div className="bg-muted rounded-lg p-3 sm:p-4 border border-border">
                    <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">📅 Métadonnées</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div><strong>Soumis le:</strong> {new Date(selectedForm.createdAt).toLocaleString('fr-FR')}</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4 sm:mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedForm(null)}
                    size="sm"
                    className="shrink-0"
                  >
                    Fermer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </AdminRoute>
      <ScrollToTop />
    </>
  )
}
