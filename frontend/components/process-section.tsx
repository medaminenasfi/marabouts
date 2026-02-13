import { CheckCircle2 } from 'lucide-react'

const steps = [
  {
    number: 1,
    title: 'Audit initial',
  },
  {
    number: 2,
    title: 'Plan d\'action structuré',
  },
  {
    number: 3,
    title: 'Mise en place des outils & organisation',
  },
  {
    number: 4,
    title: 'Suivi continu & reporting',
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-4">
            <h1 className="font-heading font-bold text-2xl md:text-3xl text-primary/80 text-center mb-2 tracking-wider uppercase">PROCESSUS</h1>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
              Comment nous prenons en charge votre copropriété
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Un processus structuré en 4 étapes pour une transition en douceur
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5">
            <div className="h-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="group flex flex-col items-center">
                <div className="mb-6 flex items-center justify-center">
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                    <span className="font-heading font-bold text-3xl text-white relative z-10">
                      {step.number}
                    </span>
                    <div className="absolute inset-0 rounded-2xl bg-white/20 group-hover:bg-white/30 transition-colors duration-300" />
                    <CheckCircle2 className="absolute -bottom-2 -right-2 w-6 h-6 text-accent bg-white rounded-full p-1 shadow-md" />
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground text-center group-hover:text-primary transition-colors duration-300 px-4">
                  {step.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
