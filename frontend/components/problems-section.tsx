'use client'

import { Card } from '@/components/ui/card'
import { AlertCircle, TrendingDown, Users, Eye } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

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
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation()
  const { ref: statementRef, isVisible: statementVisible } = useScrollAnimation()

  return (
    <section id="problems" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Background Collage Design */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Pattern subtil */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230B5D43' fill-opacity='0.03'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        
        {/* Éléments décoratifs flottants */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-20 w-24 h-24 bg-accent/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-accent/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        {/* Lignes décoratives */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        
        {/* Cercles décoratifs */}
        <div className="absolute top-1/3 right-10 w-2 h-2 bg-primary/20 rounded-full" />
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-primary/15 rounded-full" />
        <div className="absolute top-1/3 right-32 w-1.5 h-1.5 bg-primary/10 rounded-full" />
        
        <div className="absolute bottom-1/3 left-10 w-2 h-2 bg-accent/20 rounded-full" />
        <div className="absolute bottom-1/3 left-20 w-1 h-1 bg-accent/15 rounded-full" />
        <div className="absolute bottom-1/3 left-32 w-1.5 h-1.5 bg-accent/10 rounded-full" />
        
        {/* Formes géométriques */}
        <div className="absolute top-10 right-1/4 w-16 h-16 border border-primary/10 transform rotate-45" />
        <div className="absolute bottom-10 left-1/4 w-12 h-12 border border-accent/10 transform rotate-12" />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={titleRef} className={`text-center mb-8 sm:mb-12 md:mb-16 scroll-fade-in ${titleVisible ? 'visible' : ''}`} style={{ transitionDelay: '100ms' }}>
          <div className="mb-4 sm:mb-6">
            <h1 className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-primary/80 text-center mb-2 sm:mb-3 tracking-wider uppercase"> PROBLÈMES</h1>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 text-foreground px-2 sm:px-4">
              Ce que vivent trop de copropriétés
            </h2>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 sm:px-6 leading-relaxed">
            Des problématiques récurrentes qui impactent la valeur de votre patrimoine
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <Card 
                key={index} 
                className={`problem-card group p-6 sm:p-8 bg-gradient-to-br from-emerald-50 via-green-50/30 to-emerald-100/40 border border-emerald-200/50 rounded-[18px] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden ${cardsVisible ? 'visible' : ''}`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  boxShadow: '0 10px 25px -3px rgba(16, 185, 129, 0.15), 0 4px 6px -2px rgba(16, 185, 129, 0.08)'
                }}
              >
                {/* Background décoratif dans la carte - Enhanced Green */}
                <div className="absolute inset-0 overflow-hidden">
                  {/* Pattern subtil dans la carte - Green Theme */}
                  <div 
                    className="absolute inset-0 opacity-[0.03]" 
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2310B981' fill-opacity='0.2'%3E%3Ccircle cx='2' cy='2' r='0.5'/%3E%3Ccircle cx='10' cy='10' r='0.5'/%3E%3Ccircle cx='18' cy='18' r='0.5'/%3E%3C/g%3E%3C/svg%3E")`
                    }}
                  />
                  
                  {/* Bulles décoratives dans la carte - Enhanced Green */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-400/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-green-400/10 rounded-full blur-xl transform -translate-x-8 translate-y-8" />
                  <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-primary/8 rounded-full blur-3xl transform -translate-x-12 -translate-y-12" />
                  
                  {/* Lignes décoratives dans la carte - Green Theme */}
                  <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent" />
                  <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-300/20 to-transparent" />
                  <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent" />
                  
                  {/* Cercles décoratifs dans la carte - Green Theme */}
                  <div className="absolute top-2 right-2 w-1 h-1 bg-emerald-400/30 rounded-full" />
                  <div className="absolute top-2 right-4 w-0.5 h-0.5 bg-emerald-300/25 rounded-full" />
                  <div className="absolute bottom-2 left-2 w-1 h-1 bg-green-400/30 rounded-full" />
                  <div className="absolute bottom-2 left-4 w-0.5 h-0.5 bg-green-300/25 rounded-full" />
                  <div className="absolute top-1/2 right-2 w-1.5 h-1.5 bg-primary/20 rounded-full" />
                  <div className="absolute bottom-1/2 left-2 w-1.5 h-1.5 bg-accent/20 rounded-full" />
                  
                  {/* Formes géométriques dans la carte - Green Theme */}
                  <div className="absolute top-4 right-4 w-8 h-8 border border-emerald-300/20 transform rotate-45" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border border-green-300/20 transform rotate-12" />
                  
                  {/* Additional green gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-100/20 via-transparent to-green-100/20" />
                  
                  {/* Additional background effects - comme statement card */}
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 animate-pulse" style={{ animationDuration: '4s' }} />
                  
                  {/* Mesh pattern */}
                  <div 
                    className="absolute inset-0 opacity-[0.01]" 
                    style={{
                      backgroundImage: `linear-gradient(45deg, transparent 25%, rgba(16, 185, 129, 0.03) 25%, rgba(16, 185, 129, 0.03) 50%, transparent 50%, transparent 75%, rgba(16, 185, 129, 0.03) 75%, rgba(16, 185, 129, 0.03))`,
                      backgroundSize: '20px 20px'
                    }}
                  />
                  
                  {/* Radial gradient circles */}
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-green-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
                  
                  {/* Diagonal lines */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-8 -left-8 w-32 h-32 border-t-2 border-l-2 border-emerald-200/20 transform rotate-45" />
                    <div className="absolute -bottom-8 -right-8 w-24 h-24 border-b-2 border-r-2 border-green-200/20 transform rotate-45" />
                  </div>
                  
                  {/* Floating particles */}
                  <div className="absolute top-6 left-6 w-1 h-1 bg-emerald-300/40 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                  <div className="absolute top-10 right-10 w-0.5 h-0.5 bg-green-300/40 rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
                  <div className="absolute bottom-6 left-10 w-1 h-1 bg-emerald-300/40 rounded-full animate-ping" style={{ animationDuration: '3.5s', animationDelay: '1s' }} />
                  <div className="absolute bottom-10 right-6 w-0.5 h-0.5 bg-green-300/40 rounded-full animate-ping" style={{ animationDuration: '2.8s', animationDelay: '1.5s' }} />
                  
                  {/* Wave patterns */}
                  <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-emerald-200/10 to-transparent opacity-50" />
                  <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-green-200/10 to-transparent opacity-50" />
                </div>
                
                <div className="relative z-10">
                  {/* Icon with enhanced green style */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-200 via-emerald-300 to-green-300 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300" 
                       style={{ 
                         boxShadow: '0 8px 16px rgba(16, 185, 129, 0.2), inset 0 0 0 1px rgba(16, 185, 129, 0.3), 0 0 20px rgba(16, 185, 129, 0.15)'
                       }}>
                    <Icon className="w-7 h-7 text-emerald-800 drop-shadow-sm" />
                  </div>
                  
                  {/* Content with enhanced typography */}
                  <h3 className="mb-2 text-lg font-semibold text-slate-900 leading-tight group-hover:text-emerald-800 transition-colors duration-300">
                    {problem.title}
                  </h3>
                  <p className="text-slate-700 leading-relaxed text-sm group-hover:text-slate-800 transition-colors duration-300">
                    {problem.description}
                  </p>
                </div>
                
                {/* Hover effect overlay - Enhanced Green */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-100/40 via-emerald-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[18px]" />
                
                {/* Animated bottom border - Green Theme */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-[18px]" />
              </Card>
            )
          })}
        </div>

        {/* Statement card - same enhanced green style as problem cards */}
        <Card 
          ref={statementRef}
          className={`group p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-emerald-50 via-green-50/30 to-emerald-100/40 border border-emerald-200/50 hover:border-emerald-300/60 shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-4px] relative overflow-hidden scroll-fade-in ${statementVisible ? 'visible' : ''}`}
          style={{ 
            transitionDelay: '500ms',
            boxShadow: '0 10px 25px -3px rgba(16, 185, 129, 0.15), 0 4px 6px -2px rgba(16, 185, 129, 0.08)'
          }}
        >
          {/* Background decoration - enhanced green style like cards */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Pattern subtil dans la carte - Green Theme */}
            <div 
              className="absolute inset-0 opacity-[0.03]" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2310B981' fill-opacity='0.2'%3E%3Ccircle cx='2' cy='2' r='0.5'/%3E%3Ccircle cx='10' cy='10' r='0.5'/%3E%3Ccircle cx='18' cy='18' r='0.5'/%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
            
            {/* Bulles décoratives dans la carte - Enhanced Green */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/10 rounded-full blur-2xl transform translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-500" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-green-400/10 rounded-full blur-xl transform -translate-x-10 translate-y-10 group-hover:scale-150 transition-transform duration-500" />
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-primary/8 rounded-full blur-3xl transform -translate-x-16 -translate-y-16" />
            
            {/* Lignes décoratives dans la carte - Green Theme */}
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-300/20 to-transparent" />
            <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent" />
            
            {/* Cercles décoratifs dans la carte - Green Theme */}
            <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-emerald-400/30 rounded-full" />
            <div className="absolute top-4 right-8 w-1 h-1 bg-emerald-300/25 rounded-full" />
            <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-green-400/30 rounded-full" />
            <div className="absolute bottom-4 left-8 w-1 h-1 bg-green-300/25 rounded-full" />
            <div className="absolute top-1/2 right-4 w-2 h-2 bg-primary/20 rounded-full" />
            <div className="absolute bottom-1/2 left-4 w-2 h-2 bg-accent/20 rounded-full" />
            
            {/* Formes géométriques dans la carte - Green Theme */}
            <div className="absolute top-8 right-8 w-10 h-10 border border-emerald-300/20 transform rotate-45" />
            <div className="absolute bottom-8 left-8 w-8 h-8 border border-green-300/20 transform rotate-12" />
            
            {/* Additional green gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-100/20 via-transparent to-green-100/20" />
            
            {/* Additional background effects */}
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 animate-pulse" style={{ animationDuration: '4s' }} />
            
            {/* Mesh pattern */}
            <div 
              className="absolute inset-0 opacity-[0.01]" 
              style={{
                backgroundImage: `linear-gradient(45deg, transparent 25%, rgba(16, 185, 129, 0.03) 25%, rgba(16, 185, 129, 0.03) 50%, transparent 50%, transparent 75%, rgba(16, 185, 129, 0.03) 75%, rgba(16, 185, 129, 0.03))`,
                backgroundSize: '20px 20px'
              }}
            />
            
            {/* Radial gradient circles */}
            <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-emerald-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-green-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
            
            {/* Diagonal lines */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-10 -left-10 w-40 h-40 border-t-2 border-l-2 border-emerald-200/20 transform rotate-45" />
              <div className="absolute -bottom-10 -right-10 w-32 h-32 border-b-2 border-r-2 border-green-200/20 transform rotate-45" />
            </div>
            
            {/* Floating particles */}
            <div className="absolute top-8 left-8 w-1 h-1 bg-emerald-300/40 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute top-12 right-12 w-0.5 h-0.5 bg-green-300/40 rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
            <div className="absolute bottom-8 left-12 w-1 h-1 bg-emerald-300/40 rounded-full animate-ping" style={{ animationDuration: '3.5s', animationDelay: '1s' }} />
            <div className="absolute bottom-12 right-8 w-0.5 h-0.5 bg-green-300/40 rounded-full animate-ping" style={{ animationDuration: '2.8s', animationDelay: '1.5s' }} />
            
            {/* Wave pattern */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-emerald-200/10 to-transparent opacity-50" />
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-green-200/10 to-transparent opacity-50" />
          </div>
          
          {/* Content - same structure as cards with enhanced green */}
          <div className="relative z-10 text-center">
      
            
            {/* Main text with enhanced typography */}
            <h3 className="font-heading font-semibold text-base sm:text-lg lg:text-xl xl:text-2xl text-slate-900 mb-3 sm:mb-4 lg:mb-6 leading-relaxed px-2 sm:px-4 group-hover:text-emerald-800 transition-colors duration-300">
              Une copropriété se valorise quand sa gestion est structurée et visible.
            </h3>
            
        
          </div>
          
          {/* Hover effect overlay - Enhanced Green */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-100/40 via-emerald-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[18px]" />
          
          {/* Animated bottom border - Green Theme */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-[18px]" />
        </Card>
      </div>
    </section>
  )
}
