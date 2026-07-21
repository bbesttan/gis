import * as XLSX from 'xlsx'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export function useExport() {
  /**
   * Export array of objects to CSV file
   */
  function exportToCSV(data, filename = 'data-stunting.csv') {
    if (!data || !data.length) return false
    const worksheet = XLSX.utils.json_to_sheet(data)
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet)
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    return true
  }

  /**
   * Export array of objects to Excel (.xlsx) file
   */
  function exportToExcel(data, filename = 'data-stunting.xlsx', sheetName = 'Data Balita') {
    if (!data || !data.length) return false
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
    XLSX.writeFile(workbook, filename)
    return true
  }

  /**
   * Export a DOM element to PNG Image
   */
  async function exportElementToPNG(elementOrId, filename = 'gis-map-export.png') {
    let element = typeof elementOrId === 'string' ? document.getElementById(elementOrId) : elementOrId
    if (!element) return false

    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      scale: 2,
      backgroundColor: null
    })

    const image = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = image
    link.download = filename
    link.click()
    return true
  }

  /**
   * Export a DOM element to PDF Document
   */
  async function exportElementToPDF(elementOrId, filename = 'gis-stunting-report.pdf', title = 'Laporan GIS Stunting') {
    let element = typeof elementOrId === 'string' ? document.getElementById(elementOrId) : elementOrId
    if (!element) return false

    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 1.5,
      backgroundColor: '#0F172A'
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgWidth = 190
    const pageHeight = 295
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    let position = 10

    pdf.setFontSize(14)
    pdf.text(title, 10, 10)
    position = 15

    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save(filename)
    return true
  }

  /**
   * Trigger browser print
   */
  function printWindow() {
    window.print()
  }

  return {
    exportToCSV,
    exportToExcel,
    exportElementToPNG,
    exportElementToPDF,
    printWindow
  }
}
