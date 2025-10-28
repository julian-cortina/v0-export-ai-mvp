/**
 * HS CODE MATCHER
 *
 * This module provides fuzzy matching functionality for HS codes.
 * It uses the static HS data from /data/hs-data.ts for fast, offline matching.
 */

import { searchHSCodes, getAllHSCodes } from "@/data/hs-data"
import type { HSMatch } from "@/types/hs"

/**
 * Find the top N matching HS codes for a product description
 *
 * @param description - Product description in Spanish or English
 * @param limit - Maximum number of results to return (default: 3)
 * @returns Array of HS matches with scores
 */
export function findTopHSMatches(description: string, limit = 3): HSMatch[] {
  console.log(`[v0] Finding HS matches for: "${description}"`)

  // Search using the data module
  const results = searchHSCodes(description, limit * 2)

  console.log(`[v0] Found ${results.length} potential matches`)

  // Convert to HSMatch format with normalized scores
  const matches: HSMatch[] = results.slice(0, limit).map((item, index) => {
    // Calculate confidence score (0-1) based on position
    // First result gets highest score, decreasing for subsequent results
    const baseScore = 0.95 - index * 0.1
    const score = Math.max(0.5, Math.min(0.95, baseScore))

    return {
      hs_code: item.code,
      description: item.description,
      score,
      chapter: item.chapter,
      section: item.section,
    }
  })

  console.log(`[v0] Returning ${matches.length} matches:`, matches)

  return matches
}

/**
 * Get total number of HS codes in the database
 */
export function getHSCodeCount(): number {
  return getAllHSCodes().length
}
