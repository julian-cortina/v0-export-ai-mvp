"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, Edit } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AnalysisResultsProps {
  result: {
    hsCode: string
    confidence: number
    explanation: string
    tariffRate: string
    nonTariffMeasures: string
    requiredDocuments: string
    notes: string
    productName: string
  }
  onDownloadPDF: () => void
}

export function AnalysisResults({ result, onDownloadPDF }: AnalysisResultsProps) {
  const [isEditingHS, setIsEditingHS] = useState(false)
  const [editedHSCode, setEditedHSCode] = useState(result.hsCode)

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.8) {
      return <Badge className="bg-green-600">Alta confianza ({Math.round(confidence * 100)}%)</Badge>
    } else if (confidence >= 0.5) {
      return <Badge className="bg-yellow-600">Confianza media ({Math.round(confidence * 100)}%)</Badge>
    } else {
      return <Badge className="bg-red-600">Baja confianza ({Math.round(confidence * 100)}%)</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Resultados del Análisis</h2>
        <Button onClick={onDownloadPDF} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Descargar PDF
        </Button>
      </div>

      {/* HS Code Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Código HS (Sistema Armonizado)</CardTitle>
              <CardDescription>Clasificación arancelaria del producto</CardDescription>
            </div>
            {getConfidenceBadge(result.confidence)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            {isEditingHS ? (
              <div className="flex flex-1 items-center gap-2">
                <div className="flex-1">
                  <Label htmlFor="hs-code-edit" className="sr-only">
                    Editar código HS
                  </Label>
                  <Input
                    id="hs-code-edit"
                    value={editedHSCode}
                    onChange={(e) => setEditedHSCode(e.target.value)}
                    placeholder="XXXX.XX"
                  />
                </div>
                <Button size="sm" onClick={() => setIsEditingHS(false)}>
                  Guardar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditedHSCode(result.hsCode)
                    setIsEditingHS(false)
                  }}
                >
                  Cancelar
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1">
                  <div className="text-3xl font-bold text-blue-600">{editedHSCode}</div>
                  {result.productName && <p className="mt-1 text-sm text-slate-600">{result.productName}</p>}
                </div>
                <Button size="sm" variant="ghost" onClick={() => setIsEditingHS(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
              </>
            )}
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm leading-relaxed text-slate-700">{result.explanation}</p>
          </div>
        </CardContent>
      </Card>

      {/* Tariff Rate Card */}
      <Card>
        <CardHeader>
          <CardTitle>Arancel de Importación</CardTitle>
          <CardDescription>Tasa arancelaria aplicable</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold text-slate-900">{result.tariffRate}</div>
        </CardContent>
      </Card>

      {/* Non-Tariff Measures Card */}
      <Card>
        <CardHeader>
          <CardTitle>Medidas No Arancelarias</CardTitle>
          <CardDescription>Requisitos y certificaciones necesarias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {result.nonTariffMeasures.split(",").map((measure, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                <p className="text-sm text-slate-700">{measure.trim()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Required Documents Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documentación Requerida
          </CardTitle>
          <CardDescription>Documentos necesarios para la exportación</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {result.requiredDocuments.split(",").map((doc, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-600" />
                <p className="text-sm text-slate-700">{doc.trim()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notes Card */}
      {result.notes && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-amber-900">Notas Importantes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-amber-800">{result.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
