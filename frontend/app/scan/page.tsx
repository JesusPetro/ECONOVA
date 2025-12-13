"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image";
import { Camera, Upload, Loader2, Recycle, Sparkles, Info, RefreshCw, Leaf, X, Trash2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import materialsJson from "./MaterialType.json"

// types/materials.ts
export type ResourceLink = {
  title: string
  url: string
  kind: "youtube" | "blog" | "official"
  note?: string
}

export type Tip = {
  type: "recycle" | "diy" | "sell" | "donate"
  title: string
  summary: string
  examples?: string[]
  resources?: ResourceLink[]
}

export type MoreInfo = {
  acceptedExamples: string[]
  notAcceptedExamples: string[]
  commonMistakes: string[]
  resources?: ResourceLink[]
}

export type MaterialType = {
  name: string
  icon: string
  color: string
  points: number
  disposal: string
  disposalColor: string
  envFact: string
  decompositionTime: string

  tips: Tip[]
  moreInfo: MoreInfo
}


type ClassifyResponse = {
  material?: string | null
}

export const materials = materialsJson as Record<string, MaterialType>

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
        scanWithAPI(file) // <-- aquí
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

  

// Convierte lo que devuelva YOLO a una key válida de tu diccionario `materials`
const normalizeMaterialKey = (material?: string | null): keyof typeof materials | null => {
  if (!material) return null

  const m = material.toLowerCase().trim()

  const map: Record<string, keyof typeof materials> = {
    // Español
    "plastico": "plastic",
    "plástico": "plastic",
    "pet": "plastic",

    "papel": "paper",
    "carton": "paper",
    "cartón": "paper",

    "vidrio": "glass",

    "metal": "metal",
    "aluminio": "metal",
    "lata": "metal",

    "organico": "organic",
    "orgánico": "organic",

    // Inglés (por si el modelo retorna en inglés)
    "plastic": "plastic",
    "paper": "paper",
    "glass": "glass",
    "organic": "organic",
  }

  return map[m] ?? (m as keyof typeof materials) ?? null
}

const scanWithAPI = async (file: File) => {
    setIsScanning(true)
    setDetectedMaterial(null)
    setShowInfo(false)

    try {
      const formData = new FormData()
      formData.append("image", file)

      const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"
      const res = await fetch(`${baseUrl}/classify/image`, {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const txt = await res.text().catch(() => "")
        throw new Error(txt || `Error HTTP ${res.status}`)
      }

      const data = (await res.json()) as ClassifyResponse
      const key = normalizeMaterialKey(data.material)

      // Fallback a undetected si no existe
      if (!key || !(key in materials)) {
        setDetectedMaterial(materials.undetected)
        return
      }

      setDetectedMaterial(materials[key])
    } catch (err) {
      console.error("Scan error:", err)
      setDetectedMaterial(materials.undetected)
    } finally {
      setIsScanning(false)
    }
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
              <div className="relative aspect-video flex items-center justify-center overflow-hidden">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt="Uploaded waste"
                  className="max-h-full max-w-full object-contain"
                />

                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-4 right-4"
                  onClick={resetScan}
                >
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
                  <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center text-6xl md:text-7xl animate-float">
                    {detectedMaterial.icon}
                  </div>

                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground">
                      {detectedMaterial.name}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Material detectado con éxito
                    </p>
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

      <div className="flex-1 space-y-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-foreground">{tip.title}</p>

            {/* opcional: etiqueta del tipo */}
            {"type" in tip && tip.type ? (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/50">
                {tip.type.toUpperCase()}
              </span>
            ) : null}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {"summary" in tip ? tip.summary : (tip as any).how}
          </p>
        </div>

        {!!tip.examples?.length && (
          <div className="text-xs text-muted-foreground">
            <p className="font-semibold mb-1">Ejemplos:</p>
            <ul className="list-disc pl-4 space-y-0.5">
              {tip.examples.map((ex, i) => (
                <li key={i}>{ex}</li>
              ))}
            </ul>
          </div>
        )}

        {!!(tip.resources?.length ?? (tip as any).links?.length) && (
          <div className="text-xs">
            <p className="font-semibold text-muted-foreground mb-1">Recursos:</p>
            <ul className="space-y-1">
              {(tip.resources ?? (tip as any).links).map((l: any, i: number) => (
                <li key={i}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-primary hover:opacity-80"
                  >
                    {l.title}
                  </a>
                  {l.note ? <span className="text-muted-foreground"> — {l.note}</span> : null}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  </Card>
))}
                    </div>
                  </div>

                  {/* Disposal Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-5 bg-card border-border relative overflow-hidden">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-20 ${detectedMaterial.disposalColor} rounded-lg relative shadow-lg flex items-center justify-center transition-transform hover:scale-105`}
              >
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-2 bg-black/20 rounded-t-lg"></div>
                <Recycle
              className={`h-7 w-7 ${
                detectedMaterial.disposal !== "Contenedor Blanco" ? "text-white" : "text-green-600"
              }`}
            />
    </div>

  <div className="flex-1">
    <p className="font-bold text-lg text-foreground">
      {detectedMaterial.disposal}
    </p>
    <p className="text-xs text-muted-foreground mt-1">
      Deposita aquí tu residuo
    </p>
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
                  Identifica cualquier material reciclable con nuestra IA
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
