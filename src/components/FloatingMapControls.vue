<template>
  <div class="floating-controls-container">
    <!-- Basemap & Layer Control Pills (Top Left of Map) -->
    <div class="layer-control-bar">
      <!-- Basemap Dropdown -->
      <div class="control-dropdown">
        <button class="pill-btn" @click="activeMenu = activeMenu === 'basemap' ? null : 'basemap'">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
          </svg>
          <span>Basemap: {{ basemapLabel }}</span>
        </button>

        <div v-if="activeMenu === 'basemap'" class="dropdown-menu">
          <button v-for="b in basemaps" :key="b.id" :class="['menu-item', { active: store.activeBasemap === b.id }]" @click="selectBasemap(b.id)">
            <span>{{ b.name }}</span>
          </button>
        </div>
      </div>

      <!-- Layer Control Dropdown -->
      <div class="control-dropdown">
        <button class="pill-btn" @click="activeMenu = activeMenu === 'layers' ? null : 'layers'">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />
          </svg>
          <span>Layer Control</span>
        </button>

        <div v-if="activeMenu === 'layers'" class="dropdown-menu layer-menu">
          <label class="layer-toggle-item">
            <input type="checkbox" v-model="store.showChoropleth" />
            <span>Choropleth Stunting</span>
          </label>
          <div class="sub-options" v-if="store.showChoropleth">
            <label class="radio-sub"><input type="radio" value="desa" v-model="store.choroplethLevel" /> Per Desa</label>
            <label class="radio-sub"><input type="radio" value="kecamatan" v-model="store.choroplethLevel" /> Per Kecamatan</label>
          </div>

          <label class="layer-toggle-item">
            <input type="checkbox" v-model="store.showHeatmap" />
            <span>Heatmap Kepadatan</span>
          </label>

          <label class="layer-toggle-item">
            <input type="checkbox" v-model="store.showCluster" />
            <span>Cluster Marker Balita</span>
          </label>

          <label class="layer-toggle-item">
            <input type="checkbox" v-model="store.showPuskesmasBuffer" />
            <span>Buffer Radius Puskesmas</span>
          </label>
        </div>
      </div>

      <!-- Quick Action Pills -->
      <button class="pill-btn" @click="handleLocateMe">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" /><path d="M12 2a10 10 0 0 1 10 10" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        </svg>
        <span>Locate Me</span>
      </button>

      <button class="pill-btn" @click="handleResetView">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
        </svg>
        <span>Reset View</span>
      </button>
    </div>

    <!-- Right Floating Action Tool Buttons -->
    <div class="right-tools-column">
      <button class="tool-circle-btn" @click="toggleFullscreen" :title="isFullscreen ? 'Keluar Fullscreen' : 'Layar Penuh'">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path v-if="!isFullscreen" d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          <path v-else d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
        </svg>
      </button>

      <button class="tool-circle-btn" @click="handleExportMapPNG" title="Export Map PNG">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
        </svg>
      </button>

      <button class="tool-circle-btn" @click="handlePrintMap" title="Cetak Peta">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect width="12" height="8" x="6" y="14" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStuntingStore } from '../stores/stuntingStore.js'
import { useExport } from '../composables/useExport.js'
import { useToast } from '../composables/useToast.js'

const store = useStuntingStore()
const { exportElementToPNG, printWindow } = useExport()
const { success, info, error } = useToast()

const activeMenu = ref(null)
const isFullscreen = ref(false)

const basemaps = [
  { id: 'dark', name: 'Dark Mode' },
  { id: 'osm', name: 'OpenStreetMap' },
  { id: 'satellite', name: 'Satellite' },
  { id: 'terrain', name: 'Terrain' },
  { id: 'light', name: 'Light Mode' }
]

const basemapLabel = computed(() => {
  const item = basemaps.find(b => b.id === store.activeBasemap)
  return item ? item.name : 'Dark Mode'
})

function selectBasemap(id) {
  store.activeBasemap = id
  activeMenu.value = null
  info(`Basemap diubah ke ${id}`, 'Ganti Basemap')
}

function handleLocateMe() {
  if (navigator.geolocation && store.mapInstance) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords
        store.mapInstance.setView([latitude, longitude], 15)
        success('Lokasi Anda terdeteksi!', 'Locate Me')
      },
      () => {
        store.mapInstance.setView([-6.3685, 106.8242], 14)
        info('Menggunakan lokasi default Depok', 'Locate Me')
      }
    )
  }
}

function handleResetView() {
  if (store.mapInstance) {
    store.mapInstance.setView([-6.38, 106.83], 12)
    info('Tampilan peta di-reset', 'Reset View')
  }
}

function toggleFullscreen() {
  const mapElem = document.querySelector('.map-container')
  if (!mapElem) return
  if (!document.fullscreenElement) {
    mapElem.requestFullscreen().then(() => isFullscreen.value = true)
  } else {
    document.exitFullscreen().then(() => isFullscreen.value = false)
  }
}

async function handleExportMapPNG() {
  const mapElem = document.querySelector('.map-container')
  if (!mapElem) return
  info('Memproses PNG peta...', 'Exporting Map')
  const ok = await exportElementToPNG(mapElem, 'gis-stunting-map.png')
  if (ok) success('Peta berhasil di-export ke PNG!', 'Export Sukses')
  else error('Gagal mendownload gambar peta', 'Export Gagal')
}

function handlePrintMap() {
  printWindow()
}
</script>

<style scoped>
.floating-controls-container {
  pointer-events: none;
}

.layer-control-bar {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 900;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  pointer-events: auto;
}

.pill-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 20px;
  background: var(--bg-surface, #ffffff);
  border: 1px solid var(--border-color, #e2e8f0);
  color: var(--text-primary, #0f172a);
  font-size: 0.78rem;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.2s ease;
}

.pill-btn:hover {
  background: var(--bg-hover, #f8fafc);
  border-color: #3b82f6;
  color: #3b82f6;
}

.control-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  background: var(--bg-surface, #ffffff);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 12px;
  padding: 6px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  min-width: 170px;
  z-index: 1000;
}

.menu-item {
  width: 100%;
  text-align: left;
  padding: 8px 12px;
  border: none;
  background: transparent;
  color: var(--text-primary, #0f172a);
  font-size: 0.78rem;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
}

.menu-item:hover, .menu-item.active {
  background: var(--bg-hover, #f1f5f9);
  color: #3b82f6;
}

.layer-menu {
  padding: 10px 14px;
  width: 220px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.layer-toggle-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-primary, #0f172a);
  cursor: pointer;
}

.sub-options {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 20px;
  font-size: 0.72rem;
  color: var(--text-secondary, #64748b);
}

.radio-sub {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.right-tools-column {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 900;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: auto;
}

.tool-circle-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--bg-surface, #ffffff);
  border: 1px solid var(--border-color, #e2e8f0);
  color: var(--text-primary, #0f172a);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tool-circle-btn:hover {
  color: #3b82f6;
  border-color: #3b82f6;
  transform: scale(1.08);
}
</style>
