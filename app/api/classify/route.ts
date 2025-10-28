import { findTopHSMatches } from "@/lib/hs-matcher"

// NOTE: To use real AI classification with OpenAI:
// 1. Add a credit card to your Vercel account at https://vercel.com/~/ai
// 2. Uncomment the OpenAI code below and remove the rule-based classifier
// 3. Import: import { generateObject } from "ai" and import { z } from "zod"

export async function POST(request: Request) {
  console.log("[v0] Classification API called")

  try {
    const body = await request.json()
    console.log("[v0] Request body:", body)

    const { productDescription, countryOrigin, countryDestination } = body

    if (!productDescription || !countryOrigin || !countryDestination) {
      console.log("[v0] Missing required parameters")
      return Response.json({ error: "Faltan parámetros requeridos" }, { status: 400 })
    }

    console.log("[v0] Finding closest HS codes from local dataset...")

    const matches = findTopHSMatches(productDescription, 3)

    if (matches.length === 0) {
      console.log("[v0] No matches found in HS code dataset")
      return Response.json(
        {
          error: "No se encontraron códigos HS coincidentes",
          details: "Intenta proporcionar una descripción más detallada del producto",
        },
        { status: 404 },
      )
    }

    // Use the best match (highest score)
    const bestMatch = matches[0]

    console.log("[v0] Best HS code match:", bestMatch)

    const response = {
      hs_code: bestMatch.hs_code,
      confidence: bestMatch.score,
      explanation: `Clasificado como: ${bestMatch.description}`,
      alternatives: matches.map((m) => ({
        hs_code: m.hs_code,
        description: m.description,
        confidence: m.score,
      })),
    }

    console.log("[v0] Formatted response:", response)

    return Response.json(response)
  } catch (error) {
    console.error("[v0] Error in classification API:", error)

    if (error instanceof Error) {
      console.error("[v0] Error name:", error.name)
      console.error("[v0] Error message:", error.message)
      console.error("[v0] Error stack:", error.stack)
    }

    return Response.json(
      {
        error: "Error al clasificar el producto",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

/* 
// OPENAI VERSION (Uncomment when credit card is added to Vercel account)

import { generateObject } from "ai"
import { z } from "zod"

const hsClassificationSchema = z.object({
  hs_code: z.string().describe("El código HS (Sistema Armonizado) de 6 dígitos del producto"),
  confidence: z.number().min(0).max(1).describe("Nivel de confianza de la clasificación (0-1)"),
  explanation: z.string().describe("Explicación detallada de por qué se asignó este código HS"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productDescription, countryOrigin, countryDestination } = body

    if (!productDescription || !countryOrigin || !countryDestination) {
      return Response.json({ error: "Faltan parámetros requeridos" }, { status: 400 })
    }

    const result = await generateObject({
      model: "openai/gpt-4o-mini",
      schema: hsClassificationSchema,
      prompt: `Actuá como experto en comercio internacional y clasificación arancelaria.

Tu tarea es clasificar el siguiente producto según el Sistema Armonizado (HS) de clasificación de mercancías.

INFORMACIÓN DEL PRODUCTO:
- Descripción: ${productDescription}
- País de origen: ${countryOrigin}
- País de destino: ${countryDestination}

INSTRUCCIONES:
1. Analiza cuidadosamente la descripción del producto
2. Identifica las características clave que determinan su clasificación
3. Asigna el código HS de 6 dígitos más apropiado
4. Proporciona un nivel de confianza basado en:
   - Alta (0.8-1.0): Descripción clara y código HS inequívoco
   - Media (0.5-0.79): Descripción razonable pero podría haber ambigüedad
   - Baja (0-0.49): Descripción vaga o producto difícil de clasificar
5. Explica brevemente por qué elegiste ese código HS

Clasifica el producto ahora.`,
    })

    return Response.json(result.object)
  } catch (error) {
    console.error("Error in classification API:", error)
    return Response.json(
      {
        error: "Error al clasificar el producto",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
*/
