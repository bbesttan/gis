<template>
  <Transition name="drawer">
    <div v-if="store.isDetailOpen && store.selectedProvince" class="detail-overlay" @click.self="store.clearSelection">
      <div class="detail-drawer">
        <!-- Close button -->
        <button class="drawer-close" @click="store.clearSelection">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <!-- Province header -->
        <div class="drawer-header">
          <div class="header-top">
            <span :class="['category-badge', `badge-${store.selectedProvince.category.toLowerCase()}`]">
              {{ store.selectedProvince.category }}
            </span>
          </div>
          <h2 class="province-name">{{ store.selectedProvince.name }}</h2>
          <div class="percentage-display">
            <span class="percentage-value">{{ store.selectedProvince.percentage }}</span>
            <span class="percentage-symbol">%</span>
          </div>
          <p class="percentage-label">Prevalensi Stunting {{ store.selectedYear }}</p>
        </div>

        <!-- Stats grid -->
        <div class="detail-stats">
          <div class="detail-stat">
            <div class="detail-stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <div class="stat-val">{{ formatNumber(store.selectedProvince.childrenAffected) }}</div>
              <div class="stat-lbl">Anak Terindikasi</div>
            </div>
          </div>

          <div class="detail-stat">
            <div class="detail-stat-icon" :class="store.selectedProvince.trend === 'down' ? 'icon-green' : 'icon-red'">
              <svg v-if="store.selectedProvince.trend === 'down'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m18 15-6-6-6 6"/>
              </svg>
            </div>
            <div>
              <div class="stat-val" :class="store.selectedProvince.trend === 'down' ? 'text-green' : 'text-red'">
                {{ store.selectedProvince.delta > 0 ? '+' : '' }}{{ store.selectedProvince.delta }}%
              </div>
              <div class="stat-lbl">vs Tahun Lalu ({{ store.selectedProvince.prevPercentage }}%)</div>
            </div>
          </div>
        </div>

        <!-- Progress bar visualization -->
        <div class="progress-section">
          <div class="progress-header">
            <span class="progress-label">Tingkat Prevalensi</span>
            <span class="progress-value">{{ store.selectedProvince.percentage }}%</span>
          </div>
          <div class="progress-bar-bg">
            <div
              class="progress-bar-fill"
              :style="{
                width: Math.min(store.selectedProvince.percentage, 50) * 2 + '%',
                background: store.selectedProvince.color
              }"
            ></div>
            <!-- Markers -->
            <div class="progress-marker" style="left: 20%;">
              <span class="marker-line"></span>
              <span class="marker-label">10%</span>
            </div>
            <div class="progress-marker" style="left: 40%;">
              <span class="marker-line"></span>
              <span class="marker-label">20%</span>
            </div>
          </div>
        </div>

        <!-- WhatsApp CTA -->
        <button class="wa-cta" @click="handleWhatsApp">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span>Konsultasi / Laporkan via WhatsApp</span>
        </button>

        <p class="wa-hint">Pesan otomatis berisi info wilayah ini akan dikirim ke Admin</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useStuntingStore } from '../stores/stuntingStore.js'
import { useWhatsApp } from '../composables/useWhatsApp.js'

const store = useStuntingStore()
const { openWhatsApp } = useWhatsApp()

function formatNumber(num) {
  if (!num) return '0'
  return num.toLocaleString('id-ID')
}

function handleWhatsApp() {
  if (store.selectedProvince) {
    openWhatsApp(store.selectedProvince.name, store.selectedProvince.percentage)
  }
}
</script>

<style scoped>
.detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: flex-end;
}

.detail-drawer {
  width: 380px;
  max-width: 90vw;
  height: 100%;
  background: rgba(15, 23, 42, 0.97);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-left: 1px solid rgba(148, 163, 184, 0.1);
  box-shadow: -8px 0 40px rgba(0, 0, 0, 0.4);
  padding: 28px 24px;
  overflow-y: auto;
  position: relative;
}

.drawer-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(148, 163, 184, 0.1);
  border: 1px solid rgba(148, 163, 184, 0.1);
  color: #94A3B8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.drawer-close:hover {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.2);
  color: #F87171;
}

.drawer-header {
  margin-top: 20px;
  margin-bottom: 24px;
}

.header-top {
  margin-bottom: 12px;
}

.category-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.badge-rendah {
  background: rgba(16, 185, 129, 0.15);
  color: #34D399;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.badge-sedang {
  background: rgba(245, 158, 11, 0.15);
  color: #FBBF24;
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.badge-tinggi {
  background: rgba(239, 68, 68, 0.15);
  color: #F87171;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.province-name {
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #F8FAFC;
  margin: 0 0 8px;
  line-height: 1.3;
}

.percentage-display {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.percentage-value {
  font-family: 'Outfit', sans-serif;
  font-size: 3.2rem;
  font-weight: 800;
  color: #F8FAFC;
  line-height: 1;
  letter-spacing: -0.03em;
}

.percentage-symbol {
  font-family: 'Outfit', sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  color: #94A3B8;
}

.percentage-label {
  font-size: 0.8rem;
  color: #64748B;
  margin-top: 4px;
}

.detail-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.detail-stat {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(148, 163, 184, 0.08);
  border-radius: 12px;
}

.detail-stat-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(59, 130, 246, 0.12);
  color: #60A5FA;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.detail-stat-icon.icon-green {
  background: rgba(16, 185, 129, 0.12);
  color: #34D399;
}

.detail-stat-icon.icon-red {
  background: rgba(239, 68, 68, 0.12);
  color: #F87171;
}

.stat-val {
  font-family: 'Outfit', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #F8FAFC;
  line-height: 1.2;
}

.stat-val.text-green { color: #34D399; }
.stat-val.text-red { color: #F87171; }

.stat-lbl {
  font-size: 0.72rem;
  color: #94A3B8;
  margin-top: 1px;
}

.progress-section {
  margin-bottom: 28px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.progress-label {
  font-size: 0.75rem;
  color: #94A3B8;
  font-weight: 500;
}

.progress-value {
  font-size: 0.75rem;
  color: #CBD5E1;
  font-weight: 600;
}

.progress-bar-bg {
  position: relative;
  height: 8px;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 4px;
  overflow: visible;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.progress-marker {
  position: absolute;
  top: -4px;
  transform: translateX(-50%);
}

.marker-line {
  display: block;
  width: 1px;
  height: 16px;
  background: rgba(148, 163, 184, 0.3);
}

.marker-label {
  display: block;
  font-size: 0.6rem;
  color: #64748B;
  margin-top: 2px;
  transform: translateX(-30%);
}

.wa-cta {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 20px;
  background: linear-gradient(135deg, #25D366, #128C7E);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.25);
}

.wa-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(37, 211, 102, 0.35);
  filter: brightness(1.05);
}

.wa-cta:active {
  transform: translateY(0);
}

.wa-hint {
  text-align: center;
  font-size: 0.7rem;
  color: #64748B;
  margin-top: 10px;
}

/* Transition animations */
.drawer-enter-active {
  transition: all 0.35s ease;
}
.drawer-leave-active {
  transition: all 0.25s ease;
}

.drawer-enter-active .detail-drawer {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer-leave-active .detail-drawer {
  transition: transform 0.25s ease-in;
}

.drawer-enter-from {
  opacity: 0;
}
.drawer-enter-from .detail-drawer {
  transform: translateX(100%);
}

.drawer-leave-to {
  opacity: 0;
}
.drawer-leave-to .detail-drawer {
  transform: translateX(100%);
}
</style>
