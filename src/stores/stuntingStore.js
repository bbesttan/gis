import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
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
  const activeTab = ref('landing') // 'landing' | 'map' | 'dashboard' | 'table' | 'hotspot'

  // Role & Authentication State
  const userRole = ref('guest') // 'guest' | 'admin'
  const adminUser = ref(null)
  const isAdminLoginModalOpen = ref(false)

  // Public Search State (Landing Page)
  const publicSearchResult = ref(null)
  const isPublicSearchModalOpen = ref(false)
  const publicSearchQuery = ref('')

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

  // ShareInsight Filter State
  const selectedTypes = ref(['School'])
  const selectedProvinces = ref(['West Java', 'DKI Jakarta'])
  const selectedCities = ref(['Depok'])

  // GIS Map Layer Settings
  const activeBasemap = ref('dark') // 'dark' | 'osm' | 'satellite' | 'terrain' | 'light'
  const showChoropleth = ref(true)
  const choroplethLevel = ref('provinsi') // 'kecamatan' | 'desa' | 'provinsi' | 'kabupaten'
  const showHeatmap = ref(false)
  const showMarkers = ref(true)
  const showCluster = ref(true)

  // GeoJSON Region Filter — controls which province/kabupaten to render for kecamatan & desa
  const mapFilterProvince = ref('Jawa Barat')
  const mapFilterKabupaten = ref('Kota Depok')

  // Selection & Modal States
  const selectedBalita = ref(null)
  const isBalitaModalOpen = ref(false)
  const selectedRegion = ref(null)
  const isRegionDrawerOpen = ref(false)
  const regionType = ref('desa') // 'desa' | 'kecamatan' | 'provinsi'

  // Data Loading & Map State
  const geoJsonData = ref(null)
  const geoJsonRegencies = ref(null)
  const geoJsonDistricts = ref(null)
  const geoJsonVillages = ref(null)
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

      // Type filter (mapped to statusStunting)
      const typeMap = {
        'Office': 'Normal',
        'Cafe': 'Risiko Stunting',
        'School': 'Pendek',
        'University': 'Sangat Pendek'
      }
      if (selectedTypes.value && selectedTypes.value.length > 0) {
        const allowedStatuses = selectedTypes.value.map(t => typeMap[t]).filter(Boolean)
        if (!allowedStatuses.includes(b.statusStunting)) return false
      } else if (selectedTypes.value) {
        return false // if types are empty (nothing checked), show nothing
      }

      // Province filter (mapped to Kecamatan)
      const provinceMap = {
        'West Java': ['Beji', 'Pancoran Mas', 'Sukmajaya', 'Sawangan'],
        'DKI Jakarta': ['Cimanggis', 'Tapos'],
        'South Tangerang': ['Limo', 'Bojongsari'],
        'Central Java': []
      }
      if (selectedProvinces.value && selectedProvinces.value.length > 0) {
        let allowedKecamatans = []
        selectedProvinces.value.forEach(p => {
          if (provinceMap[p]) allowedKecamatans.push(...provinceMap[p])
        })
        if (!allowedKecamatans.includes(b.kecamatan)) return false
      } else if (selectedProvinces.value) {
        return false
      }

      // City filter (mapped to Kecamatan)
      const cityMap = {
        'Depok': ['Beji', 'Pancoran Mas', 'Sukmajaya', 'Cimanggis', 'Sawangan', 'Limo', 'Tapos', 'Bojongsari'],
        'Bandung': [],
        'Bekasi': [],
        'Bogor': []
      }
      if (selectedCities.value && selectedCities.value.length > 0) {
        let allowedKecamatans = []
        selectedCities.value.forEach(c => {
          if (cityMap[c]) allowedKecamatans.push(...cityMap[c])
        })
        if (!allowedKecamatans.includes(b.kecamatan)) return false
      } else if (selectedCities.value) {
        return false
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

  // Precomputed bounding box spatial index — avoids recalculating on every moveend
  const featureBBoxIndex = new Map()

  function precomputeFeatureBBox(geojson) {
    if (!geojson || !geojson.features) return
    for (const feature of geojson.features) {
      if (featureBBoxIndex.has(feature)) continue
      const geom = feature.geometry
      if (!geom) continue
      let coords = []
      if (geom.type === 'Polygon') {
        coords = geom.coordinates[0] || []
      } else if (geom.type === 'MultiPolygon') {
        coords = geom.coordinates[0] ? geom.coordinates[0][0] : []
      }
      if (coords.length === 0) {
        featureBBoxIndex.set(feature, null)
        continue
      }
      let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity
      const step = Math.max(1, Math.floor(coords.length / 8))
      for (let i = 0; i < coords.length; i += step) {
        const pt = coords[i]
        if (pt[0] < minLng) minLng = pt[0]
        if (pt[0] > maxLng) maxLng = pt[0]
        if (pt[1] < minLat) minLat = pt[1]
        if (pt[1] > maxLat) maxLat = pt[1]
      }
      featureBBoxIndex.set(feature, [minLat, minLng, maxLat, maxLng])
    }
  }

  // Progressive loader — loads Provinsi + Kabupaten from local public/data/
  async function loadGeoJson() {
    if (geoJsonData.value && geoJsonRegencies.value) return
    isLoading.value = true
    try {
      const promises = []
      if (!geoJsonData.value) {
        promises.push(
          fetch('/data/gadm41_IDN_1.json')
            .then(r => r.json())
            .then(data => {
              geoJsonData.value = data
              precomputeFeatureBBox(data)
            })
        )
      }
      if (!geoJsonRegencies.value) {
        promises.push(
          fetch('/data/gadm41_IDN_2.json')
            .then(r => r.json())
            .then(data => {
              geoJsonRegencies.value = data
              precomputeFeatureBBox(data)
            })
        )
      }
      await Promise.all(promises)
    } catch (error) {
      console.error('Failed to load GeoJSON:', error)
    } finally {
      isLoading.value = false
    }
  }

  let geojsonWorker = null
  if (typeof window !== 'undefined') {
    geojsonWorker = new Worker('/data/geojsonWorker.js')
    
    geojsonWorker.onmessage = (e) => {
      const { success, type, data, error } = e.data
      isLoading.value = false
      if (!success) {
        console.error(`GeoJSON worker failed for ${type}:`, error)
        return
      }
      if (type === 'kecamatan') {
        geoJsonDistricts.value = data
        precomputeFeatureBBox(data)
      } else if (type === 'desa') {
        geoJsonVillages.value = data
        precomputeFeatureBBox(data)
      }
    }
  }

  watch(mapFilterProvince, (newVal) => {
    if (geojsonWorker) {
      isLoading.value = true
      geojsonWorker.postMessage({ type: 'kecamatan', filterVal: newVal })
    }
  })

  watch(mapFilterKabupaten, (newVal) => {
    if (geojsonWorker) {
      isLoading.value = true
      geojsonWorker.postMessage({ type: 'desa', filterVal: newVal })
    }
  })

  // On-demand lazy loader for Kecamatan (filtered by mapFilterProvince)
  async function loadKecamatanGeoJson() {
    if (geoJsonDistricts.value || isLoading.value) return
    isLoading.value = true
    if (geojsonWorker) {
      geojsonWorker.postMessage({ type: 'kecamatan', filterVal: mapFilterProvince.value })
    }
  }

  // On-demand lazy loader for Kelurahan/Desa (filtered by mapFilterKabupaten)
  async function loadKelurahanGeoJson() {
    if (geoJsonVillages.value || isLoading.value) return
    isLoading.value = true
    if (geojsonWorker) {
      geojsonWorker.postMessage({ type: 'desa', filterVal: mapFilterKabupaten.value })
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
    selectedTypes.value = ['School']
    selectedProvinces.value = ['West Java', 'DKI Jakarta']
    selectedCities.value = ['Depok']
  }

  function openAdminLoginModal() {
    isAdminLoginModalOpen.value = true
  }

  function closeAdminLoginModal() {
    isAdminLoginModalOpen.value = false
  }

  function loginAsAdmin(roleType = 'posyandu') {
    userRole.value = 'admin'
    if (roleType === 'dinas') {
      adminUser.value = {
        name: 'dr. Haryo Wibowo',
        role: 'Dinas Kesehatan Kota Depok',
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&auto=format&fit=crop&q=80'
      }
    } else {
      adminUser.value = {
        name: 'Siti Rahmah',
        role: 'Kader Posyandu Beji',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
      }
    }
    isAdminLoginModalOpen.value = false
    return true
  }

  function logout() {
    userRole.value = 'guest'
    adminUser.value = null
    activeTab.value = 'landing'
  }

  function searchChildPublic(query) {
    if (!query || !query.trim()) return
    const q = query.trim().toLowerCase()
    publicSearchQuery.value = query.trim()
    const match = balitaList.value.find(b =>
      b.name.toLowerCase().includes(q) ||
      b.nik.includes(q) ||
      b.parentName.toLowerCase().includes(q)
    )
    publicSearchResult.value = match || null
    isPublicSearchModalOpen.value = true
  }

  function closePublicSearchModal() {
    isPublicSearchModalOpen.value = false
  }

  return {
    // Navigation & Roles
    activeTab,
    userRole,
    adminUser,
    isAdminLoginModalOpen,
    publicSearchResult,
    isPublicSearchModalOpen,
    publicSearchQuery,
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
    selectedTypes,
    selectedProvinces,
    selectedCities,
    // GIS Map Settings
    activeBasemap,
    showChoropleth,
    choroplethLevel,
    showHeatmap,
    showMarkers,
    showCluster,
    // GeoJSON Region Filters
    mapFilterProvince,
    mapFilterKabupaten,
    // Selection Modals
    selectedBalita,
    isBalitaModalOpen,
    selectedRegion,
    isRegionDrawerOpen,
    regionType,
    // GeoJSON & Relational Mock Data
    geoJsonData,
    geoJsonRegencies,
    geoJsonDistricts,
    geoJsonVillages,
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
    loadKecamatanGeoJson,
    loadKelurahanGeoJson,
    featureBBoxIndex,
    openBalitaDetail,
    closeBalitaDetail,
    openRegionDetail,
    closeRegionDetail,
    resetAllFilters,
    openAdminLoginModal,
    closeAdminLoginModal,
    loginAsAdmin,
    logout,
    searchChildPublic,
    closePublicSearchModal
  }


})
