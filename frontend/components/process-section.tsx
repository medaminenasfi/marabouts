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
        <h2 className="font-heading font-bold text-4xl text-foreground mb-16">
          Comment nous prenons en charge votre copropriété
        </h2>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-20" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="mb-6 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white border-4 border-primary flex items-center justify-center shadow-lg">
                    <span className="font-heading font-bold text-2xl text-primary">
                      {step.number}
                    </span>
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground text-center">
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
