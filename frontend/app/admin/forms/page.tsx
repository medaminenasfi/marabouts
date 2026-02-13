'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { AdminRoute } from '@/components/protected-routes'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
  return roleMap[role] || role
}

const getSituationLabel = (situation: string) => {
  const situationMap: { [key: string]: string } = {
    'gestion': 'Déjà en gestion externe',
    'auto': 'Auto-gestion',
    'change': 'Changement de syndic',
    'autres': 'Autres'
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
      console.error('❌ Erreur lors de la récupération:', error)
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
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Logo />
              <h1 className="text-2xl font-bold text-foreground">Tous les Formulaires</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au tableau de bord
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Déconnexion
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Personnes ayant rempli le formulaire
            </h2>
            <p className="text-muted-foreground">
              {forms.length} personne(s) ont soumis le formulaire de contact
            </p>
          </div>

          {/* Liste des formulaires */}
          <div className="space-y-4">
            {forms.map((form) => (
              <Card 
                key={form.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedForm(form)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                          {form.identity?.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">
                            {form.identity?.name || 'Personne inconnue'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {getRoleLabel(form.identity?.role) || 'Rôle non spécifié'} • {form.building?.name || 'Bâtiment inconnu'}
                          </p>
                          {/* Afficher les options principales */}
                          {(() => {
                            const desc = form.building?.description;
                            const situationMatch = desc?.match(/Situation: ([^,]+)/);
                            const motifMatch = desc?.match(/Motif: (.+)/);
                            
                            return (
                              <div className="flex gap-2 mt-1">
                                {situationMatch && (
                                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                    {getSituationLabel(situationMatch[1].trim())}
                                  </span>
                                )}
                                {motifMatch && (
                                  <span className="text-xs bg-accent/15 text-accent-foreground px-2 py-1 rounded">
                                    {getMotifLabel(motifMatch[1].trim())}
                                  </span>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span>{form.identity?.email || 'Email non fourni'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{form.identity?.phone || 'Téléphone non fourni'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
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
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Afficher les détails
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {forms.length === 0 && (
              <Card>
                <CardContent className="pt-12 pb-12">
                  <div className="text-center">
                    <div className="text-4xl mb-4">📋</div>
                    <h3 className="text-lg font-semibold mb-2">Aucun formulaire</h3>
                    <p className="text-muted-foreground">
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
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedForm(null)}
          >
            <div 
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Détails du formulaire
                  </h2>
                  <Button variant="outline" onClick={() => setSelectedForm(null)}>
                    ✕
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Informations personnelles */}
                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Informations personnelles
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div><strong>Nom:</strong> {selectedForm.identity?.name || 'Non fourni'}</div>
                      <div><strong>Rôle:</strong> {getRoleLabel(selectedForm.identity?.role) || 'Non fourni'}</div>
                      <div><strong>Email:</strong> {selectedForm.identity?.email || 'Non fourni'}</div>
                      <div><strong>Téléphone:</strong> {selectedForm.identity?.phone || 'Non fourni'}</div>
                    </div>
                  </div>

                  {/* Informations du bâtiment */}
                  <div className="bg-accent/5 rounded-lg p-4 border border-accent/10">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-accent-foreground" />
                      Informations du bâtiment
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div><strong>Nom:</strong> {selectedForm.building?.name || 'Non fourni'}</div>
                      <div><strong>Adresse:</strong> {selectedForm.building?.address || 'Non fourni'}</div>
                      <div><strong>Ville:</strong> {selectedForm.building?.city || 'Non fourni'}</div>
                      <div><strong>Unités:</strong> {selectedForm.building?.units || 'Non fourni'}</div>
                    </div>
                    {selectedForm.building?.description && (
                      <div className="mt-3">
                        <strong>Description:</strong> {selectedForm.building.description}
                        {/* Extraire et afficher les options */}
                        {(() => {
                          const desc = selectedForm.building.description;
                          const situationMatch = desc.match(/Situation: ([^,]+)/);
                          const motifMatch = desc.match(/Motif: (.+)/);
                          
                          return (
                            <div className="mt-2 space-y-1">
                              {situationMatch && (
                                <div><strong>Situation:</strong> {getSituationLabel(situationMatch[1].trim())}</div>
                              )}
                              {motifMatch && (
                                <div><strong>Motif:</strong> {getMotifLabel(motifMatch[1].trim())}</div>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>

                  {/* Détails de la demande */}
                  <div className="bg-warning/5 rounded-lg p-4 border border-warning/20">
                    <h3 className="font-semibold mb-3">📝 Détails de la demande</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>Sujet:</strong> {selectedForm.request?.subject || 'Non fourni'}</div>
                      <div><strong>Priorité:</strong> 
                        <Badge variant="outline" className="ml-2">
                          {selectedForm.request?.priority || 'Non fourni'}
                        </Badge>
                      </div>
                      {selectedForm.request?.description && (
                        <div>
                          <strong>Description:</strong> {selectedForm.request.description}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Métadonnées */}
                  <div className="bg-muted rounded-lg p-4 border border-border">
                    <h3 className="font-semibold mb-3">📅 Métadonnées</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      
                      <div><strong>Soumis le:</strong> {new Date(selectedForm.createdAt).toLocaleString('fr-FR')}</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline" onClick={() => setSelectedForm(null)}>
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
