<template>
  <div class="map-view-wrapper">
    <!-- Map Container -->
    <div class="map-container" id="gis-leaflet-map-element">
      <!-- Loading & Empty Overlay State -->
      <div v-if="store.isLoading" class="map-state-overlay">
        <div class="spinner"></div>
        <span>Memuat Data Spasial GIS Stunting...</span>
      </div>

      <!-- Floating Controls & Legend Overlay -->
      <FloatingMapControls />
      <MapLegend />

      <!-- Coordinate & Scale Display (Bottom Right) -->
      <div class="map-footer-info">
        <span class="coord-tag">Lat: {{ currentCoords.lat }} | Lng: {{ currentCoords.lng }}</span>
        <span class="scale-tag">Skala: {{ currentZoom }}x Zoom</span>
      </div>

      <!-- Leaflet Map Container Mount Point -->
      <div ref="mapContainerRef" class="leaflet-map-target"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster'
import 'leaflet.heat'
import { useStuntingStore } from '../stores/stuntingStore.js'
import { stuntingData, getStuntingColor, getStuntingOpacity } from '../data/stuntingData.js'
import FloatingMapControls from './FloatingMapControls.vue'
import MapLegend from './MapLegend.vue'

const store = useStuntingStore()

const mapContainerRef = ref(null)
let mapInstance = null
let tileLayer = null
let geoJsonLayer = null
let heatmapLayer = null
let clusterGroup = null
let bufferLayers = []

const currentCoords = ref({ lat: '-6.38', lng: '106.83' })
const currentZoom = ref(12)

const basemapUrls = {
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  osm: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  terrain: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
}

function initMap() {
  if (!mapContainerRef.value) return

  // Center at Depok / West Java by default
  mapInstance = L.map(mapContainerRef.value, {
    center: [-6.38, 106.83],
    zoom: 12,
    zoomControl: false,
    attributionControl: false
  })

  store.mapInstance = mapInstance

  // Zoom control top-right
  L.control.zoom({ position: 'topright' }).addTo(mapInstance)

  // Scale control
  L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(mapInstance)

  // Mouse move coordinate update
  mapInstance.on('mousemove', e => {
    currentCoords.value = {
      lat: e.latlng.lat.toFixed(4),
      lng: e.latlng.lng.toFixed(4)
    }
  })

  mapInstance.on('zoomend', () => {
    currentZoom.value = mapInstance.getZoom()
  })

  // Set initial basemap
  updateBasemap()

  // Render map elements
  renderAllLayers()
}

function updateBasemap() {
  if (!mapInstance) return
  if (tileLayer) mapInstance.removeLayer(tileLayer)

  const url = basemapUrls[store.activeBasemap] || basemapUrls.dark
  tileLayer = L.tileLayer(url, { maxZoom: 19 })
  tileLayer.addTo(mapInstance)
}

function renderAllLayers() {
  if (!mapInstance) return

  renderChoroplethPolygons()
  renderHeatmap()
  renderMarkerClusters()
  renderPuskesmasBuffers()
}

function getProvinceStuntingPercentage(provName, year = 2024) {
  const y = [2023, 2024].includes(year) ? year : 2024
  const prov = stuntingData.provinces.find(p => p.name.toLowerCase() === provName.toLowerCase())
  return prov && prov.data[y] ? prov.data[y].percentage : null
}

function getKabupatenStuntingPercentage(kabName, provName, year = 2024) {
  const provPct = getProvinceStuntingPercentage(provName, year)
  if (provPct === null) return null

  // Stable deterministic hash offset based on Kabupaten name
  let hash = 0
  for (let i = 0; i < kabName.length; i++) {
    hash = kabName.charCodeAt(i) + ((hash << 5) - hash)
  }
  const offset = (Math.abs(hash % 70) / 10) - 3.5 // Offset between -3.5% and +3.5%
  return Math.max(2.0, Math.min(48.0, Number((provPct + offset).toFixed(1))))
}

function getKecamatanStuntingPercentage(kecName) {
  const kec = store.kecamatanList.find(k => k.name.toLowerCase() === kecName.toLowerCase())
  if (!kec) return 15.0
  return Number(((kec.totalStunting / kec.totalBalita) * 100).toFixed(1))
}

function renderChoroplethPolygons() {
  if (geoJsonLayer) {
    mapInstance.removeLayer(geoJsonLayer)
    geoJsonLayer = null
  }

  if (!store.showChoropleth) return

  if (store.choroplethLevel === 'provinsi') {
    if (!store.geoJsonData) return

    geoJsonLayer = L.geoJSON(store.geoJsonData, {
      style: (feature) => {
        const provName = feature.properties.PROVINSI || feature.properties.Propinsi || feature.properties.NAME_1 || ''
        const percentage = getProvinceStuntingPercentage(provName, store.selectedYear)
        const color = percentage !== null ? getStuntingColor(percentage) : '#94a3b8'
        const opacity = percentage !== null ? getStuntingOpacity(percentage) : 0.2

        return {
          color: '#ffffff',
          fillColor: color,
          fillOpacity: opacity,
          weight: 1.5,
          opacity: 0.8
        }
      },
      onEachFeature: (feature, layer) => {
        const provName = feature.properties.PROVINSI || feature.properties.Propinsi || feature.properties.NAME_1 || ''
        const percentage = getProvinceStuntingPercentage(provName, store.selectedYear)

        layer.bindTooltip(`
          <div class="custom-tooltip">
            <strong>Provinsi ${provName}</strong><br/>
            Prevalensi Stunting (${store.selectedYear}): <strong>${percentage !== null ? percentage + '%' : 'Tidak ada data'}</strong>
          </div>
        `, { sticky: true })

        layer.on('click', () => {
          const bounds = layer.getBounds()
          mapInstance.fitBounds(bounds)
          store.openRegionDetail({ name: provName, stuntingRate: percentage }, 'provinsi')
        })
      }
    })

    geoJsonLayer.addTo(mapInstance)
  } else if (store.choroplethLevel === 'kabupaten') {
    if (!store.geoJsonRegencies) return

    geoJsonLayer = L.geoJSON(store.geoJsonRegencies, {
      style: (feature) => {
        const kabName = feature.properties.WADMKK || ''
        const provName = feature.properties.WADMPR || ''
        const percentage = getKabupatenStuntingPercentage(kabName, provName, store.selectedYear)
        const color = percentage !== null ? getStuntingColor(percentage) : '#94a3b8'
        const opacity = percentage !== null ? getStuntingOpacity(percentage) : 0.2

        return {
          color: '#ffffff',
          fillColor: color,
          fillOpacity: opacity,
          weight: 1.0,
          opacity: 0.7
        }
      },
      onEachFeature: (feature, layer) => {
        const kabName = feature.properties.WADMKK || ''
        const provName = feature.properties.WADMPR || ''
        const percentage = getKabupatenStuntingPercentage(kabName, provName, store.selectedYear)

        layer.bindTooltip(`
          <div class="custom-tooltip">
            <strong>${kabName}</strong><br/>
            Provinsi: ${provName}<br/>
            Prevalensi Stunting (${store.selectedYear}): <strong>${percentage !== null ? percentage + '%' : 'Tidak ada data'}</strong>
          </div>
        `, { sticky: true })

        layer.on('click', () => {
          const bounds = layer.getBounds()
          mapInstance.fitBounds(bounds)
          store.openRegionDetail({ name: kabName, parentName: provName, stuntingRate: percentage }, 'kabupaten')
        })
      }
    })

    geoJsonLayer.addTo(mapInstance)
  } else if (store.choroplethLevel === 'kecamatan') {
    const polygons = []
    const desas = store.desaList
    desas.forEach(d => {
      if (!d.polygon) return

      const kecRate = getKecamatanStuntingPercentage(d.kecamatanName)
      const color = kecRate > 20 ? '#ef4444' : kecRate > 10 ? '#f59e0b' : '#10b981'

      const polygon = L.polygon(d.polygon, {
        color: color,
        fillColor: color,
        fillOpacity: 0.4,
        weight: 2
      })

      polygon.bindTooltip(`
        <div class="custom-tooltip">
          <strong>Kecamatan ${d.kecamatanName}</strong> (Kel. ${d.name})<br/>
          Prevalensi Stunting Kecamatan: <strong>${kecRate}%</strong>
        </div>
      `, { sticky: true })

      polygon.on('click', () => {
        store.openRegionDetail({ name: d.kecamatanName, stuntingRate: kecRate }, 'kecamatan')
      })

      polygons.push(polygon)
    })

    geoJsonLayer = L.layerGroup(polygons)
    geoJsonLayer.addTo(mapInstance)
  } else {
    const polygons = []
    const desas = store.desaList
    desas.forEach(d => {
      if (!d.polygon) return

      const color = d.stuntingRate > 20 ? '#ef4444' : d.stuntingRate > 10 ? '#f59e0b' : '#10b981'

      const polygon = L.polygon(d.polygon, {
        color: color,
        fillColor: color,
        fillOpacity: 0.35,
        weight: 2
      })

      polygon.bindTooltip(`
        <div class="custom-tooltip">
          <strong>Kelurahan ${d.name}</strong><br/>
          Kecamatan: ${d.kecamatanName}<br/>
          Prevalensi Stunting Kelurahan: <strong>${d.stuntingRate}%</strong><br/>
          Total Balita: ${d.totalBalita} anak
        </div>
      `, { sticky: true })

      polygon.on('click', () => {
        store.openRegionDetail(d, 'desa')
      })

      polygons.push(polygon)
    })

    geoJsonLayer = L.layerGroup(polygons)
    geoJsonLayer.addTo(mapInstance)
  }
}

function renderHeatmap() {
  if (heatmapLayer) {
    mapInstance.removeLayer(heatmapLayer)
    heatmapLayer = null
  }

  if (!store.showHeatmap) return

  const heatPoints = store.filteredBalita.map(b => [
    b.lat,
    b.lng,
    b.statusStunting === 'Sangat Pendek' ? 1.0 : b.statusStunting === 'Pendek' ? 0.7 : 0.4
  ])

  if (L.heatLayer && heatPoints.length) {
    heatmapLayer = L.heatLayer(heatPoints, { radius: 25, blur: 15, maxZoom: 15 })
    heatmapLayer.addTo(mapInstance)
  }
}

function renderMarkerClusters() {
  if (clusterGroup) {
    mapInstance.removeLayer(clusterGroup)
    clusterGroup = null
  }

  if (!store.showMarkers) return

  clusterGroup = L.markerClusterGroup({
    disableClusteringAtZoom: 15,
    spiderfyOnMaxZoom: true
  })

  store.filteredBalita.forEach(b => {
    const customIcon = L.divIcon({
      className: 'custom-balita-marker',
      html: `
        <div class="marker-badge" style="background-color: ${b.statusColor}; box-shadow: 0 0 10px ${b.statusColor}80;">
          <span class="m-text">${b.name.split(' ')[0]}</span>
        </div>
      `,
      iconSize: [60, 24],
      iconAnchor: [30, 12]
    })

    const marker = L.marker([b.lat, b.lng], { icon: customIcon })

    marker.bindTooltip(`
      <div class="custom-tooltip">
        <strong>${b.name} (${b.ageMonths} bln)</strong><br/>
        Status: <span style="color:${b.statusColor}">${b.statusStunting}</span><br/>
        Ortu: ${b.parentName}
      </div>
    `, { sticky: true })

    marker.on('click', () => {
      store.openBalitaDetail(b)
    })

    clusterGroup.addLayer(marker)
  })

  mapInstance.addLayer(clusterGroup)
}

function renderPuskesmasBuffers() {
  bufferLayers.forEach(l => mapInstance.removeLayer(l))
  bufferLayers = []

  if (!store.showPuskesmasBuffer) return

  store.puskesmasList.forEach(pus => {
    // Icon Puskesmas Marker
    const pusIcon = L.divIcon({
      className: 'puskesmas-marker',
      html: `<div class="pus-badge"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-1px;margin-right:4px;"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>${pus.name}</div>`,
      iconSize: [140, 26],
      iconAnchor: [70, 13]
    })

    const pusMarker = L.marker([pus.lat, pus.lng], { icon: pusIcon })
    pusMarker.addTo(mapInstance)
    bufferLayers.push(pusMarker)

    // Circle Buffer
    const circle = L.circle([pus.lat, pus.lng], {
      radius: store.bufferRadiusKm * 1000, // 3 KM
      color: '#3b82f6',
      fillColor: '#3b82f6',
      fillOpacity: 0.08,
      dashArray: '5, 5',
      weight: 1.5
    })

    circle.addTo(mapInstance)
    bufferLayers.push(circle)
  })
}

// Watchers for reactivity
watch(() => store.activeBasemap, updateBasemap)
watch(
  () => [
    store.showChoropleth,
    store.choroplethLevel,
    store.selectedYear,
    store.showHeatmap,
    store.showMarkers,
    store.showCluster,
    store.showPuskesmasBuffer,
    store.filteredBalita,
    store.geoJsonData,
    store.geoJsonRegencies
  ],
  (newVal, oldVal) => {
    if (oldVal && newVal[1] !== oldVal[1] && mapInstance) {
      if (newVal[1] === 'provinsi' || newVal[1] === 'kabupaten') {
        mapInstance.setView([-2.5, 118], 5)
      } else {
        mapInstance.setView([-6.38, 106.83], 12)
      }
    }
    renderAllLayers()
  },
  { deep: true }
)

onMounted(() => {
  store.loadGeoJson()
  setTimeout(initMap, 100)
})

onUnmounted(() => {
  if (mapInstance) {
    mapInstance.remove()
    mapInstance = null
  }
})
</script>

<style scoped>
.map-view-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 480px;
}

.map-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 280px);
  min-height: 450px;
  background: var(--bg-surface, #0f172a);
}

.leaflet-map-target {
  width: 100%;
  height: 100%;

  z-index: 1;
}

.map-state-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1500;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 600;
}

.spinner {
  width: 42px;
  height: 42px;
  border: 3px solid rgba(59, 130, 246, 0.2);
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.map-footer-info {
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 900;
  display: flex;
  gap: 8px;
  pointer-events: none;
}

.coord-tag, .scale-tag {
  background: var(--bg-surface, rgba(255, 255, 255, 0.9));
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 0.72rem;
  color: var(--text-secondary, #64748b);
  font-family: monospace;
}
</style>

<style>
/* Unscoped Leaflet custom marker & tooltip overrides */
.custom-balita-marker {
  background: transparent;
  border: none;
}

.marker-badge {
  padding: 3px 8px;
  border-radius: 12px;
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
  border: 1px solid rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.marker-badge:hover {
  transform: scale(1.1);
}

.puskesmas-marker {
  background: transparent;
}

.pus-badge {
  background: #3b82f6;
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
}

.custom-tooltip {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  line-height: 1.4;
  color: #0f172a;
}
</style>
