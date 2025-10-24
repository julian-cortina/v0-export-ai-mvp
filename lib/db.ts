import { open, type Database } from "@libsql/client"
import { initializeDatabase } from "./db-init"

let dbInstance: Database | null = null
let isInitialized = false

async function getDb() {
  if (!dbInstance) {
    console.log("[v0] Opening database connection...")
    dbInstance = await open({
      url: "file:exportaidor.db",
    })

    if (!isInitialized) {
      await initializeDatabase(dbInstance)
      isInitialized = true
    }
  }
  return dbInstance
}

// Helper function to get trade measures by HS code and destination
export async function getTradeMeasures(hsCode: string, destination: string) {
  const db = await getDb()

  const query = `
    SELECT * FROM trade_measures 
    WHERE hs_code = ? AND country_destination = ?
    LIMIT 1
  `

  const result = await db.execute({
    sql: query,
    args: [hsCode, destination],
  })

  return result.rows[0] || null
}

// Helper function to log queries
export async function logQuery(
  productDescription: string,
  countryOrigin: string,
  countryDestination: string,
  hsCodeResult: string | null,
  confidence: number | null,
) {
  const db = await getDb()

  const query = `
    INSERT INTO query_log (product_description, country_origin, country_destination, hs_code_result, confidence)
    VALUES (?, ?, ?, ?, ?)
  `

  await db.execute({
    sql: query,
    args: [productDescription, countryOrigin, countryDestination, hsCodeResult, confidence],
  })
}

// Helper function to get all available destinations for a given HS code
export async function getAvailableDestinations(hsCode: string) {
  const db = await getDb()

  const query = `
    SELECT DISTINCT country_destination FROM trade_measures 
    WHERE hs_code = ?
  `

  const result = await db.execute({
    sql: query,
    args: [hsCode],
  })

  return result.rows.map((row) => row.country_destination)
}
