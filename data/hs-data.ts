/**
 * HARMONIZED SYSTEM (HS) CODES DATABASE
 *
 * This file contains HS codes from the Harmonized System 2022.
 * Data is stored as a static TypeScript constant for fast access without external API calls.
 *
 * Structure:
 * - section: Roman numeral (I, II, III, etc.)
 * - code: HS code (2, 4, or 6 digits)
 * - description: Product description
 * - chapter: 2-digit chapter code
 * - level: Hierarchy level (2=chapter, 4=heading, 6=subheading)
 *
 * HOW TO UPDATE THIS FILE:
 * 1. Export the latest HS codes from https://www.wcoomd.org/
 * 2. Convert CSV to TypeScript array format
 * 3. Replace the hsData array below
 * 4. Verify with: npm run test (if tests are configured)
 *
 * For large datasets, consider splitting into multiple files:
 * - hs-data-part1.ts (Sections I-V)
 * - hs-data-part2.ts (Sections VI-X)
 * etc.
 */

import type { HSItem } from "@/types/hs"

export const hsData: HSItem[] = [
  // SECTION I - LIVE ANIMALS; ANIMAL PRODUCTS
  { section: "I", code: "01", description: "Live animals", chapter: "01" },
  { section: "I", code: "0101", description: "Live horses, asses, mules and hinnies", chapter: "01" },
  { section: "I", code: "010121", description: "Horses - Pure-bred breeding animals", chapter: "01" },
  { section: "I", code: "010129", description: "Horses - Other than pure-bred breeding", chapter: "01" },

  { section: "I", code: "02", description: "Meat and edible meat offal", chapter: "02" },
  { section: "I", code: "0201", description: "Meat of bovine animals, fresh or chilled", chapter: "02" },
  { section: "I", code: "020130", description: "Bovine meat - Boneless, fresh or chilled", chapter: "02" },
  { section: "I", code: "0202", description: "Meat of bovine animals, frozen", chapter: "02" },
  { section: "I", code: "020230", description: "Bovine meat - Boneless, frozen", chapter: "02" },
  { section: "I", code: "0203", description: "Meat of swine, fresh, chilled or frozen", chapter: "02" },
  { section: "I", code: "020329", description: "Swine meat - Frozen, other cuts", chapter: "02" },
  { section: "I", code: "0207", description: "Meat and edible offal of poultry", chapter: "02" },
  { section: "I", code: "020714", description: "Poultry - Frozen cuts and offal of fowls", chapter: "02" },

  { section: "I", code: "03", description: "Fish and crustaceans, molluscs", chapter: "03" },
  { section: "I", code: "0304", description: "Fish fillets and other fish meat", chapter: "03" },
  { section: "I", code: "030489", description: "Fish fillets - Frozen, other", chapter: "03" },
  { section: "I", code: "0306", description: "Crustaceans", chapter: "03" },
  { section: "I", code: "030617", description: "Crustaceans - Other shrimps and prawns, frozen", chapter: "03" },
  { section: "I", code: "0307", description: "Molluscs", chapter: "03" },
  { section: "I", code: "030743", description: "Molluscs - Cuttlefish and squid, frozen", chapter: "03" },

  { section: "I", code: "04", description: "Dairy produce; birds' eggs; natural honey", chapter: "04" },
  { section: "I", code: "0409", description: "Natural honey", chapter: "04" },
  { section: "I", code: "040900", description: "Natural honey", chapter: "04" },
  {
    section: "I",
    code: "0410",
    description: "Edible products of animal origin, not elsewhere specified",
    chapter: "04",
  },
  { section: "I", code: "041000", description: "Edible products of animal origin, n.e.s.", chapter: "04" },

  // SECTION II - VEGETABLE PRODUCTS
  { section: "II", code: "07", description: "Edible vegetables and certain roots and tubers", chapter: "07" },
  { section: "II", code: "0711", description: "Vegetables provisionally preserved", chapter: "07" },
  { section: "II", code: "071120", description: "Olives, provisionally preserved", chapter: "07" },

  { section: "II", code: "08", description: "Edible fruit and nuts; peel of citrus fruit or melons", chapter: "08" },
  { section: "II", code: "0805", description: "Citrus fruit, fresh or dried", chapter: "08" },
  { section: "II", code: "080550", description: "Lemons and limes, fresh or dried", chapter: "08" },
  { section: "II", code: "0806", description: "Grapes, fresh or dried", chapter: "08" },
  { section: "II", code: "080610", description: "Grapes, fresh", chapter: "08" },
  { section: "II", code: "0808", description: "Apples, pears and quinces, fresh", chapter: "08" },
  { section: "II", code: "080810", description: "Apples, fresh", chapter: "08" },
  { section: "II", code: "080830", description: "Pears, fresh", chapter: "08" },
  { section: "II", code: "0809", description: "Apricots, cherries, peaches, plums and sloes, fresh", chapter: "08" },
  { section: "II", code: "080929", description: "Cherries, fresh, other", chapter: "08" },
  { section: "II", code: "0810", description: "Other fruit, fresh", chapter: "08" },
  {
    section: "II",
    code: "081040",
    description: "Cranberries, bilberries and other fruits of the genus Vaccinium, fresh",
    chapter: "08",
  },

  { section: "II", code: "09", description: "Coffee, tea, maté and spices", chapter: "09" },
  { section: "II", code: "0901", description: "Coffee", chapter: "09" },
  { section: "II", code: "090111", description: "Coffee, not roasted, not decaffeinated", chapter: "09" },
  { section: "II", code: "0903", description: "Maté", chapter: "09" },
  { section: "II", code: "090300", description: "Maté (yerba mate)", chapter: "09" },

  { section: "II", code: "10", description: "Cereals", chapter: "10" },
  { section: "II", code: "1001", description: "Wheat and meslin", chapter: "10" },
  { section: "II", code: "100199", description: "Wheat, other than durum wheat", chapter: "10" },
  { section: "II", code: "1003", description: "Barley", chapter: "10" },
  { section: "II", code: "100390", description: "Barley, other than seed", chapter: "10" },
  { section: "II", code: "1005", description: "Maize (corn)", chapter: "10" },
  { section: "II", code: "100590", description: "Maize, other than seed", chapter: "10" },
  { section: "II", code: "1007", description: "Grain sorghum", chapter: "10" },
  { section: "II", code: "100790", description: "Grain sorghum, other than seed", chapter: "10" },

  { section: "II", code: "12", description: "Oil seeds and oleaginous fruits", chapter: "12" },
  { section: "II", code: "1201", description: "Soya beans", chapter: "12" },
  { section: "II", code: "120190", description: "Soya beans, other than seed", chapter: "12" },
  { section: "II", code: "1206", description: "Sunflower seeds", chapter: "12" },
  { section: "II", code: "120600", description: "Sunflower seeds, whether or not broken", chapter: "12" },

  // SECTION III - ANIMAL OR VEGETABLE FATS AND OILS
  { section: "III", code: "15", description: "Animal or vegetable fats and oils", chapter: "15" },
  { section: "III", code: "1507", description: "Soya-bean oil and its fractions", chapter: "15" },
  { section: "III", code: "150710", description: "Soya-bean oil, crude", chapter: "15" },
  { section: "III", code: "1509", description: "Olive oil and its fractions", chapter: "15" },
  { section: "III", code: "150910", description: "Olive oil, virgin", chapter: "15" },
  { section: "III", code: "1512", description: "Sunflower-seed, safflower or cotton-seed oil", chapter: "15" },
  { section: "III", code: "151211", description: "Sunflower-seed or safflower oil, crude", chapter: "15" },

  // SECTION IV - PREPARED FOODSTUFFS
  { section: "IV", code: "22", description: "Beverages, spirits and vinegar", chapter: "22" },
  { section: "IV", code: "2204", description: "Wine of fresh grapes", chapter: "22" },
  { section: "IV", code: "220410", description: "Sparkling wine", chapter: "22" },
  { section: "IV", code: "220421", description: "Wine in containers holding 2 litres or less", chapter: "22" },
  { section: "IV", code: "220430", description: "Other grape must", chapter: "22" },
  { section: "IV", code: "2207", description: "Undenatured ethyl alcohol", chapter: "22" },
  { section: "IV", code: "220710", description: "Undenatured ethyl alcohol of 80% vol or higher", chapter: "22" },

  { section: "IV", code: "23", description: "Residues from food industries", chapter: "23" },
  { section: "IV", code: "2304", description: "Oil-cake and other solid residues of soya-bean oil", chapter: "23" },
  { section: "IV", code: "230400", description: "Oil-cake and other solid residues of soya-bean oil", chapter: "23" },

  // SECTION VI - CHEMICAL PRODUCTS
  { section: "VI", code: "28", description: "Inorganic chemicals", chapter: "28" },
  { section: "VI", code: "2805", description: "Alkali or alkaline-earth metals", chapter: "28" },
  { section: "VI", code: "280519", description: "Alkali metals other than sodium", chapter: "28" },

  { section: "VI", code: "30", description: "Pharmaceutical products", chapter: "30" },
  { section: "VI", code: "3002", description: "Human blood; animal blood; vaccines", chapter: "30" },
  { section: "VI", code: "300220", description: "Vaccines for human medicine", chapter: "30" },
  { section: "VI", code: "3004", description: "Medicaments", chapter: "30" },
  { section: "VI", code: "300490", description: "Other medicaments", chapter: "30" },

  // SECTION VII - PLASTICS AND RUBBER
  { section: "VII", code: "38", description: "Miscellaneous chemical products", chapter: "38" },
  { section: "VII", code: "3826", description: "Biodiesel and mixtures thereof", chapter: "38" },
  { section: "VII", code: "382600", description: "Biodiesel and mixtures thereof", chapter: "38" },

  { section: "VII", code: "40", description: "Rubber and articles thereof", chapter: "40" },
  { section: "VII", code: "4011", description: "New pneumatic tyres, of rubber", chapter: "40" },
  { section: "VII", code: "401110", description: "Pneumatic tyres for motor cars", chapter: "40" },

  { section: "VII", code: "41", description: "Raw hides and skins and leather", chapter: "41" },
  { section: "VII", code: "4104", description: "Tanned or crust hides and skins of bovine animals", chapter: "41" },
  { section: "VII", code: "410411", description: "Full grains, unsplit; grain splits", chapter: "41" },

  { section: "VII", code: "42", description: "Articles of leather", chapter: "42" },
  { section: "VII", code: "4202", description: "Trunks, suit-cases, handbags", chapter: "42" },
  { section: "VII", code: "420221", description: "Handbags with outer surface of leather", chapter: "42" },
  { section: "VII", code: "4205", description: "Other articles of leather or composition leather", chapter: "42" },
  { section: "VII", code: "420500", description: "Other articles of leather", chapter: "42" },

  // SECTION XI - TEXTILES
  { section: "XI", code: "51", description: "Wool, fine or coarse animal hair", chapter: "51" },
  { section: "XI", code: "5105", description: "Wool and fine or coarse animal hair, carded or combed", chapter: "51" },
  { section: "XI", code: "510531", description: "Wool, carded", chapter: "51" },

  { section: "XI", code: "52", description: "Cotton", chapter: "52" },
  { section: "XI", code: "5201", description: "Cotton, not carded or combed", chapter: "52" },
  { section: "XI", code: "520100", description: "Cotton, not carded or combed", chapter: "52" },

  { section: "XI", code: "61", description: "Articles of apparel, knitted or crocheted", chapter: "61" },
  { section: "XI", code: "6109", description: "T-shirts, singlets and other vests, knitted", chapter: "61" },
  { section: "XI", code: "610910", description: "T-shirts of cotton, knitted", chapter: "61" },

  { section: "XI", code: "64", description: "Footwear, gaiters and the like", chapter: "64" },
  { section: "XI", code: "6403", description: "Footwear with outer soles of rubber, plastics, leather", chapter: "64" },
  { section: "XI", code: "640399", description: "Other footwear, covering the ankle", chapter: "64" },

  // SECTION XV - BASE METALS
  { section: "XV", code: "71", description: "Natural or cultured pearls, precious stones and metals", chapter: "71" },
  { section: "XV", code: "7106", description: "Silver", chapter: "71" },
  { section: "XV", code: "710691", description: "Silver, unwrought", chapter: "71" },
  { section: "XV", code: "7108", description: "Gold", chapter: "71" },
  { section: "XV", code: "710813", description: "Gold, other unwrought forms", chapter: "71" },

  { section: "XV", code: "76", description: "Aluminium and articles thereof", chapter: "76" },
  { section: "XV", code: "7601", description: "Unwrought aluminium", chapter: "76" },
  { section: "XV", code: "760120", description: "Aluminium alloys, unwrought", chapter: "76" },

  // SECTION XVI - MACHINERY AND MECHANICAL APPLIANCES
  { section: "XVI", code: "87", description: "Vehicles other than railway or tramway", chapter: "87" },
  { section: "XVI", code: "8703", description: "Motor cars and other motor vehicles", chapter: "87" },
  { section: "XVI", code: "870323", description: "Motor cars with spark-ignition engine, 1500-3000 cc", chapter: "87" },
  { section: "XVI", code: "8708", description: "Parts and accessories of motor vehicles", chapter: "87" },
  { section: "XVI", code: "870899", description: "Other parts and accessories of motor vehicles", chapter: "87" },
]

/**
 * Get all HS codes
 */
export function getAllHSCodes(): HSItem[] {
  return hsData
}

/**
 * Search HS codes by keyword
 */
export function searchHSCodes(query: string, limit = 10): HSItem[] {
  const lowerQuery = query.toLowerCase()
  const keywords = lowerQuery.split(/\s+/).filter((k) => k.length > 2)

  if (keywords.length === 0) {
    return hsData.slice(0, limit)
  }

  const scored = hsData.map((item) => {
    const desc = item.description.toLowerCase()
    let score = 0

    // Exact match bonus
    if (desc === lowerQuery) {
      score += 100
    }

    // Contains full query
    if (desc.includes(lowerQuery)) {
      score += 50
    }

    // Keyword matching
    keywords.forEach((keyword) => {
      if (desc.includes(keyword)) {
        score += 10
      }
      // Word boundary match bonus
      const wordRegex = new RegExp(`\\b${keyword}\\b`, "i")
      if (wordRegex.test(desc)) {
        score += 5
      }
    })

    return { item, score }
  })

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.item)
}

/**
 * Get HS code by exact code
 */
export function getHSCodeByCode(code: string): HSItem | undefined {
  return hsData.find((item) => item.code === code)
}

/**
 * Get HS codes by chapter
 */
export function getHSCodesByChapter(chapter: string): HSItem[] {
  return hsData.filter((item) => item.chapter === chapter)
}
