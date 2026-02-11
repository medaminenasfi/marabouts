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
        <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4 text-center">
          Une gestion complète, sans zones d'ombre
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          Des services intégrés pour une gestion optimale de votre copropriété
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="group relative p-8 bg-white border border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-300 hover:translate-y-[-4px] overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
