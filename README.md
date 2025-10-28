# ExportAIdor - Sistema de Inteligencia Comercial para Exportaciones Argentinas

ExportAIdor es una plataforma MVP diseñada específicamente para analizar y facilitar las exportaciones argentinas, proporcionando información sobre códigos HS, aranceles, medidas no arancelarias y requisitos documentales según los acuerdos comerciales vigentes.

## 🇦🇷 Enfoque en Argentina

Este sistema está **exclusivamente diseñado para exportaciones con origen en Argentina**. El país de origen está fijo en Argentina y no puede modificarse, reflejando la especialización del sistema en:

- Productos de exportación argentinos
- Acuerdos comerciales argentinos (MERCOSUR, ACE 35, ACE 55, etc.)
- Requisitos de SENASA y otras autoridades argentinas
- Principales destinos de exportación argentina

## 🚀 Características Principales

- **Clasificación Automática con Dataset Real**: Utiliza una base de datos estática de códigos HS con búsqueda inteligente
- **Sugerencias de Códigos HS**: Muestra los 3 códigos HS más relevantes con niveles de confianza
- **Base de Datos de Medidas Comerciales**: 30+ escenarios reales de exportación argentina
- **Acuerdos Comerciales**: Información sobre MERCOSUR, ACE 35, ACE 55, Cuota Hilton, y más
- **Requisitos Documentales**: Documentación específica requerida por SENASA y autoridades de destino
- **Exportación PDF**: Genera reportes profesionales de análisis de exportación
- **Arquitectura Escalable**: Diseñado para agregar fácilmente nuevos productos y destinos

## 🆕 Sistema de Clasificación HS

El sistema utiliza un **dataset estático de códigos HS** almacenado como constante TypeScript para clasificación rápida y confiable:

### Cómo Funciona

1. **Dataset Estático**: Todos los códigos HS están en `/data/hs-data.ts` como constante TypeScript
2. **Sin Dependencias Externas**: No requiere llamadas a APIs externas, archivos CSV, ni acceso a GitHub en runtime
3. **Búsqueda Inteligente**: Usa algoritmos de coincidencia de texto para encontrar los códigos más relevantes
4. **Múltiples Sugerencias**: Muestra los 3 mejores matches con niveles de confianza
5. **Rendimiento Óptimo**: Carga instantánea, sin latencia de red

### Actualizar el Dataset HS

El dataset está en: `/data/hs-data.ts`

**Para actualizar o agregar códigos HS:**

1. Abre el archivo `/data/hs-data.ts`

2. Agrega nuevos códigos al array `hsData`:
   \`\`\`typescript
   export const hsData: HSItem[] = [
     // ... códigos existentes ...
     
     // Nuevo código
     { 
       section: "II", 
       code: "1008.50", 
       description: "Quinoa", 
       chapter: "10" 
     },
   ]
   \`\`\`

3. Guarda el archivo - los cambios se aplican automáticamente en desarrollo

**Estructura de cada entrada:**
- `section`: Sección del Sistema Armonizado (I, II, III, etc.)
- `code`: Código HS (2, 4, o 6 dígitos)
- `description`: Descripción del producto en inglés
- `chapter`: Capítulo de 2 dígitos

**Fuentes para códigos HS:**
- AFIP - Nomenclador Común del MERCOSUR: https://www.afip.gob.ar/
- WCO - Harmonized System Database: https://www.wcoomd.org/

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
  "hs_code": "040900",
  "confidence": 0.95,
  "explanation": "Clasificado como: Natural honey",
  "alternatives": [
    {
      "hs_code": "040900",
      "description": "Natural honey",
      "confidence": 0.95
    },
    // ... más alternativas
  ]
}
\`\`\`

#### 2. Obtener Medidas Arancelarias
\`\`\`bash
GET /api/measures?hs_code=040900&destination=Alemania

# Respuesta:
{
  "id": 13,
  "productName": "Miel natural",
  "hsCode": "040900",
  "countryOrigin": "Argentina",
  "countryDestination": "Unión Europea",
  "tariffRate": "17.3%",
  "nonTariffMeasures": "Certificado sanitario, Análisis de residuos...",
  "requiredDocuments": "Factura comercial, Certificado sanitario SENASA...",
  "notes": "Requiere cumplir con regulaciones EU 2019/627...",
  "tradeAgreement": null,
  "confidenceLevel": "high"
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
      "hs_code": "220421",
      "description": "Wine in containers holding 2 litres or less",
      "confidence": 0.95,
      "section": "IV",
      "chapter": "22"
    },
    // ... más sugerencias
  ]
}
\`\`\`

#### 4. Debug: Verificar Dataset HS
\`\`\`bash
GET /api/debug/load-hs

# Respuesta:
{
  "success": true,
  "total_codes": 100,
  "sample_size": 5,
  "sample_data": [
    {
      "section": "I",
      "code": "01",
      "description": "Live animals",
      "chapter": "01"
    },
    // ... más ejemplos
  ],
  "message": "HS codes loaded successfully from static data"
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

### Paso 1: Agregar Códigos HS al Dataset

Edita el archivo `data/hs-data.ts`:

\`\`\`typescript
export const hsData: HSItem[] = [
  // ... códigos existentes ...
  
  // Agrega tu nuevo código HS
  { 
    section: "II",  // Sección del Sistema Armonizado
    code: "1008.50",  // Código HS (2, 4, o 6 dígitos)
    description: "Quinoa",  // Descripción en inglés
    chapter: "10"  // Capítulo de 2 dígitos
  },
]
\`\`\`

**Cómo Encontrar el Código HS Correcto:**
1. Consulta el Nomenclador Común del MERCOSUR (NCM): https://www.afip.gob.ar/
2. Usa la base de datos de la Organización Mundial de Aduanas: https://www.wcoomd.org/
3. Consulta Trade Map: https://www.trademap.org/
4. Verifica con un despachante de aduana

### Paso 2: Agregar Reglas de Clasificación (Opcional)

Si quieres mejorar la clasificación automática, edita `lib/argentine-products.ts`:

\`\`\`typescript
// Encuentra la categoría apropiada o crea una nueva
export const [categoria]Products: ProductRule[] = [
  // ... productos existentes ...
  
  // Agrega tu nuevo producto
  {
    keywords: ["quinoa", "quinua", "grano andino", "chenopodium"],
    hsCode: "1008.50",
    category: "Quinoa",
    confidence: 0.93,
    notes: "Producto emergente de exportación argentina",
  },
]
\`\`\`

### Paso 3: Agregar Medidas Comerciales

Edita el archivo `lib/argentine-trade-data.ts`:

\`\`\`typescript
export const argentineTradeMeasures: TradeMeasure[] = [
  // ... medidas existentes ...
  
  // Agrega medidas para tu producto
  {
    id: [próximo_número],
    productName: "Quinoa",
    hsCode: "1008.50",
    countryOrigin: "Argentina",
    countryDestination: "Estados Unidos",
    tariffRate: "1.1%",
    nonTariffMeasures: "Certificado fitosanitario SENASA, Inspección APHIS",
    requiredDocuments: "Factura comercial, Certificado fitosanitario, Certificado de origen",
    notes: "Producto emergente. Verificar requisitos específicos de cada estado.",
    confidenceLevel: "high",
  },
]
\`\`\`

## 🏗️ Arquitectura del Sistema

\`\`\`
data/
└── hs-data.ts                 # Dataset HS estático (100+ códigos)

types/
└── hs.ts                      # Definiciones de tipos TypeScript

lib/
├── hs-matcher.ts              # Lógica de búsqueda y matching de códigos HS
├── argentine-products.ts      # Reglas de clasificación (50+ productos)
├── argentine-trade-data.ts    # Medidas comerciales (30+ escenarios)
├── countries.ts               # Lista de países
└── pdf-generator.ts           # Generación de reportes PDF

app/
├── api/
│   ├── classify/route.ts      # Endpoint de clasificación
│   ├── measures/route.ts      # Endpoint de medidas comerciales
│   ├── hs-suggest/route.ts    # API de sugerencias (autocomplete)
│   └── debug/
│       └── load-hs/route.ts   # Endpoint de debug
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
curl "http://localhost:3000/api/measures?hs_code=040900&destination=Alemania"

# 4. Sugerencias de códigos HS
curl "http://localhost:3000/api/hs-suggest?q=honey&limit=3"
\`\`\`

## 📊 Algoritmo de Búsqueda HS

El sistema usa un algoritmo de búsqueda optimizado implementado en `lib/hs-matcher.ts`:

### Proceso de Búsqueda

1. **Normalización**: Convierte texto a minúsculas
2. **Extracción de Keywords**: Identifica palabras clave (mínimo 3 caracteres)
3. **Scoring**:
   - Coincidencia exacta: +100 puntos
   - Contiene query completo: +50 puntos
   - Coincidencia de keyword: +10 puntos
   - Coincidencia en límite de palabra: +5 puntos adicionales
4. **Ranking**: Ordena por score y devuelve top N resultados

### Niveles de Confianza

- **Alta (85-95%)**: Coincidencia fuerte, descripción clara
- **Media (75-84%)**: Coincidencia razonable
- **Baja (50-74%)**: Coincidencia débil, verificar manualmente

**Importante**: Siempre verifica con un experto en comercio exterior antes de usar en operaciones reales.

## 🔄 Sistema de Medidas con Fallback

El endpoint `/api/measures` incluye **fallback inteligente**:

1. **Búsqueda Exacta**: Busca coincidencia exacta de código HS + destino
2. **Fallback por Capítulo**: Si no hay coincidencia exacta, busca por los primeros 4 dígitos
3. **Respuesta Genérica**: Si no hay datos, devuelve información genérica útil

## 🚨 Limitaciones y Consideraciones

1. **Sistema MVP**: Los datos son representativos pero deben verificarse con autoridades oficiales
2. **Dataset Limitado**: Contiene 100+ códigos HS principales, no todos los códigos existentes
3. **Búsqueda por Texto**: El algoritmo sugiere códigos basándose en coincidencia de texto
4. **Datos Estáticos**: Los aranceles y requisitos pueden cambiar; actualizar periódicamente
5. **Consulta Profesional**: Siempre consultar con despachante de aduana para operaciones reales
6. **Sin IA**: Usa búsqueda por texto, no inteligencia artificial (para activar IA, ver comentarios en `/app/api/classify/route.ts`)

## 🔮 Roadmap Futuro

- [x] Dataset estático de códigos HS
- [x] Sistema de búsqueda y matching
- [x] Sugerencias múltiples con niveles de confianza
- [x] Fallback inteligente por capítulo
- [x] Endpoints de debug y sugerencias
- [ ] Expandir dataset HS a 1000+ códigos
- [ ] Integración con OpenAI para clasificación más precisa (requiere tarjeta de crédito en Vercel)
- [ ] Integración con API de AFIP para códigos HS actualizados
- [ ] Base de datos dinámica con actualizaciones automáticas
- [ ] Calculadora de costos de exportación
- [ ] Integración con sistemas de gestión aduanera
- [ ] Alertas de cambios en aranceles y requisitos
- [ ] Soporte multiidioma

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

---

**Desarrollado con foco en facilitar las exportaciones argentinas al mundo** 🇦🇷🌍
