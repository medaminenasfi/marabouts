import { Card } from '@/components/ui/card'
import { AlertCircle, TrendingDown, Users, Eye } from 'lucide-react'

const problems = [
  {
    icon: Eye,
    title: 'Manque de transparence',
    description: 'Difficulté à suivre les finances et les décisions.',
  },
  {
    icon: AlertCircle,
    title: 'Maintenance non pilotée',
    description: 'Pannes répétitives, absence de suivi structuré.',
  },
  {
    icon: TrendingDown,
    title: 'Recouvrement faible',
    description: 'Les impayés fragilisent l\'équilibre financier.',
  },
  {
    icon: Users,
    title: 'Absence de supervision terrain',
    description: 'Manque de contrôle et de coordination.',
  },
]

export function ProblemsSection() {
  return (
    <section id="problems" className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading font-bold text-4xl mb-4 text-foreground text-center">
          Ce que vivent trop de copropriétés
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <Card key={index} className="p-6 bg-white border border-border hover:shadow-lg transition-all duration-200 hover:translate-y-[-2px]">
                <Icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                  {problem.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </Card>
            )
          })}
        </div>

        <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-6 text-center">
          <p className="text-foreground font-medium text-lg">
            Une copropriété se valorise quand sa gestion est structurée et visible.
          </p>
        </div>
      </div>
    </section>
  )
}
