<template>
  <Transition name="drawer-slide">
    <div v-if="store.isRegionDrawerOpen && store.selectedRegion" class="drawer-overlay" @click.self="store.closeRegionDetail">
      <div class="region-drawer">
        <!-- Close Button -->
        <button class="close-drawer-btn" @click="store.closeRegionDetail">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        </button>

        <!-- Drawer Header -->
        <div class="drawer-header">
          <span class="region-type-badge">
            {{ 
              store.regionType === 'provinsi' ? 'Wilayah Provinsi' :
              store.regionType === 'kabupaten' ? 'Kota / Kabupaten' :
              store.regionType === 'kecamatan' ? 'Wilayah Kecamatan' :
              'Kelurahan / Desa'
            }}
          </span>
          <h2 class="region-name">{{ store.selectedRegion.name }}</h2>
          <p class="region-sub" v-if="store.selectedRegion.parentName">Provinsi {{ store.selectedRegion.parentName }}</p>
          <p class="region-sub" v-else-if="store.selectedRegion.kecamatanName">Kecamatan {{ store.selectedRegion.kecamatanName }}</p>
        </div>

        <!-- Metric Display Card -->
        <div class="metric-highlight-card">
          <div class="rate-circle" :style="{ borderColor: regionColor }">
            <span class="rate-num">{{ regionRate }}%</span>
            <span class="rate-sub">Prevalensi</span>
          </div>
          <div class="stat-columns">
            <div class="s-col">
              <span class="col-val">{{ regionBalitaCount }}</span>
              <span class="col-lbl">Total Balita</span>
            </div>
            <div class="s-col">
              <span class="col-val text-red">{{ regionStuntingCount }}</span>
              <span class="col-lbl">Kasus Stunting</span>
            </div>
          </div>
        </div>

        <!-- Ranking Banner -->
        <div class="ranking-banner">
          <span>Peringkat Prevalensi: <strong>#{{ regionRank }} dari {{ store.kecamatanRanking.length }} Kecamatan</strong></span>
        </div>

        <!-- Posyandu & Puskesmas Lists -->
        <div class="list-section">
          <h4 class="section-title">Daftar Posyandu Wilayah ({{ regionPosyanduList.length }})</h4>
          <div class="posyandu-cards-list">
            <div v-for="pos in regionPosyanduList" :key="pos.id" class="pos-item">
              <div class="pos-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div class="pos-info">
                <span class="pos-name">{{ pos.name }}</span>
                <span class="pos-meta">Kader Aktif: {{ pos.kaderCount }} Kader</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Puskesmas Pembina -->
        <div class="list-section">
          <h4 class="section-title">Puskesmas Pembina Wilayah</h4>
          <div class="pus-card">
            <span class="pus-name">Puskesmas Pembina: {{ store.puskesmasList[0]?.name }}</span>
            <span class="pus-phone">Kontak: {{ store.puskesmasList[0]?.phone }} • Radius Buffer 3 KM</span>
          </div>
        </div>

        <!-- WhatsApp Action CTA -->
        <button class="wa-action-btn" @click="handleWhatsApp">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span>Konsultasi Penanganan Wilayah</span>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { useStuntingStore } from '../stores/stuntingStore.js'
import { useWhatsApp } from '../composables/useWhatsApp.js'

const store = useStuntingStore()
const { openWhatsApp } = useWhatsApp()

const regionRate = computed(() => {
  if (!store.selectedRegion) return 0
  return store.selectedRegion.stuntingRate || store.selectedRegion.rate || 16.5
})

const regionBalitaCount = computed(() => {
  if (!store.selectedRegion) return 0
  return store.selectedRegion.totalBalita || store.selectedRegion.count || 140
})

const regionStuntingCount = computed(() => {
  if (!store.selectedRegion) return 0
  return store.selectedRegion.totalStunting || store.selectedRegion.stunting || 24
})

const regionColor = computed(() => {
  const rate = regionRate.value
  if (rate > 20) return '#ef4444'
  if (rate > 10) return '#f59e0b'
  return '#10b981'
})

const regionRank = computed(() => {
  const name = store.selectedRegion?.name
  if (!name) return 2
  const normName = name.toLowerCase().replace(/\s+/g, '')
  const idx = store.kecamatanRanking.findIndex(k => (k.name || '').toLowerCase().replace(/\s+/g, '') === normName)
  return idx !== -1 ? idx + 1 : 2
})

const regionPosyanduList = computed(() => {
  const name = store.selectedRegion?.name
  if (!name) return []
  const normName = name.toLowerCase().replace(/\s+/g, '')
  return store.posyanduList.filter(p => 
    (p.desa || '').toLowerCase().replace(/\s+/g, '') === normName || 
    (p.kecamatan || '').toLowerCase().replace(/\s+/g, '') === normName
  )
})

function handleWhatsApp() {
  if (store.selectedRegion) {
    openWhatsApp(store.selectedRegion.name)
  }
}
</script>

<style scoped>
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2000;
  display: flex;
  justify-content: flex-end;
}

.region-drawer {
  width: 380px;
  max-width: 90vw;
  height: 100%;
  background: var(--bg-surface, #ffffff);
  border-left: 1px solid var(--border-color, #e2e8f0);
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.2);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  position: relative;
}

.close-drawer-btn {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--border-color, #e2e8f0);
  background: var(--bg-input, #f8fafc);
  color: var(--text-secondary, #64748b);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.region-type-badge {
  font-size: 0.7rem;
  font-weight: 700;
  color: #3b82f6;
  text-transform: uppercase;
  background: rgba(59, 130, 246, 0.1);
  padding: 3px 8px;
  border-radius: 8px;
}

.region-name {
  font-family: 'Outfit', sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-primary, #0f172a);
  margin: 4px 0 0;
}

.region-sub {
  font-size: 0.78rem;
  color: var(--text-secondary, #64748b);
  margin: 2px 0 0;
}

.metric-highlight-card {
  background: var(--bg-input, #f8fafc);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.rate-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 4px solid #ef4444;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.rate-num {
  font-family: 'Outfit', sans-serif;
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text-primary, #0f172a);
  line-height: 1;
}

.rate-sub {
  font-size: 0.62rem;
  color: var(--text-secondary, #64748b);
}

.stat-columns {
  display: flex;
  gap: 14px;
}

.s-col {
  display: flex;
  flex-direction: column;
}

.col-val {
  font-family: 'Outfit', sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-primary, #0f172a);
}

.col-val.text-red { color: #ef4444; }

.col-lbl {
  font-size: 0.7rem;
  color: var(--text-secondary, #64748b);
}

.ranking-banner {
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.25);
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 0.78rem;
  color: #d97706;
}

.section-title {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-primary, #0f172a);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 8px;
}

.posyandu-cards-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pos-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: var(--bg-input, #f8fafc);
  border-radius: 10px;
  border: 1px solid var(--border-color, #e2e8f0);
}

.pos-info {
  display: flex;
  flex-direction: column;
}

.pos-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-primary, #0f172a);
}

.pos-meta {
  font-size: 0.7rem;
  color: var(--text-secondary, #64748b);
}

.pus-card {
  display: flex;
  flex-direction: column;
  padding: 10px 12px;
  background: var(--bg-input, #f8fafc);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 10px;
}

.pus-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-primary, #0f172a);
}

.pus-phone {
  font-size: 0.7rem;
  color: var(--text-secondary, #64748b);
}

.wa-action-btn {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);
}

.drawer-slide-enter-active, .drawer-slide-leave-active {
  transition: all 0.3s ease;
}
.drawer-slide-enter-from, .drawer-slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
