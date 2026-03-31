interface PDFData {
  hsCode: string
  confidence: number
  explanation: string
  tariffRate: string
  nonTariffMeasures: string
  requiredDocuments: string
  notes: string
  productName: string
  countryOrigin: string
  countryDestination: string
  productDescription: string
}

export async function generatePDF(data: PDFData) {
  // Create a printable HTML document and open it in a new window for printing/saving as PDF
  const confidencePercent = Math.round(data.confidence * 100)
  let confidenceLevel = "Baja"
  if (data.confidence >= 0.8) {
    confidenceLevel = "Alta"
  } else if (data.confidence >= 0.5) {
    confidenceLevel = "Media"
  }

  const measuresHtml = data.nonTariffMeasures
    .split(",")
    .map((m) => `<li>${m.trim()}</li>`)
    .join("")

  const documentsHtml = data.requiredDocuments
    .split(",")
    .map((d) => `<li>${d.trim()}</li>`)
    .join("")

  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ExportAIdor - Reporte ${data.hsCode}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #0f172a;
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
    }
    .header {
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: white;
      padding: 30px;
      margin: -40px -40px 30px -40px;
    }
    .header h1 {
      font-size: 28px;
      margin-bottom: 5px;
    }
    .header p {
      opacity: 0.9;
      font-size: 14px;
    }
    .date {
      color: #64748b;
      font-size: 12px;
      margin-bottom: 20px;
    }
    .section {
      margin-bottom: 25px;
    }
    .section-title {
      color: #2563eb;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 10px;
      padding-bottom: 5px;
      border-bottom: 2px solid #e2e8f0;
    }
    .hs-code {
      font-size: 24px;
      font-weight: bold;
      font-family: monospace;
      color: #0f172a;
    }
    .confidence {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      margin-left: 10px;
    }
    .confidence.alta {
      background: #dcfce7;
      color: #166534;
    }
    .confidence.media {
      background: #fef3c7;
      color: #92400e;
    }
    .confidence.baja {
      background: #fee2e2;
      color: #991b1b;
    }
    .info-row {
      display: flex;
      margin-bottom: 8px;
    }
    .info-label {
      font-weight: 600;
      min-width: 150px;
      color: #475569;
    }
    .info-value {
      flex: 1;
    }
    .tariff {
      font-size: 20px;
      font-weight: bold;
      color: #0f172a;
    }
    ul {
      list-style: disc;
      padding-left: 20px;
    }
    li {
      margin-bottom: 5px;
    }
    .notes {
      background: #f8fafc;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #2563eb;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      color: #64748b;
      font-size: 12px;
    }
    @media print {
      body {
        padding: 20px;
      }
      .header {
        margin: -20px -20px 20px -20px;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .confidence {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>ExportAIdor</h1>
    <p>Reporte de Análisis de Exportación</p>
  </div>

  <p class="date">Fecha: ${new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}</p>

  <div class="section">
    <h2 class="section-title">Información del Producto</h2>
    <div class="info-row">
      <span class="info-label">País de Origen:</span>
      <span class="info-value">${data.countryOrigin}</span>
    </div>
    <div class="info-row">
      <span class="info-label">País de Destino:</span>
      <span class="info-value">${data.countryDestination}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Descripción:</span>
      <span class="info-value">${data.productDescription}</span>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Código HS (Sistema Armonizado)</h2>
    <p>
      <span class="hs-code">${data.hsCode}</span>
      <span class="confidence ${confidenceLevel.toLowerCase()}">${confidencePercent}% - ${confidenceLevel}</span>
    </p>
    <p style="margin-top: 10px; color: #475569;">${data.explanation}</p>
  </div>

  <div class="section">
    <h2 class="section-title">Arancel de Importación</h2>
    <p class="tariff">${data.tariffRate}</p>
  </div>

  <div class="section">
    <h2 class="section-title">Medidas No Arancelarias</h2>
    <ul>${measuresHtml}</ul>
  </div>

  <div class="section">
    <h2 class="section-title">Documentación Requerida</h2>
    <ul>${documentsHtml}</ul>
  </div>

  ${
    data.notes
      ? `
  <div class="section">
    <h2 class="section-title">Notas Importantes</h2>
    <div class="notes">${data.notes}</div>
  </div>
  `
      : ""
  }

  <div class="footer">
    <p>Generado por ExportAIdor - Inteligencia Comercial para Exportaciones</p>
    <p>Este documento es informativo y no constituye asesoramiento legal.</p>
  </div>

  <script>
    window.onload = function() {
      window.print();
    }
  </script>
</body>
</html>
`

  // Open in new window for print/save as PDF
  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(htmlContent)
    printWindow.document.close()
  }
}
