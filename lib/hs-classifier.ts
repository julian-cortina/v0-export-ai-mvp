// Rule-based HS code classifier for MVP
// This simulates AI classification using keyword matching
// To use real AI: replace this with OpenAI API calls when credit card is added

import { allArgentineProducts, fallbackProduct, type ProductRule } from "./argentine-products"

export interface ClassificationResult {
  hsCode: string
  productName: string
  confidenceLevel: number
  reasoning: string
}

/**
 * Classifies a product description into an HS code using keyword matching
 *
 * This is a rule-based classifier for MVP purposes. For production:
 * - Replace with OpenAI API when credit card is configured
 * - Or integrate with customs database API
 * - Or use machine learning model trained on Argentine exports
 */
export function classifyProduct(description: string): ClassificationResult {
  const lowerDescription = description.toLowerCase()

  // Find the best matching rule
  let bestMatch: ProductRule = fallbackProduct
  let highestScore = 0

  for (const rule of allArgentineProducts) {
    let score = 0
    const matchedKeywords: string[] = []

    for (const keyword of rule.keywords) {
      if (lowerDescription.includes(keyword.toLowerCase())) {
        score += 1
        matchedKeywords.push(keyword)
      }
    }

    if (score > highestScore) {
      highestScore = score
      bestMatch = rule
    }
  }

  // Adjust confidence based on description length and specificity
  let adjustedConfidence = bestMatch.confidence
  if (description.length < 10) {
    adjustedConfidence *= 0.8 // Lower confidence for very short descriptions
  }
  if (highestScore === 0) {
    adjustedConfidence = 0.45 // Very low confidence if no keywords matched
    bestMatch = fallbackProduct
  }

  return {
    hsCode: bestMatch.hsCode,
    productName: bestMatch.category,
    confidenceLevel: Math.round(adjustedConfidence * 100),
    reasoning:
      highestScore > 0
        ? `Clasificado basado en análisis de palabras clave relacionadas con ${bestMatch.category.toLowerCase()}`
        : "No se encontraron palabras clave específicas. Clasificación genérica aplicada. Se recomienda clasificación manual.",
  }
}
