"use client"

import Link from "next/link"
import Image from "next/image";
import { Camera, Sparkles, Leaf, Shield, Zap, TrendingUp, ArrowRight, CheckCircle2, Recycle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


export default function LandingPage() {
  const scrollToHowItWorks = () => {
    const section = document.getElementById("how-it-works")
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Header */}
        <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3"> {/* Mejor separación */}
            
            {/* Contenedor del logo */}
            <div className="relative -translate-y-1">
              <Image
                src="/logo.png"
                alt="SmartRecycle Logo"
                width={80}
                height={80}
                className="h-10 w-10 md:h-12 md:w-12 scale-120 object-contain"
              />
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground text-balance">
                SmartRecycle Coach
              </h1>
            </div>

          </div>

          <Link href="/scan">
            <Button size="lg" className="gap-2 font-semibold">
              Probar Gratis
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>

        </div>
      </div>
    </header>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* <Badge variant="secondary" className="gap-2 px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4" />
            Powered by Inteligencia Artificial
          </Badge> */}

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground text-balance leading-tight">
            Recicla <span className="text-primary">correctamente</span> con ayuda de IA
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Escanea cualquier residuo con tu cámara y descubre exactamente cómo reciclarlo. SmartRecycle Coach te guía
            paso a paso para hacer del mundo un lugar más limpio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/scan">
              <Button size="lg" className="gap-2 font-semibold text-base px-8 h-14 shadow-lg shadow-primary/25">
                <Camera className="h-5 w-5" />
                Comenzar Ahora
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 font-semibold text-base px-8 h-14 bg-transparent"
              onClick={scrollToHowItWorks}
            >
              <Sparkles className="h-5 w-5" />
              Ver Cómo Funciona
            </Button>
          </div>

          {/* Hero Image */}
          <div className="pt-12 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <Card className="overflow-hidden border-2 border-border/50 shadow-2xl">
              <img src="/images/image.png" alt="SmartRecycle Coach Interface" className="w-full h-auto" />
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <Badge variant="outline" className="gap-2 px-4 py-1.5">
              <Zap className="h-3.5 w-3.5" />
              Características
            </Badge>
            <h3 className="text-3xl md:text-5xl lg:text-7xl font-bold text-foreground text-balance">
              Tu coach personal de reciclaje
            </h3>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Tecnología de punta al servicio del medio ambiente
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="p-8 bg-gradient-to-br from-card to-primary/5 border-primary/20 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Camera className="h-7 w-7 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-foreground">Reconocimiento Instantáneo</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Toma una foto de cualquier residuo y nuestra IA lo identificará 
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-card to-accent/5 border-accent/20 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Sparkles className="h-7 w-7 text-accent" />
                </div>
                <h4 className="text-xl font-bold text-foreground">Guías Personalizadas</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Recibe instrucciones y consejos para cada tipo de material detectado
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-card to-success/5 border-success/20 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center">
                  <Leaf className="h-7 w-7 text-success" />
                </div>
                <h4 className="text-xl font-bold text-foreground">Impacto Medible</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Visualiza tu contribución al planeta con estadísticas del impacto ambiental de tu reciclaje
                </p>
              </div>
            </Card>

{/*             <Card className="p-8 bg-gradient-to-br from-card to-chart-2/5 border-chart-2/20 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-chart-2/10 flex items-center justify-center">
                  <TrendingUp className="h-7 w-7 text-chart-2" />
                </div>
                <h4 className="text-xl font-bold text-foreground">Sistema de Puntos</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Gana puntos por cada escaneo y convierte el reciclaje en un hábito motivador y divertido
                </p>
              </div>
            </Card> */}
{/* 
            <Card className="p-8 bg-gradient-to-br from-card to-chart-3/5 border-chart-3/20 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-chart-3/10 flex items-center justify-center">
                  <Shield className="h-7 w-7 text-chart-3" />
                </div>
                <h4 className="text-xl font-bold text-foreground">100% Confiable</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Información verificada basada en normativas oficiales de reciclaje y gestión de residuos
                </p>
              </div>
            </Card> */}

            <Card className="p-8 bg-gradient-to-br from-card to-chart-4/5 border-chart-4/20 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-chart-4/10 flex items-center justify-center">
                  <Zap className="h-7 w-7 text-chart-4" />
                </div>
                <h4 className="text-xl font-bold text-foreground">Siempre Disponible</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Accede desde cualquier dispositivo, en cualquier momento y lugar para reciclar correctamente
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <Badge variant="outline" className="gap-2 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Proceso Simple
            </Badge>
            <h3 className="text-3xl md:text-5xl font-bold text-foreground text-balance">Recicla en 3 pasos</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector Lines */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-border/50" />

            <div className="relative">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
                    <Camera className="h-12 w-12 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-foreground">Escanea</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Toma una foto o sube una imagen del residuo que quieres reciclar
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-accent flex items-center justify-center shadow-lg shadow-accent/25">
                    <Sparkles className="h-12 w-12 text-accent-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-accent flex items-center justify-center">
                    <span className="text-sm font-bold text-accent">2</span>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-foreground">Identifica</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nuestra IA analiza y clasifica el material
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-success flex items-center justify-center shadow-lg shadow-success/25">
                    <Recycle className="h-12 w-12 text-success-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-success flex items-center justify-center">
                    <span className="text-sm font-bold text-success">3</span>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-foreground">Recicla</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sigue las instrucciones personalizadas para reciclar correctamente
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 via-card to-accent/5 border-primary/20">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-6">
                <div>
                  <Badge className="mb-4">Por qué SmartRecycle Coach</Badge>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground text-balance mb-4">
                    Haz la diferencia con cada escaneo
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Cada año, millones de toneladas de materiales reciclables terminan en vertederos por falta de
                    información. SmartRecycle Coach hace que reciclar sea fácil, preciso y motivador.
                  </p>
                </div>
                <Link href="/scan">
                  <Button size="lg" className="gap-2 font-semibold w-full sm:w-auto">
                    Empezar Gratis
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-1">Sin registro necesario</h5>
                    <p className="text-sm text-muted-foreground">Empieza a usar la app inmediatamente</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-1">Resultados precisos</h5>
                    <p className="text-sm text-muted-foreground"> Basado en IA en fase inicial y en constante mejora. </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-1">Impacto real</h5>
                    <p className="text-sm text-muted-foreground">Contribuye al cuidado del planeta</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h3 className="text-3xl md:text-5xl font-bold text-foreground text-balance">
              Únete al movimiento del reciclaje inteligente
            </h3>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Miles de usuarios ya están reciclando correctamente. Sé parte del cambio.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/scan">
              <Button size="lg" className="gap-2 font-semibold text-base px-8 h-14 shadow-lg shadow-primary/25">
                <Camera className="h-5 w-5" />
                Probar Ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Recycle className="h-6 w-6 text-primary" />
              <span className="font-semibold text-foreground">SmartRecycle Coach</span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Tecnología para un planeta más limpio · 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
