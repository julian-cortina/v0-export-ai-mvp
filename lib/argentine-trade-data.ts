/**
 * ARGENTINE TRADE MEASURES DATABASE
 *
 * This file contains trade measures, tariffs, and requirements for Argentine exports.
 * Data is organized by destination country and includes relevant trade agreements.
 *
 * HOW TO ADD NEW TRADE MEASURES:
 * 1. Identify the HS code and destination country
 * 2. Research the applicable tariff rate (check trade agreements)
 * 3. List all non-tariff measures (certificates, inspections, etc.)
 * 4. Document required documents
 * 5. Add notes about trade agreements or special conditions
 *
 * TRADE AGREEMENT RESOURCES:
 * - MERCOSUR: https://www.mercosur.int/
 * - Argentine Foreign Ministry: https://www.cancilleria.gob.ar/
 * - WTO: https://www.wto.org/
 * - ITC Market Access Map: https://www.macmap.org/
 *
 * KEY ARGENTINE TRADE AGREEMENTS:
 * - MERCOSUR (Brasil, Paraguay, Uruguay, Venezuela)
 * - ACE 35 (Chile)
 * - ACE 55 (México)
 * - EU-MERCOSUR (pending ratification)
 * - Cuota Hilton (EU beef quota)
 */

export interface TradeMeasure {
  id: number
  productName: string
  hsCode: string
  countryOrigin: string
  countryDestination: string
  tariffRate: string
  nonTariffMeasures: string
  requiredDocuments: string
  notes: string
  tradeAgreement?: string
  confidenceLevel: string
}

export const argentineTradeMeasures: TradeMeasure[] = [
  // BRAZIL - MERCOSUR partner (0% tariff on most products)
  {
    id: 1,
    productName: "Soja (habas/porotos)",
    hsCode: "1201.90",
    countryOrigin: "Argentina",
    countryDestination: "Brasil",
    tariffRate: "0%",
    nonTariffMeasures: "Certificado fitosanitario, Declaración de origen MERCOSUR",
    requiredDocuments: "Factura comercial, Certificado de origen MERCOSUR, Certificado fitosanitario",
    notes: "Libre comercio bajo MERCOSUR. Brasil es el principal destino de exportaciones argentinas.",
    tradeAgreement: "MERCOSUR",
    confidenceLevel: "high",
  },
  {
    id: 2,
    productName: "Carne bovina congelada deshuesada",
    hsCode: "0202.30",
    countryOrigin: "Argentina",
    countryDestination: "Brasil",
    tariffRate: "0%",
    nonTariffMeasures: "Certificado sanitario SENASA, Inspección veterinaria, Trazabilidad",
    requiredDocuments: "Factura comercial, Certificado sanitario, Certificado de origen MERCOSUR, GTA",
    notes: "Requiere habilitación de frigorífico por MAPA Brasil. Libre comercio MERCOSUR.",
    tradeAgreement: "MERCOSUR",
    confidenceLevel: "high",
  },
  {
    id: 3,
    productName: "Vino tinto embotellado",
    hsCode: "2204.21",
    countryOrigin: "Argentina",
    countryDestination: "Brasil",
    tariffRate: "0%",
    nonTariffMeasures: "Certificado de origen, Análisis enológico, Registro en MAPA",
    requiredDocuments: "Factura comercial, Certificado de origen MERCOSUR, Análisis de laboratorio",
    notes: "Debe cumplir con Ley 7678 de Brasil. Etiquetado en portugués requerido.",
    tradeAgreement: "MERCOSUR",
    confidenceLevel: "high",
  },
  {
    id: 4,
    productName: "Partes y accesorios de vehículos",
    hsCode: "8708.99",
    countryOrigin: "Argentina",
    countryDestination: "Brasil",
    tariffRate: "0%",
    nonTariffMeasures: "Certificado de origen MERCOSUR, Declaración de conformidad",
    requiredDocuments: "Factura comercial, Certificado de origen MERCOSUR, Lista de empaque",
    notes: "Acuerdo automotriz MERCOSUR. Importante intercambio bilateral en sector automotriz.",
    tradeAgreement: "MERCOSUR - Acuerdo Automotriz",
    confidenceLevel: "high",
  },

  // CHINA - Major destination for agricultural products
  {
    id: 5,
    productName: "Soja (habas/porotos)",
    hsCode: "1201.90",
    countryOrigin: "Argentina",
    countryDestination: "China",
    tariffRate: "3%",
    nonTariffMeasures: "Certificado fitosanitario, Inspección de cuarentena GACC, Certificado de no-OGM si aplica",
    requiredDocuments:
      "Factura comercial, Certificado fitosanitario SENASA, Certificado de origen, Permiso de importación",
    notes: "China es el principal comprador de soja argentina. Requiere registro de exportador en GACC.",
    confidenceLevel: "high",
  },
  {
    id: 6,
    productName: "Carne bovina congelada deshuesada",
    hsCode: "0202.30",
    countryOrigin: "Argentina",
    countryDestination: "China",
    tariffRate: "12%",
    nonTariffMeasures: "Certificado sanitario SENASA, Inspección GACC, Trazabilidad completa, Certificado halal",
    requiredDocuments:
      "Factura comercial, Certificado sanitario oficial, Certificado de origen, Permiso de importación automática",
    notes: "Frigorífico debe estar habilitado por GACC. Protocolo sanitario Argentina-China vigente desde 2019.",
    confidenceLevel: "high",
  },
  {
    id: 7,
    productName: "Langostinos congelados",
    hsCode: "0306.17",
    countryOrigin: "Argentina",
    countryDestination: "China",
    tariffRate: "7%",
    nonTariffMeasures: "Certificado sanitario, Inspección de cuarentena, Análisis de residuos",
    requiredDocuments: "Factura comercial, Certificado sanitario SENASA, Certificado de origen, Lista de empaque",
    notes: "Importante mercado para langostinos patagónicos. Requiere establecimiento registrado.",
    confidenceLevel: "high",
  },

  // UNITED STATES - Important market with specific requirements
  {
    id: 8,
    productName: "Vino tinto embotellado",
    hsCode: "2204.21",
    countryOrigin: "Argentina",
    countryDestination: "Estados Unidos",
    tariffRate: "6.3 cents/liter",
    nonTariffMeasures: "Certificado de origen, Etiquetado FDA, Límites de sulfitos, Aprobación TTB",
    requiredDocuments: "Factura comercial, Certificado de origen, Certificado de análisis, Etiqueta aprobada por TTB",
    notes: "Requiere aprobación previa de etiquetas por TTB (Alcohol and Tobacco Tax). Importador debe tener licencia.",
    confidenceLevel: "high",
  },
  {
    id: 9,
    productName: "Limones frescos",
    hsCode: "0805.50",
    countryOrigin: "Argentina",
    countryDestination: "Estados Unidos",
    tariffRate: "1.8 cents/kg",
    nonTariffMeasures: "Certificado fitosanitario SENASA, Inspección APHIS, Tratamiento de frío",
    requiredDocuments: "Factura comercial, Certificado fitosanitario, Certificado de tratamiento de frío",
    notes: "Argentina es principal proveedor de limones a USA. Requiere tratamiento de frío durante transporte.",
    confidenceLevel: "high",
  },
  {
    id: 10,
    productName: "Miel natural",
    hsCode: "0409.00",
    countryOrigin: "Argentina",
    countryDestination: "Estados Unidos",
    tariffRate: "1.9 cents/kg",
    nonTariffMeasures: "Certificado sanitario, Análisis de residuos de antibióticos, Registro FDA",
    requiredDocuments: "Factura comercial, Certificado sanitario SENASA, Análisis de laboratorio, Prior Notice FDA",
    notes: "Tolerancia cero para ciertos antibióticos. Argentina es importante proveedor de miel a USA.",
    confidenceLevel: "high",
  },

  // EUROPEAN UNION - High-value market with strict requirements
  {
    id: 11,
    productName: "Carne bovina congelada deshuesada",
    hsCode: "0202.30",
    countryOrigin: "Argentina",
    countryDestination: "Unión Europea",
    tariffRate: "0% (dentro de Cuota Hilton)",
    nonTariffMeasures: "Certificado sanitario SENASA, Trazabilidad completa, Cumplimiento Reg. 853/2004",
    requiredDocuments: "Factura comercial, Certificado sanitario oficial, Certificado de origen, DUS",
    notes: "Cuota Hilton: 29,000 toneladas anuales con arancel 0%. Fuera de cuota: 12.8% + €303.4/100kg.",
    tradeAgreement: "Cuota Hilton",
    confidenceLevel: "high",
  },
  {
    id: 12,
    productName: "Vino tinto embotellado",
    hsCode: "2204.21",
    countryOrigin: "Argentina",
    countryDestination: "Unión Europea",
    tariffRate: "€11.2/hl",
    nonTariffMeasures: "Certificado de origen, Análisis enológico, Documento VI-1, Etiquetado Reg. 1169/2011",
    requiredDocuments: "Factura comercial, Certificado de origen, Documento VI-1, Análisis de laboratorio",
    notes: "Debe cumplir con regulaciones de etiquetado UE. Importante mercado para vinos argentinos.",
    confidenceLevel: "high",
  },
  {
    id: 13,
    productName: "Miel natural",
    hsCode: "0409.00",
    countryOrigin: "Argentina",
    countryDestination: "Unión Europea",
    tariffRate: "17.3%",
    nonTariffMeasures: "Certificado sanitario, Análisis de residuos, Trazabilidad completa, Reg. 2019/627",
    requiredDocuments:
      "Factura comercial, Certificado sanitario SENASA, Certificado de origen, Análisis de laboratorio",
    notes: "Requiere cumplir con regulaciones EU 2019/627 sobre controles oficiales. Límites estrictos de residuos.",
    confidenceLevel: "high",
  },
  {
    id: 14,
    productName: "Limones frescos",
    hsCode: "0805.50",
    countryOrigin: "Argentina",
    countryDestination: "Unión Europea",
    tariffRate: "12.8% (junio-octubre) / 16% (resto del año)",
    nonTariffMeasures: "Certificado fitosanitario SENASA, Inspección fronteriza, Cumplimiento Reg. 2019/2072",
    requiredDocuments: "Factura comercial, Certificado fitosanitario, Certificado de origen",
    notes: "Arancel estacional. Argentina es importante proveedor de limones a UE en contra-estación.",
    confidenceLevel: "high",
  },

  // CHILE - ACE 35 agreement
  {
    id: 15,
    productName: "Soja (habas/porotos)",
    hsCode: "1201.90",
    countryOrigin: "Argentina",
    countryDestination: "Chile",
    tariffRate: "0%",
    nonTariffMeasures: "Certificado fitosanitario, Declaración de origen ACE 35",
    requiredDocuments: "Factura comercial, Certificado de origen ACE 35, Certificado fitosanitario SAG",
    notes: "Libre comercio bajo ACE 35 (Acuerdo de Complementación Económica Argentina-Chile).",
    tradeAgreement: "ACE 35",
    confidenceLevel: "high",
  },
  {
    id: 16,
    productName: "Vino tinto embotellado",
    hsCode: "2204.21",
    countryOrigin: "Argentina",
    countryDestination: "Chile",
    tariffRate: "0%",
    nonTariffMeasures: "Certificado de origen ACE 35, Análisis enológico, Etiquetado Ley 18.455",
    requiredDocuments: "Factura comercial, Certificado de origen ACE 35, Análisis de laboratorio",
    notes: "Competencia con producción local chilena. Libre comercio bajo ACE 35.",
    tradeAgreement: "ACE 35",
    confidenceLevel: "high",
  },

  // MEXICO - ACE 55 agreement
  {
    id: 17,
    productName: "Carne bovina congelada deshuesada",
    hsCode: "0202.30",
    countryOrigin: "Argentina",
    countryDestination: "México",
    tariffRate: "0% (dentro de cuota)",
    nonTariffMeasures: "Certificado zoosanitario SENASA, Inspección SENASICA, NOM-051-SCFI",
    requiredDocuments:
      "Factura comercial, Certificado zoosanitario, Certificado de origen ACE 55, Permiso de importación",
    notes: "Cuota preferencial bajo ACE 55. Requiere establecimiento certificado por SENASICA.",
    tradeAgreement: "ACE 55",
    confidenceLevel: "high",
  },
  {
    id: 18,
    productName: "Vino tinto embotellado",
    hsCode: "2204.21",
    countryOrigin: "Argentina",
    countryDestination: "México",
    tariffRate: "0%",
    nonTariffMeasures: "Certificado de origen ACE 55, Análisis enológico, NOM-142-SSA1, Etiquetado NOM-051",
    requiredDocuments: "Factura comercial, Certificado de origen ACE 55, Análisis de laboratorio, Etiqueta en español",
    notes: "Libre comercio bajo ACE 55. Etiquetado debe cumplir con NOM mexicanas.",
    tradeAgreement: "ACE 55",
    confidenceLevel: "high",
  },

  // PARAGUAY - MERCOSUR partner
  {
    id: 19,
    productName: "Partes y accesorios de vehículos",
    hsCode: "8708.99",
    countryOrigin: "Argentina",
    countryDestination: "Paraguay",
    tariffRate: "0%",
    nonTariffMeasures: "Certificado de origen MERCOSUR",
    requiredDocuments: "Factura comercial, Certificado de origen MERCOSUR, Lista de empaque",
    notes: "Libre comercio bajo MERCOSUR. Importante intercambio comercial bilateral.",
    tradeAgreement: "MERCOSUR",
    confidenceLevel: "high",
  },

  // URUGUAY - MERCOSUR partner
  {
    id: 20,
    productName: "Trigo blando",
    hsCode: "1001.99",
    countryOrigin: "Argentina",
    countryDestination: "Uruguay",
    tariffRate: "0%",
    nonTariffMeasures: "Certificado fitosanitario, Declaración de origen MERCOSUR",
    requiredDocuments: "Factura comercial, Certificado de origen MERCOSUR, Certificado fitosanitario",
    notes: "Libre comercio bajo MERCOSUR. Argentina es proveedor importante de trigo a Uruguay.",
    tradeAgreement: "MERCOSUR",
    confidenceLevel: "high",
  },

  // VIETNAM - Growing market for Argentine products
  {
    id: 21,
    productName: "Carne bovina congelada deshuesada",
    hsCode: "0202.30",
    countryOrigin: "Argentina",
    countryDestination: "Vietnam",
    tariffRate: "15%",
    nonTariffMeasures: "Certificado sanitario SENASA, Certificado halal, Inspección de cuarentena",
    requiredDocuments:
      "Factura comercial, Certificado sanitario oficial, Certificado de origen, Permiso de importación",
    notes: "Mercado en crecimiento para carne argentina. Requiere establecimiento registrado.",
    confidenceLevel: "high",
  },

  // RUSSIA - Important market for fruits and meat
  {
    id: 22,
    productName: "Peras frescas",
    hsCode: "0808.30",
    countryOrigin: "Argentina",
    countryDestination: "Rusia",
    tariffRate: "10%",
    nonTariffMeasures: "Certificado fitosanitario SENASA, Inspección Rosselkhoznadzor, Certificado de conformidad",
    requiredDocuments:
      "Factura comercial, Certificado fitosanitario, Certificado de origen, Declaración de conformidad",
    notes: "Argentina es importante proveedor de peras a Rusia en contra-estación.",
    confidenceLevel: "high",
  },

  // JAPAN - High-value market
  {
    id: 23,
    productName: "Vino tinto embotellado",
    hsCode: "2204.21",
    countryOrigin: "Argentina",
    countryDestination: "Japón",
    tariffRate: "15% o ¥125/liter (el menor)",
    nonTariffMeasures: "Certificado de origen, Análisis enológico, Etiquetado en japonés, Registro de importador",
    requiredDocuments: "Factura comercial, Certificado de origen, Análisis de laboratorio, Etiqueta en japonés",
    notes: "Mercado premium para vinos argentinos. Etiquetado debe incluir información en japonés.",
    confidenceLevel: "high",
  },

  // SOUTH KOREA - Growing market
  {
    id: 24,
    productName: "Carne bovina congelada deshuesada",
    hsCode: "0202.30",
    countryOrigin: "Argentina",
    countryDestination: "Corea del Sur",
    tariffRate: "40%",
    nonTariffMeasures: "Certificado sanitario SENASA, Inspección de cuarentena, Certificado halal opcional",
    requiredDocuments:
      "Factura comercial, Certificado sanitario oficial, Certificado de origen, Permiso de importación",
    notes: "Arancel alto pero mercado premium. Requiere establecimiento registrado en MAFRA.",
    confidenceLevel: "high",
  },

  // INDIA - Emerging market
  {
    id: 25,
    productName: "Aceite de girasol en bruto",
    hsCode: "1512.11",
    countryOrigin: "Argentina",
    countryDestination: "India",
    tariffRate: "35%",
    nonTariffMeasures: "Certificado de origen, Análisis de calidad, Registro FSSAI",
    requiredDocuments: "Factura comercial, Certificado de origen, Certificado de análisis, Permiso de importación",
    notes: "India es gran importador de aceites vegetales. Arancel variable según políticas.",
    confidenceLevel: "medium",
  },

  // CANADA - CETA benefits for some products
  {
    id: 26,
    productName: "Vino tinto embotellado",
    hsCode: "2204.21",
    countryOrigin: "Argentina",
    countryDestination: "Canadá",
    tariffRate: "CAD 0.0616/liter",
    nonTariffMeasures: "Certificado de origen, Análisis enológico, Etiquetado bilingüe (inglés/francés)",
    requiredDocuments: "Factura comercial, Certificado de origen, Análisis de laboratorio, Etiqueta bilingüe",
    notes: "Etiquetado debe ser bilingüe. Distribución provincial regulada.",
    confidenceLevel: "high",
  },

  // PERU - Important regional partner
  {
    id: 27,
    productName: "Trigo blando",
    hsCode: "1001.99",
    countryOrigin: "Argentina",
    countryDestination: "Perú",
    tariffRate: "0%",
    nonTariffMeasures: "Certificado fitosanitario, Declaración de origen ACE 58",
    requiredDocuments: "Factura comercial, Certificado de origen ACE 58, Certificado fitosanitario SENASA Perú",
    notes: "Libre comercio bajo ACE 58 (MERCOSUR-Perú). Argentina es proveedor importante de trigo.",
    tradeAgreement: "ACE 58",
    confidenceLevel: "high",
  },

  // COLOMBIA - ACE 59 agreement
  {
    id: 28,
    productName: "Maíz",
    hsCode: "1005.90",
    countryOrigin: "Argentina",
    countryDestination: "Colombia",
    tariffRate: "0%",
    nonTariffMeasures: "Certificado fitosanitario, Declaración de origen ACE 59, Registro ICA",
    requiredDocuments: "Factura comercial, Certificado de origen ACE 59, Certificado fitosanitario ICA",
    notes: "Libre comercio bajo ACE 59 (MERCOSUR-Colombia). Importante mercado para maíz argentino.",
    tradeAgreement: "ACE 59",
    confidenceLevel: "high",
  },

  // EGYPT - Growing market for grains
  {
    id: 29,
    productName: "Maíz",
    hsCode: "1005.90",
    countryOrigin: "Argentina",
    countryDestination: "Egipto",
    tariffRate: "0%",
    nonTariffMeasures: "Certificado fitosanitario, Certificado de origen, Inspección de cuarentena",
    requiredDocuments: "Factura comercial, Certificado fitosanitario SENASA, Certificado de origen",
    notes: "Egipto es importante comprador de maíz argentino. Libre de arancel.",
    confidenceLevel: "high",
  },

  // ALGERIA - Important market for grains
  {
    id: 30,
    productName: "Trigo blando",
    hsCode: "1001.99",
    countryOrigin: "Argentina",
    countryDestination: "Argelia",
    tariffRate: "5%",
    nonTariffMeasures: "Certificado fitosanitario, Certificado de origen, Análisis de calidad",
    requiredDocuments:
      "Factura comercial, Certificado fitosanitario SENASA, Certificado de origen, Certificado de calidad",
    notes: "Argelia es importante comprador de trigo argentino. Requiere especificaciones de calidad.",
    confidenceLevel: "high",
  },
]

/**
 * Get trade measures for a specific HS code and destination
 */
export function getTradeMeasures(hsCode: string, destination: string): TradeMeasure | null {
  return (
    argentineTradeMeasures.find(
      (measure) => measure.hsCode === hsCode && measure.countryDestination.toLowerCase() === destination.toLowerCase(),
    ) || null
  )
}

/**
 * Get all available destinations for Argentine exports
 */
export function getAvailableDestinations(): string[] {
  const destinations = new Set(argentineTradeMeasures.map((m) => m.countryDestination))
  return Array.from(destinations).sort()
}

/**
 * Get all products with measures for a specific destination
 */
export function getProductsByDestination(destination: string): TradeMeasure[] {
  return argentineTradeMeasures.filter(
    (measure) => measure.countryDestination.toLowerCase() === destination.toLowerCase(),
  )
}
