# ExportAIdor - Sistema de Inteligencia Comercial para Exportaciones Argentinas

ExportAIdor es una plataforma MVP diseñada específicamente para analizar y facilitar las exportaciones argentinas, proporcionando información sobre códigos HS, aranceles, medidas no arancelarias y requisitos documentales según los acuerdos comerciales vigentes.

## 🇦🇷 Enfoque en Argentina

Este sistema está **exclusivamente diseñado para exportaciones con origen en Argentina**. El país de origen está fijo en Argentina y no puede modificarse, reflejando la especialización del sistema en:

- Productos de exportación argentinos
- Acuerdos comerciales argentinos (MERCOSUR, ACE 35, ACE 55, etc.)
- Requisitos de SENASA y otras autoridades argentinas
- Principales destinos de exportación argentina

## 🚀 Características Principales

- **Clasificación Automática de Productos**: Sistema basado en reglas que clasifica productos argentinos en códigos HS
- **Base de Datos de Medidas Comerciales**: 30+ escenarios reales de exportación argentina
- **Acuerdos Comerciales**: Información sobre MERCOSUR, ACE 35, ACE 55, Cuota Hilton, y más
- **Requisitos Documentales**: Documentación específica requerida por SENASA y autoridades de destino
- **Exportación PDF**: Genera reportes profesionales de análisis de exportación
- **Arquitectura Escalable**: Diseñado para agregar fácilmente nuevos productos y destinos

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
├── argentine-products.ts      # Clasificador de productos (50+ productos)
├── argentine-trade-data.ts    # Medidas comerciales (30+ escenarios)
├── hs-classifier.ts           # Lógica de clasificación
├── countries.ts               # Lista de países (actualizada)
└── pdf-generator.ts           # Generación de reportes

app/
├── api/
│   ├── classify/route.ts      # Endpoint de clasificación
│   └── measures/route.ts      # Endpoint de medidas comerciales
└── page.tsx                   # Página principal

components/
├── product-analysis-form.tsx  # Formulario de análisis
└── analysis-results.tsx       # Visualización de resultados
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
\`\`\`

### Variables de Entorno (Opcional)

Para usar clasificación con IA real en lugar del sistema basado en reglas:

\`\`\`env
# Agregar tarjeta de crédito en Vercel para usar AI Gateway
# No se requieren variables de entorno adicionales
\`\`\`

## 🎯 Casos de Uso

### Caso 1: Exportador de Vino a Brasil
1. Selecciona "Brasil" como destino
2. Describe: "Vino Malbec tinto embotellado 750ml"
3. Obtiene: Código HS 2204.21, arancel 0% (MERCOSUR), requisitos MAPA

### Caso 2: Exportador de Carne a China
1. Selecciona "China" como destino
2. Describe: "Carne bovina congelada deshuesada"
3. Obtiene: Código HS 0202.30, arancel 12%, requisitos GACC y SENASA

### Caso 3: Exportador de Limones a USA
1. Selecciona "Estados Unidos" como destino
2. Describe: "Limones frescos"
3. Obtiene: Código HS 0805.50, arancel 1.8 cents/kg, tratamiento de frío requerido

## 📊 Acuerdos Comerciales Implementados

### MERCOSUR
- **Países**: Brasil, Paraguay, Uruguay
- **Arancel**: 0% para la mayoría de productos
- **Documentos**: Certificado de origen MERCOSUR

### ACE 35 (Argentina-Chile)
- **Arancel**: 0% para productos incluidos
- **Documentos**: Certificado de origen ACE 35

### ACE 55 (Argentina-México)
- **Arancel**: Variable según producto y cuota
- **Documentos**: Certificado de origen ACE 55

### Cuota Hilton (Argentina-UE)
- **Producto**: Carne bovina de alta calidad
- **Cuota**: 29,000 toneladas anuales
- **Arancel**: 0% dentro de cuota, 12.8% + €303.4/100kg fuera

## 🚨 Limitaciones y Consideraciones

1. **Sistema MVP**: Los datos son representativos pero deben verificarse con autoridades oficiales
2. **Clasificación Basada en Reglas**: Para producción, considerar integración con IA real
3. **Datos Estáticos**: Los aranceles y requisitos pueden cambiar; actualizar periódicamente
4. **Consulta Profesional**: Siempre consultar con despachante de aduana para operaciones reales

## 🔮 Roadmap Futuro

- [ ] Integración con API de AFIP para códigos HS actualizados
- [ ] Integración con OpenAI para clasificación más precisa
- [ ] Base de datos dinámica con actualizaciones automáticas
- [ ] Calculadora de costos de exportación
- [ ] Integración con sistemas de gestión aduanera
- [ ] Alertas de cambios en aranceles y requisitos
- [ ] Soporte multiidioma

## 📞 Soporte

Para consultas sobre exportaciones argentinas:
- **Cámara de Exportadores**: https://www.cera.org.ar/
- **AFIP**: https://www.afip.gob.ar/
- **SENASA**: https://www.argentina.gob.ar/senasa

## 📄 Licencia

[Especificar licencia]

---

**Desarrollado con foco en facilitar las exportaciones argentinas al mundo** 🇦🇷🌍
