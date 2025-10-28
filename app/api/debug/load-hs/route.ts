import { getAllHSCodes } from "@/data/hs-data"

/**
 * DEBUG ENDPOINT: Test HS code loading
 * Returns first 10 rows of the HS data to confirm the system works
 */
export async function GET() {
  console.log("[v0] Debug endpoint called: /api/debug/load-hs")

  try {
    const hsCodes = getAllHSCodes()

    console.log(`[v0] Successfully loaded ${hsCodes.length} HS codes`)

    // Return first 10 rows as sample
    const sample = hsCodes.slice(0, 10)

    return Response.json({
      success: true,
      total_codes: hsCodes.length,
      sample_size: sample.length,
      sample_data: sample,
      message: "HS codes loaded successfully from static data",
    })
  } catch (error) {
    console.error("[v0] Error in debug endpoint:", error)

    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}
