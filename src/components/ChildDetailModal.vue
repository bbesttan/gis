<template>
  <Transition name="modal-fade">
    <div v-if="store.isBalitaModalOpen && store.selectedBalita" class="modal-backdrop" @click.self="store.closeBalitaDetail">
      <div class="modal-card">
        <!-- Close Button -->
        <button class="close-btn" @click="store.closeBalitaDetail">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        </button>

        <!-- Header Profile -->
        <div class="modal-header">
          <img :src="store.selectedBalita.photo" :alt="store.selectedBalita.name" class="child-photo" />
          <div class="profile-main">
            <div class="status-badges">
              <span class="badge" :style="{ backgroundColor: store.selectedBalita.statusColor + '20', color: store.selectedBalita.statusColor, borderColor: store.selectedBalita.statusColor + '40' }">
                {{ store.selectedBalita.statusStunting }}
              </span>
              <span class="badge gizi-badge">
                {{ store.selectedBalita.statusGizi }}
              </span>
            </div>
            <h2 class="child-name">{{ store.selectedBalita.name }}</h2>
            <p class="child-nik">NIK: {{ store.selectedBalita.nik }} • {{ store.selectedBalita.gender }} ({{ store.selectedBalita.ageMonths }} Bulan)</p>
          </div>
        </div>

        <!-- Vital Statistics Grid -->
        <div class="vitals-grid">
          <div class="vital-card">
            <span class="vital-label">Berat Badan (BB)</span>
            <span class="vital-val">{{ store.selectedBalita.weightKg }} <small>kg</small></span>
          </div>
          <div class="vital-card">
            <span class="vital-label">Tinggi Badan (TB)</span>
            <span class="vital-val">{{ store.selectedBalita.heightCm }} <small>cm</small></span>
          </div>
          <div class="vital-card">
            <span class="vital-label">Z-Score Stunting</span>
            <span class="vital-val" :style="{ color: store.selectedBalita.statusColor }">{{ store.selectedBalita.zScore }}</span>
          </div>
        </div>

        <!-- Detailed Info List -->
        <div class="info-section">
          <h4 class="section-heading">Informasi Orang Tua & Lokasi</h4>
          <div class="info-grid">
            <div class="info-row">
              <span class="info-key">Nama Orang Tua:</span>
              <span class="info-value">{{ store.selectedBalita.parentName }}</span>
            </div>
            <div class="info-row">
              <span class="info-key">Alamat Lengkap:</span>
              <span class="info-value">{{ store.selectedBalita.address }}, Kel. {{ store.selectedBalita.desa }}, Kec. {{ store.selectedBalita.kecamatan }}</span>
            </div>
            <div class="info-row">
              <span class="info-key">Posyandu & Puskesmas:</span>
              <span class="info-value">{{ store.selectedBalita.posyandu }} ({{ store.selectedBalita.puskesmas }})</span>
            </div>
          </div>
        </div>

        <!-- Growth History Graph (Riwayat Pertumbuhan) -->
        <div class="growth-section">
          <h4 class="section-heading">Riwayat Pertumbuhan Balita (Monthly Trend)</h4>
          <div class="growth-timeline-list">
            <div v-for="g in store.selectedBalita.growthHistory" :key="g.month" class="growth-item">
              <span class="g-month">{{ g.month }}</span>
              <span class="g-age">{{ g.age }} bln</span>
              <span class="g-bb">BB: {{ g.weight }}kg</span>
              <span class="g-tb">TB: {{ g.height }}cm</span>
              <span class="g-z">Z: {{ g.zScore }}</span>
            </div>
          </div>
        </div>

        <!-- Modal Footer Actions -->
        <div class="modal-footer">
          <button class="footer-btn secondary" @click="handleZoomToLocation">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <span>Zoom ke Lokasi Peta</span>
          </button>

          <button class="footer-btn primary-wa" @click="handleWhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>Konsultasi Orang Tua</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useStuntingStore } from '../stores/stuntingStore.js'
import { useWhatsApp } from '../composables/useWhatsApp.js'
import { useToast } from '../composables/useToast.js'

const store = useStuntingStore()
const { openWhatsApp } = useWhatsApp()
const { info } = useToast()

function handleZoomToLocation() {
  if (store.selectedBalita && store.mapInstance) {
    store.mapInstance.setView([store.selectedBalita.lat, store.selectedBalita.lng], 15, { animate: true })
    store.closeBalitaDetail()
    store.activeTab = 'map'
    info(`Zoom ke lokasi ${store.selectedBalita.name}`, 'Fokus Peta')
  }
}

function handleWhatsApp() {
  if (store.selectedBalita) {
    openWhatsApp(store.selectedBalita.desa, store.selectedBalita.name)
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-card {
  width: 520px;
  max-width: 95vw;
  max-height: 90vh;
  background: var(--bg-surface, #ffffff);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  position: relative;
}

.close-btn {
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

.modal-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.child-photo {
  width: 68px;
  height: 68px;
  border-radius: 16px;
  object-fit: cover;
  border: 2px solid #3b82f6;
}

.profile-main {
  display: flex;
  flex-direction: column;
}

.status-badges {
  display: flex;
  gap: 6px;
  margin-bottom: 4px;
}

.badge {
  font-size: 0.68rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 8px;
  border: 1px solid transparent;
}

.gizi-badge {
  background: var(--bg-input, #f1f5f9);
  color: var(--text-primary, #334155);
}

.child-name {
  font-family: 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary, #0f172a);
  margin: 0;
}

.child-nik {
  font-size: 0.75rem;
  color: var(--text-secondary, #64748b);
  margin-top: 2px;
}

.vitals-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.vital-card {
  background: var(--bg-input, #f8fafc);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 12px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
}

.vital-label {
  font-size: 0.7rem;
  color: var(--text-secondary, #64748b);
}

.vital-val {
  font-family: 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-primary, #0f172a);
}

.vital-val small {
  font-size: 0.75rem;
  font-weight: 500;
}

.section-heading {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-primary, #0f172a);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 8px;
}

.info-section {
  margin-bottom: 20px;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: var(--bg-input, #f8fafc);
  border-radius: 12px;
  padding: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
}

.info-key {
  color: var(--text-secondary, #64748b);
  font-weight: 500;
}

.info-value {
  color: var(--text-primary, #0f172a);
  font-weight: 600;
  text-align: right;
}

.growth-section {
  margin-bottom: 24px;
}

.growth-timeline-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.growth-item {
  display: flex;
  justify-content: space-between;
  padding: 6px 10px;
  background: var(--bg-input, #f1f5f9);
  border-radius: 8px;
  font-size: 0.75rem;
  color: var(--text-primary, #0f172a);
  font-weight: 500;
}

.g-month { font-weight: 700; color: #3b82f6; }

.modal-footer {
  display: flex;
  gap: 10px;
}

.footer-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px;
  border-radius: 12px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.footer-btn.secondary {
  background: var(--bg-input, #f1f5f9);
  color: var(--text-primary, #0f172a);
  border: 1px solid var(--border-color, #cbd5e1);
}

.footer-btn.primary-wa {
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);
}

.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}
</style>
