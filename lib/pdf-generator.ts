import jsPDF from "jspdf"

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

export function generatePDF(data: PDFData) {
  const doc = new jsPDF()

  // Set up colors
  const primaryColor: [number, number, number] = [37, 99, 235] // Blue-600
  const textColor: [number, number, number] = [15, 23, 42] // Slate-900
  const mutedColor: [number, number, number] = [100, 116, 139] // Slate-500

  // Header
  doc.setFillColor(...primaryColor)
  doc.rect(0, 0, 210, 40, "F")

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.setFont("helvetica", "bold")
  doc.text("ExportAIdor", 20, 20)

  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  doc.text("Reporte de Análisis de Exportación", 20, 30)

  // Reset text color
  doc.setTextColor(...textColor)

  let yPos = 55

  // Date
  doc.setFontSize(10)
  doc.setTextColor(...mutedColor)
  doc.text(`Fecha: ${new Date().toLocaleDateString("es-ES")}`, 20, yPos)
  yPos += 10

  // Product Information Section
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(...primaryColor)
  doc.text("Información del Producto", 20, yPos)
  yPos += 8

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(...textColor)

  doc.text(`País de Origen: ${data.countryOrigin}`, 20, yPos)
  yPos += 6
  doc.text(`País de Destino: ${data.countryDestination}`, 20, yPos)
  yPos += 6

  // Product description with text wrapping
  const descriptionLines = doc.splitTextToSize(`Descripción: ${data.productDescription}`, 170)
  doc.text(descriptionLines, 20, yPos)
  yPos += descriptionLines.length * 6 + 5

  // HS Code Section
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(...primaryColor)
  doc.text("Código HS (Sistema Armonizado)", 20, yPos)
  yPos += 8

  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(...textColor)
  doc.text(data.hsCode, 20, yPos)
  yPos += 8

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(...mutedColor)
  const confidencePercent = Math.round(data.confidence * 100)
  let confidenceText = `Confianza: ${confidencePercent}%`
  if (data.confidence >= 0.8) {
    confidenceText += " (Alta)"
  } else if (data.confidence >= 0.5) {
    confidenceText += " (Media)"
  } else {
    confidenceText += " (Baja)"
  }
  doc.text(confidenceText, 20, yPos)
  yPos += 8

  doc.setTextColor(...textColor)
  const explanationLines = doc.splitTextToSize(data.explanation, 170)
  doc.text(explanationLines, 20, yPos)
  yPos += explanationLines.length * 5 + 8

  // Tariff Rate Section
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(...primaryColor)
  doc.text("Arancel de Importación", 20, yPos)
  yPos += 8

  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(...textColor)
  doc.text(data.tariffRate, 20, yPos)
  yPos += 10

  // Check if we need a new page
  if (yPos > 250) {
    doc.addPage()
    yPos = 20
  }

  // Non-Tariff Measures Section
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(...primaryColor)
  doc.text("Medidas No Arancelarias", 20, yPos)
  yPos += 8

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(...textColor)

  const measures = data.nonTariffMeasures.split(",")
  for (const measure of measures) {
    if (yPos > 270) {
      doc.addPage()
      yPos = 20
    }
    doc.circle(22, yPos - 1.5, 1, "F")
    const measureLines = doc.splitTextToSize(measure.trim(), 165)
    doc.text(measureLines, 26, yPos)
    yPos += measureLines.length * 5 + 2
  }

  yPos += 5

  // Required Documents Section
  if (yPos > 250) {
    doc.addPage()
    yPos = 20
  }

  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(...primaryColor)
  doc.text("Documentación Requerida", 20, yPos)
  yPos += 8

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(...textColor)

  const documents = data.requiredDocuments.split(",")
  for (const document of documents) {
    if (yPos > 270) {
      doc.addPage()
      yPos = 20
    }
    doc.circle(22, yPos - 1.5, 1, "F")
    const docLines = doc.splitTextToSize(document.trim(), 165)
    doc.text(docLines, 26, yPos)
    yPos += docLines.length * 5 + 2
  }

  // Notes Section
  if (data.notes) {
    yPos += 5

    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }

    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(...primaryColor)
    doc.text("Notas Importantes", 20, yPos)
    yPos += 8

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...textColor)

    const notesLines = doc.splitTextToSize(data.notes, 170)
    doc.text(notesLines, 20, yPos)
  }

  // Footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(...mutedColor)
    doc.text(`Página ${i} de ${pageCount}`, 105, 290, { align: "center" })
    doc.text("Generado por ExportAIdor - Inteligencia Comercial para Exportaciones", 105, 285, {
      align: "center",
    })
  }

  // Save the PDF
  const fileName = `ExportAIdor_${data.hsCode.replace(".", "_")}_${new Date().getTime()}.pdf`
  doc.save(fileName)
}
