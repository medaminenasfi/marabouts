import { Card } from '@/components/ui/card'
import { Users, Building2, Home } from 'lucide-react'

const audiences = [
  {
    icon: Users,
    title: 'Présidents de syndic',
    benefits: 'Moins de conflits. Plus de visibilité. Plus de contrôle.',
  },
  {
    icon: Building2,
    title: 'Promoteurs immobiliers',
    benefits: 'Passation structurée et image valorisée.',
  },
  {
    icon: Home,
    title: 'Résidents',
    benefits: 'Réactivité et transparence.',
  },
]

export function ForWhoSection() {
  return (
    <section id="for-who" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading font-bold text-4xl text-foreground mb-12">
          Une solution adaptée à chaque acteur
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => {
            const Icon = audience.icon
            return (
              <Card
                key={index}
                className="p-8 bg-gradient-to-br from-white to-primary/5 border border-border text-center hover:shadow-lg transition-all duration-200 hover:translate-y-[-2px]"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                  {audience.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {audience.benefits}
                </p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
