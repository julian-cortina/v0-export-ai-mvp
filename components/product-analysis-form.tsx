"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Search } from "lucide-react"

const exportDestinations = [
  { code: "BR", name: "Brasil" },
  { code: "CN", name: "China" },
  { code: "US", name: "Estados Unidos" },
  { code: "EU", name: "Unión Europea" },
  { code: "CL", name: "Chile" },
  { code: "MX", name: "México" },
  { code: "PY", name: "Paraguay" },
  { code: "UY", name: "Uruguay" },
  { code: "VN", name: "Vietnam" },
  { code: "RU", name: "Rusia" },
  { code: "JP", name: "Japón" },
  { code: "KR", name: "Corea del Sur" },
  { code: "IN", name: "India" },
  { code: "CA", name: "Canadá" },
  { code: "PE", name: "Perú" },
  { code: "CO", name: "Colombia" },
  { code: "EG", name: "Egipto" },
  { code: "DZ", name: "Argelia" },
]

interface ProductAnalysisFormProps {
  onAnalyze: (data: {
    productDescription: string
    countryOrigin: string
    countryDestination: string
  }) => Promise<void>
  isLoading: boolean
}

export function ProductAnalysisForm({ onAnalyze, isLoading }: ProductAnalysisFormProps) {
  const [productDescription, setProductDescription] = useState("")
  const countryOrigin = "Argentina"
  const [countryDestination, setCountryDestination] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!productDescription.trim() || !countryDestination) {
      return
    }

    await onAnalyze({
      productDescription: productDescription.trim(),
      countryOrigin,
      countryDestination,
    })
  }

  const isFormValid = productDescription.trim().length > 0 && countryDestination

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Análisis de Exportación</CardTitle>
        <CardDescription>
          Analiza productos argentinos para exportación. Obtén información sobre aranceles, requisitos y acuerdos
          comerciales.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="country-origin">País de Origen</Label>
            <div className="flex items-center gap-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-2">
              <span className="text-2xl">🇦🇷</span>
              <span className="font-semibold text-primary">Argentina</span>
              <span className="ml-auto text-xs text-muted-foreground">Fijo</span>
            </div>
            <p className="text-xs text-muted-foreground">ExportAIdor está especializado en exportaciones argentinas</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country-destination">País de Destino</Label>
            <Select value={countryDestination} onValueChange={setCountryDestination} disabled={isLoading}>
              <SelectTrigger id="country-destination">
                <SelectValue placeholder="Selecciona el país de destino" />
              </SelectTrigger>
              <SelectContent>
                {exportDestinations.map((country) => (
                  <SelectItem key={country.code} value={country.name}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Principales destinos de exportación argentina disponibles</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-description">Descripción del Producto</Label>
            <Textarea
              id="product-description"
              placeholder="Ej: Vino Malbec tinto embotellado de 750ml, cosecha 2022, con denominación de origen Mendoza..."
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              disabled={isLoading}
              rows={6}
              className="resize-none"
            />
            <p className="text-sm text-muted-foreground">
              Proporciona una descripción detallada del producto argentino para obtener mejores resultados
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={!isFormValid || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analizando...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Analizar Exportación
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
