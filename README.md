# ExportAIdor - Sistema de Inteligencia Comercial para Exportaciones Argentinas

ExportAIdor es una plataforma MVP diseñada específicamente para analizar y facilitar las exportaciones argentinas, proporcionando información sobre códigos HS, aranceles, medidas no arancelarias y requisitos documentales según los acuerdos comerciales vigentes.

## 🇦🇷 Enfoque en Argentina

Este sistema está **exclusivamente diseñado para exportaciones con origen en Argentina**. El país de origen está fijo en Argentina y no puede modificarse, reflejando la especialización del sistema en:

- Productos de exportación argentinos
- Acuerdos comerciales argentinos (MERCOSUR, ACE 35, ACE 55, etc.)
- Requisitos de SENASA y otras autoridades argentinas
- Principales destinos de exportación argentina

## 🚀 Características Principales

- **Clasificación Automática con Dataset Real**: Utiliza la base de datos oficial del Sistema Armonizado con coincidencia de texto inteligente
- **Sugerencias de Códigos HS**: Muestra los 3 códigos HS más relevantes con niveles de confianza
- **Base de Datos de Medidas Comerciales**: 30+ escenarios reales de exportación argentina
- **Acuerdos Comerciales**: Información sobre MERCOSUR, ACE 35, ACE 55, Cuota Hilton, y más
- **Requisitos Documentales**: Documentación específica requerida por SENASA y autoridades de destino
- **Exportación PDF**: Genera reportes profesionales de análisis de exportación
- **Arquitectura Escalable**: Diseñado para agregar fácilmente nuevos productos y destinos

## 🆕 Sistema de Clasificación HS (Actualizado)

El sistema ahora utiliza el **dataset oficial del Sistema Armonizado cargado localmente** para clasificación precisa y rápida:

### Cómo Funciona

1. **Dataset Local**: Carga todos los códigos HS oficiales desde `/lib/data/harmonized-system.csv`
2. **Sin Dependencias Externas**: No requiere llamadas a APIs externas ni GitHub en runtime
3. **Coincidencia de Texto**: Usa algoritmos de similitud (Jaccard + keyword matching) para encontrar los códigos más relevantes
4. **Múltiples Sugerencias**: Muestra los 3 mejores matches con niveles de confianza
5. **Transparencia**: Explica por qué cada código fue sugerido

### Actualizar el Dataset HS

El dataset está almacenado localmente en: `/lib/data/harmonized-system.csv`

**Para actualizar el dataset:**

1. Descarga la última versión del CSV desde el repositorio:
   \`\`\`bash
   curl -o lib/data/harmonized-system.csv https://raw.githubusercontent.com/julian-cortina/harmonized-system/main/data/harmonized-system.csv
   \`\`\`

2. O reemplaza manualmente el archivo `/lib/data/harmonized-system.csv` con la nueva versión

3. Reinicia el servidor de desarrollo:
   \`\`\`bash
   npm run dev
   \`\`\`

**Nota**: El dataset se carga en memoria al iniciar el servidor, por lo que no hay impacto en el rendimiento durante el uso.

### API Endpoints

#### 1. Clasificación de Productos
\`\`\`bash
POST /api/classify
Content-Type: application/json

{
  "productDescription": "miel natural frascos",
  "countryOrigin": "Argentina",
  "countryDestination": "Alemania"
}

# Respuesta:
{
  "hs_code": "0409.00",
  "confidence": 0.85,
  "explanation": "Clasificado como: Natural honey",
  "alternatives": [
    {
      "hs_code": "0409.00",
      "description": "Natural honey",
      "confidence": 0.85
    },
    // ... más alternativas
  ]
}
\`\`\`

#### 2. Obtener Medidas Arancelarias
\`\`\`bash
GET /api/measures?hs_code=0409.00&destination=Alemania

# Respuesta:
{
  "id": 13,
  "product_name": "Miel natural",
  "hs_code": "0409.00",
  "country_origin": "Argentina",
  "country_destination": "Unión Europea",
  "tariff_rate": "17.3%",
  "non_tariff_measures": "Certificado sanitario, Análisis de residuos...",
  "required_documents": "Factura comercial, Certificado sanitario SENASA...",
  "notes": "Requiere cumplir con regulaciones EU 2019/627...",
  "trade_agreement": null,
  "confidence_level": "high"
}
\`\`\`

#### 3. Sugerencias de Códigos HS (Autocomplete)
\`\`\`bash
GET /api/hs-suggest?q=wine&limit=5

# Respuesta:
{
  "query": "wine",
  "suggestions": [
    {
      "hs_code": "2204.21",
      "description": "Wine of fresh grapes, in containers holding 2 l or less",
      "confidence": 0.78,
      "section": "IV"
    },
    // ... más sugerencias
  ]
}
\`\`\`

#### 4. Debug: Verificar Carga del Dataset
\`\`\`bash
GET /api/debug/load-hs

# Respuesta:
{
  "success": true,
  "total_codes": 5205,
  "sample_size": 3,
  "sample_data": [
    {
      "section": "I",
      "hscode": "01",
      "description": "Live animals",
      "parent": "",
      "level": "2"
    },
    // ... más ejemplos
  ],
  "message": "HS codes loaded successfully from local CSV"
}
\`\`\`

## 📦 Productos Argentinos Soportados

El sistema incluye 50+ productos argentinos organizados en categorías:

### Productos Agrícolas
- Soja (habas, harina, aceite)
- Maíz
- Trigo
- Girasol (semillas, aceite)
- Cebada
- Sorgo

### Carnes y Derivados
- Carne bovina (fresca y congelada)
- Carne de pollo
- Carne de cerdo
- Cueros y pieles

### Frutas
- Limones
- Peras
- Manzanas
- Uvas
- Arándanos
- Cerezas

### Vinos y Bebidas
- Vino tinto (Malbec y otras variedades)
- Vino blanco
- Vino espumoso
- Mosto de uva

### Miel y Productos Apícolas
- Miel natural
- Polen

### Biocombustibles
- Biodiesel
- Bioetanol

### Sector Automotriz
- Autopartes
- Vehículos
- Neumáticos

### Minerales y Metales
- Litio
- Aluminio
- Oro
- Plata

### Productos de Cuero
- Calzado
- Carteras y bolsos
- Marroquinería

### Textiles
- Camisetas de algodón
- Lana
- Algodón

### Farmacéuticos
- Medicamentos
- Vacunas

### Productos Tradicionales
- Yerba mate
- Aceite de oliva
- Aceitunas

### Productos del Mar
- Langostinos
- Calamares
- Merluza

## 🌍 Destinos de Exportación Soportados

El sistema incluye información detallada para los siguientes destinos:

### MERCOSUR (Arancel 0%)
- Brasil
- Paraguay
- Uruguay

### Acuerdos Bilaterales
- Chile (ACE 35)
- México (ACE 55)
- Perú (ACE 58)
- Colombia (ACE 59)

### Mercados Principales
- China
- Estados Unidos
- Unión Europea
- Rusia
- Japón
- Corea del Sur
- Vietnam
- India
- Canadá
- Egipto
- Argelia

## 📋 Cómo Agregar Nuevos Productos

### Paso 1: Agregar el Producto al Clasificador

Edita el archivo `lib/argentine-products.ts`:

\`\`\`typescript
// Encuentra la categoría apropiada o crea una nueva
export const [categoria]Products: ProductRule[] = [
  // ... productos existentes ...
  
  // Agrega tu nuevo producto
  {
    keywords: ["palabra1", "palabra2", "keyword1", "keyword2"],
    hsCode: "1234.56", // Código HS de 6 dígitos mínimo
    category: "Nombre descriptivo del producto",
    confidence: 0.92, // 0.85-0.95 para productos específicos
    notes: "Información adicional relevante (opcional)",
  },
]

// No olvides agregar la categoría a allArgentineProducts si es nueva
export const allArgentineProducts: ProductRule[] = [
  // ... categorías existentes ...
  ...[categoria]Products, // Agrega tu nueva categoría
]
\`\`\`

**Consejos para Keywords:**
- Incluye términos en español e inglés
- Usa sinónimos y variaciones comunes
- Incluye términos técnicos y coloquiales
- Ejemplo: ["soja", "soya", "soybean", "poroto"]

**Cómo Encontrar el Código HS Correcto:**
1. Consulta el Nomenclador Común del MERCOSUR (NCM): https://www.afip.gob.ar/
2. Usa la base de datos de la Organización Mundial de Aduanas: https://www.wcoomd.org/
3. Consulta Trade Map: https://www.trademap.org/
4. Verifica con un despachante de aduana

### Paso 2: Agregar Medidas Comerciales

Edita el archivo `lib/argentine-trade-data.ts`:

\`\`\`typescript
export const argentineTradeMeasures: TradeMeasure[] = [
  // ... medidas existentes ...
  
  // Agrega medidas para tu producto
  {
    id: [próximo_número], // Incrementa el ID
    productName: "Nombre del producto",
    hsCode: "1234.56", // Debe coincidir con el clasificador
    countryOrigin: "Argentina", // Siempre Argentina
    countryDestination: "País de Destino",
    tariffRate: "X%", // o "0%" si hay acuerdo comercial
    nonTariffMeasures: "Certificado fitosanitario, Inspección...",
    requiredDocuments: "Factura comercial, Certificado de origen...",
    notes: "Información adicional sobre acuerdos, cuotas, etc.",
    tradeAgreement: "MERCOSUR", // Opcional: nombre del acuerdo
    confidenceLevel: "high", // high, medium, o low
  },
]
\`\`\`

**Información Requerida por Campo:**

- **tariffRate**: Arancel aplicable (consulta en Market Access Map: https://www.macmap.org/)
- **nonTariffMeasures**: Certificados, inspecciones, registros requeridos
- **requiredDocuments**: Documentación específica necesaria
- **notes**: Acuerdos comerciales, cuotas, requisitos especiales
- **tradeAgreement**: MERCOSUR, ACE 35, ACE 55, Cuota Hilton, etc.

### Paso 3: Agregar Múltiples Destinos

Para cada producto, agrega una entrada por cada destino de exportación relevante:

\`\`\`typescript
// Ejemplo: Vino tinto a diferentes destinos
{
  id: 1,
  productName: "Vino tinto embotellado",
  hsCode: "2204.21",
  countryOrigin: "Argentina",
  countryDestination: "Brasil",
  tariffRate: "0%",
  tradeAgreement: "MERCOSUR",
  // ...
},
{
  id: 2,
  productName: "Vino tinto embotellado",
  hsCode: "2204.21",
  countryOrigin: "Argentina",
  countryDestination: "Estados Unidos",
  tariffRate: "6.3 cents/liter",
  // ...
},
{
  id: 3,
  productName: "Vino tinto embotellado",
  hsCode: "2204.21",
  countryOrigin: "Argentina",
  countryDestination: "China",
  tariffRate: "14%",
  // ...
},
\`\`\`

## 🔄 Cómo Actualizar o Eliminar Productos

### Actualizar un Producto Existente

1. **Actualizar Keywords**: Edita `lib/argentine-products.ts` y modifica el array de keywords
2. **Actualizar Código HS**: Cambia el hsCode si la clasificación cambió
3. **Actualizar Medidas**: Edita `lib/argentine-trade-data.ts` y actualiza aranceles o requisitos

### Eliminar un Producto

1. **Eliminar del Clasificador**: Comenta o elimina la entrada en `lib/argentine-products.ts`
2. **Eliminar Medidas**: Comenta o elimina todas las entradas relacionadas en `lib/argentine-trade-data.ts`

**Nota**: Es mejor comentar que eliminar para mantener un historial de cambios.

## 📚 Recursos para Información Comercial

### Organismos Argentinos
- **AFIP (Aduana Argentina)**: https://www.afip.gob.ar/
- **SENASA**: https://www.argentina.gob.ar/senasa
- **Cancillería Argentina**: https://www.cancilleria.gob.ar/
- **Cámara de Exportadores**: https://www.cera.org.ar/

### Acuerdos Comerciales
- **MERCOSUR**: https://www.mercosur.int/
- **ALADI**: https://www.aladi.org/
- **OMC**: https://www.wto.org/

### Herramientas de Investigación
- **Trade Map**: https://www.trademap.org/ (estadísticas de comercio)
- **Market Access Map**: https://www.macmap.org/ (aranceles y medidas)
- **ITC Export Potential Map**: https://exportpotential.intracen.org/

### Códigos HS
- **Organización Mundial de Aduanas**: https://www.wcoomd.org/
- **Nomenclador Común del MERCOSUR**: Disponible en AFIP

## 🏗️ Arquitectura del Sistema

\`\`\`
lib/
├── data/
│   └── harmonized-system.csv  # Dataset HS local (5000+ códigos)
├── loadHSLocal.ts             # Cargador local de códigos HS
├── argentine-products.ts      # Clasificador de productos (50+ productos)
├── argentine-trade-data.ts    # Medidas comerciales (30+ escenarios)
├── countries.ts               # Lista de países
└── pdf-generator.ts           # Generación de reportes

app/
├── api/
│   ├── classify/route.ts      # Endpoint de clasificación (usa dataset local)
│   ├── measures/route.ts      # Endpoint de medidas comerciales (con fallback)
│   ├── hs-suggest/route.ts    # API de sugerencias (autocomplete)
│   └── debug/
│       └── load-hs/route.ts   # Endpoint de debug para verificar dataset
└── page.tsx                   # Página principal

components/
├── product-analysis-form.tsx  # Formulario de análisis
├── analysis-results.tsx       # Visualización de resultados
└── hs-code-suggestions.tsx    # Componente de sugerencias HS
\`\`\`

## 🔧 Configuración Técnica

### Instalación

\`\`\`bash
# Clonar el repositorio
git clone [url-del-repo]

# Instalar dependencias
npm install

# Verificar que el dataset HS esté presente
ls -lh lib/data/harmonized-system.csv

# Ejecutar en desarrollo
npm run dev

# Verificar que el dataset se cargó correctamente
curl http://localhost:3000/api/debug/load-hs
\`\`\`

### Pruebas de los Endpoints

\`\`\`bash
# 1. Verificar carga del dataset
curl http://localhost:3000/api/debug/load-hs

# 2. Clasificar un producto
curl -X POST http://localhost:3000/api/classify \
  -H "Content-Type: application/json" \
  -d '{
    "productDescription": "miel natural frascos",
    "countryOrigin": "Argentina",
    "countryDestination": "Alemania"
  }'

# 3. Obtener medidas arancelarias
curl "http://localhost:3000/api/measures?hs_code=0409.00&destination=Alemania"

# 4. Sugerencias de códigos HS
curl "http://localhost:3000/api/hs-suggest?q=honey&limit=3"
\`\`\`

## 📊 Algoritmo de Coincidencia HS

El sistema usa un algoritmo de similitud de texto optimizado para encontrar los códigos HS más relevantes:

### Proceso de Coincidencia

1. **Carga del Dataset**: Lee el CSV local una sola vez y lo cachea en memoria
2. **Normalización**: Convierte texto a minúsculas y elimina caracteres especiales
3. **Extracción de Keywords**: Identifica palabras clave (elimina stop words en español e inglés)
4. **Similitud Jaccard**: Calcula intersección/unión de keywords
5. **Boost por Coincidencias Exactas**: Aumenta score si hay frases exactas
6. **Boost por Coincidencias Parciales**: Aumenta score por substrings largos
7. **Ranking**: Ordena por confianza y devuelve top N

### Fórmula de Score

\`\`\`
score = (jaccard * 0.4) + (exactMatch * 0.4) + (partialMatch * 0.2)

donde:
- jaccard = intersection / union de keywords
- exactMatch = keywords exactos encontrados / total keywords
- partialMatch = substrings largos encontrados / total keywords
\`\`\`

### Niveles de Confianza

- **Alta (70-100%)**: Coincidencia fuerte, descripción clara
- **Media (40-69%)**: Coincidencia razonable, puede haber ambigüedad  
- **Baja (5-39%)**: Coincidencia débil, verificar manualmente

**Importante**: Siempre verifica con un experto en comercio exterior antes de usar en operaciones reales.

## 🔄 Mejoras en el Sistema de Medidas

El endpoint `/api/measures` ahora incluye **fallback inteligente**:

1. **Búsqueda Exacta**: Busca coincidencia exacta de código HS + destino
2. **Fallback por Capítulo**: Si no hay coincidencia exacta, busca por los primeros 4 dígitos (capítulo)
3. **Respuesta Genérica**: Si no hay datos, devuelve información genérica útil

Ejemplo:
\`\`\`bash
# Código HS específico no encontrado: 0409.10
GET /api/measures?hs_code=0409.10&destination=Alemania

# Respuesta usa datos del capítulo 0409 (miel)
{
  "product_name": "Producto similar (capítulo 0409)",
  "hs_code": "0409.10",
  "tariff_rate": "Aproximado: 17.3% (verificar código específico)",
  "notes": "Datos basados en producto similar (Miel natural, código 0409.00)...",
  "confidence_level": "medium"
}
\`\`\`

## 🚨 Limitaciones y Consideraciones

1. **Sistema MVP**: Los datos son representativos pero deben verificarse con autoridades oficiales
2. **Clasificación por Similitud**: El algoritmo sugiere códigos basándose en texto; siempre verificar
3. **Datos Estáticos**: Los aranceles y requisitos pueden cambiar; actualizar periódicamente
4. **Consulta Profesional**: Siempre consultar con despachante de aduana para operaciones reales
5. **Dataset HS Local**: El dataset se carga en memoria al iniciar; reiniciar servidor después de actualizarlo
6. **Sin Llamadas Externas**: El sistema no hace llamadas a APIs externas en runtime para evitar rate limits

## 🔮 Roadmap Futuro

- [x] Integración con dataset oficial del Sistema Armonizado
- [x] Sistema de sugerencias múltiples con niveles de confianza
- [x] Carga local del dataset HS (sin dependencias externas)
- [x] Fallback inteligente por capítulo en medidas arancelarias
- [x] Endpoints de debug y sugerencias
- [ ] Integración con API de AFIP para códigos HS actualizados
- [ ] Integración con OpenAI para clasificación más precisa
- [ ] Base de datos dinámica con actualizaciones automáticas
- [ ] Calculadora de costos de exportación
- [ ] Integración con sistemas de gestión aduanera
- [ ] Alertas de cambios en aranceles y requisitos
- [ ] Soporte multiidioma

---

**Desarrollado con foco en facilitar las exportaciones argentinas al mundo** 🇦🇷🌍
