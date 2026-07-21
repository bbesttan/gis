// Composable for generating WhatsApp deep links with contextual messages

const WA_NUMBER = '6281234567890' // Placeholder - ganti dengan nomor Admin sebenarnya

export function useWhatsApp() {
  /**
   * Generate a WhatsApp URL with a pre-filled message
   * @param {string|null} provinceName - Province name for contextual message
   * @param {number|null} percentage - Stunting percentage for context
   * @returns {string} WhatsApp deep link URL
   */
  function generateWAUrl(provinceName = null, percentage = null) {
    let message = ''

    if (provinceName) {
      message = `Halo Admin, saya ingin konsultasi terkait data stunting di Wilayah *${provinceName}*`
      if (percentage !== null) {
        message += ` (prevalensi: ${percentage}%)`
      }
      message += '. Mohon informasi bantuan/penanganan yang tersedia.'
    } else {
      message = 'Halo Admin, saya ingin konsultasi mengenai program penanganan stunting. Mohon bantuannya.'
    }

    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/${WA_NUMBER}?text=${encodedMessage}`
  }

  /**
   * Open WhatsApp with contextual message
   */
  function openWhatsApp(provinceName = null, percentage = null) {
    const url = generateWAUrl(provinceName, percentage)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return {
    generateWAUrl,
    openWhatsApp,
    WA_NUMBER
  }
}
