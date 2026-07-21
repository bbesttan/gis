import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  mockKecamatan,
  mockDesa,
  mockPosyandu,
  mockPuskesmas,
  mockBalitaList,
  mockYearlyTrend
} from '../data/mockGisData.js'
import { stuntingData, getStuntingColor, getStuntingCategory, getStuntingOpacity } from '../data/stuntingData.js'
import { geoJsonToProvinceMap } from '../data/provinceMapping.js'

export const useStuntingStore = defineStore('stunting', () => {
  // Navigation State
  const activeTab = ref('map') // 'map' | 'dashboard' | 'table' | 'hotspot'

  // Timeline & Filter State
  const selectedYear = ref(2024)
  const selectedMonth = ref('all')
  const selectedKecamatan = ref('all')
  const selectedDesa = ref('all')
  const selectedPosyandu = ref('all')
  const selectedPuskesmas = ref('all')
  const selectedGender = ref('all')
  const selectedStatusGizi = ref('all')
  const selectedStatusStunting = ref('all')
  const selectedAgeGroup = ref('all') // '0-6', '6-12', '12-24', '24-59'
  const searchQuery = ref('')
  const isFilterExpanded = ref(false)

  // GIS Map Layer Settings
  const activeBasemap = ref('dark') // 'dark' | 'osm' | 'satellite' | 'terrain' | 'light'
  const showChoropleth = ref(true)
  const choroplethLevel = ref('desa') // 'kecamatan' | 'desa' | 'provinsi'
  const showHeatmap = ref(false)
  const showMarkers = ref(true)
  const showCluster = ref(true)
  const showPuskesmasBuffer = ref(true)
  const bufferRadiusKm = ref(3)

  // Selection & Modal States
  const selectedBalita = ref(null)
  const isBalitaModalOpen = ref(false)
  const selectedRegion = ref(null)
  const isRegionDrawerOpen = ref(false)
  const regionType = ref('desa') // 'desa' | 'kecamatan' | 'provinsi'

  // Data Loading & Map State
  const geoJsonData = ref(null)
  const isLoading = ref(false)
  const mapInstance = ref(null)

  // Baseline Relational Data
  const kecamatanList = ref(mockKecamatan)
  const desaList = ref(mockDesa)
  const posyanduList = ref(mockPosyandu)
  const puskesmasList = ref(mockPuskesmas)
  const balitaList = ref(mockBalitaList)
  const yearlyTrend = ref(mockYearlyTrend)

  // Getters
  const availableYears = [2022, 2023, 2024, 2025]
  const availableMonths = [
    { value: 'all', label: 'Semua Bulan' },
    { value: 1, label: 'Januari' },
    { value: 2, label: 'Februari' },
    { value: 3, label: 'Maret' },
    { value: 4, label: 'April' },
    { value: 5, label: 'Mei' },
    { value: 6, label: 'Juni' },
    { value: 7, label: 'Juli' },
    { value: 8, label: 'Agustus' },
    { value: 9, label: 'September' },
    { value: 10, label: 'Oktober' },
    { value: 11, label: 'November' },
    { value: 12, label: 'Desember' }
  ]

  // Filtered Balita List
  const filteredBalita = computed(() => {
    return balitaList.value.filter(b => {
      // Search Query filter (matches Name, Parent, NIK, Desa, Kecamatan, Posyandu)
      if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase()
        const matchesQuery =
          b.name.toLowerCase().includes(q) ||
          b.parentName.toLowerCase().includes(q) ||
          b.nik.includes(q) ||
          b.desa.toLowerCase().includes(q) ||
          b.kecamatan.toLowerCase().includes(q) ||
          b.posyandu.toLowerCase().includes(q)
        if (!matchesQuery) return false
      }

      // Year filter
      if (b.year && b.year !== selectedYear.value) return false

      // Month filter
      if (selectedMonth.value !== 'all' && b.month !== Number(selectedMonth.value)) return false

      // Location filters
      if (selectedKecamatan.value !== 'all' && b.kecamatan !== selectedKecamatan.value) return false
      if (selectedDesa.value !== 'all' && b.desa !== selectedDesa.value) return false
      if (selectedPosyandu.value !== 'all' && b.posyandu !== selectedPosyandu.value) return false
      if (selectedPuskesmas.value !== 'all' && b.puskesmas !== selectedPuskesmas.value) return false

      // Demographic filters
      if (selectedGender.value !== 'all' && b.gender !== selectedGender.value) return false
      if (selectedStatusGizi.value !== 'all' && b.statusGizi !== selectedStatusGizi.value) return false
      if (selectedStatusStunting.value !== 'all' && b.statusStunting !== selectedStatusStunting.value) return false

      // Age group filter
      if (selectedAgeGroup.value !== 'all') {
        const age = b.ageMonths
        if (selectedAgeGroup.value === '0-6' && age > 6) return false
        if (selectedAgeGroup.value === '6-12' && (age <= 6 || age > 12)) return false
        if (selectedAgeGroup.value === '12-24' && (age <= 12 || age > 24)) return false
        if (selectedAgeGroup.value === '24-59' && (age <= 24 || age > 59)) return false
      }

      return true
    })
  })

  // Dynamic Dashboard Stats
  const totalBalitaCount = computed(() => filteredBalita.value.length || 3600)

  const stuntingCount = computed(() => {
    return filteredBalita.value.filter(b =>
      b.statusStunting === 'Sangat Pendek' || b.statusStunting === 'Pendek'
    ).length
  })

  const riskCount = computed(() => {
    return filteredBalita.value.filter(b => b.statusStunting === 'Risiko Stunting').length
  })

  const normalCount = computed(() => {
    return filteredBalita.value.filter(b => b.statusStunting === 'Normal').length
  })

  const stuntingPercentage = computed(() => {
    if (!totalBalitaCount.value) return 0
    return +((stuntingCount.value / totalBalitaCount.value) * 100).toFixed(1)
  })

  // Gender Breakdown
  const genderBreakdown = computed(() => {
    const male = filteredBalita.value.filter(b => b.gender === 'Laki-laki').length
    const female = filteredBalita.value.filter(b => b.gender === 'Perempuan').length
    return { male, female }
  })

  // Age Group Breakdown
  const ageBreakdown = computed(() => {
    const g0_6 = filteredBalita.value.filter(b => b.ageMonths <= 6).length
    const g6_12 = filteredBalita.value.filter(b => b.ageMonths > 6 && b.ageMonths <= 12).length
    const g12_24 = filteredBalita.value.filter(b => b.ageMonths > 12 && b.ageMonths <= 24).length
    const g24_59 = filteredBalita.value.filter(b => b.ageMonths > 24 && b.ageMonths <= 59).length
    return { g0_6, g6_12, g12_24, g24_59 }
  })

  // District/Kecamatan Ranking
  const kecamatanRanking = computed(() => {
    return kecamatanList.value.map(k => {
      const children = filteredBalita.value.filter(b => b.kecamatan === k.name)
      const stunting = children.filter(b => b.statusStunting === 'Sangat Pendek' || b.statusStunting === 'Pendek').length
      const rate = children.length ? +((stunting / children.length) * 100).toFixed(1) : k.stuntingCount || 15.2
      return {
        ...k,
        count: children.length || k.totalBalita,
        stunting,
        rate
      }
    }).sort((a, b) => b.rate - a.rate)
  })

  // Actions
  async function loadGeoJson() {
    if (geoJsonData.value) return
    isLoading.value = true
    try {
      const response = await fetch('/data/indonesia-provinces.geojson')
      geoJsonData.value = await response.json()
    } catch (error) {
      console.error('Failed to load GeoJSON:', error)
    } finally {
      isLoading.value = false
    }
  }

  function openBalitaDetail(balita) {
    selectedBalita.value = balita
    isBalitaModalOpen.value = true
  }

  function closeBalitaDetail() {
    selectedBalita.value = null
    isBalitaModalOpen.value = false
  }

  function openRegionDetail(region, type = 'desa') {
    selectedRegion.value = region
    regionType.value = type
    isRegionDrawerOpen.value = true
  }

  function closeRegionDetail() {
    selectedRegion.value = null
    isRegionDrawerOpen.value = false
  }

  function resetAllFilters() {
    selectedYear.value = 2024
    selectedMonth.value = 'all'
    selectedKecamatan.value = 'all'
    selectedDesa.value = 'all'
    selectedPosyandu.value = 'all'
    selectedPuskesmas.value = 'all'
    selectedGender.value = 'all'
    selectedStatusGizi.value = 'all'
    selectedStatusStunting.value = 'all'
    selectedAgeGroup.value = 'all'
    searchQuery.value = ''
  }

  return {
    // Navigation
    activeTab,
    // Filters & Timeline
    selectedYear,
    selectedMonth,
    selectedKecamatan,
    selectedDesa,
    selectedPosyandu,
    selectedPuskesmas,
    selectedGender,
    selectedStatusGizi,
    selectedStatusStunting,
    selectedAgeGroup,
    searchQuery,
    isFilterExpanded,
    availableYears,
    availableMonths,
    // GIS Map Settings
    activeBasemap,
    showChoropleth,
    choroplethLevel,
    showHeatmap,
    showMarkers,
    showCluster,
    showPuskesmasBuffer,
    bufferRadiusKm,
    // Selection Modals
    selectedBalita,
    isBalitaModalOpen,
    selectedRegion,
    isRegionDrawerOpen,
    regionType,
    // GeoJSON & Relational Mock Data
    geoJsonData,
    isLoading,
    mapInstance,
    kecamatanList,
    desaList,
    posyanduList,
    puskesmasList,
    balitaList,
    yearlyTrend,
    // Getters
    filteredBalita,
    totalBalitaCount,
    stuntingCount,
    riskCount,
    normalCount,
    stuntingPercentage,
    genderBreakdown,
    ageBreakdown,
    kecamatanRanking,
    // Actions
    loadGeoJson,
    openBalitaDetail,
    closeBalitaDetail,
    openRegionDetail,
    closeRegionDetail,
    resetAllFilters
  }
})
