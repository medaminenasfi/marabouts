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
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4 text-foreground">
            Ce que vivent trop de copropriétés
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Des problématiques récurrentes qui impactent la valeur de votre patrimoine
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <Card key={index} className="group p-6 bg-white border border-border hover:border-destructive/30 hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-destructive/5 rounded-full blur-2xl transform translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                    {problem.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20 p-8">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwQjVENDMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iNyIgY3k9IjciIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
          <div className="relative flex items-center justify-center gap-4">
            <div className="w-1 h-12 bg-gradient-to-b from-primary to-accent rounded-full" />
            <p className="text-foreground font-semibold text-lg md:text-xl text-center">
              Une copropriété se valorise quand sa gestion est structurée et visible.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
