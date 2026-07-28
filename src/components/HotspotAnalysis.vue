<template>
  <div class="hotspot-analysis-container">
    <div class="header-section">
      <h2>Modul Analisis Spasial & Hotspot Stunting</h2>
      <p class="subtitle">Analisis Lanjutan & Value-Add Portofolio GIS Profesional</p>
    </div>

    <!-- 4 Main Value-Add Cards Grid -->
    <div class="analysis-grid">
      <!-- 1. Hotspot Clustering Card -->
      <div class="analysis-card">
        <div class="card-icon red">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div class="card-info">
          <h3>Kluster Hotspot (Spatial Moran's I)</h3>
          <p>Identifikasi wilayah kluster kasus stunting sangat tinggi yang membutuhkan intervensi darurat PMT (Pemberian Makanan Tambahan).</p>
          <div class="hotspot-list">
            <span class="hotspot-pill high">High-High Cluster: Des. Sawangan Baru (26.5%)</span>
            <span class="hotspot-pill high">High-High Cluster: Des. Depok Jaya (24.8%)</span>
            <span class="hotspot-pill med">High-Low Cluster: Des. Beji Timur (22.4%)</span>
          </div>
        </div>
      </div>

      <!-- 2. Buffer Radius Puskesmas Card -->
      <div class="analysis-card">
        <div class="card-icon blue">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
          </svg>
        </div>
        <div class="card-info">
          <h3>Analisis Buffer Radius Jangkauan Puskesmas</h3>
          <p>Evaluasi keterjangkauan pelayanan fasilitas kesehatan Puskesmas (Radius 1 KM, 3 KM, 5 KM) terhadap permukiman balita.</p>
          <div class="buffer-stats">
            <div class="b-stat">
              <span class="b-val">88.4%</span>
              <span class="b-lbl">Tercakup dalam Buffer 3 KM</span>
            </div>
            <div class="b-stat">
              <span class="b-val text-amber">11.6%</span>
              <span class="b-lbl">Diluar Buffer Jangkauan Utuh</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Before-After Comparison Card -->
      <div class="analysis-card">
        <div class="card-icon green">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
          </svg>
        </div>
        <div class="card-info">
          <h3>Evaluasi Dampak Program (Before vs After)</h3>
          <p>Perbandingan hasil program intervensi spesifik stunting periode 2023 (21.5%) vs 2024 (15.0%).</p>
          <div class="impact-comparison">
            <div class="cmp-box">
              <span class="cmp-title">Sebelum (2023)</span>
              <span class="cmp-num red">720 anak (21.5%)</span>
            </div>
            <div class="cmp-arrow">&rarr;</div>
            <div class="cmp-box">
              <span class="cmp-title">Sesudah (2024)</span>
              <span class="cmp-num green">540 anak (15.0%)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. KPI Dashboard Intervensi Card -->
      <div class="analysis-card">
        <div class="card-icon purple">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <div class="card-info">
          <h3>Capaian KPI Intervensi Gizi Protektif</h3>
          <p>Distribusi Suplementasi Vitamin A, Tablet Tambah Darah (TTD), dan PMT Balita.</p>
          <div class="kpi-progress-list">
            <div class="kpi-p-item">
              <div class="p-head">
                <span>Pemberian PMT Balita Stunting</span>
                <span>92%</span>
              </div>
              <div class="p-bg"><div class="p-fill green" style="width: 92%;"></div></div>
            </div>
            <div class="kpi-p-item">
              <div class="p-head">
                <span>Suplementasi Vitamin A & Imunisasi</span>
                <span>96%</span>
              </div>
              <div class="p-bg"><div class="p-fill blue" style="width: 96%;"></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStuntingStore } from '../stores/stuntingStore.js'
const store = useStuntingStore()
</script>

<style scoped>
.hotspot-analysis-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header-section h2 {
  font-family: 'Outfit', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary, #0f172a);
  margin: 0;
}

.subtitle {
  font-size: 0.8rem;
  color: var(--text-secondary, #64748b);
  margin-top: 2px;
}

.analysis-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.analysis-card {
  background: var(--bg-surface, #ffffff);
  border: 1.5px solid #bbf7d0;
  border-radius: 20px;
  padding: 22px;
  display: flex;
  gap: 16px;
  box-shadow: 0 4px 16px rgba(34, 197, 94, 0.06);
  transition: all 0.2s ease;
}

.analysis-card:hover {
  border-color: #2563eb;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.1);
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-icon.red { background: rgba(31, 41, 55, 0.12); color: #1f2937; }
.card-icon.blue { background: rgba(59, 130, 246, 0.12); color: #2563eb; }
.card-icon.green { background: rgba(96, 165, 250, 0.12); color: #60a5fa; }
.card-icon.purple { background: rgba(139, 92, 246, 0.12); color: #7c3aed; }

.card-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.card-info h3 {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--text-primary, #0f172a);
  margin: 0;
}


.card-info p {
  font-size: 0.78rem;
  color: var(--text-secondary, #64748b);
  line-height: 1.4;
  margin: 0;
}

.hotspot-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
}

.hotspot-pill {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 8px;
}

.hotspot-pill.high { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
.hotspot-pill.med { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }

.buffer-stats {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}

.b-stat {
  display: flex;
  flex-direction: column;
}

.b-val {
  font-family: 'Outfit', sans-serif;
  font-size: 1.3rem;
  font-weight: 800;
  color: #3b82f6;
}

.b-val.text-amber { color: #f59e0b; }

.b-lbl {
  font-size: 0.72rem;
  color: var(--text-secondary, #64748b);
}

.impact-comparison {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
}

.cmp-box {
  display: flex;
  flex-direction: column;
  background: var(--bg-input, #f8fafc);
  padding: 8px 12px;
  border-radius: 10px;
}

.cmp-title {
  font-size: 0.72rem;
  color: var(--text-secondary, #64748b);
}

.cmp-num {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 0.9rem;
}

.cmp-num.red { color: #1f2937; }
.cmp-num.green { color: #2563eb; }

.cmp-arrow {
  color: var(--text-secondary, #64748b);
  font-weight: 700;
}

.kpi-progress-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}

.kpi-p-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.p-head {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-primary, #0f172a);
}

.p-bg {
  height: 6px;
  background: var(--bg-input, #e2e8f0);
  border-radius: 3px;
  overflow: hidden;
}

.p-fill.green { background: #60a5fa; height: 100%; }
.p-fill.blue { background: #2563eb; height: 100%; }

@media (max-width: 900px) {
  .analysis-grid {
    grid-template-columns: 1fr;
  }
}
</style>
