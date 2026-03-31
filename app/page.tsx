"use client"

import { useState } from "react"
import { ProductAnalysisForm } from "@/components/product-analysis-form"
import { AnalysisResults } from "@/components/analysis-results"
import { HSCodeSuggestions } from "@/components/hs-code-suggestions"
import { NCMSearch } from "@/components/ncm-search"

interface HSCodeMatch {
  code: string
  description: string
  confidence: number
  section: string
}

interface AnalysisResult {
  hsCode: string
  confidence: number
  explanation: string
  tariffRate: string
  nonTariffMeasures: string
  requiredDocuments: string
  notes: string
  productName: string
  allMatches?: HSCodeMatch[]
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<{
    productDescription: string
    countryOrigin: string
    countryDestination: string
  } | null>(null)
  const [hsCodeSuggestions, setHsCodeSuggestions] = useState<HSCodeMatch[]>([])

  const handleAnalyze = async (data: {
    productDescription: string
    countryOrigin: string
    countryDestination: string
  }) => {
    setIsLoading(true)
    setError(null)
    setResult(null)
    setFormData(data)
    setHsCodeSuggestions([])

    try {
      console.log("[v0] Starting analysis with data:", data)

      // Call classification API
      console.log("[v0] Calling classification API...")
      const classifyResponse = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      console.log("[v0] Classification response status:", classifyResponse.status)

      const classifyText = await classifyResponse.text()
      console.log("[v0] Classification response text:", classifyText)

      if (!classifyResponse.ok) {
        let errorMsg = "Error al clasificar el producto"
        try {
          const errorData = JSON.parse(classifyText)
          errorMsg = `${errorData.error}${errorData.details ? `: ${errorData.details}` : ""}`
        } catch {
          errorMsg = `Error al clasificar el producto: ${classifyText}`
        }
        throw new Error(errorMsg)
      }

      const classifyData = JSON.parse(classifyText)
      console.log("[v0] Classification data:", classifyData)

      if (classifyData.all_matches && classifyData.all_matches.length > 0) {
        setHsCodeSuggestions(classifyData.all_matches)
      }

      // Call measures API
      console.log("[v0] Calling measures API...")
      const measuresResponse = await fetch(
        `/api/measures?hs_code=${classifyData.hs_code}&destination=${encodeURIComponent(data.countryDestination)}`,
      )

      console.log("[v0] Measures response status:", measuresResponse.status)

      if (!measuresResponse.ok) {
        throw new Error("Error al obtener medidas arancelarias")
      }

      const measuresData = await measuresResponse.json()
      console.log("[v0] Measures data:", measuresData)

      setResult({
        hsCode: classifyData.hs_code,
        confidence: classifyData.confidence,
        explanation: classifyData.explanation,
        tariffRate: measuresData.tariff_rate || "No disponible",
        nonTariffMeasures: measuresData.non_tariff_measures || "No disponible",
        requiredDocuments: measuresData.required_documents || "No disponible",
        notes: measuresData.notes || "",
        productName: measuresData.product_name || "",
        allMatches: classifyData.all_matches,
      })

      console.log("[v0] Analysis completed successfully")
    } catch (err) {
      console.error("[v0] Error in handleAnalyze:", err)
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadPDF = async () => {
    if (!result || !formData) return

    // Dynamic import to avoid SSR issues with jspdf
    const { generatePDF } = await import("@/lib/pdf-generator")
    
    await generatePDF({
      hsCode: result.hsCode,
      confidence: result.confidence,
      explanation: result.explanation,
      tariffRate: result.tariffRate,
      nonTariffMeasures: result.nonTariffMeasures,
      requiredDocuments: result.requiredDocuments,
      notes: result.notes,
      productName: result.productName,
      countryOrigin: formData.countryOrigin,
      countryDestination: formData.countryDestination,
      productDescription: formData.productDescription,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">ExportAIdor</h1>
              <p className="text-sm text-slate-600">Inteligencia Comercial para Exportaciones</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <NCMSearch />
            
            <ProductAnalysisForm onAnalyze={handleAnalyze} isLoading={isLoading} />

            {hsCodeSuggestions.length > 0 && (
              <HSCodeSuggestions matches={hsCodeSuggestions} selectedCode={result?.hsCode} />
            )}
          </div>

          <div>
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
                <p className="font-semibold">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {result && <AnalysisResults result={result} onDownloadPDF={handleDownloadPDF} />}

            {!result && !error && !isLoading && (
              <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-white p-8">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">Esperando análisis</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Completa el formulario y haz clic en "Analizar Exportación" para comenzar
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
