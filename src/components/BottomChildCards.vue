<template>
  <div class="bottom-cards-wrapper">
    <div class="cards-header">
      <div class="header-title">
        <h3>Daftar Balita Prioritas</h3>
        <span class="count-pill">{{ store.filteredBalita.length }} balita terdaftar</span>
      </div>
      <button class="see-more-btn" @click="store.activeTab = 'table'">
        <span>Lihat Semua Tabel</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Cards Scroll Container -->
    <div class="cards-scroll-container">
      <div
        v-for="balita in store.filteredBalita"
        :key="balita.id"
        class="balita-card"
        :class="{ selected: store.selectedBalita?.id === balita.id }"
      >
        <div class="card-top">
          <div class="balita-avatar">
            <img :src="balita.photo" :alt="balita.name" />
          </div>
          <div class="balita-info">
            <h4 class="balita-name">{{ balita.name }}</h4>
            <p class="balita-sub">{{ balita.desa }}, Kec. {{ balita.kecamatan }}</p>
            <div class="metrics-row">
              <span class="metric-item"><strong class="label">BB:</strong> {{ balita.weightKg }} kg</span>
              <span class="metric-item"><strong class="label">TB:</strong> {{ balita.heightCm }} cm</span>
              <span class="metric-item"><strong class="label">Z:</strong> {{ balita.zScore }}</span>
            </div>
          </div>
          <div class="status-tag" :style="{ backgroundColor: balita.statusColor + '18', color: balita.statusColor, borderColor: balita.statusColor + '40' }">
            {{ balita.statusStunting }}
          </div>
        </div>

        <div class="card-actions">
          <button class="card-action-btn" @click="handleLocate(balita)">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <span>Lokasi</span>
          </button>

          <button class="card-action-btn" @click="store.openBalitaDetail(balita)">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="16" y2="12" /><line x1="12" x2="12.01" y1="8" y2="8" />
            </svg>
            <span>Detail</span>
          </button>

          <button class="card-action-btn wa-btn" @click="handleWhatsApp(balita)">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>WA</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStuntingStore } from '../stores/stuntingStore.js'
import { useWhatsApp } from '../composables/useWhatsApp.js'
import { useToast } from '../composables/useToast.js'

const store = useStuntingStore()
const { openWhatsApp } = useWhatsApp()
const { info } = useToast()

function handleLocate(balita) {
  store.selectedBalita = balita
  if (store.mapInstance) {
    store.mapInstance.setView([balita.lat, balita.lng], 14, { animate: true })
  }
  info(`Menuju lokasi ${balita.name} di ${balita.desa}`, 'Fokus Peta')
}

function handleWhatsApp(balita) {
  openWhatsApp(balita.desa, balita.name)
}
</script>

<style scoped>
.bottom-cards-wrapper {
  background: var(--bg-surface, #ffffff);
  border-top: 1px solid var(--border-color, #e2e8f0);
  padding: 12px 20px;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.05);
}

.cards-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-title h3 {
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary, #0f172a);
  margin: 0;
}

.count-pill {
  font-size: 0.72rem;
  background: var(--bg-input, #f1f5f9);
  color: var(--text-secondary, #64748b);
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 600;
}

.see-more-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: #3b82f6;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}

.see-more-btn:hover {
  text-decoration: underline;
}

.cards-scroll-container {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  padding-bottom: 6px;
  scrollbar-width: thin;
}

.balita-card {
  min-width: 320px;
  max-width: 360px;
  background: var(--bg-input, #f8fafc);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 14px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all 0.25s ease;
}

.balita-card:hover {
  transform: translateY(-2px);
  border-color: #3b82f6;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.balita-card.selected {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.card-top {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  position: relative;
}

.balita-avatar img {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  object-fit: cover;
}

.balita-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.balita-name {
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-primary, #0f172a);
  margin: 0;
}

.balita-sub {
  font-size: 0.72rem;
  color: var(--text-secondary, #64748b);
  margin: 1px 0 4px;
}

.metrics-row {
  display: flex;
  gap: 8px;
  font-size: 0.7rem;
  color: var(--text-primary, #0f172a);
}

.metric-item .label {
  color: var(--text-secondary, #64748b);
}

.status-tag {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 8px;
  border: 1px solid transparent;
  white-space: nowrap;
}

.card-actions {
  display: flex;
  gap: 6px;
  border-top: 1px solid var(--border-color, #e2e8f0);
  padding-top: 8px;
}

.card-action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 5px 8px;
  border-radius: 6px;
  border: 1px solid var(--border-color, #cbd5e1);
  background: var(--bg-surface, #ffffff);
  color: var(--text-secondary, #64748b);
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.card-action-btn:hover {
  background: var(--bg-hover, #f1f5f9);
  color: #3b82f6;
  border-color: #3b82f6;
}

.card-action-btn.wa-btn {
  background: rgba(37, 211, 102, 0.1);
  color: #128c7e;
  border-color: rgba(37, 211, 102, 0.3);
}

.card-action-btn.wa-btn:hover {
  background: #25d366;
  color: #ffffff;
}
</style>
