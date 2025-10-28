/**
 * LOCAL HS CODE LOADER
 *
 * This module loads the Harmonized System codes from a local CSV file
 * and provides fuzzy search functionality for product classification.
 *
 * NO REMOTE FETCHING - All data is loaded from /lib/data/harmonized-system.csv
 */

import fs from "fs"
import path from "path"

interface HSCode {
  section: string
  hscode: string
  description: string
  parent: string
  level: string
}

interface HSMatch {
  hs_code: string
  description: string
  score: number
  section: string
  level: string
}

let hsDataCache: HSCode[] | null = null

/**
 * Load HS data synchronously from local CSV file
 * Caches the data in memory after first load
 */
export function loadHSDataSync(): HSCode[] {
  console.log("[v0] Loading HS data from local CSV...")

  // Return cached data if available
  if (hsDataCache) {
    console.log(`[v0] Using cached HS data (${hsDataCache.length} codes)`)
    return hsDataCache
  }

  try {
    // Read CSV file from lib/data directory
    const csvPath = path.join(process.cwd(), "lib", "data", "harmonized-system.csv")
    console.log(`[v0] Reading CSV from: ${csvPath}`)

    const csvContent = fs.readFileSync(csvPath, "utf-8")
    const lines = csvContent.split("\n")

    console.log(`[v0] CSV has ${lines.length} lines`)

    // Parse CSV (skip header)
    const hsCodes: HSCode[] = []

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      // Simple CSV parsing (handles quoted fields)
      const values = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || []
      const cleanValues = values.map((v) => v.replace(/^"|"$/g, "").trim())

      if (cleanValues.length >= 5) {
        hsCodes.push({
          section: cleanValues[0],
          hscode: cleanValues[1],
          description: cleanValues[2],
          parent: cleanValues[3],
          level: cleanValues[4],
        })
      }
    }

    console.log(`[v0] Parsed ${hsCodes.length} HS codes from CSV`)

    // Cache the data
    hsDataCache = hsCodes

    return hsCodes
  } catch (error) {
    console.error("[v0] Error loading HS data from local CSV:", error)
    throw new Error(`Failed to load HS codes: ${error instanceof Error ? error.message : String(error)}`)
  }
}

/**
 * Normalize text for comparison
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

/**
 * Extract keywords from text (remove stop words)
 */
function extractKeywords(text: string): string[] {
  const stopWords = new Set([
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "by",
    "for",
    "from",
    "has",
    "he",
    "in",
    "is",
    "it",
    "its",
    "of",
    "on",
    "that",
    "the",
    "to",
    "was",
    "will",
    "with",
    "other",
    "than",
    "not",
    "or",
    "de",
    "del",
    "la",
    "el",
    "los",
    "las",
    "un",
    "una",
    "y",
    "o",
    "en",
    "con",
    "para",
    "por",
  ])

  const normalized = normalizeText(text)
  const words = normalized.split(" ")

  return words.filter((word) => word.length > 2 && !stopWords.has(word))
}

/**
 * Calculate similarity score between two texts
 * Uses a combination of:
 * 1. Exact keyword matches
 * 2. Partial keyword matches
 * 3. Word order similarity
 */
function calculateSimilarity(query: string, description: string): number {
  const queryKeywords = extractKeywords(query)
  const descKeywords = extractKeywords(description)

  if (queryKeywords.length === 0) return 0

  const querySet = new Set(queryKeywords)
  const descSet = new Set(descKeywords)

  // Count exact matches
  let exactMatches = 0
  for (const keyword of queryKeywords) {
    if (descSet.has(keyword)) {
      exactMatches++
    }
  }

  // Calculate base score (Jaccard similarity)
  const intersection = new Set([...querySet].filter((x) => descSet.has(x)))
  const union = new Set([...querySet, ...descSet])
  const jaccardScore = union.size > 0 ? intersection.size / union.size : 0

  // Boost for exact matches
  const exactMatchBoost = exactMatches / queryKeywords.length

  // Check for partial matches (substring matching)
  let partialMatches = 0
  const queryNorm = normalizeText(query)
  const descNorm = normalizeText(description)

  for (const keyword of queryKeywords) {
    if (keyword.length > 3 && descNorm.includes(keyword)) {
      partialMatches++
    }
  }

  const partialMatchBoost = partialMatches / queryKeywords.length

  // Combined score
  const finalScore = jaccardScore * 0.4 + exactMatchBoost * 0.4 + partialMatchBoost * 0.2

  return Math.min(finalScore, 1.0)
}

/**
 * Find top N matching HS codes for a product description
 * Uses fuzzy text matching algorithm
 *
 * @param description - Product description to match
 * @param topN - Number of top matches to return (default: 3)
 * @returns Array of HS code matches with scores
 */
export function findTopHSMatches(description: string, topN = 3): HSMatch[] {
  console.log(`[v0] Finding top ${topN} HS matches for: "${description}"`)

  try {
    const hsCodes = loadHSDataSync()

    if (hsCodes.length === 0) {
      console.warn("[v0] No HS codes available")
      return []
    }

    // Calculate similarity scores for all HS codes
    const matches: HSMatch[] = hsCodes
      .map((hs) => ({
        hs_code: hs.hscode,
        description: hs.description,
        section: hs.section,
        level: hs.level,
        score: calculateSimilarity(description, hs.description),
      }))
      .filter((match) => match.score > 0.05) // Minimum threshold
      .sort((a, b) => b.score - a.score)
      .slice(0, topN)

    console.log(`[v0] Found ${matches.length} matches:`)
    matches.forEach((m, i) => {
      console.log(`[v0]   ${i + 1}. ${m.hs_code} - ${m.description.substring(0, 50)}... (score: ${m.score.toFixed(3)})`)
    })

    return matches
  } catch (error) {
    console.error("[v0] Error in findTopHSMatches:", error)
    throw error
  }
}

/**
 * Get HS code details by code
 */
export function getHSCodeByCode(code: string): HSCode | null {
  const hsCodes = loadHSDataSync()
  return hsCodes.find((hs) => hs.hscode === code) || null
}

/**
 * Search HS codes by keyword (for autocomplete)
 */
export function searchHSCodes(query: string, limit = 10): HSCode[] {
  const hsCodes = loadHSDataSync()
  const normalized = normalizeText(query)

  return hsCodes.filter((hs) => normalizeText(hs.description).includes(normalized)).slice(0, limit)
}
