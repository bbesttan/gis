// Stunting data per province - based on SSGI 2024 (Kementerian Kesehatan RI)
// Includes 2023 data for year-over-year trend comparison

export const stuntingData = {
  metadata: {
    source: 'Survei Status Gizi Indonesia (SSGI)',
    years: [2023, 2024],
    nationalAverage: {
      2023: 21.5,
      2024: 19.8
    },
    target2025: 18.8
  },
  provinces: [
    { name: 'Aceh', code: 'AC', data: { 2023: { percentage: 31.2, children_affected: 48200 }, 2024: { percentage: 28.4, children_affected: 44100 } } },
    { name: 'Sumatera Utara', code: 'SU', data: { 2023: { percentage: 25.8, children_affected: 330000 }, 2024: { percentage: 23.2, children_affected: 316456 } } },
    { name: 'Sumatera Barat', code: 'SB', data: { 2023: { percentage: 23.4, children_affected: 42300 }, 2024: { percentage: 21.1, children_affected: 38200 } } },
    { name: 'Riau', code: 'RI', data: { 2023: { percentage: 21.3, children_affected: 55200 }, 2024: { percentage: 19.5, children_affected: 50800 } } },
    { name: 'Jambi', code: 'JA', data: { 2023: { percentage: 22.1, children_affected: 28600 }, 2024: { percentage: 20.3, children_affected: 26400 } } },
    { name: 'Sumatera Selatan', code: 'SS', data: { 2023: { percentage: 24.6, children_affected: 72100 }, 2024: { percentage: 22.8, children_affected: 67200 } } },
    { name: 'Bengkulu', code: 'BE', data: { 2023: { percentage: 22.8, children_affected: 15200 }, 2024: { percentage: 20.9, children_affected: 14000 } } },
    { name: 'Lampung', code: 'LA', data: { 2023: { percentage: 21.7, children_affected: 62300 }, 2024: { percentage: 19.9, children_affected: 57600 } } },
    { name: 'Kepulauan Bangka Belitung', code: 'BB', data: { 2023: { percentage: 18.2, children_affected: 8900 }, 2024: { percentage: 16.8, children_affected: 8200 } } },
    { name: 'Kepulauan Riau', code: 'KR', data: { 2023: { percentage: 16.8, children_affected: 14200 }, 2024: { percentage: 15.0, children_affected: 12800 } } },
    { name: 'DKI Jakarta', code: 'JK', data: { 2023: { percentage: 17.7, children_affected: 65400 }, 2024: { percentage: 16.2, children_affected: 60100 } } },
    { name: 'Jawa Barat', code: 'JB', data: { 2023: { percentage: 24.5, children_affected: 680000 }, 2024: { percentage: 22.1, children_affected: 638000 } } },
    { name: 'Jawa Tengah', code: 'JT', data: { 2023: { percentage: 23.1, children_affected: 520000 }, 2024: { percentage: 20.8, children_affected: 485893 } } },
    { name: 'DI Yogyakarta', code: 'YO', data: { 2023: { percentage: 16.4, children_affected: 18200 }, 2024: { percentage: 15.1, children_affected: 16800 } } },
    { name: 'Jawa Timur', code: 'JI', data: { 2023: { percentage: 16.5, children_affected: 460000 }, 2024: { percentage: 14.7, children_affected: 430780 } } },
    { name: 'Banten', code: 'BT', data: { 2023: { percentage: 22.4, children_affected: 225000 }, 2024: { percentage: 20.6, children_affected: 209600 } } },
    { name: 'Bali', code: 'BA', data: { 2023: { percentage: 10.2, children_affected: 14500 }, 2024: { percentage: 8.6, children_affected: 12200 } } },
    { name: 'Nusa Tenggara Barat', code: 'NB', data: { 2023: { percentage: 32.7, children_affected: 62400 }, 2024: { percentage: 30.2, children_affected: 57800 } } },
    { name: 'Nusa Tenggara Timur', code: 'NT', data: { 2023: { percentage: 39.2, children_affected: 228000 }, 2024: { percentage: 37.0, children_affected: 214143 } } },
    { name: 'Kalimantan Barat', code: 'KB', data: { 2023: { percentage: 27.8, children_affected: 48200 }, 2024: { percentage: 25.6, children_affected: 44500 } } },
    { name: 'Kalimantan Tengah', code: 'KT', data: { 2023: { percentage: 24.3, children_affected: 22800 }, 2024: { percentage: 22.1, children_affected: 20900 } } },
    { name: 'Kalimantan Selatan', code: 'KS', data: { 2023: { percentage: 26.1, children_affected: 35600 }, 2024: { percentage: 24.0, children_affected: 32800 } } },
    { name: 'Kalimantan Timur', code: 'KI', data: { 2023: { percentage: 22.5, children_affected: 28900 }, 2024: { percentage: 20.4, children_affected: 26300 } } },
    { name: 'Kalimantan Utara', code: 'KU', data: { 2023: { percentage: 24.8, children_affected: 6800 }, 2024: { percentage: 22.9, children_affected: 6300 } } },
    { name: 'Sulawesi Utara', code: 'SA', data: { 2023: { percentage: 23.1, children_affected: 19200 }, 2024: { percentage: 21.3, children_affected: 17800 } } },
    { name: 'Sulawesi Tengah', code: 'ST', data: { 2023: { percentage: 28.6, children_affected: 31200 }, 2024: { percentage: 26.4, children_affected: 28900 } } },
    { name: 'Sulawesi Selatan', code: 'SN', data: { 2023: { percentage: 27.4, children_affected: 82100 }, 2024: { percentage: 25.2, children_affected: 75800 } } },
    { name: 'Sulawesi Tenggara', code: 'SG', data: { 2023: { percentage: 30.2, children_affected: 28400 }, 2024: { percentage: 27.9, children_affected: 26300 } } },
    { name: 'Gorontalo', code: 'GO', data: { 2023: { percentage: 28.8, children_affected: 11200 }, 2024: { percentage: 26.5, children_affected: 10400 } } },
    { name: 'Sulawesi Barat', code: 'SR', data: { 2023: { percentage: 37.2, children_affected: 18600 }, 2024: { percentage: 35.4, children_affected: 17800 } } },
    { name: 'Maluku', code: 'MA', data: { 2023: { percentage: 28.4, children_affected: 18900 }, 2024: { percentage: 26.1, children_affected: 17400 } } },
    { name: 'Maluku Utara', code: 'MU', data: { 2023: { percentage: 26.7, children_affected: 12100 }, 2024: { percentage: 24.5, children_affected: 11200 } } },
    { name: 'Papua', code: 'PA', data: { 2023: { percentage: 29.8, children_affected: 38200 }, 2024: { percentage: 27.4, children_affected: 35400 } } },
    { name: 'Papua Barat', code: 'PB', data: { 2023: { percentage: 28.6, children_affected: 10800 }, 2024: { percentage: 26.2, children_affected: 9900 } } },
    { name: 'Papua Selatan', code: 'PS', data: { 2023: { percentage: 30.5, children_affected: 8200 }, 2024: { percentage: 28.1, children_affected: 7600 } } },
    { name: 'Papua Tengah', code: 'PT', data: { 2023: { percentage: 31.8, children_affected: 12400 }, 2024: { percentage: 29.3, children_affected: 11500 } } },
    { name: 'Papua Pegunungan', code: 'PP', data: { 2023: { percentage: 34.2, children_affected: 14800 }, 2024: { percentage: 31.6, children_affected: 13700 } } },
    { name: 'Papua Barat Daya', code: 'PD', data: { 2023: { percentage: 32.8, children_affected: 7200 }, 2024: { percentage: 30.5, children_affected: 6700 } } }
  ]
}

// Helper: get color based on stunting percentage
export function getStuntingColor(percentage) {
  if (percentage < 10) return '#60A5FA'   // Sky Blue - Rendah
  if (percentage <= 20) return '#2563EB'  // Blue - Sedang
  return '#1F2937'                        // Navy - Tinggi
}

// Helper: get category label
export function getStuntingCategory(percentage) {
  if (percentage < 10) return 'Rendah'
  if (percentage <= 20) return 'Sedang'
  return 'Tinggi'
}

// Helper: get fill opacity based on percentage (higher = more opaque)
export function getStuntingOpacity(percentage) {
  const min = 0.4
  const max = 0.9
  const clampedPct = Math.min(Math.max(percentage, 0), 50)
  return min + (clampedPct / 50) * (max - min)
}
