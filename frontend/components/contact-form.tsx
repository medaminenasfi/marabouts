'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { CheckCircle2, AlertCircle, Loader2, Calendar, X } from 'lucide-react'
import { apiClient } from '@/lib/api-client'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

type FormStep = 'building' | 'request' | 'identity' | 'loading' | 'confirmation'

interface FormData {
  residenceName: string
  address: string
  apartments: string
  situation: string
  situationOther: string
  motif: string
  motifOther: string
  description: string
  role: string
  roleOther: string
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
    situationOther: '',
    motif: '',
    motifOther: '',
    description: '',
    role: '',
    roleOther: '',
    name: '',
    email: '',
    phone: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [showCalendly, setShowCalendly] = useState(false)
  const [error, setError] = useState('')
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation()

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
    setStep('loading')

    try {
      // Submit contact form to backend
      const formDataBackend = {
        building: {
          name: formData.residenceName,
          address: formData.address,
          city: formData.address.split(',').pop()?.trim() || 'Tunis',
          units: formData.apartments,
          situation: formData.situation === 'autre' && formData.situationOther 
            ? `Autre: ${formData.situationOther}` 
            : formData.situation,
          motif: formData.motif === 'autre' && formData.motifOther 
            ? `Autre: ${formData.motifOther}` 
            : formData.motif
        },
        request: {
          subject: `Demande de devis - ${formData.residenceName}`,
          description: formData.description
        },
        identity: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role === 'other' && formData.roleOther 
            ? `Autre: ${formData.roleOther}` 
            : formData.role
        }
      }

      await apiClient.submitContactForm(formDataBackend)

      setStep('confirmation')
    } catch (err: any) {
      console.error('Form submission error:', err)
      setError(err.message || 'Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer.')
      setStep('identity') // Retour à l'étape précédente en cas d'erreur
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
        
        // Validation du nombre d'appartements (permet 0 et plus)
        if (!formData.apartments || isNaN(parseInt(formData.apartments))) {
          setError('Le nombre d\'appartements doit être un nombre valide (0 ou plus)')
          return
        }
        
        const apartmentCount = parseInt(formData.apartments)
        if (apartmentCount < 0) {
          setError('Le nombre d\'appartements ne peut pas être négatif')
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
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className={`text-center mb-8 sm:mb-12 scroll-fade-in ${formVisible ? 'visible' : ''}`} ref={formRef}>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-foreground text-center mb-4 px-4">
            Obtenez votre devis personnalisé
          </h2>
          <p className="text-center text-muted-foreground text-sm sm:text-base mb-8 sm:mb-12 px-4">
            Remplissez le formulaire ci-dessous pour recevoir une proposition adaptée à votre résidence.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-between mb-6 sm:mb-10 px-2 sm:px-0">
          {(['building', 'request', 'identity'] as const).map((s, index) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-heading font-bold text-xs sm:text-sm transition-all duration-200 ${
                  step === s || (step === 'confirmation' && index < 3)
                    ? 'bg-primary text-white'
                    : 'bg-border text-muted-foreground'
                }`}
              >
                {index + 1}
              </div>
              {index < 2 && (
                <div
                  className={`w-6 sm:w-8 md:w-12 h-0.5 sm:h-1 mx-1 sm:mx-2 ${
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
        <Card className={`p-4 sm:p-6 lg:p-8 bg-background border border-border scroll-fade-in ${formVisible ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
          {/* Error Display */}
          {error && (
            <div className="mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <p className="text-xs sm:text-sm">{error}</p>
            </div>
          )}

          {/* Step 1: Building Information */}
          {step === 'building' && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="font-heading font-semibold text-lg sm:text-xl text-foreground mb-4 sm:mb-6">
                Étape 1 — Informations immeuble
              </h3>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
                  Nom de la résidence <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="residenceName"
                  value={formData.residenceName}
                  onChange={handleChange}
                  placeholder="Ex: Résidence Soleil"
                  className="rounded-lg text-sm sm:text-base py-2 sm:py-3"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
                  Adresse <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Ex: 123 Rue Habib Bourguiba, Tunis 1000"
                  className="rounded-lg text-sm sm:text-base py-2 sm:py-3"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
                  Nombre d'appartements <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="apartments"
                  value={formData.apartments}
                  onChange={handleChange}
                  placeholder="Ex: 24 ou 35  (uniquement des chiffres)"
                  className="rounded-lg text-sm sm:text-base py-2 sm:py-3"
                  inputMode="numeric"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Entrez le nombre d'appartements 
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Situation actuelle
                </label>
                <div className="relative">
                  <select
                    name="situation"
                    value={formData.situation}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground cursor-pointer text-base"
                  >
                    <option value="">Sélectionnez une option</option>
                    <option value="gestion">Déjà en gestion externe</option>
                    <option value="auto">Auto-gestion</option>
                    <option value="change">Changement de syndic</option>
                    <option value="autre">Autre</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {formData.situation === 'autre' && (
                  <div className="mt-2">
                    <Input
                      type="text"
                      name="situationOther"
                      value={formData.situationOther}
                      onChange={handleChange}
                      placeholder="Précisez votre situation..."
                      className="rounded-lg text-sm sm:text-base py-2 sm:py-3"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Request Nature */}
          {step === 'request' && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="font-heading font-semibold text-lg sm:text-xl text-foreground mb-4 sm:mb-6">
                Étape 2 — Nature de la demande
              </h3>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
                  Motif principal <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="motif"
                    value={formData.motif}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground cursor-pointer text-base"
                  >
                    <option value="">Sélectionnez un motif</option>
                    <option value="maintenance">Améliorer la maintenance</option>
                    <option value="transparency">Augmenter la transparence</option>
                    <option value="recovery">Améliorer le recouvrement</option>
                    <option value="supervision">Superviser le terrain</option>
                    <option value="autre">Autre</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {formData.motif === 'autre' && (
                  <div className="mt-2">
                    <Input
                      type="text"
                      name="motifOther"
                      value={formData.motifOther}
                      onChange={handleChange}
                      placeholder="Précisez votre motif..."
                      className="rounded-lg text-sm sm:text-base py-2 sm:py-3"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
                  Description détaillée <span className="text-red-500">*</span>
                </label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Décrivez vos besoins spécifiques..."
                  className="rounded-lg min-h-20 sm:min-h-24 text-sm sm:text-base py-2 sm:py-3"
                />
              </div>
            </div>
          )}

          {/* Step 3: Identity */}
          {step === 'identity' && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="font-heading font-semibold text-lg sm:text-xl text-foreground mb-4 sm:mb-6">
                Étape 3 — Identité
              </h3>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
                  Rôle <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground cursor-pointer text-base"
                  >
                    <option value="">Sélectionnez votre rôle</option>
                    <option value="president">Président du syndic</option>
                    <option value="tresorier">Trésorier</option>
                    <option value="resident">Résident</option>
                    <option value="promoter">Promoteur immobilier</option>
                    <option value="other">Autre</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {formData.role === 'other' && (
                  <div className="mt-2">
                    <Input
                      type="text"
                      name="roleOther"
                      value={formData.roleOther}
                      onChange={handleChange}
                      placeholder="Précisez votre rôle..."
                      className="rounded-lg text-sm sm:text-base py-2 sm:py-3"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom complet"
                  className="rounded-lg text-sm sm:text-base py-2 sm:py-3"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
                  Téléphone <span className="text-red-500">*</span>
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="71 234 567 890"
                  className="rounded-lg text-sm sm:text-base py-2 sm:py-3"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.tn"
                  className="rounded-lg text-sm sm:text-base py-2 sm:py-3"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Format: nom@domaine.tn
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Loading */}
          {step === 'loading' && (
            <div className="text-center py-8 sm:py-12">
              <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto mb-4 sm:mb-6 animate-spin" />
              <h3 className="font-heading font-semibold text-lg sm:text-2xl text-foreground mb-2 sm:mb-4">
                Envoi de votre demande en cours...
              </h3>
              <p className="text-muted-foreground text-sm sm:text-lg">
                Veuillez patienter pendant que nous traitons vos informations.
              </p>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {step === 'confirmation' && (
            <div className="text-center py-8 sm:py-12">
              <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto mb-4 sm:mb-6" />
              <h3 className="font-heading font-semibold text-lg sm:text-2xl text-foreground mb-2 sm:mb-4">
                Votre demande est bien reçue
              </h3>
              <p className="text-muted-foreground text-sm sm:text-lg mb-6 sm:mb-8">
                Notre équipe vous contactera sous 24 heures pour discuter de votre projet.
              </p>
              <p className="text-muted-foreground text-sm sm:text-lg mb-6 sm:mb-8">
                En attendant, vous pouvez réserver un créneau pour une consultation directe.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
                  onClick={() => {
                    setStep('building')
                    setFormData({
                      residenceName: '',
                      address: '',
                      apartments: '',
                      situation: '',
                      situationOther: '',
                      motif: '',
                      motifOther: '',
                      description: '',
                      role: '',
                      roleOther: '',
                      name: '',
                      phone: '',
                      email: '',
                    })
                  }}
                >
                  Nouveau devis
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-lg font-semibold px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
                  onClick={() => setShowCalendly(true)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Réserver un créneau
                </Button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {step !== 'confirmation' && (
            <div className="flex gap-2 sm:gap-4 justify-between mt-6 sm:mt-8 pt-4 sm:pt-8 border-t border-border">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={step === 'building'}
                className="rounded-lg bg-transparent text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3"
              >
                Précédent
              </Button>
              <Button
                onClick={handleNextStep}
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {step === 'identity' ? 'Envoi en cours...' : 'Suivant'}
                  </>
                ) : (
                  step === 'identity' ? 'Envoyer' : 'Suivant'
                )}
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Calendly Modal */}
      {showCalendly && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-3 sm:p-4 border-b">
              <h3 className="text-base sm:text-lg font-semibold text-foreground">Réserver un créneau de consultation</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowCalendly(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="h-[500px] sm:h-[600px] overflow-auto">
              <iframe 
                src={process.env.NEXT_PUBLIC_CALENDLY_URL + "?embed_domain=localhost%3A6001&embed_type=Inline&utm_source=marabouts-website&utm_medium=landing-page&utm_campaign=consultation-request"}
                width="100%"
                height="100%"
                frameBorder="0"
                className="min-h-[500px] sm:min-h-[600px]"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
