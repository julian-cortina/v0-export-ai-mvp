import { getTradeMeasures, argentineTradeMeasures } from "@/lib/argentine-trade-data"

export async function GET(request: Request) {
  try {
    console.log("[v0] Measures API called")

    const { searchParams } = new URL(request.url)
    const hsCode = searchParams.get("hs_code")
    const destination = searchParams.get("destination")

    console.log("[v0] Query params:", { hsCode, destination })

    if (!hsCode || !destination) {
      console.log("[v0] Missing required parameters")
      return Response.json({ error: "Faltan parámetros requeridos: hs_code y destination" }, { status: 400 })
    }

    console.log("[v0] Querying Argentine trade data for measures...")
    let measures = getTradeMeasures(hsCode, destination)
    console.log("[v0] Exact match result:", measures ? "Found" : "Not found")

    if (!measures) {
      console.log("[v0] No exact match, trying 4-digit chapter match...")
      const chapter4 = hsCode.substring(0, 4)

      // Find measures with same 4-digit chapter and destination
      const chapterMatches = argentineTradeMeasures.filter(
        (m) =>
          m.hsCode.substring(0, 4) === chapter4 && m.countryDestination.toLowerCase() === destination.toLowerCase(),
      )

      if (chapterMatches.length > 0) {
        console.log(`[v0] Found ${chapterMatches.length} chapter matches`)
        measures = chapterMatches[0] // Use first match as reference

        return Response.json({
          id: 0,
          product_name: `Producto similar (capítulo ${chapter4})`,
          hs_code: hsCode,
          country_origin: "Argentina",
          country_destination: destination,
          tariff_rate: `Aproximado: ${measures.tariffRate} (verificar código específico)`,
          non_tariff_measures: measures.nonTariffMeasures,
          required_documents: measures.requiredDocuments,
          notes: `Datos basados en producto similar (${measures.productName}, código ${measures.hsCode}). Se recomienda verificar el código HS específico ${hsCode} con autoridades aduaneras.`,
          trade_agreement: measures.tradeAgreement || null,
          confidence_level: "medium",
        })
      }
    }

    // If still no match, return generic fallback
    if (!measures) {
      console.log("[v0] No chapter match found, returning generic fallback")
      return Response.json(
        {
          id: 0,
          product_name: "Producto sin datos específicos",
          hs_code: hsCode,
          country_origin: "Argentina",
          country_destination: destination,
          tariff_rate: "Consultar con autoridades aduaneras del país de destino",
          non_tariff_measures: "Verificar requisitos específicos con SENASA y autoridades del país de destino",
          required_documents:
            "Factura comercial, Certificado de origen, Lista de empaque, Certificado SENASA (si aplica)",
          notes:
            "No se encontraron datos específicos para esta combinación de código HS y país de destino. Se recomienda consultar con un despachante de aduana o la Cámara de Exportadores correspondiente.",
          confidence_level: "low",
        },
        { status: 200 },
      )
    }

    console.log("[v0] Returning Argentine trade measures data")
    return Response.json({
      id: measures.id,
      product_name: measures.productName,
      hs_code: measures.hsCode,
      country_origin: measures.countryOrigin,
      country_destination: measures.countryDestination,
      tariff_rate: measures.tariffRate,
      non_tariff_measures: measures.nonTariffMeasures,
      required_documents: measures.requiredDocuments,
      notes: measures.notes,
      trade_agreement: measures.tradeAgreement || null,
      confidence_level: measures.confidenceLevel,
    })
  } catch (error) {
    console.error("[v0] Error in measures API:", error)
    console.error("[v0] Error details:", error instanceof Error ? error.message : String(error))
    console.error("[v0] Error stack:", error instanceof Error ? error.stack : "No stack trace")
    return Response.json({ error: "Error al obtener medidas arancelarias" }, { status: 500 })
  }
}
