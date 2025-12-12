"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { Camera, Upload, Loader2, Recycle, Sparkles, Info, RefreshCw, Leaf, X, Trash2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type MaterialType = {
  name: string
  icon: string
  color: string
  points: number
  tips: string[]
  disposal: string
  disposalColor: string
  envFact: string
  decompositionTime: string
}

const materials: Record<string, MaterialType> = {
  plastic: {
    name: "Botella de Plástico PET",
    icon: "♻️",
    color: "bg-warning/10 text-warning-foreground border-warning",
    points: 50,
    tips: ["Enjuaga la botella antes de reciclar", "Aplasta para reducir volumen", "Retira la tapa si es posible"],
    disposal: "Contenedor Amarillo",
    disposalColor: "bg-yellow-500",
    envFact:
      "Las botellas de PET son 100% reciclables. Al reciclarla, ahorras energía para mantener una bombilla encendida por 6 horas.",
    decompositionTime: "450 años",
  },
  paper: {
    name: "Papel o Cartón",
    icon: "📦",
    color: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-300",
    points: 40,
    tips: [
      "Asegúrate de que esté limpio y seco",
      "Aplana las cajas de cartón",
      "No incluyas papel encerado o plastificado",
    ],
    disposal: "Contenedor Azul",
    disposalColor: "bg-blue-500",
    envFact: "Reciclar una tonelada de papel salva aproximadamente 17 árboles.",
    decompositionTime: "2-6 meses",
  },
  glass: {
    name: "Vidrio",
    icon: "🍷",
    color: "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-300",
    points: 60,
    tips: ["Enjuaga los envases de vidrio", "Separa por color si es posible", "No incluyas vidrios rotos o cristales"],
    disposal: "Contenedor Verde",
    disposalColor: "bg-green-500",
    envFact: "El vidrio puede reciclarse infinitas veces sin perder calidad.",
    decompositionTime: "4000 años",
  },
  metal: {
    name: "Lata de Aluminio",
    icon: "🥫",
    color: "bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-300",
    points: 70,
    tips: [
      "Enjuaga las latas antes de reciclar",
      "Aplasta para ahorrar espacio",
      "Incluye latas de bebidas y conservas",
    ],
    disposal: "Contenedor Amarillo",
    disposalColor: "bg-yellow-500",
    envFact: "Reciclar aluminio ahorra 95% de la energía necesaria para producirlo desde cero.",
    decompositionTime: "200-500 años",
  },
  organic: {
    name: "Residuo Orgánico",
    icon: "🍎",
    color: "bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-300",
    points: 30,
    tips: ["Ideal para compostaje", "Mantén separado de otros residuos", "Incluye restos de frutas y verduras"],
    disposal: "Contenedor Marrón o Compostaje",
    disposalColor: "bg-amber-700",
    envFact: "Los residuos orgánicos pueden convertirse en compost, un fertilizante natural.",
    decompositionTime: "2-4 semanas",
  },
}

export default function ScanPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [detectedMaterial, setDetectedMaterial] = useState<MaterialType | null>(null)
  const [showInfo, setShowInfo] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
        simulateScan()
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  const simulateScan = () => {
    setIsScanning(true)
    setDetectedMaterial(null)

    // Simulate AI processing
    setTimeout(() => {
      const materialKeys = Object.keys(materials)
      const randomMaterial = materialKeys[0]
      setDetectedMaterial(materials[randomMaterial])
      setIsScanning(false)
    }, 2500)
  }

  const resetScan = () => {
    setSelectedImage(null)
    setDetectedMaterial(null)
    setIsScanning(false)
    setShowInfo(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="relative">
                  <Recycle className="h-8 w-8 md:h-10 md:w-10 text-primary animate-float" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-ring" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance">SmartRecycle Coach</h1>
                  <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">Powered by AI</p>
                </div>
              </Link>
            </div>
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Volver</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Hero Section */}
        {!selectedImage && (
          <div className="text-center mb-8 md:mb-12 space-y-4">
            <Badge variant="secondary" className="gap-2 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Inteligencia Artificial
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">
              Descubre cómo reciclar correctamente
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Sube una foto de tu residuo y te diremos cómo reciclarlo de forma adecuada
            </p>
          </div>
        )}

        {/* Upload Zone */}
        {!selectedImage && (
          <Card className="relative overflow-hidden">
            <div
              className={`relative p-8 md:p-16 border-2 border-dashed rounded-lg transition-all duration-300 ${
                isDragging
                  ? "border-primary bg-primary/5 scale-[0.98]"
                  : "border-border hover:border-primary/50 hover:bg-muted/30"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

              <div className="flex flex-col items-center justify-center gap-6 text-center">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/10 flex items-center justify-center animate-float">
                    <Camera className="h-12 w-12 md:h-16 md:w-16 text-primary" />
                  </div>
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground">Escanea tu residuo</h3>
                  <p className="text-sm md:text-base text-muted-foreground max-w-md">
                    Arrastra una imagen, selecciona desde tu dispositivo o activa la cámara
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    size="lg"
                    className="flex-1 gap-2 font-semibold"
                  >
                    <Upload className="h-5 w-5" />
                    Subir Imagen
                  </Button>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    size="lg"
                    className="flex-1 gap-2 font-semibold"
                  >
                    <Camera className="h-5 w-5" />
                    Usar Cámara
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Scanning & Results */}
        {selectedImage && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Image Preview */}
            <Card className="overflow-hidden">
              <div className="relative aspect-video bg-muted">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt="Uploaded waste"
                  className="w-full h-full object-contain"
                />
                <Button variant="secondary" size="icon" className="absolute top-4 right-4" onClick={resetScan}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Scanning Animation */}
              {isScanning && (
                <div className="p-8 md:p-12 bg-card border-t">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative w-16 h-16">
                      <Loader2 className="h-16 w-16 text-primary animate-spin" />
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-lg md:text-xl font-semibold text-foreground">Analizando material...</h3>
                      <p className="text-sm text-muted-foreground">Identificando con inteligencia artificial</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Detection Result */}
              {detectedMaterial && !isScanning && (
                <div className="p-6 md:p-8 bg-gradient-to-br from-card to-muted/30 border-t space-y-6 animate-in slide-in-from-bottom duration-500">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl md:text-6xl animate-float">{detectedMaterial.icon}</div>
                    <div className="flex-1 space-y-2">
{/*                       <Badge className={`${detectedMaterial.color} text-sm font-semibold`}>
                        +{detectedMaterial.points} Puntos
                      </Badge> */}
                      <h3 className="text-xl md:text-2xl font-bold text-foreground">{detectedMaterial.name}</h3>
                      <p className="text-sm md:text-base text-muted-foreground">Material detectado con éxito</p>
                    </div>
                  </div>

                  {/* Environmental Fact */}
                  <Card className="bg-primary/5 border-primary/20 p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground/90 leading-relaxed">{detectedMaterial.envFact}</p>
                    </div>
                  </Card>

                  {/* Recycling Tips */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-base md:text-lg text-foreground flex items-center gap-2">
                      <Recycle className="h-5 w-5 text-primary" />
                      Consejos para reciclar
                    </h4>
                    <div className="grid gap-3">
                      {detectedMaterial.tips.map((tip, index) => (
                        <Card key={index} className="p-4 bg-card/50 border-border/50">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-primary">{index + 1}</span>
                            </div>
                            <p className="text-sm text-foreground leading-relaxed flex-1">{tip}</p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Disposal Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-5 bg-card border-border relative overflow-hidden">
                      <div className="relative z-10 space-y-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                          <Trash2 className="h-4 w-4" />
                          Disposición Correcta
                        </p>
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-16 h-20 ${detectedMaterial.disposalColor} rounded-lg relative shadow-lg flex flex-col items-center justify-end pb-2 transition-transform hover:scale-105`}
                          >
                            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-2 bg-black/20 rounded-t-lg"></div>
                            <Trash2 className="h-6 w-6 text-white/90" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-lg text-foreground">{detectedMaterial.disposal}</p>
                            <p className="text-xs text-muted-foreground mt-1">Deposita aquí tu residuo</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-5 bg-destructive/5 border-destructive/20">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Tiempo de descomposición
                        </p>
                        <p className="font-semibold text-destructive text-lg">{detectedMaterial.decompositionTime}</p>
                        <p className="text-xs text-muted-foreground">Si no se recicla correctamente</p>
                      </div>
                    </Card>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button onClick={resetScan} size="lg" className="flex-1 gap-2 font-semibold">
                      <RefreshCw className="h-5 w-5" />
                      Escanear Otro
                    </Button>
                    <Button
                      onClick={() => setShowInfo(!showInfo)}
                      variant="outline"
                      size="lg"
                      className="flex-1 gap-2 font-semibold"
                    >
                      <Info className="h-5 w-5" />
                      Más Información
                    </Button>
                  </div>

                  {showInfo && (
                    <Card className="p-6 bg-muted/50 border-border/50 animate-in slide-in-from-top duration-300">
                      <h5 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Info className="h-5 w-5 text-primary" />
                        Información adicional
                      </h5>
                      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                        <p>
                          El reciclaje adecuado de este material ayuda a reducir la contaminación y conservar recursos
                          naturales para las futuras generaciones.
                        </p>
                        <p>
                          Recuerda que la correcta separación de residuos es fundamental para un proceso de reciclaje
                          eficiente.
                        </p>
                      </div>
                    </Card>
                  )}
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Info Cards */}
        {!selectedImage && (
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
            <Card className="p-6 bg-gradient-to-br from-card to-primary/5 border-primary/20">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Escaneo Rápido</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Identifica cualquier material reciclable en segundos con nuestra IA
                </p>
              </div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-card to-accent/5 border-accent/20">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground">Tips Personalizados</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Recibe consejos específicos para cada tipo de material
                </p>
              </div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-card to-success/5 border-success/20">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-success" />
                </div>
                <h3 className="font-semibold text-foreground">Impacto Ambiental</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Conoce el impacto positivo de tus acciones en el planeta
                </p>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">SmartRecycle Coach · Tecnología para un planeta más limpio</p>
        </div>
      </footer>
    </div>
  )
}
