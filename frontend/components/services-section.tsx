import { Card } from '@/components/ui/card'
import { BarChart3, Hammer, Shield, Banknote } from 'lucide-react'

const services = [
  {
    icon: BarChart3,
    title: 'Gestion administrative & financière',
    description: 'Budgets, appels de fonds, assemblées générales, comptabilité.',
  },
  {
    icon: Hammer,
    title: 'Maintenance & suivi technique',
    description: 'Interventions rapides, suivi des prestataires, contrôle qualité.',
  },
  {
    icon: Shield,
    title: 'Gardiennage & organisation',
    description: 'Supervision terrain, coordination des équipes.',
  },
  {
    icon: Banknote,
    title: 'Recouvrement',
    description: 'Suivi des impayés, procédures structurées, reporting.',
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading font-bold text-4xl text-foreground mb-4">
          Une gestion complète, sans zones d'ombre
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="p-8 bg-white border border-border hover:shadow-lg transition-all duration-200 hover:translate-y-[-2px]"
              >
                <Icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
