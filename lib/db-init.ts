import type { Database } from "@libsql/client"

export async function initializeDatabase(db: Database) {
  console.log("[v0] Initializing database...")

  // Create tables
  await db.execute(`
    CREATE TABLE IF NOT EXISTS trade_measures (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_name TEXT NOT NULL,
      hs_code TEXT NOT NULL,
      country_origin TEXT NOT NULL,
      country_destination TEXT NOT NULL,
      tariff_rate TEXT NOT NULL,
      non_tariff_measures TEXT,
      required_documents TEXT,
      notes TEXT,
      confidence_level TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  await db.execute(`
    CREATE TABLE IF NOT EXISTS query_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_description TEXT NOT NULL,
      country_origin TEXT NOT NULL,
      country_destination TEXT NOT NULL,
      hs_code_result TEXT,
      confidence REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Create indexes
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_hs_code ON trade_measures(hs_code)`)
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_destination ON trade_measures(country_destination)`)
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_hs_destination ON trade_measures(hs_code, country_destination)`)

  // Check if data already exists
  const result = await db.execute("SELECT COUNT(*) as count FROM trade_measures")
  const count = result.rows[0]?.count as number

  if (count === 0) {
    console.log("[v0] Seeding database with initial data...")

    // Seed data
    const seedData = [
      {
        product_name: "Vino tinto embotellado",
        hs_code: "2204.21",
        country_origin: "Argentina",
        country_destination: "Estados Unidos",
        tariff_rate: "6.3 cents/liter",
        non_tariff_measures: "Certificado de origen, Etiquetado nutricional FDA, Límites de sulfitos",
        required_documents:
          "Factura comercial, Certificado de origen, Certificado sanitario, Etiqueta aprobada por TTB",
        notes: "Requiere aprobación previa de etiquetas por TTB (Alcohol and Tobacco Tax)",
        confidence_level: "high",
      },
      {
        product_name: "Aceite de oliva extra virgen",
        hs_code: "1509.10",
        country_origin: "España",
        country_destination: "Brasil",
        tariff_rate: "10%",
        non_tariff_measures: "Certificado fitosanitario, Análisis de calidad, Registro en ANVISA",
        required_documents:
          "Factura comercial, Certificado de origen, Certificado de análisis, Certificado fitosanitario",
        notes: "Debe cumplir con normas de calidad de ANVISA",
        confidence_level: "high",
      },
      {
        product_name: "Miel natural",
        hs_code: "0409.00",
        country_origin: "Uruguay",
        country_destination: "Unión Europea",
        tariff_rate: "17.3%",
        non_tariff_measures: "Certificado sanitario, Análisis de residuos, Trazabilidad completa",
        required_documents: "Factura comercial, Certificado sanitario, Certificado de origen, Análisis de laboratorio",
        notes: "Requiere cumplir con regulaciones EU 2019/627 sobre controles oficiales",
        confidence_level: "high",
      },
      {
        product_name: "Carne bovina congelada",
        hs_code: "0202.30",
        country_origin: "Brasil",
        country_destination: "China",
        tariff_rate: "12%",
        non_tariff_measures: "Certificado sanitario, Certificado halal, Inspección de cuarentena",
        required_documents:
          "Factura comercial, Certificado sanitario oficial, Certificado de origen, Permiso de importación",
        notes: "Debe provenir de establecimientos registrados en GACC",
        confidence_level: "high",
      },
      {
        product_name: "Café verde en grano",
        hs_code: "0901.11",
        country_origin: "Colombia",
        country_destination: "Alemania",
        tariff_rate: "0%",
        non_tariff_measures: "Certificado de origen, Análisis de calidad ICO",
        required_documents: "Factura comercial, Certificado de origen, Certificado de calidad",
        notes: "Libre de aranceles bajo acuerdo comercial UE-Colombia",
        confidence_level: "high",
      },
      {
        product_name: "Textiles de algodón",
        hs_code: "5208.31",
        country_origin: "India",
        country_destination: "México",
        tariff_rate: "15%",
        non_tariff_measures: "Certificado de origen, Cumplimiento NOM-004-SE",
        required_documents: "Factura comercial, Certificado de origen, Lista de empaque",
        notes: "Puede aplicar preferencia arancelaria bajo acuerdo comercial",
        confidence_level: "medium",
      },
      {
        product_name: "Maquinaria agrícola",
        hs_code: "8432.80",
        country_origin: "Estados Unidos",
        country_destination: "Argentina",
        tariff_rate: "0%",
        non_tariff_measures: "Certificado de origen, Declaración de conformidad técnica",
        required_documents: "Factura comercial, Certificado de origen, Manual técnico en español",
        notes: "Exento de arancel bajo preferencia MERCOSUR",
        confidence_level: "high",
      },
      {
        product_name: "Productos farmacéuticos",
        hs_code: "3004.90",
        country_origin: "Suiza",
        country_destination: "Chile",
        tariff_rate: "0%",
        non_tariff_measures: "Registro ISP, Certificado GMP, Certificado de libre venta",
        required_documents: "Factura comercial, Certificado de origen, Certificado GMP, Autorización ISP",
        notes: "Requiere registro previo ante Instituto de Salud Pública",
        confidence_level: "high",
      },
      {
        product_name: "Juguetes de plástico",
        hs_code: "9503.00",
        country_origin: "China",
        country_destination: "Colombia",
        tariff_rate: "10%",
        non_tariff_measures: "Certificado de conformidad, Pruebas de seguridad INVIMA",
        required_documents: "Factura comercial, Lista de empaque, Certificado de conformidad",
        notes: "Debe cumplir normas de seguridad NTC 4894",
        confidence_level: "medium",
      },
      {
        product_name: "Equipos electrónicos",
        hs_code: "8517.62",
        country_origin: "Corea del Sur",
        country_destination: "Perú",
        tariff_rate: "0%",
        non_tariff_measures: "Certificado de homologación MTC, Declaración de conformidad CE",
        required_documents: "Factura comercial, Certificado de origen, Certificado de homologación",
        notes: "Libre de arancel bajo TLC Perú-Corea",
        confidence_level: "high",
      },
    ]

    for (const data of seedData) {
      await db.execute({
        sql: `INSERT INTO trade_measures (product_name, hs_code, country_origin, country_destination, tariff_rate, non_tariff_measures, required_documents, notes, confidence_level) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          data.product_name,
          data.hs_code,
          data.country_origin,
          data.country_destination,
          data.tariff_rate,
          data.non_tariff_measures,
          data.required_documents,
          data.notes,
          data.confidence_level,
        ],
      })
    }

    console.log("[v0] Database seeded successfully with 10 records")
  } else {
    console.log(`[v0] Database already contains ${count} records`)
  }
}
