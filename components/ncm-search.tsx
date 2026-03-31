"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, AlertTriangle, CheckCircle, Info, ChevronRight } from "lucide-react"

interface NCMResult {
  codigo_ncm: string
  descripcion_oficial: string
  probabilidad_acierto: number
  capitulo: string
  seccion?: string
}

interface NCMResponse {
  resultados: NCMResult[]
  total: number
  mejor_resultado?: NCMResult
  requiere_mas_detalle: boolean
  mensaje: string
  recomendaciones?: string[]
}

interface NCMSuggestion {
  texto: string
  descripcion_completa: string
}

export function NCMSearch() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<NCMResponse | null>(null)
  const [suggestions, setSuggestions] = useState<NCMSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Fetch suggestions as user types
  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions([])
      return
    }

    try {
      const response = await fetch(`/api/ncm?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      
      if (data.suggestions) {
        setSuggestions(data.suggestions)
        setShowSuggestions(true)
      }
    } catch (err) {
      console.error("[NCM] Error fetching suggestions:", err)
    }
  }, [])

  // Debounced suggestion fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 2) {
        fetchSuggestions(query)
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query, fetchSuggestions])

  // Click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = async (searchQuery?: string) => {
    const finalQuery = searchQuery || query
    
    if (finalQuery.trim().length < 3) {
      setError("Ingrese al menos 3 caracteres para buscar")
      return
    }

    setIsLoading(true)
    setError(null)
    setResults(null)
    setShowSuggestions(false)

    try {
      const response = await fetch("/api/ncm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descripcion: finalQuery }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al buscar código NCM")
      }

      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: NCMSuggestion) => {
    setQuery(suggestion.descripcion_completa)
    setShowSuggestions(false)
    handleSearch(suggestion.descripcion_completa)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch()
  }

  const getConfidenceColor = (probability: number) => {
    if (probability >= 0.80) return "text-emerald-600 bg-emerald-50 border-emerald-200"
    if (probability >= 0.60) return "text-amber-600 bg-amber-50 border-amber-200"
    return "text-red-600 bg-red-50 border-red-200"
  }

  const getConfidenceLabel = (probability: number) => {
    if (probability >= 0.80) return "Alta"
    if (probability >= 0.60) return "Media"
    return "Baja"
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Search className="h-5 w-5 text-primary" />
          Identificador de NCM
        </CardTitle>
        <CardDescription>
          Busque el código NCM (Nomenclatura Común del Mercosur) para su producto de exportación
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ncm-search" className="text-sm font-medium">
              Descripción del Producto
            </Label>
            <div className="relative">
              <Input
                ref={inputRef}
                id="ncm-search"
                type="text"
                placeholder="Ej: Vino, Carne bovina, Aceite de soja..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                disabled={isLoading}
                className="pr-10"
              />
              
              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute z-50 mt-1 w-full rounded-md border border-border bg-card shadow-lg"
                >
                  <ul className="max-h-60 overflow-auto py-1">
                    {suggestions.map((suggestion, index) => (
                      <li key={index}>
                        <button
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm hover:bg-muted transition-colors"
                        >
                          <ChevronRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">
                              {suggestion.texto}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {suggestion.descripcion_completa}
                            </p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Escriba para ver sugerencias. Sea lo más específico posible para obtener mejores resultados.
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || query.trim().length < 3}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Buscando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Identificar NCM
              </span>
            )}
          </Button>
        </form>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4">
            <div className="space-y-3">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-destructive">Error</p>
                <p className="text-sm text-destructive/80">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {results && !isLoading && (
          <div className="space-y-4">
            {/* Low Confidence Warning */}
            {results.requiere_mas_detalle && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-amber-800">
                      Se requiere descripción más detallada
                    </p>
                    <p className="text-sm text-amber-700 mt-1">
                      Para mejorar la precisión, incluya información sobre: material, uso, peso.
                    </p>
                    {results.recomendaciones && results.recomendaciones.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {results.recomendaciones.map((rec, index) => (
                          <li key={index} className="text-xs text-amber-700 flex items-center gap-1.5">
                            <span className="h-1 w-1 rounded-full bg-amber-500" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Best Result */}
            {results.mejor_resultado && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">Mejor Coincidencia</h3>
                  {!results.requiere_mas_detalle && (
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                  )}
                </div>
                <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-lg font-bold text-primary">
                          {results.mejor_resultado.codigo_ncm}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          Cap. {results.mejor_resultado.capitulo}
                        </Badge>
                        {results.mejor_resultado.seccion && (
                          <Badge variant="secondary" className="text-xs">
                            Sec. {results.mejor_resultado.seccion}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {results.mejor_resultado.descripcion_oficial}
                      </p>
                    </div>
                    <div className={`rounded-md border px-3 py-1.5 text-center ${getConfidenceColor(results.mejor_resultado.probabilidad_acierto)}`}>
                      <p className="text-lg font-bold">
                        {Math.round(results.mejor_resultado.probabilidad_acierto * 100)}%
                      </p>
                      <p className="text-xs font-medium">
                        {getConfidenceLabel(results.mejor_resultado.probabilidad_acierto)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Alternative Results */}
            {results.resultados.length > 1 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  Otras Opciones
                </h3>
                <div className="space-y-2">
                  {results.resultados.slice(1).map((resultado, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-border bg-card p-3 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-sm font-semibold text-foreground">
                              {resultado.codigo_ncm}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              Cap. {resultado.capitulo}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {resultado.descripcion_oficial}
                          </p>
                        </div>
                        <div className={`rounded px-2 py-1 text-xs font-medium ${getConfidenceColor(resultado.probabilidad_acierto)}`}>
                          {Math.round(resultado.probabilidad_acierto * 100)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {results.resultados.length === 0 && (
              <div className="rounded-lg border border-border bg-muted/30 p-6 text-center">
                <Info className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">
                  No se encontraron códigos NCM
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {results.mensaje}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
