/**
 * HS Codes API Route
 *
 * Provides access to the Harmonized System codes dataset
 * Supports searching and matching product descriptions to HS codes
 *
 * Endpoints:
 * - GET /api/hs-codes?search=query - Search HS codes by keyword
 * - POST /api/hs-codes/match - Find closest HS codes for a description
 */

import { type NextRequest, NextResponse } from "next/server"
import { searchHSCodes, getAllHSCodes } from "@/data/hs-data"
import { findTopHSMatches } from "@/lib/hs-matcher"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const searchQuery = searchParams.get("search")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    if (searchQuery) {
      // Search HS codes by keyword
      const results = searchHSCodes(searchQuery, limit)
      return NextResponse.json({
        success: true,
        query: searchQuery,
        count: results.length,
        results,
      })
    }

    // Return basic stats about the dataset
    const hsCodes = getAllHSCodes()
    return NextResponse.json({
      success: true,
      totalCodes: hsCodes.length,
      message: "Use ?search=query to search HS codes",
    })
  } catch (error) {
    console.error("[v0] Error in HS codes GET:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch HS codes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { description, topN = 3, minConfidence = 0.1 } = body

    if (!description) {
      return NextResponse.json({ success: false, error: "Description is required" }, { status: 400 })
    }

    console.log(`[v0] Finding HS codes for: "${description}"`)

    // Find closest matching HS codes
    const matches = findTopHSMatches(description, topN)

    // Filter by minimum confidence
    const filteredMatches = matches.filter((m) => m.score >= minConfidence)

    return NextResponse.json({
      success: true,
      description,
      matches: filteredMatches,
      count: filteredMatches.length,
    })
  } catch (error) {
    console.error("[v0] Error in HS codes POST:", error)
    return NextResponse.json({ success: false, error: "Failed to match HS codes" }, { status: 500 })
  }
}
