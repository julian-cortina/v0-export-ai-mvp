"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle } from "lucide-react"

interface HSCodeMatch {
  code: string
  description: string
  confidence: number
  section: string
}

interface HSCodeSuggestionsProps {
  matches: HSCodeMatch[]
  selectedCode?: string
  onSelectCode?: (code: string) => void
}

export function HSCodeSuggestions({ matches, selectedCode, onSelectCode }: HSCodeSuggestionsProps) {
  if (matches.length === 0) {
    return null
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.7) return "text-green-600 bg-green-50 border-green-200"
    if (confidence >= 0.4) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-orange-600 bg-orange-50 border-orange-200"
  }

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.7) return "Alta"
    if (confidence >= 0.4) return "Media"
    return "Baja"
  }

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 0.7) return <CheckCircle2 className="h-4 w-4" />
    return <AlertCircle className="h-4 w-4" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Códigos HS Sugeridos</CardTitle>
        <CardDescription>
          Basado en el análisis de la descripción del producto contra la base de datos del Sistema Armonizado
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {matches.map((match, index) => (
          <div
            key={match.code}
            className={`rounded-lg border p-4 transition-all ${
              selectedCode === match.code
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            } ${onSelectCode ? "cursor-pointer" : ""}`}
            onClick={() => onSelectCode?.(match.code)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-sm">
                    {match.code}
                  </Badge>
                  {index === 0 && (
                    <Badge variant="default" className="text-xs">
                      Recomendado
                    </Badge>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-slate-700">{match.description}</p>
                <p className="text-xs text-slate-500">Sección: {match.section}</p>
              </div>
              <div
                className={`flex flex-col items-end gap-1 rounded-md border px-2 py-1 ${getConfidenceColor(match.confidence)}`}
              >
                <div className="flex items-center gap-1">
                  {getConfidenceIcon(match.confidence)}
                  <span className="text-xs font-semibold">{getConfidenceLabel(match.confidence)}</span>
                </div>
                <span className="text-xs font-mono">{(match.confidence * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-4 rounded-md bg-blue-50 p-3 text-xs text-blue-800">
          <p className="font-semibold">💡 Nota sobre la confianza:</p>
          <p className="mt-1">
            La confianza se calcula mediante similitud de texto entre tu descripción y las descripciones oficiales del
            Sistema Armonizado. Una confianza alta indica una coincidencia fuerte, pero siempre verifica con un experto
            en comercio exterior.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
