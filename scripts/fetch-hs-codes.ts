/**
 * Build-time script to fetch HS codes from GitHub and cache locally
 * Run this script during build to avoid GitHub rate limits
 *
 * Usage: npx tsx scripts/fetch-hs-codes.ts
 */

const HS_CODES_URL =
  "https://raw.githubusercontent.com/julian-cortina/harmonized-system/main/data/harmonized-system.csv"
const OUTPUT_PATH = "./lib/hs-codes.json"

interface HSCode {
  section: string
  code: string
  description: string
  parent: string
  level: number
}

async function fetchAndConvertHSCodes() {
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
    const headers = lines[0].split(",")

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

    // Save to JSON
    const fs = await import("fs")
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(hsCodes, null, 2))
    console.log(`[v0] HS codes saved to ${OUTPUT_PATH}`)

    return hsCodes
  } catch (error) {
    console.error("[v0] Error fetching HS codes:", error)
    throw error
  }
}

// Run if executed directly
if (require.main === module) {
  fetchAndConvertHSCodes()
    .then(() => console.log("[v0] HS codes fetch complete"))
    .catch((err) => {
      console.error("[v0] Failed to fetch HS codes:", err)
      process.exit(1)
    })
}

export { fetchAndConvertHSCodes }
