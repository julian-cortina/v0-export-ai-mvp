# Guía de Contribución - ExportAIdor

¡Gracias por tu interés en contribuir a ExportAIdor! Esta guía te ayudará a agregar nuevos productos y destinos de exportación de manera efectiva.

## 🎯 Principios de Contribución

1. **Precisión**: Toda información debe ser verificable y precisa
2. **Fuentes Oficiales**: Usar solo fuentes oficiales (AFIP, SENASA, OMC, etc.)
3. **Actualidad**: Verificar que la información esté actualizada
4. **Documentación**: Documentar las fuentes de información
5. **Enfoque Argentino**: Mantener el foco en exportaciones desde Argentina

## 📝 Proceso de Contribución

### 1. Investigación Previa

Antes de agregar un producto, investiga:

- **Código HS**: Verifica el código correcto en AFIP o WCO
- **Volumen de Exportación**: Confirma que es un producto relevante para Argentina
- **Destinos Principales**: Identifica los principales mercados de exportación
- **Acuerdos Comerciales**: Verifica qué acuerdos aplican
- **Requisitos**: Investiga requisitos de SENASA y autoridades de destino

### 2. Agregar Producto al Clasificador

**Archivo**: `lib/argentine-products.ts`

\`\`\`typescript
// Ejemplo completo de nuevo producto
{
  keywords: [
    // Español
    "quinoa", "quinua", "grano andino",
    // Inglés
    "quinoa", "andean grain",
    // Términos técnicos
    "chenopodium quinoa"
  ],
  hsCode: "1008.50", // Verificado en AFIP
  category: "Quinoa",
  confidence: 0.93,
  notes: "Producto emergente de exportación argentina, principalmente de NOA"
},
\`\`\`

**Checklist**:
- [ ] Keywords incluyen términos en español e inglés
- [ ] Código HS verificado en fuente oficial
- [ ] Confidence level apropiado (0.85-0.95)
- [ ] Categoría descriptiva y clara
- [ ] Notas incluyen contexto relevante

### 3. Agregar Medidas Comerciales

**Archivo**: `lib/argentine-trade-data.ts`

\`\`\`typescript
// Ejemplo completo de medida comercial
{
  id: 31, // Siguiente ID disponible
  productName: "Quinoa",
  hsCode: "1008.50",
  countryOrigin: "Argentina",
  countryDestination: "Estados Unidos",
  tariffRate: "1.1%",
  nonTariffMeasures: "Certificado fitosanitario SENASA, Inspección APHIS, Análisis de residuos",
  requiredDocuments: "Factura comercial, Certificado fitosanitario, Certificado de origen, Prior Notice FDA",
  notes: "Producto emergente. Verificar requisitos específicos de cada estado. Demanda creciente en mercado orgánico.",
  confidenceLevel: "high",
},
\`\`\`

**Checklist**:
- [ ] ID único e incremental
- [ ] Código HS coincide con el clasificador
- [ ] País de origen es "Argentina"
- [ ] Arancel verificado en Market Access Map o fuente oficial
- [ ] Medidas no arancelarias completas
- [ ] Documentos requeridos específicos
- [ ] Notas incluyen información sobre acuerdos comerciales
- [ ] Nivel de confianza apropiado

### 4. Agregar Múltiples Destinos

Para cada producto, agrega al menos 3-5 destinos principales:

\`\`\`typescript
// Quinoa a diferentes destinos
{
  id: 31,
  productName: "Quinoa",
  hsCode: "1008.50",
  countryOrigin: "Argentina",
  countryDestination: "Estados Unidos",
  // ... datos específicos para USA
},
{
  id: 32,
  productName: "Quinoa",
  hsCode: "1008.50",
  countryOrigin: "Argentina",
  countryDestination: "Unión Europea",
  // ... datos específicos para UE
},
{
  id: 33,
  productName: "Quinoa",
  hsCode: "1008.50",
  countryOrigin: "Argentina",
  countryDestination: "Brasil",
  // ... datos específicos para Brasil
},
\`\`\`

### 5. Documentar Fuentes

Agrega un comentario con las fuentes consultadas:

\`\`\`typescript
// QUINOA - Producto emergente de exportación argentina
// Fuentes:
// - Código HS: AFIP NCM 2024
// - Aranceles USA: USITC Tariff Database
// - Requisitos fitosanitarios: SENASA Res. 123/2023
// - Estadísticas: Trade Map 2023
{
  keywords: ["quinoa", "quinua"],
  // ...
},
\`\`\`

## 🔍 Verificación de Calidad

Antes de enviar tu contribución, verifica:

### Clasificador
- [ ] Keywords son relevantes y completos
- [ ] Código HS es correcto (6 dígitos mínimo)
- [ ] No hay duplicados con productos existentes
- [ ] Confidence level es realista

### Medidas Comerciales
- [ ] Arancel es correcto y actualizado
- [ ] Medidas no arancelarias son completas
- [ ] Documentos requeridos son específicos
- [ ] Notas incluyen información sobre acuerdos
- [ ] Trade agreement está especificado si aplica

### Pruebas
- [ ] Probado en el sistema con diferentes descripciones
- [ ] Clasificación funciona correctamente
- [ ] Medidas se recuperan correctamente
- [ ] PDF se genera sin errores

## 📚 Fuentes Recomendadas

### Códigos HS
1. **AFIP - Nomenclador Común del MERCOSUR**
   - URL: https://www.afip.gob.ar/
   - Uso: Código HS oficial para Argentina

2. **WCO - Harmonized System Database**
   - URL: https://www.wcoomd.org/
   - Uso: Referencia internacional

### Aranceles
1. **Market Access Map (ITC)**
   - URL: https://www.macmap.org/
   - Uso: Aranceles aplicados por país

2. **USITC Tariff Database** (para USA)
   - URL: https://hts.usitc.gov/
   - Uso: Aranceles específicos de USA

3. **TARIC** (para UE)
   - URL: https://ec.europa.eu/taxation_customs/dds2/taric/
   - Uso: Aranceles de la Unión Europea

### Requisitos Sanitarios
1. **SENASA**
   - URL: https://www.argentina.gob.ar/senasa
   - Uso: Requisitos de exportación argentinos

2. **APHIS** (USA)
   - URL: https://www.aphis.usda.gov/
   - Uso: Requisitos fitosanitarios de USA

3. **DG SANTE** (UE)
   - URL: https://ec.europa.eu/food/
   - Uso: Requisitos sanitarios de UE

### Acuerdos Comerciales
1. **Cancillería Argentina**
   - URL: https://www.cancilleria.gob.ar/
   - Uso: Acuerdos comerciales vigentes

2. **ALADI**
   - URL: https://www.aladi.org/
   - Uso: Acuerdos de América Latina

3. **MERCOSUR**
   - URL: https://www.mercosur.int/
   - Uso: Normativa MERCOSUR

## 🚀 Ejemplo Completo: Agregar Té

### Paso 1: Investigación

- **Producto**: Té negro argentino (principalmente de Misiones)
- **Código HS**: 0902.10 (Té verde sin fermentar) o 0902.30 (Té negro fermentado)
- **Principales destinos**: Chile, USA, UE, Brasil
- **Acuerdos**: MERCOSUR (Brasil), ACE 35 (Chile)

### Paso 2: Agregar al Clasificador

\`\`\`typescript
// En lib/argentine-products.ts
export const beverageProducts: ProductRule[] = [
  // ... productos existentes ...
  
  // TÉ - Producción de Misiones
  // Fuentes: AFIP NCM 2024, INYM (Instituto Nacional de la Yerba Mate)
  {
    keywords: ["té", "tea", "té negro", "black tea", "té verde", "green tea"],
    hsCode: "0902.30", // Té negro fermentado (principal exportación)
    category: "Té negro argentino",
    confidence: 0.91,
    notes: "Producción principalmente de Misiones. Argentina es productor emergente de té.",
  },
]
\`\`\`

### Paso 3: Agregar Medidas Comerciales

\`\`\`typescript
// En lib/argentine-trade-data.ts

// TÉ A CHILE - ACE 35
// Fuentes: Market Access Map, Aduana Chile
{
  id: 31,
  productName: "Té negro argentino",
  hsCode: "0902.30",
  countryOrigin: "Argentina",
  countryDestination: "Chile",
  tariffRate: "0%",
  nonTariffMeasures: "Certificado fitosanitario SENASA, Declaración de origen ACE 35",
  requiredDocuments: "Factura comercial, Certificado de origen ACE 35, Certificado fitosanitario SAG",
  notes: "Libre comercio bajo ACE 35. Chile es mercado importante para té argentino.",
  tradeAgreement: "ACE 35",
  confidenceLevel: "high",
},

// TÉ A USA
// Fuentes: USITC, FDA
{
  id: 32,
  productName: "Té negro argentino",
  hsCode: "0902.30",
  countryOrigin: "Argentina",
  countryDestination: "Estados Unidos",
  tariffRate: "Free",
  nonTariffMeasures: "Certificado fitosanitario SENASA, Prior Notice FDA, Cumplimiento FSMA",
  requiredDocuments: "Factura comercial, Certificado fitosanitario, Certificado de origen, Prior Notice FDA",
  notes: "Libre de arancel. Debe cumplir con Food Safety Modernization Act (FSMA). Mercado premium.",
  confidenceLevel: "high",
},

// TÉ A BRASIL - MERCOSUR
// Fuentes: CAMEX Brasil, MERCOSUR
{
  id: 33,
  productName: "Té negro argentino",
  hsCode: "0902.30",
  countryOrigin: "Argentina",
  countryDestination: "Brasil",
  tariffRate: "0%",
  nonTariffMeasures: "Certificado fitosanitario SENASA, Declaración de origen MERCOSUR, Registro MAPA",
  requiredDocuments: "Factura comercial, Certificado de origen MERCOSUR, Certificado fitosanitario",
  notes: "Libre comercio bajo MERCOSUR. Etiquetado en portugués requerido.",
  tradeAgreement: "MERCOSUR",
  confidenceLevel: "high",
},
\`\`\`

### Paso 4: Probar

\`\`\`bash
# Ejecutar el sistema
npm run dev

# Probar con diferentes descripciones:
# - "té negro de Misiones"
# - "black tea"
# - "té argentino"
\`\`\`

## ❌ Errores Comunes a Evitar

1. **Código HS Incorrecto**: Siempre verificar en fuente oficial
2. **Arancel Desactualizado**: Verificar fecha de última actualización
3. **Requisitos Incompletos**: Incluir todos los certificados necesarios
4. **Falta de Fuentes**: Siempre documentar de dónde viene la información
5. **Duplicados**: Verificar que el producto no exista ya
6. **Keywords Insuficientes**: Incluir variaciones y sinónimos
7. **Notas Vagas**: Ser específico sobre acuerdos y requisitos especiales

## 📞 Contacto

Si tienes dudas sobre cómo contribuir:
- Abre un Issue en GitHub
- Consulta la documentación oficial de AFIP/SENASA
- Contacta a la Cámara de Exportadores

---

**¡Gracias por ayudar a mejorar ExportAIdor!** 🇦🇷
