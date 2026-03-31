import { searchHSCodes } from "@/data/hs-data"

/**
 * NCM (Nomenclatura Común del Mercosur) API
 * 
 * Provides NCM code identification with precision scoring.
 * Returns structured data with confidence levels for trade classification.
 */

interface NCMResult {
  codigo_ncm: string
  descripcion_oficial: string
  probabilidad_acierto: number
  capitulo: string
  seccion?: string
}

interface NCMSuggestion {
  texto: string
  descripcion_completa: string
}

// Product suggestions database for assisted input
const PRODUCT_SUGGESTIONS: Record<string, NCMSuggestion[]> = {
  vino: [
    { texto: "Vino de uvas frescas", descripcion_completa: "Vino de uvas frescas, incluido el vino enriquecido" },
    { texto: "Vino espumoso", descripcion_completa: "Vino espumante o champán" },
    { texto: "Mosto de uva", descripcion_completa: "Mosto de uva, parcialmente fermentado" },
    { texto: "Vino tinto Malbec", descripcion_completa: "Vino tinto varietal Malbec embotellado" },
    { texto: "Vino blanco Torrontés", descripcion_completa: "Vino blanco varietal Torrontés embotellado" },
  ],
  carne: [
    { texto: "Carne bovina fresca", descripcion_completa: "Carne de animales de la especie bovina, fresca o refrigerada" },
    { texto: "Carne bovina congelada", descripcion_completa: "Carne de animales de la especie bovina, congelada" },
    { texto: "Carne porcina", descripcion_completa: "Carne de animales de la especie porcina" },
    { texto: "Cortes especiales", descripcion_completa: "Cortes especiales de carne bovina sin hueso" },
  ],
  soja: [
    { texto: "Porotos de soja", descripcion_completa: "Habas de soja, incluso quebrantadas" },
    { texto: "Aceite de soja crudo", descripcion_completa: "Aceite de soja en bruto, incluso desgomado" },
    { texto: "Aceite de soja refinado", descripcion_completa: "Aceite de soja refinado" },
    { texto: "Harina de soja", descripcion_completa: "Harina y pellets de habas de soja" },
  ],
  maíz: [
    { texto: "Maíz en grano", descripcion_completa: "Maíz (excepto para siembra)" },
    { texto: "Maíz para siembra", descripcion_completa: "Maíz para siembra" },
    { texto: "Aceite de maíz", descripcion_completa: "Aceite de maíz y sus fracciones" },
  ],
  trigo: [
    { texto: "Trigo duro", descripcion_completa: "Trigo duro" },
    { texto: "Trigo blando", descripcion_completa: "Trigo (excepto trigo duro) y morcajo" },
    { texto: "Harina de trigo", descripcion_completa: "Harina de trigo o de morcajo" },
  ],
  cuero: [
    { texto: "Cueros bovinos", descripcion_completa: "Cueros y pieles en bruto de bovinos" },
    { texto: "Cuero curtido", descripcion_completa: "Cueros curtidos o crust de bovinos" },
    { texto: "Artículos de cuero", descripcion_completa: "Manufacturas de cuero" },
  ],
  miel: [
    { texto: "Miel natural", descripcion_completa: "Miel natural de abeja" },
    { texto: "Miel orgánica", descripcion_completa: "Miel natural orgánica certificada" },
  ],
  yerba: [
    { texto: "Yerba mate", descripcion_completa: "Mate (yerba mate)" },
    { texto: "Yerba mate elaborada", descripcion_completa: "Yerba mate elaborada con palo" },
    { texto: "Yerba mate sin palo", descripcion_completa: "Yerba mate elaborada despalada" },
  ],
  limón: [
    { texto: "Limones frescos", descripcion_completa: "Limones y limas, frescos o secos" },
    { texto: "Jugo de limón", descripcion_completa: "Jugo de limón" },
    { texto: "Aceite esencial de limón", descripcion_completa: "Aceite esencial de limón" },
  ],
  aceite: [
    { texto: "Aceite de oliva", descripcion_completa: "Aceite de oliva y sus fracciones" },
    { texto: "Aceite de girasol", descripcion_completa: "Aceite de girasol y sus fracciones" },
    { texto: "Aceite de soja", descripcion_completa: "Aceite de soja y sus fracciones" },
    { texto: "Aceite de maní", descripcion_completa: "Aceite de maní (cacahuete) y sus fracciones" },
  ],
}

// Calculate confidence based on description detail level
function calculateConfidence(description: string, matches: number): number {
  const words = description.trim().split(/\s+/).filter(w => w.length > 2)
  const wordCount = words.length
  
  // Base confidence from match quality
  let confidence = matches > 0 ? 0.65 : 0.30
  
  // Bonus for detailed descriptions
  if (wordCount >= 5) confidence += 0.15
  if (wordCount >= 8) confidence += 0.10
  if (wordCount >= 12) confidence += 0.05
  
  // Bonus for specific keywords that help classification
  const specificKeywords = [
    'fresco', 'congelado', 'refrigerado', 'embotellado', 'envasado',
    'crudo', 'refinado', 'procesado', 'natural', 'orgánico',
    'peso', 'ml', 'litros', 'kg', 'gramos',
    'uso', 'industrial', 'consumo', 'alimenticio',
    'material', 'cuero', 'plástico', 'vidrio', 'metal'
  ]
  
  const hasSpecificKeywords = specificKeywords.some(kw => 
    description.toLowerCase().includes(kw)
  )
  
  if (hasSpecificKeywords) confidence += 0.05
  
  // Cap at 0.95
  return Math.min(0.95, Math.max(0.30, confidence))
}

// GET - Suggestions for assisted input
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")?.toLowerCase().trim()
    
    if (!query || query.length < 2) {
      return Response.json({ 
        suggestions: [],
        message: "Ingrese al menos 2 caracteres para obtener sugerencias"
      })
    }
    
    // Find matching product suggestions
    const suggestions: NCMSuggestion[] = []
    
    for (const [key, values] of Object.entries(PRODUCT_SUGGESTIONS)) {
      if (key.includes(query) || query.includes(key)) {
        suggestions.push(...values)
      }
    }
    
    // Also search in all suggestion texts
    for (const values of Object.values(PRODUCT_SUGGESTIONS)) {
      for (const suggestion of values) {
        if (
          suggestion.texto.toLowerCase().includes(query) ||
          suggestion.descripcion_completa.toLowerCase().includes(query)
        ) {
          if (!suggestions.find(s => s.texto === suggestion.texto)) {
            suggestions.push(suggestion)
          }
        }
      }
    }
    
    return Response.json({
      query,
      suggestions: suggestions.slice(0, 6),
    })
  } catch (error) {
    console.error("[NCM API] Error in GET:", error)
    return Response.json(
      { error: "Error al obtener sugerencias", suggestions: [] },
      { status: 500 }
    )
  }
}

// POST - NCM identification
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { descripcion } = body
    
    if (!descripcion || typeof descripcion !== 'string' || descripcion.trim().length < 3) {
      return Response.json(
        { error: "La descripción del producto es requerida (mínimo 3 caracteres)" },
        { status: 400 }
      )
    }
    
    const cleanDescription = descripcion.trim()
    
    // Search for matching HS codes
    const matches = searchHSCodes(cleanDescription, 5)
    
    if (matches.length === 0) {
      return Response.json({
        resultados: [],
        total: 0,
        mensaje: "No se encontraron códigos NCM para esta descripción. Intente con términos más específicos.",
        requiere_mas_detalle: true
      })
    }
    
    // Calculate confidence for each match
    const resultados: NCMResult[] = matches.map((match, index) => {
      // Decrease confidence for subsequent matches
      const baseConfidence = calculateConfidence(cleanDescription, matches.length)
      const positionPenalty = index * 0.08
      const confidence = Math.max(0.30, baseConfidence - positionPenalty)
      
      return {
        codigo_ncm: match.code,
        descripcion_oficial: match.description,
        probabilidad_acierto: Math.round(confidence * 100) / 100,
        capitulo: match.chapter || match.code.substring(0, 2),
        seccion: match.section
      }
    })
    
    // Check if best match has low confidence
    const mejorResultado = resultados[0]
    const requiereMasDetalle = mejorResultado.probabilidad_acierto < 0.80
    
    return Response.json({
      resultados,
      total: resultados.length,
      mejor_resultado: mejorResultado,
      requiere_mas_detalle: requiereMasDetalle,
      mensaje: requiereMasDetalle 
        ? "Se requiere descripción más detallada (material, uso, peso)" 
        : "Clasificación exitosa con alta confianza",
      recomendaciones: requiereMasDetalle ? [
        "Especifique el material principal del producto",
        "Indique el uso previsto (industrial, consumo, etc.)",
        "Incluya información sobre peso o volumen",
        "Mencione el estado del producto (fresco, procesado, etc.)",
        "Agregue detalles sobre el envase o presentación"
      ] : []
    })
  } catch (error) {
    console.error("[NCM API] Error in POST:", error)
    return Response.json(
      { 
        error: "Error al identificar el código NCM",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}
