/**
 * HS Code Matching System
 *
 * This module provides text similarity matching between product descriptions
 * and the official Harmonized System (HS) codes dataset.
 *
 * The matching algorithm uses:
 * 1. Keyword extraction and matching
 * 2. Word overlap scoring
 * 3. Relevance ranking based on description similarity
 */

interface HSCode {
  section: string
  code: string
  description: string
  parent: string
  level: number
}

interface HSCodeMatch {
  code: string
  description: string
  confidence: number
  section: string
  level: number
}

let hsCodesCache: HSCode[] | null = null
let isFetching = false
let fetchPromise: Promise<HSCode[]> | null = null

/**
 * Fetch HS codes from GitHub and parse CSV
 */
async function fetchHSCodesFromGitHub(): Promise<HSCode[]> {
  const HS_CODES_URL =
    "https://raw.githubusercontent.com/julian-cortina/harmonized-system/main/data/harmonized-system.csv"

  console.log("[v0] Fetching HS codes from GitHub...")

  try {
    const response = await fetch(HS_CODES_URL)
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`)
    }

    const csvText = await response.text()
    console.log("[v0] CSV fetched successfully, parsing...")

    // Parse CSV
    const lines = csvText.split("\n")
    const hsCodes: HSCode[] = []

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      // Handle CSV with quoted fields
      const values = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || []
      const cleanValues = values.map((v) => v.replace(/^"|"$/g, "").trim())

      if (cleanValues.length >= 5) {
        hsCodes.push({
          section: cleanValues[0],
          code: cleanValues[1],
          description: cleanValues[2],
          parent: cleanValues[3],
          level: Number.parseInt(cleanValues[4]) || 0,
        })
      }
    }

    console.log(`[v0] Parsed ${hsCodes.length} HS codes`)
    return hsCodes
  } catch (error) {
    console.error("[v0] Error fetching HS codes:", error)
    throw error
  }
}

/**
 * Load HS codes with caching
 * Fetches from GitHub on first call, then caches in memory
 */
export async function loadHSCodes(): Promise<HSCode[]> {
  // Return cached data if available
  if (hsCodesCache) {
    return hsCodesCache
  }

  // If already fetching, wait for that promise
  if (isFetching && fetchPromise) {
    return fetchPromise
  }

  // Start fetching
  isFetching = true
  fetchPromise = fetchHSCodesFromGitHub()

  try {
    const codes = await fetchPromise
    hsCodesCache = codes
    isFetching = false
    return codes
  } catch (error) {
    isFetching = false
    fetchPromise = null
    throw error
  }
}

/**
 * Normalize text for comparison
 * - Convert to lowercase
 * - Remove special characters
 * - Remove extra whitespace
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

/**
 * Extract keywords from text
 * Removes common stop words
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
  ])

  const normalized = normalizeText(text)
  const words = normalized.split(" ")

  return words.filter((word) => word.length > 2 && !stopWords.has(word))
}

/**
 * Calculate similarity score between two texts
 * Uses Jaccard similarity coefficient (intersection over union)
 */
function calculateSimilarity(text1: string, text2: string): number {
  const keywords1 = new Set(extractKeywords(text1))
  const keywords2 = new Set(extractKeywords(text2))

  if (keywords1.size === 0 || keywords2.size === 0) return 0

  // Calculate intersection
  const intersection = new Set([...keywords1].filter((x) => keywords2.has(x)))

  // Calculate union
  const union = new Set([...keywords1, ...keywords2])

  // Jaccard similarity
  const jaccardScore = intersection.size / union.size

  // Boost score if there are exact phrase matches
  const text1Lower = text1.toLowerCase()
  const text2Lower = text2.toLowerCase()
  let exactMatchBoost = 0

  for (const keyword of keywords1) {
    if (keyword.length > 4 && text2Lower.includes(keyword)) {
      exactMatchBoost += 0.1
    }
  }

  return Math.min(jaccardScore + exactMatchBoost, 1.0)
}

/**
 * Find the closest HS codes for a given product description
 * Returns top N matches with confidence scores
 *
 * @param description - Product description to match
 * @param topN - Number of top matches to return (default: 3)
 * @param minConfidence - Minimum confidence threshold (default: 0.1)
 * @returns Array of HS code matches sorted by confidence
 */
export async function findClosestHSCode(description: string, topN = 3, minConfidence = 0.1): Promise<HSCodeMatch[]> {
  const hsCodes = await loadHSCodes()

  if (hsCodes.length === 0) {
    console.warn("[v0] No HS codes available for matching")
    return []
  }

  console.log(`[v0] Matching "${description}" against ${hsCodes.length} HS codes`)

  // Calculate similarity scores for all HS codes
  const matches: HSCodeMatch[] = hsCodes
    .map((hsCode) => ({
      code: hsCode.code,
      description: hsCode.description,
      section: hsCode.section,
      level: hsCode.level,
      confidence: calculateSimilarity(description, hsCode.description),
    }))
    .filter((match) => match.confidence >= minConfidence)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, topN)

  console.log(`[v0] Found ${matches.length} matches above confidence threshold`)

  return matches
}

/**
 * Get HS code details by code
 */
export async function getHSCodeByCode(code: string): Promise<HSCode | null> {
  const hsCodes = await loadHSCodes()
  return hsCodes.find((hs) => hs.code === code) || null
}

/**
 * Search HS codes by keyword
 * Useful for autocomplete or search functionality
 */
export async function searchHSCodes(query: string, limit = 10): Promise<HSCode[]> {
  const hsCodes = await loadHSCodes()
  const normalized = normalizeText(query)

  return hsCodes.filter((hs) => normalizeText(hs.description).includes(normalized)).slice(0, limit)
}
