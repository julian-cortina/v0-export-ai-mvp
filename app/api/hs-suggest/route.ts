import { findTopHSMatches } from "@/lib/hs-matcher"

/**
 * HS CODE SUGGESTION ENDPOINT
 * Provides autocomplete/suggestion functionality for product descriptions
 * Used by the UI to show suggestions as the user types
 */
export async function GET(request: Request) {
  console.log("[v0] HS suggest endpoint called")

  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    const limit = Number.parseInt(searchParams.get("limit") || "3")

    console.log("[v0] Query params:", { query, limit })

    if (!query || query.trim().length < 3) {
      return Response.json(
        {
          error: "Query must be at least 3 characters",
          suggestions: [],
        },
        { status: 400 },
      )
    }

    console.log(`[v0] Finding top ${limit} suggestions for: "${query}"`)

    const matches = findTopHSMatches(query, limit)

    console.log(`[v0] Found ${matches.length} suggestions`)

    return Response.json({
      query,
      suggestions: matches.map((m) => ({
        hs_code: m.hs_code,
        description: m.description,
        confidence: m.score,
        section: m.section,
      })),
    })
  } catch (error) {
    console.error("[v0] Error in HS suggest endpoint:", error)

    return Response.json(
      {
        error: error instanceof Error ? error.message : String(error),
        suggestions: [],
      },
      { status: 500 },
    )
  }
}
