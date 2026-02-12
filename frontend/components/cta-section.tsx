import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-accent p-12 md:p-16 shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSI3IiBjeT0iNyIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative text-center">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mb-6">
              Passez à une gestion structurée et transparente
            </h2>

            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Obtenez un devis adapté à votre résidence en quelques minutes
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-xl font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                Demander un devis
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-black hover:bg-white hover:text-primary rounded-xl font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-105 group">
                <Calendar className="mr-2 w-5 h-5" />
                Planifier un rendez-vous
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
