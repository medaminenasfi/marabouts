'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { apiClient } from '@/lib/api-client'

type FormStep = 'building' | 'request' | 'identity' | 'confirmation'

interface FormData {
  residenceName: string
  address: string
  apartments: string
  situation: string
  motif: string
  description: string
  role: string
  name: string
  phone: string
  email: string
}

export function ContactForm() {
  const [step, setStep] = useState<FormStep>('building')
  const [formData, setFormData] = useState<FormData>({
    residenceName: '',
    address: '',
    apartments: '',
    situation: '',
    motif: '',
    description: '',
    role: '',
    name: '',
    phone: '',
    email: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // Validation spécifique pour certains champs
    if (name === 'email') {
      // Accepte uniquement les caractères valides pour un email
      const emailValue = value.toLowerCase().replace(/[^a-z0-9@._-]/g, '')
      setFormData((prev) => ({
        ...prev,
        [name]: emailValue,
      }))
    } else if (name === 'apartments') {
      // Accepte uniquement les nombres
      const numberValue = value.replace(/[^0-9]/g, '')
      setFormData((prev) => ({
        ...prev,
        [name]: numberValue,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
    
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError('')

    try {
      // Submit contact form to backend
      const formDataBackend = {
        building: {
          name: formData.residenceName,
          address: formData.address,
          city: formData.address.split(',').pop()?.trim() || 'Paris',
          units: formData.apartments,
          description: `Situation: ${formData.situation}, Motif: ${formData.motif}`
        },
        request: {
          subject: `Demande de devis - ${formData.residenceName}`,
          description: formData.description,
          priority: 'MEDIUM'
        },
        identity: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role
        }
      }

      await apiClient.submitContactForm(formDataBackend)

      setStep('confirmation')
    } catch (err: any) {
      console.error('Form submission error:', err)
      setError(err.message || 'Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNextStep = () => {
    switch (step) {
      case 'building':
        // Validation de l'étape building
        if (!formData.residenceName || !formData.address || !formData.apartments) {
          setError('Veuillez remplir tous les champs obligatoires')
          return
        }
        
        // Validation du nombre d'appartements
        if (!formData.apartments || parseInt(formData.apartments) <= 0) {
          setError('Le nombre d\'appartements doit être un nombre positif')
          return
        }
        
        setStep('request')
        break
        
      case 'request':
        if (formData.motif && formData.description) {
          setStep('identity')
        }
        break
        
      case 'identity':
        // Validation de l'étape identity
        if (!formData.role || !formData.name || !formData.phone || !formData.email) {
          setError('Veuillez remplir tous les champs obligatoires')
          return
        }
        
        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
          setError('Veuillez entrer une adresse email valide')
          return
        }
        
        // Validation du téléphone (format plus flexible)
        const phoneRegex = /^[\d\s\-\+\(\)]*$/
        if (!phoneRegex.test(formData.phone)) {
          setError('Veuillez entrer un numéro de téléphone valide')
          return
        }
        
        handleSubmit()
        break
    }
  }

  const handlePrevStep = () => {
    if (step === 'request') setStep('building')
    else if (step === 'identity') setStep('request')
  }

  return (
    <section id="contact" className="py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-heading font-bold text-4xl text-foreground text-center mb-4">
          Obtenez votre devis personnalisé
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Remplissez le formulaire ci-dessous pour recevoir une proposition adaptée à votre résidence.
        </p>

        {/* Step Indicator */}
        <div className="flex justify-between mb-10">
          {(['building', 'request', 'identity'] as const).map((s, index) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold transition-all duration-200 ${
                  step === s || (step === 'confirmation' && index < 3)
                    ? 'bg-primary text-white'
                    : 'bg-border text-muted-foreground'
                }`}
              >
                {index + 1}
              </div>
              {index < 2 && (
                <div
                  className={`w-12 h-1 mx-2 ${
                    step === 'confirmation' || step === 'identity' || (step !== 'building' && step !== 'request')
                      ? 'bg-primary'
                      : 'bg-border'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <Card className="p-8 bg-background border border-border">
          {/* Error Display */}
          {error && (
            <div className="mb-6 flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Step 1: Building Information */}
          {step === 'building' && (
            <div className="space-y-6">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-6">
                Étape 1 — Informations immeuble
              </h3>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nom de la résidence <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="residenceName"
                  value={formData.residenceName}
                  onChange={handleChange}
                  placeholder="Ex: Résidence Soleil"
                  className="rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Adresse <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Ex: 123 Rue de la Paix, Paris 16ème"
                  className="rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nombre d'appartements <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="apartments"
                  value={formData.apartments}
                  onChange={handleChange}
                  placeholder="Ex: 24 (uniquement des chiffres)"
                  className="rounded-lg"
                  inputMode="numeric"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Entrez uniquement le nombre d'appartements
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Situation actuelle
                </label>
                <select
                  name="situation"
                  value={formData.situation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Sélectionnez une option</option>
                  <option value="gestion">Déjà en gestion externe</option>
                  <option value="auto">Auto-gestion</option>
                  <option value="change">Changement de syndic</option>
                  <option value="autres">Autres</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Request Nature */}
          {step === 'request' && (
            <div className="space-y-6">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-6">
                Étape 2 — Nature de la demande
              </h3>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Motif principal <span className="text-red-500">*</span>
                </label>
                <select
                  name="motif"
                  value={formData.motif}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Sélectionnez un motif</option>
                  <option value="maintenance">Améliorer la maintenance</option>
                  <option value="transparency">Augmenter la transparence</option>
                  <option value="recovery">Améliorer le recouvrement</option>
                  <option value="supervision">Superviser le terrain</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description détaillée <span className="text-red-500">*</span>
                </label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Décrivez vos besoins spécifiques..."
                  className="rounded-lg min-h-24"
                />
              </div>
            </div>
          )}

          {/* Step 3: Identity */}
          {step === 'identity' && (
            <div className="space-y-6">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-6">
                Étape 3 — Identité
              </h3>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Rôle <span className="text-red-500">*</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Sélectionnez votre rôle</option>
                  <option value="president">Président du syndic</option>
                  <option value="tresorier">Trésorier</option>
                  <option value="resident">Résident</option>
                  <option value="promoter">Promoteur immobilier</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom complet"
                  className="rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Téléphone <span className="text-red-500">*</span>
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="06 12 34 56 78"
                  className="rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className="rounded-lg"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Format: nom@domaine.com
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 'confirmation' && (
            <div className="text-center py-12">
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
              <h3 className="font-heading font-semibold text-2xl text-foreground mb-4">
                Votre demande est bien reçue
              </h3>
              <p className="text-muted-foreground text-lg mb-8">
                Notre équipe vous contactera sous 24 heures pour discuter de votre projet.
              </p>
              <p className="text-muted-foreground mb-8">
                En attendant, vous pouvez réserver un créneau pour une consultation directe.
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold px-8"
                onClick={() => {
                  setStep('building')
                  setFormData({
                    residenceName: '',
                    address: '',
                    apartments: '',
                    situation: '',
                    motif: '',
                    description: '',
                    role: '',
                    name: '',
                    phone: '',
                    email: '',
                  })
                }}
              >
                Nouveau devis
              </Button>
            </div>
          )}

          {/* Navigation Buttons */}
          {step !== 'confirmation' && (
            <div className="flex gap-4 justify-between mt-8 pt-8 border-t border-border">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={step === 'building'}
                className="rounded-lg bg-transparent"
              >
                Précédent
              </Button>
              <Button
                onClick={handleNextStep}
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {step === 'identity' ? 'Envoi en cours...' : 'Suivant'}
                  </>
                ) : (
                  step === 'identity' ? 'Valider' : 'Suivant'
                )}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </section>
  )
}
