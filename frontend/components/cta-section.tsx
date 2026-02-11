import { Button } from '@/components/ui/button'

export function CtaSection() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-heading font-bold text-4xl text-foreground mb-4">
          Passez à une gestion structurée et transparente.
        </h2>

        <p className="text-lg text-muted-foreground mb-10 text-balance">
          Obtenez un devis adapté à votre résidence en quelques minutes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold px-8">
            Demander un devis
          </Button>
          <Button size="lg" variant="outline" className="rounded-lg font-semibold px-8 bg-transparent">
            Planifier un rendez-vous
          </Button>
        </div>
      </div>
    </section>
  )
}
