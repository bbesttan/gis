// Mapping from GeoJSON Propinsi names to our stunting data province names
// The GeoJSON uses old/official names while our data uses modern common names

export const geoJsonToProvinceMap = {
  'DI. ACEH': 'Aceh',
  'SUMATERA UTARA': 'Sumatera Utara',
  'SUMATERA BARAT': 'Sumatera Barat',
  'RIAU': 'Riau',
  'JAMBI': 'Jambi',
  'SUMATERA SELATAN': 'Sumatera Selatan',
  'BENGKULU': 'Bengkulu',
  'LAMPUNG': 'Lampung',
  'BANGKA BELITUNG': 'Kepulauan Bangka Belitung',
  'DKI JAKARTA': 'DKI Jakarta',
  'JAWA BARAT': 'Jawa Barat',
  'JAWA TENGAH': 'Jawa Tengah',
  'DAERAH ISTIMEWA YOGYAKARTA': 'DI Yogyakarta',
  'JAWA TIMUR': 'Jawa Timur',
  'PROBANTEN': 'Banten',
  'BALI': 'Bali',
  'NUSATENGGARA BARAT': 'Nusa Tenggara Barat',
  'NUSA TENGGARA TIMUR': 'Nusa Tenggara Timur',
  'KALIMANTAN BARAT': 'Kalimantan Barat',
  'KALIMANTAN TENGAH': 'Kalimantan Tengah',
  'KALIMANTAN SELATAN': 'Kalimantan Selatan',
  'KALIMANTAN TIMUR': 'Kalimantan Timur',
  'SULAWESI UTARA': 'Sulawesi Utara',
  'SULAWESI TENGAH': 'Sulawesi Tengah',
  'SULAWESI SELATAN': 'Sulawesi Selatan',
  'SULAWESI TENGGARA': 'Sulawesi Tenggara',
  'GORONTALO': 'Gorontalo',
  'MALUKU': 'Maluku',
  'MALUKU UTARA': 'Maluku Utara',
  'IRIAN JAYA BARAT': 'Papua Barat',
  'IRIAN JAYA TENGAH': 'Papua',
  'IRIAN JAYA TIMUR': 'Papua'
}

// Reverse map for lookups
export const provinceToGeoJsonMap = {}
for (const [geoName, provName] of Object.entries(geoJsonToProvinceMap)) {
  if (!provinceToGeoJsonMap[provName]) {
    provinceToGeoJsonMap[provName] = []
  }
  provinceToGeoJsonMap[provName].push(geoName)
}
