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
  // SECTION I - LIVE ANIMALS; ANIMAL PRODUCTS (Bilingual descriptions for NCM)
  { section: "I", code: "01", description: "Animales vivos / Live animals", chapter: "01" },
  { section: "I", code: "0101", description: "Caballos, asnos, mulos e hínnys vivos / Live horses, asses, mules and hinnies", chapter: "01" },
  { section: "I", code: "010121", description: "Caballos reproductores de raza pura / Horses - Pure-bred breeding animals", chapter: "01" },
  { section: "I", code: "010129", description: "Otros caballos vivos / Horses - Other than pure-bred breeding", chapter: "01" },

  { section: "I", code: "02", description: "Carne y despojos comestibles / Meat and edible meat offal", chapter: "02" },
  { section: "I", code: "0201", description: "Carne de animales de la especie bovina, fresca o refrigerada / Meat of bovine animals, fresh or chilled", chapter: "02" },
  { section: "I", code: "020110", description: "Carne bovina en canales o medias canales, fresca o refrigerada", chapter: "02" },
  { section: "I", code: "020120", description: "Carne bovina en trozos sin deshuesar, fresca o refrigerada", chapter: "02" },
  { section: "I", code: "020130", description: "Carne bovina deshuesada, fresca o refrigerada / Bovine meat - Boneless, fresh or chilled", chapter: "02" },
  { section: "I", code: "0202", description: "Carne de animales de la especie bovina, congelada / Meat of bovine animals, frozen", chapter: "02" },
  { section: "I", code: "020210", description: "Carne bovina en canales o medias canales, congelada", chapter: "02" },
  { section: "I", code: "020220", description: "Carne bovina en trozos sin deshuesar, congelada", chapter: "02" },
  { section: "I", code: "020230", description: "Carne bovina deshuesada, congelada / Bovine meat - Boneless, frozen", chapter: "02" },
  { section: "I", code: "0203", description: "Carne de animales de la especie porcina / Meat of swine, fresh, chilled or frozen", chapter: "02" },
  { section: "I", code: "020311", description: "Carne porcina en canales o medias canales, fresca o refrigerada", chapter: "02" },
  { section: "I", code: "020312", description: "Jamones y paletas de cerdo con hueso, frescos o refrigerados", chapter: "02" },
  { section: "I", code: "020319", description: "Otras carnes de cerdo, frescas o refrigeradas", chapter: "02" },
  { section: "I", code: "020321", description: "Carne porcina en canales o medias canales, congelada", chapter: "02" },
  { section: "I", code: "020329", description: "Otras carnes de cerdo, congeladas / Swine meat - Frozen, other cuts", chapter: "02" },
  { section: "I", code: "0207", description: "Carne y despojos de aves / Meat and edible offal of poultry", chapter: "02" },
  { section: "I", code: "020711", description: "Gallos y gallinas enteros, sin trocear, frescos o refrigerados", chapter: "02" },
  { section: "I", code: "020712", description: "Gallos y gallinas enteros, sin trocear, congelados", chapter: "02" },
  { section: "I", code: "020714", description: "Trozos y despojos de gallo o gallina, congelados / Poultry - Frozen cuts and offal of fowls", chapter: "02" },

  { section: "I", code: "03", description: "Fish and crustaceans, molluscs", chapter: "03" },
  { section: "I", code: "0304", description: "Fish fillets and other fish meat", chapter: "03" },
  { section: "I", code: "030489", description: "Fish fillets - Frozen, other", chapter: "03" },
  { section: "I", code: "0306", description: "Crustaceans", chapter: "03" },
  { section: "I", code: "030617", description: "Crustaceans - Other shrimps and prawns, frozen", chapter: "03" },
  { section: "I", code: "0307", description: "Molluscs", chapter: "03" },
  { section: "I", code: "030743", description: "Molluscs - Cuttlefish and squid, frozen", chapter: "03" },

  { section: "I", code: "04", description: "Productos lácteos, huevos y miel natural / Dairy produce; birds' eggs; natural honey", chapter: "04" },
  { section: "I", code: "0401", description: "Leche y nata sin concentrar ni azucarar", chapter: "04" },
  { section: "I", code: "040110", description: "Leche con materia grasa inferior o igual al 1%", chapter: "04" },
  { section: "I", code: "040120", description: "Leche con materia grasa superior al 1% pero inferior o igual al 6%", chapter: "04" },
  { section: "I", code: "0402", description: "Leche y nata concentradas o azucaradas", chapter: "04" },
  { section: "I", code: "040210", description: "Leche en polvo con materia grasa inferior o igual al 1.5%", chapter: "04" },
  { section: "I", code: "040221", description: "Leche en polvo sin azúcar con materia grasa superior al 1.5%", chapter: "04" },
  { section: "I", code: "0403", description: "Suero de mantequilla, yogur y otros productos lácteos fermentados", chapter: "04" },
  { section: "I", code: "040310", description: "Yogur", chapter: "04" },
  { section: "I", code: "0404", description: "Lactosuero y productos de lactosuero", chapter: "04" },
  { section: "I", code: "0405", description: "Mantequilla y demás materias grasas de la leche", chapter: "04" },
  { section: "I", code: "040510", description: "Mantequilla (manteca)", chapter: "04" },
  { section: "I", code: "0406", description: "Quesos y requesón", chapter: "04" },
  { section: "I", code: "040610", description: "Queso fresco (sin madurar), incluido el requesón", chapter: "04" },
  { section: "I", code: "040620", description: "Queso rallado o en polvo", chapter: "04" },
  { section: "I", code: "040630", description: "Queso fundido", chapter: "04" },
  { section: "I", code: "040690", description: "Los demás quesos", chapter: "04" },
  { section: "I", code: "0407", description: "Huevos de ave con cáscara", chapter: "04" },
  { section: "I", code: "040711", description: "Huevos fecundados para incubación de gallina", chapter: "04" },
  { section: "I", code: "040721", description: "Huevos frescos de gallina", chapter: "04" },
  { section: "I", code: "0408", description: "Huevos de ave sin cáscara y yemas de huevo", chapter: "04" },
  { section: "I", code: "0409", description: "Miel natural / Natural honey", chapter: "04" },
  { section: "I", code: "040900", description: "Miel natural de abeja / Natural honey", chapter: "04" },
  { section: "I", code: "04090010", description: "Miel natural orgánica certificada", chapter: "04" },
  { section: "I", code: "04090020", description: "Miel natural multifloral", chapter: "04" },
  { section: "I", code: "04090030", description: "Miel natural monofloral (eucalipto, alfalfa, etc.)", chapter: "04" },
  { section: "I", code: "0410", description: "Productos comestibles de origen animal n.e.p. / Edible products of animal origin, not elsewhere specified", chapter: "04" },
  { section: "I", code: "041000", description: "Productos comestibles de origen animal n.e.p. / Edible products of animal origin, n.e.s.", chapter: "04" },

  // SECTION II - VEGETABLE PRODUCTS
  { section: "II", code: "07", description: "Edible vegetables and certain roots and tubers", chapter: "07" },
  { section: "II", code: "0711", description: "Vegetables provisionally preserved", chapter: "07" },
  { section: "II", code: "071120", description: "Olives, provisionally preserved", chapter: "07" },

  { section: "II", code: "08", description: "Frutas y frutos comestibles / Edible fruit and nuts; peel of citrus fruit or melons", chapter: "08" },
  { section: "II", code: "0805", description: "Cítricos frescos o secos / Citrus fruit, fresh or dried", chapter: "08" },
  { section: "II", code: "080510", description: "Naranjas frescas o secas", chapter: "08" },
  { section: "II", code: "080520", description: "Mandarinas, clementinas y similares, frescas o secas", chapter: "08" },
  { section: "II", code: "080540", description: "Pomelos y toronjas frescos o secos", chapter: "08" },
  { section: "II", code: "080550", description: "Limones y limas frescos o secos / Lemons and limes, fresh or dried", chapter: "08" },
  { section: "II", code: "08055010", description: "Limones amarillos frescos", chapter: "08" },
  { section: "II", code: "08055020", description: "Limas frescas", chapter: "08" },
  { section: "II", code: "0806", description: "Uvas frescas o secas / Grapes, fresh or dried", chapter: "08" },
  { section: "II", code: "080610", description: "Uvas frescas / Grapes, fresh", chapter: "08" },
  { section: "II", code: "080620", description: "Uvas secas (pasas de uva)", chapter: "08" },
  { section: "II", code: "0807", description: "Melones, sandías y papayas frescos", chapter: "08" },
  { section: "II", code: "080711", description: "Sandías frescas", chapter: "08" },
  { section: "II", code: "0808", description: "Manzanas, peras y membrillos frescos / Apples, pears and quinces, fresh", chapter: "08" },
  { section: "II", code: "080810", description: "Manzanas frescas / Apples, fresh", chapter: "08" },
  { section: "II", code: "080830", description: "Peras frescas / Pears, fresh", chapter: "08" },
  { section: "II", code: "080840", description: "Membrillos frescos", chapter: "08" },
  { section: "II", code: "0809", description: "Damascos, cerezas, duraznos, ciruelas frescos / Apricots, cherries, peaches, plums and sloes, fresh", chapter: "08" },
  { section: "II", code: "080910", description: "Damascos (albaricoques) frescos", chapter: "08" },
  { section: "II", code: "080921", description: "Cerezas ácidas frescas", chapter: "08" },
  { section: "II", code: "080929", description: "Otras cerezas frescas / Cherries, fresh, other", chapter: "08" },
  { section: "II", code: "080930", description: "Duraznos (melocotones) frescos, incluidos los griñones y nectarinas", chapter: "08" },
  { section: "II", code: "080940", description: "Ciruelas y endrinas frescas", chapter: "08" },
  { section: "II", code: "0810", description: "Otras frutas frescas / Other fruit, fresh", chapter: "08" },
  { section: "II", code: "081010", description: "Frutillas (fresas) frescas", chapter: "08" },
  { section: "II", code: "081020", description: "Frambuesas, zarzamoras, moras y moras-frambuesa frescas", chapter: "08" },
  { section: "II", code: "081040", description: "Arándanos rojos, mirtilos y demás frutos del género Vaccinium frescos / Cranberries, bilberries and other fruits of the genus Vaccinium, fresh", chapter: "08" },
  { section: "II", code: "081050", description: "Kiwis frescos", chapter: "08" },
  { section: "II", code: "0811", description: "Frutas congeladas", chapter: "08" },
  { section: "II", code: "081110", description: "Frutillas (fresas) congeladas", chapter: "08" },
  { section: "II", code: "081120", description: "Frambuesas y moras congeladas", chapter: "08" },
  { section: "II", code: "0812", description: "Frutas conservadas provisionalmente", chapter: "08" },
  { section: "II", code: "0813", description: "Frutas secas (excepto 08.01 a 08.06)", chapter: "08" },
  { section: "II", code: "081340", description: "Otras frutas secas", chapter: "08" },

  { section: "II", code: "09", description: "Café, té, yerba mate y especias / Coffee, tea, maté and spices", chapter: "09" },
  { section: "II", code: "0901", description: "Café / Coffee", chapter: "09" },
  { section: "II", code: "090111", description: "Café sin tostar ni descafeinar / Coffee, not roasted, not decaffeinated", chapter: "09" },
  { section: "II", code: "090112", description: "Café descafeinado sin tostar", chapter: "09" },
  { section: "II", code: "090121", description: "Café tostado sin descafeinar", chapter: "09" },
  { section: "II", code: "090122", description: "Café tostado descafeinado", chapter: "09" },
  { section: "II", code: "0902", description: "Té / Tea", chapter: "09" },
  { section: "II", code: "090210", description: "Té verde sin fermentar", chapter: "09" },
  { section: "II", code: "090230", description: "Té negro fermentado", chapter: "09" },
  { section: "II", code: "0903", description: "Yerba mate / Maté", chapter: "09" },
  { section: "II", code: "090300", description: "Yerba mate / Maté (yerba mate)", chapter: "09" },
  { section: "II", code: "09030010", description: "Yerba mate elaborada con palo", chapter: "09" },
  { section: "II", code: "09030020", description: "Yerba mate elaborada despalada (sin palo)", chapter: "09" },
  { section: "II", code: "09030090", description: "Yerba mate en otras presentaciones", chapter: "09" },

  { section: "II", code: "10", description: "Cereals", chapter: "10" },
  { section: "II", code: "1001", description: "Wheat and meslin", chapter: "10" },
  { section: "II", code: "100199", description: "Wheat, other than durum wheat", chapter: "10" },
  { section: "II", code: "1003", description: "Barley", chapter: "10" },
  { section: "II", code: "100390", description: "Barley, other than seed", chapter: "10" },
  { section: "II", code: "1005", description: "Maize (corn)", chapter: "10" },
  { section: "II", code: "100590", description: "Maize, other than seed", chapter: "10" },
  { section: "II", code: "1007", description: "Grain sorghum", chapter: "10" },
  { section: "II", code: "100790", description: "Grain sorghum, other than seed", chapter: "10" },

  { section: "II", code: "12", description: "Semillas y frutos oleaginosos / Oil seeds and oleaginous fruits", chapter: "12" },
  { section: "II", code: "1201", description: "Habas de soja (porotos de soja) / Soya beans", chapter: "12" },
  { section: "II", code: "120110", description: "Habas de soja para siembra", chapter: "12" },
  { section: "II", code: "120190", description: "Habas de soja (excepto para siembra) / Soya beans, other than seed", chapter: "12" },
  { section: "II", code: "1202", description: "Maníes (cacahuetes) / Groundnuts", chapter: "12" },
  { section: "II", code: "120241", description: "Maníes con cáscara para siembra", chapter: "12" },
  { section: "II", code: "120242", description: "Maníes sin cáscara, incluso quebrantados", chapter: "12" },
  { section: "II", code: "1205", description: "Semillas de colza o nabo / Rape or colza seeds", chapter: "12" },
  { section: "II", code: "120510", description: "Semillas de colza de bajo contenido de ácido erúcico", chapter: "12" },
  { section: "II", code: "1206", description: "Semillas de girasol / Sunflower seeds", chapter: "12" },
  { section: "II", code: "120600", description: "Semillas de girasol, incluso quebrantadas / Sunflower seeds, whether or not broken", chapter: "12" },
  { section: "II", code: "1207", description: "Otras semillas y frutos oleaginosos", chapter: "12" },
  { section: "II", code: "120740", description: "Semillas de sésamo (ajonjolí)", chapter: "12" },
  { section: "II", code: "120760", description: "Semillas de cártamo", chapter: "12" },

  // SECTION III - ANIMAL OR VEGETABLE FATS AND OILS (ACEITES)
  { section: "III", code: "15", description: "Grasas y aceites animales o vegetales / Animal or vegetable fats and oils", chapter: "15" },
  { section: "III", code: "1507", description: "Aceite de soja y sus fracciones / Soya-bean oil and its fractions", chapter: "15" },
  { section: "III", code: "150710", description: "Aceite de soja en bruto, incluso desgomado / Soya-bean oil, crude", chapter: "15" },
  { section: "III", code: "150790", description: "Aceite de soja refinado", chapter: "15" },
  { section: "III", code: "1508", description: "Aceite de maní (cacahuete) y sus fracciones", chapter: "15" },
  { section: "III", code: "150810", description: "Aceite de maní en bruto", chapter: "15" },
  { section: "III", code: "150890", description: "Aceite de maní refinado", chapter: "15" },
  { section: "III", code: "1509", description: "Aceite de oliva y sus fracciones / Olive oil and its fractions", chapter: "15" },
  { section: "III", code: "150910", description: "Aceite de oliva virgen / Olive oil, virgin", chapter: "15" },
  { section: "III", code: "150990", description: "Aceite de oliva refinado", chapter: "15" },
  { section: "III", code: "1510", description: "Otros aceites de oliva y mezclas", chapter: "15" },
  { section: "III", code: "1511", description: "Aceite de palma y sus fracciones", chapter: "15" },
  { section: "III", code: "1512", description: "Aceite de girasol, cártamo o algodón / Sunflower-seed, safflower or cotton-seed oil", chapter: "15" },
  { section: "III", code: "151211", description: "Aceite de girasol o cártamo en bruto / Sunflower-seed or safflower oil, crude", chapter: "15" },
  { section: "III", code: "151219", description: "Aceite de girasol o cártamo refinado", chapter: "15" },
  { section: "III", code: "151221", description: "Aceite de algodón en bruto", chapter: "15" },
  { section: "III", code: "1514", description: "Aceite de colza o nabo y sus fracciones", chapter: "15" },
  { section: "III", code: "1515", description: "Otras grasas y aceites vegetales fijos", chapter: "15" },
  { section: "III", code: "151530", description: "Aceite de ricino y sus fracciones", chapter: "15" },
  { section: "III", code: "1516", description: "Grasas y aceites hidrogenados", chapter: "15" },
  { section: "III", code: "1517", description: "Margarina y mezclas de grasas", chapter: "15" },

  // SECTION IV - PREPARED FOODSTUFFS (BEBIDAS Y VINOS)
  { section: "IV", code: "22", description: "Bebidas, líquidos alcohólicos y vinagre / Beverages, spirits and vinegar", chapter: "22" },
  { section: "IV", code: "2204", description: "Vino de uvas frescas / Wine of fresh grapes", chapter: "22" },
  { section: "IV", code: "220410", description: "Vino espumoso, champán / Sparkling wine", chapter: "22" },
  { section: "IV", code: "220421", description: "Vino en recipientes de capacidad inferior o igual a 2 litros / Wine in containers holding 2 litres or less", chapter: "22" },
  { section: "IV", code: "22042110", description: "Vino tinto Malbec embotellado de Mendoza", chapter: "22" },
  { section: "IV", code: "22042111", description: "Vino blanco Torrontés embotellado", chapter: "22" },
  { section: "IV", code: "22042112", description: "Vino tinto Cabernet Sauvignon embotellado", chapter: "22" },
  { section: "IV", code: "22042120", description: "Vino rosado embotellado", chapter: "22" },
  { section: "IV", code: "220422", description: "Vino en recipientes de capacidad superior a 2 litros pero inferior o igual a 10 litros", chapter: "22" },
  { section: "IV", code: "220429", description: "Otros vinos de uvas frescas en recipientes mayores a 10 litros", chapter: "22" },
  { section: "IV", code: "220430", description: "Mosto de uva / Other grape must", chapter: "22" },
  { section: "IV", code: "22043010", description: "Mosto de uva parcialmente fermentado", chapter: "22" },
  { section: "IV", code: "22043020", description: "Mosto de uva sin fermentar", chapter: "22" },
  { section: "IV", code: "2205", description: "Vermut y demás vinos de uvas frescas aromatizados", chapter: "22" },
  { section: "IV", code: "220510", description: "Vermut en recipientes de capacidad inferior o igual a 2 litros", chapter: "22" },
  { section: "IV", code: "2207", description: "Alcohol etílico sin desnaturalizar / Undenatured ethyl alcohol", chapter: "22" },
  { section: "IV", code: "220710", description: "Alcohol etílico sin desnaturalizar de 80% vol o más / Undenatured ethyl alcohol of 80% vol or higher", chapter: "22" },
  { section: "IV", code: "2208", description: "Aguardientes, licores y demás bebidas espirituosas", chapter: "22" },
  { section: "IV", code: "220820", description: "Aguardiente de vino o de orujo de uvas (pisco, grappa)", chapter: "22" },
  { section: "IV", code: "220840", description: "Ron y demás aguardientes de caña", chapter: "22" },
  { section: "IV", code: "220850", description: "Gin y ginebra", chapter: "22" },
  { section: "IV", code: "220870", description: "Licores", chapter: "22" },

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

  { section: "VII", code: "41", description: "Pieles (excepto peletería) y cueros / Raw hides and skins and leather", chapter: "41" },
  { section: "VII", code: "4101", description: "Cueros y pieles en bruto de bovinos", chapter: "41" },
  { section: "VII", code: "410150", description: "Cueros y pieles enteros de bovinos en bruto, de peso superior a 16 kg", chapter: "41" },
  { section: "VII", code: "4102", description: "Cueros y pieles en bruto de ovinos", chapter: "41" },
  { section: "VII", code: "4103", description: "Otros cueros y pieles en bruto", chapter: "41" },
  { section: "VII", code: "4104", description: "Cueros y pieles curtidos o crust de bovinos / Tanned or crust hides and skins of bovine animals", chapter: "41" },
  { section: "VII", code: "410411", description: "Cueros bovinos curtidos plena flor sin dividir o divididos con flor / Full grains, unsplit; grain splits", chapter: "41" },
  { section: "VII", code: "410419", description: "Otros cueros bovinos en estado húmedo", chapter: "41" },
  { section: "VII", code: "410441", description: "Cueros bovinos curtidos plena flor en estado seco", chapter: "41" },
  { section: "VII", code: "4105", description: "Cueros y pieles curtidos de ovinos", chapter: "41" },
  { section: "VII", code: "4106", description: "Cueros y pieles curtidos de caprinos", chapter: "41" },
  { section: "VII", code: "4107", description: "Cueros preparados después del curtido de bovinos", chapter: "41" },
  { section: "VII", code: "410712", description: "Cueros bovinos preparados divididos con la flor", chapter: "41" },
  { section: "VII", code: "410719", description: "Otros cueros bovinos preparados", chapter: "41" },

  { section: "VII", code: "42", description: "Manufacturas de cuero / Articles of leather", chapter: "42" },
  { section: "VII", code: "4201", description: "Artículos de talabartería y guarnicionería", chapter: "42" },
  { section: "VII", code: "420100", description: "Artículos de talabartería para animales", chapter: "42" },
  { section: "VII", code: "4202", description: "Baúles, maletas, bolsos de mano / Trunks, suit-cases, handbags", chapter: "42" },
  { section: "VII", code: "420211", description: "Baúles y maletas con superficie exterior de cuero", chapter: "42" },
  { section: "VII", code: "420221", description: "Bolsos de mano con superficie exterior de cuero / Handbags with outer surface of leather", chapter: "42" },
  { section: "VII", code: "420222", description: "Bolsos de mano con superficie exterior de plástico o textil", chapter: "42" },
  { section: "VII", code: "420231", description: "Artículos de bolsillo con superficie exterior de cuero", chapter: "42" },
  { section: "VII", code: "420291", description: "Otros contenedores con superficie exterior de cuero", chapter: "42" },
  { section: "VII", code: "4203", description: "Prendas y accesorios de vestir de cuero", chapter: "42" },
  { section: "VII", code: "420310", description: "Prendas de vestir de cuero", chapter: "42" },
  { section: "VII", code: "420321", description: "Guantes de cuero para deportes", chapter: "42" },
  { section: "VII", code: "420329", description: "Otros guantes de cuero", chapter: "42" },
  { section: "VII", code: "420330", description: "Cinturones y bandoleras de cuero", chapter: "42" },
  { section: "VII", code: "4205", description: "Otras manufacturas de cuero / Other articles of leather or composition leather", chapter: "42" },
  { section: "VII", code: "420500", description: "Otras manufacturas de cuero / Other articles of leather", chapter: "42" },

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

// Spanish synonym mappings for better search
const SYNONYMS: Record<string, string[]> = {
  vino: ["wine", "vinos", "malbec", "torrontés", "cabernet", "espumoso", "champán"],
  carne: ["meat", "bovino", "bovinos", "bovina", "porcino", "cerdo", "pollo", "aves"],
  soja: ["soya", "soybean", "poroto", "haba"],
  aceite: ["oil", "oliva", "girasol", "maní"],
  miel: ["honey", "natural", "abeja"],
  yerba: ["mate", "maté"],
  limón: ["lemon", "lima", "cítrico", "citrus"],
  cuero: ["leather", "piel", "pieles", "curtido"],
  leche: ["milk", "lácteo", "dairy"],
  queso: ["cheese", "requesón"],
  uva: ["grape", "uvas", "pasa"],
  trigo: ["wheat", "harina"],
  maíz: ["corn", "maize"],
  girasol: ["sunflower"],
  fruta: ["fruit", "frutas", "fresco"],
}

/**
 * Search HS codes by keyword with Spanish synonym support
 */
export function searchHSCodes(query: string, limit = 10): HSItem[] {
  const lowerQuery = query.toLowerCase().trim()
  let keywords = lowerQuery.split(/\s+/).filter((k) => k.length > 1)

  if (keywords.length === 0) {
    return hsData.slice(0, limit)
  }

  // Expand keywords with synonyms
  const expandedKeywords = new Set<string>(keywords)
  keywords.forEach(keyword => {
    // Check if keyword matches any synonym key
    for (const [key, synonyms] of Object.entries(SYNONYMS)) {
      if (key.includes(keyword) || keyword.includes(key) || synonyms.some(s => s.includes(keyword) || keyword.includes(s))) {
        expandedKeywords.add(key)
        synonyms.forEach(s => expandedKeywords.add(s))
      }
    }
  })

  const allKeywords = Array.from(expandedKeywords)

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

    // Original keyword matching (higher weight)
    keywords.forEach((keyword) => {
      if (desc.includes(keyword)) {
        score += 15
      }
      // Word boundary match bonus
      const wordRegex = new RegExp(`\\b${keyword}`, "i")
      if (wordRegex.test(desc)) {
        score += 10
      }
    })

    // Expanded keyword matching (lower weight)
    allKeywords.forEach((keyword) => {
      if (!keywords.includes(keyword) && desc.includes(keyword)) {
        score += 5
      }
    })

    // Prefer more specific codes (6+ digits)
    if (item.code.length >= 6 && score > 0) {
      score += 3
    }

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
