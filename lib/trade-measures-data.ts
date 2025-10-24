// In-memory trade measures data for MVP
// This replaces SQLite database for better compatibility

export interface TradeMeasure {
  id: number
  product_name: string
  hs_code: string
  country_origin: string
  country_destination: string
  tariff_rate: string
  non_tariff_measures: string
  required_documents: string
  notes: string
  confidence_level: string
}

export const tradeMeasuresData: TradeMeasure[] = [
  {
    id: 1,
    product_name: "Vino tinto embotellado",
    hs_code: "2204.21",
    country_origin: "Argentina",
    country_destination: "Estados Unidos",
    tariff_rate: "6.3 cents/liter",
    non_tariff_measures: "Certificado de origen, Etiquetado nutricional FDA, Límites de sulfitos",
    required_documents: "Factura comercial, Certificado de origen, Certificado sanitario, Etiqueta aprobada por TTB",
    notes: "Requiere aprobación previa de etiquetas por TTB (Alcohol and Tobacco Tax)",
    confidence_level: "high",
  },
  {
    id: 2,
    product_name: "Aceite de oliva extra virgen",
    hs_code: "1509.10",
    country_origin: "España",
    country_destination: "Brasil",
    tariff_rate: "10%",
    non_tariff_measures: "Certificado fitosanitario, Análisis de calidad, Registro en ANVISA",
    required_documents: "Factura comercial, Certificado de origen, Certificado de análisis, Certificado fitosanitario",
    notes: "Debe cumplir con normas de calidad de ANVISA",
    confidence_level: "high",
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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

// Helper function to get trade measures by HS code and destination
export function getTradeMeasures(hsCode: string, destination: string): TradeMeasure | null {
  console.log("[v0] Searching for measures:", { hsCode, destination })

  const measure = tradeMeasuresData.find((m) => m.hs_code === hsCode && m.country_destination === destination)

  console.log("[v0] Found measure:", measure ? "Yes" : "No")
  return measure || null
}

// Helper function to get all available destinations for a given HS code
export function getAvailableDestinations(hsCode: string): string[] {
  const destinations = tradeMeasuresData.filter((m) => m.hs_code === hsCode).map((m) => m.country_destination)

  return [...new Set(destinations)]
}
