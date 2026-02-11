import { Button } from '@/components/ui/button'
import { Eye, Wrench, DollarSign, Database } from 'lucide-react'

const solutions = [
  {
    number: 1,
    icon: Eye,
    title: 'Supervision terrain 7j/7',
    description: 'Présence régulière, contrôles qualité, coordination des interventions.',
  },
  {
    number: 2,
    icon: Wrench,
    title: 'Maintenance & organisation',
    description: 'Préventif, correctif, gestion des prestataires et suivi après intervention.',
  },
  {
    number: 3,
    icon: DollarSign,
    title: 'Recouvrement structuré',
    description: 'Process clair, relances organisées, reporting régulier.',
  },
  {
    number: 4,
    icon: Database,
    title: 'Système d\'information fiable',
    description: 'Traçabilité, accès aux documents, visibilité sur les actions.',
  },
]

export function SolutionSection() {
  return (
    <section id="solution" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading font-bold text-4xl text-foreground mb-6">
          Une gestion complète. Une méthode claire.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {solutions.map((solution, index) => {
            const Icon = solution.icon
            return (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                    <span className="font-heading font-bold text-lg text-primary">
                      {solution.number}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {solution.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold px-8">
            Demander un audit
          </Button>
        </div>
      </div>
    </section>
  )
}
