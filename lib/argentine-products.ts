/**
 * ARGENTINE EXPORT PRODUCTS DATABASE
 *
 * This file contains the comprehensive list of Argentine export products with their HS codes.
 * Products are organized by category for easy maintenance and scalability.
 *
 * HOW TO ADD A NEW PRODUCT:
 * 1. Identify the correct category or create a new one
 * 2. Add the product with its HS code (6-digit minimum)
 * 3. Include relevant keywords in Spanish and English
 * 4. Set an appropriate confidence level (0.85-0.95 for specific products)
 * 5. Add corresponding trade measures in argentine-trade-data.ts
 *
 * HS CODE RESOURCES:
 * - Argentina Customs: https://www.afip.gob.ar/
 * - WCO Harmonized System: https://www.wcoomd.org/
 * - Trade Map: https://www.trademap.org/
 */

export interface ProductRule {
  keywords: string[]
  hsCode: string
  category: string
  confidence: number
  notes?: string
}

// AGRICULTURAL PRODUCTS - Argentina's main export sector
export const agriculturalProducts: ProductRule[] = [
  {
    keywords: ["soja", "soya", "soybean", "poroto"],
    hsCode: "1201.90",
    category: "Soja (habas/porotos)",
    confidence: 0.95,
    notes: "Principal producto de exportación argentino",
  },
  {
    keywords: ["harina de soja", "soybean meal", "expeller"],
    hsCode: "2304.00",
    category: "Harina y pellets de soja",
    confidence: 0.94,
  },
  {
    keywords: ["aceite de soja", "soybean oil"],
    hsCode: "1507.10",
    category: "Aceite de soja en bruto",
    confidence: 0.93,
  },
  {
    keywords: ["maíz", "corn", "choclo"],
    hsCode: "1005.90",
    category: "Maíz",
    confidence: 0.94,
  },
  {
    keywords: ["trigo", "wheat"],
    hsCode: "1001.99",
    category: "Trigo blando",
    confidence: 0.93,
  },
  {
    keywords: ["girasol", "sunflower"],
    hsCode: "1206.00",
    category: "Semillas de girasol",
    confidence: 0.92,
  },
  {
    keywords: ["aceite de girasol", "sunflower oil"],
    hsCode: "1512.11",
    category: "Aceite de girasol en bruto",
    confidence: 0.93,
  },
  {
    keywords: ["cebada", "barley"],
    hsCode: "1003.90",
    category: "Cebada",
    confidence: 0.91,
  },
  {
    keywords: ["sorgo", "sorghum"],
    hsCode: "1007.90",
    category: "Sorgo en grano",
    confidence: 0.9,
  },
]

// MEAT AND LIVESTOCK - High-quality Argentine beef
export const meatProducts: ProductRule[] = [
  {
    keywords: ["carne vacuna", "carne bovina", "beef", "res"],
    hsCode: "0202.30",
    category: "Carne bovina congelada deshuesada",
    confidence: 0.93,
    notes: "Cuota Hilton para UE",
  },
  {
    keywords: ["carne fresca", "fresh beef", "refrigerada"],
    hsCode: "0201.30",
    category: "Carne bovina fresca deshuesada",
    confidence: 0.92,
  },
  {
    keywords: ["pollo", "chicken", "ave"],
    hsCode: "0207.14",
    category: "Carne de pollo congelada",
    confidence: 0.91,
  },
  {
    keywords: ["cerdo", "pork", "porcino"],
    hsCode: "0203.29",
    category: "Carne de cerdo congelada",
    confidence: 0.9,
  },
  {
    keywords: ["cuero", "leather", "piel"],
    hsCode: "4104.11",
    category: "Cueros y pieles bovinos",
    confidence: 0.89,
  },
]

// FRUITS - Fresh and processed
export const fruitProducts: ProductRule[] = [
  {
    keywords: ["limón", "lemon"],
    hsCode: "0805.50",
    category: "Limones frescos",
    confidence: 0.94,
    notes: "Argentina es líder mundial en limones",
  },
  {
    keywords: ["pera", "pear"],
    hsCode: "0808.30",
    category: "Peras frescas",
    confidence: 0.93,
  },
  {
    keywords: ["manzana", "apple"],
    hsCode: "0808.10",
    category: "Manzanas frescas",
    confidence: 0.93,
  },
  {
    keywords: ["uva", "grape"],
    hsCode: "0806.10",
    category: "Uvas frescas",
    confidence: 0.92,
  },
  {
    keywords: ["arándano", "blueberry"],
    hsCode: "0810.40",
    category: "Arándanos frescos",
    confidence: 0.93,
  },
  {
    keywords: ["cereza", "cherry"],
    hsCode: "0809.29",
    category: "Cerezas frescas",
    confidence: 0.91,
  },
]

// WINE AND BEVERAGES - Premium Argentine wines
export const beverageProducts: ProductRule[] = [
  {
    keywords: ["vino tinto", "red wine", "malbec"],
    hsCode: "2204.21",
    category: "Vino tinto embotellado",
    confidence: 0.94,
    notes: "Malbec es la variedad insignia argentina",
  },
  {
    keywords: ["vino blanco", "white wine"],
    hsCode: "2204.21",
    category: "Vino blanco embotellado",
    confidence: 0.93,
  },
  {
    keywords: ["vino espumoso", "sparkling wine", "champagne"],
    hsCode: "2204.10",
    category: "Vino espumoso",
    confidence: 0.92,
  },
  {
    keywords: ["mosto", "grape must"],
    hsCode: "2204.30",
    category: "Mosto de uva",
    confidence: 0.9,
  },
]

// HONEY AND BEE PRODUCTS
export const honeyProducts: ProductRule[] = [
  {
    keywords: ["miel", "honey", "natural"],
    hsCode: "0409.00",
    category: "Miel natural",
    confidence: 0.95,
    notes: "Argentina es uno de los principales exportadores mundiales",
  },
  {
    keywords: ["polen", "pollen"],
    hsCode: "0410.00",
    category: "Polen y otros productos apícolas",
    confidence: 0.9,
  },
]

// BIOFUELS - Renewable energy
export const biofuelProducts: ProductRule[] = [
  {
    keywords: ["biodiesel", "biocombustible"],
    hsCode: "3826.00",
    category: "Biodiesel y mezclas",
    confidence: 0.94,
    notes: "Importante exportación de valor agregado",
  },
  {
    keywords: ["bioetanol", "ethanol"],
    hsCode: "2207.10",
    category: "Alcohol etílico sin desnaturalizar",
    confidence: 0.92,
  },
]

// AUTOMOTIVE - Auto parts and vehicles
export const automotiveProducts: ProductRule[] = [
  {
    keywords: ["autoparte", "auto part", "repuesto"],
    hsCode: "8708.99",
    category: "Partes y accesorios de vehículos",
    confidence: 0.88,
  },
  {
    keywords: ["vehículo", "automóvil", "auto", "car"],
    hsCode: "8703.23",
    category: "Automóviles de turismo",
    confidence: 0.87,
  },
  {
    keywords: ["neumático", "tire", "llanta"],
    hsCode: "4011.10",
    category: "Neumáticos nuevos de caucho",
    confidence: 0.9,
  },
]

// MINERALS AND METALS - Lithium and aluminum
export const mineralProducts: ProductRule[] = [
  {
    keywords: ["litio", "lithium"],
    hsCode: "2805.19",
    category: "Litio y sus compuestos",
    confidence: 0.94,
    notes: "Argentina tiene grandes reservas de litio",
  },
  {
    keywords: ["aluminio", "aluminum"],
    hsCode: "7601.20",
    category: "Aluminio sin alear",
    confidence: 0.91,
  },
  {
    keywords: ["oro", "gold"],
    hsCode: "7108.13",
    category: "Oro en bruto",
    confidence: 0.93,
  },
  {
    keywords: ["plata", "silver"],
    hsCode: "7106.91",
    category: "Plata en bruto",
    confidence: 0.92,
  },
]

// LEATHER GOODS - Value-added leather products
export const leatherProducts: ProductRule[] = [
  {
    keywords: ["calzado", "zapato", "shoe", "footwear"],
    hsCode: "6403.99",
    category: "Calzado de cuero",
    confidence: 0.89,
  },
  {
    keywords: ["cartera", "bolso", "bag", "handbag"],
    hsCode: "4202.21",
    category: "Bolsos de mano de cuero",
    confidence: 0.88,
  },
  {
    keywords: ["marroquinería", "leather goods"],
    hsCode: "4205.00",
    category: "Manufacturas de cuero",
    confidence: 0.87,
  },
]

// TEXTILES - Cotton and wool products
export const textileProducts: ProductRule[] = [
  {
    keywords: ["camiseta", "t-shirt", "remera"],
    hsCode: "6109.10",
    category: "Camisetas de algodón",
    confidence: 0.9,
  },
  {
    keywords: ["lana", "wool"],
    hsCode: "5105.31",
    category: "Lana cardada",
    confidence: 0.91,
  },
  {
    keywords: ["algodón", "cotton"],
    hsCode: "5201.00",
    category: "Algodón sin cardar ni peinar",
    confidence: 0.92,
  },
]

// PHARMACEUTICALS AND CHEMICALS
export const pharmaceuticalProducts: ProductRule[] = [
  {
    keywords: ["medicamento", "pharmaceutical", "farmacéutico"],
    hsCode: "3004.90",
    category: "Medicamentos",
    confidence: 0.9,
  },
  {
    keywords: ["vacuna", "vaccine"],
    hsCode: "3002.20",
    category: "Vacunas",
    confidence: 0.93,
  },
]

// YERBA MATE - Traditional Argentine product
export const yerbaProducts: ProductRule[] = [
  {
    keywords: ["yerba mate", "mate", "yerba"],
    hsCode: "0903.00",
    category: "Yerba mate",
    confidence: 0.95,
    notes: "Producto tradicional argentino",
  },
]

// OLIVE OIL
export const oliveProducts: ProductRule[] = [
  {
    keywords: ["aceite de oliva", "olive oil"],
    hsCode: "1509.10",
    category: "Aceite de oliva virgen",
    confidence: 0.93,
  },
  {
    keywords: ["aceituna", "olive"],
    hsCode: "0711.20",
    category: "Aceitunas conservadas",
    confidence: 0.91,
  },
]

// SEAFOOD - Argentine seafood
export const seafoodProducts: ProductRule[] = [
  {
    keywords: ["langostino", "shrimp", "prawn"],
    hsCode: "0306.17",
    category: "Langostinos congelados",
    confidence: 0.93,
  },
  {
    keywords: ["calamar", "squid"],
    hsCode: "0307.43",
    category: "Calamares congelados",
    confidence: 0.92,
  },
  {
    keywords: ["merluza", "hake"],
    hsCode: "0304.89",
    category: "Merluza congelada",
    confidence: 0.91,
  },
]

// Combine all product rules
export const allArgentineProducts: ProductRule[] = [
  ...agriculturalProducts,
  ...meatProducts,
  ...fruitProducts,
  ...beverageProducts,
  ...honeyProducts,
  ...biofuelProducts,
  ...automotiveProducts,
  ...mineralProducts,
  ...leatherProducts,
  ...textileProducts,
  ...pharmaceuticalProducts,
  ...yerbaProducts,
  ...oliveProducts,
  ...seafoodProducts,
]

// Fallback for unclassified products
export const fallbackProduct: ProductRule = {
  keywords: ["producto", "mercancía", "artículo"],
  hsCode: "9999.99",
  category: "Producto no clasificado",
  confidence: 0.5,
  notes: "Requiere clasificación manual",
}
