<template>
  <div class="dashboard-kpi-container">
    <!-- Top Summary KPI Grid (Card modern dengan icon dan warna berbeda) -->
    <div class="kpi-grid">
      <!-- 1. Total Balita -->
      <div class="kpi-card blue">
        <div class="card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div class="card-content">
          <span class="kpi-value">{{ store.totalBalitaCount.toLocaleString() }}</span>
          <span class="kpi-label">Total Balita</span>
          <span class="kpi-sub">Terdaftar di Posyandu</span>
        </div>
      </div>

      <!-- 2. Total Stunting -->
      <div class="kpi-card red">
        <div class="card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" x2="12" y1="9" y2="13" /><line x1="12" x2="12.01" y1="17" y2="17" />
          </svg>
        </div>
        <div class="card-content">
          <span class="kpi-value">{{ store.stuntingCount }}</span>
          <span class="kpi-label">Total Stunting</span>
          <span class="kpi-sub">Sangat Pendek & Pendek</span>
        </div>
      </div>

      <!-- 3. Total Risiko -->
      <div class="kpi-card amber">
        <div class="card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
        </div>
        <div class="card-content">
          <span class="kpi-value">{{ store.riskCount }}</span>
          <span class="kpi-label">Total Risiko Stunting</span>
          <span class="kpi-sub">Butuh Pendampingan</span>
        </div>
      </div>

      <!-- 4. Total Normal -->
      <div class="kpi-card green">
        <div class="card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <div class="card-content">
          <span class="kpi-value">{{ store.normalCount }}</span>
          <span class="kpi-label">Total Normal</span>
          <span class="kpi-sub">Tumbuh Kembang Baik</span>
        </div>
      </div>

      <!-- 5. Persentase Stunting -->
      <div class="kpi-card purple">
        <div class="card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" x2="5" y1="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" />
          </svg>
        </div>
        <div class="card-content">
          <span class="kpi-value">{{ store.stuntingPercentage }}%</span>
          <span class="kpi-label">Prevalensi Stunting</span>
          <span class="kpi-sub">Target SSGI: &lt; 14%</span>
        </div>
      </div>
    </div>

    <!-- Priority Regions Summary Table -->
    <div class="priority-regions-card">
      <div class="card-header-bar">
        <h3>Ringkasan Wilayah Prioritas Penanganan</h3>
        <span class="sub-tag">Rangking Wilayah Stunting Tertinggi</span>
      </div>
      <div class="ranking-table-wrapper">
        <table class="ranking-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Kecamatan</th>
              <th>Total Balita</th>
              <th>Kasus Stunting</th>
              <th>Prevalensi (%)</th>
              <th>Status Risiko</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(kec, idx) in store.kecamatanRanking" :key="kec.id">
              <td><strong>#{{ idx + 1 }}</strong></td>
              <td><strong>Kec. {{ kec.name }}</strong></td>
              <td>{{ kec.count }} anak</td>
              <td class="text-red"><strong>{{ kec.stunting }} anak</strong></td>
              <td>
                <div class="rate-progress">
                  <span>{{ kec.rate }}%</span>
                  <div class="progress-bar-bg">
                    <div class="progress-fill" :style="{ width: Math.min(kec.rate * 3, 100) + '%', backgroundColor: kec.rate > 20 ? '#ef4444' : kec.rate > 10 ? '#f59e0b' : '#10b981' }"></div>
                  </div>
                </div>
              </td>
              <td>
                <span class="status-pill" :class="kec.rate > 20 ? 'red' : kec.rate > 10 ? 'amber' : 'green'">
                  {{ kec.rate > 20 ? 'Sangat Tinggi' : kec.rate > 10 ? 'Sedang' : 'Terkendali' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStuntingStore } from '../stores/stuntingStore.js'
const store = useStuntingStore()
</script>

<style scoped>
.dashboard-kpi-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.kpi-card {
  background: var(--bg-surface, #ffffff);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 16px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
  transition: all 0.25s ease;
}

.kpi-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.card-icon {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.kpi-card.blue .card-icon { background: rgba(59, 130, 246, 0.12); color: #3b82f6; }
.kpi-card.red .card-icon { background: rgba(239, 68, 68, 0.12); color: #ef4444; }
.kpi-card.amber .card-icon { background: rgba(245, 158, 11, 0.12); color: #f59e0b; }
.kpi-card.green .card-icon { background: rgba(16, 185, 129, 0.12); color: #10b981; }
.kpi-card.purple .card-icon { background: rgba(139, 92, 246, 0.12); color: #8b5cf6; }

.card-content {
  display: flex;
  flex-direction: column;
}

.kpi-value {
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary, #0f172a);
  line-height: 1.1;
}

.kpi-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-primary, #334155);
  margin-top: 2px;
}

.kpi-sub {
  font-size: 0.7rem;
  color: var(--text-secondary, #64748b);
}

.priority-regions-card {
  background: var(--bg-surface, #ffffff);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
}

.card-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.card-header-bar h3 {
  font-family: 'Outfit', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary, #0f172a);
  margin: 0;
}

.sub-tag {
  font-size: 0.75rem;
  color: var(--text-secondary, #64748b);
  background: var(--bg-input, #f1f5f9);
  padding: 4px 10px;
  border-radius: 10px;
  font-weight: 500;
}

.ranking-table-wrapper {
  overflow-x: auto;
}

.ranking-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
}

.ranking-table th {
  background: var(--bg-input, #f8fafc);
  color: var(--text-secondary, #64748b);
  text-align: left;
  padding: 10px 12px;
  font-weight: 600;
  border-bottom: 1px solid var(--border-color, #e2e8f0);
}

.ranking-table td {
  padding: 12px;
  border-bottom: 1px solid var(--border-color, #f1f5f9);
  color: var(--text-primary, #0f172a);
}

.text-red { color: #ef4444; }

.rate-progress {
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-bar-bg {
  flex: 1;
  height: 6px;
  background: var(--bg-input, #e2e8f0);
  border-radius: 3px;
  overflow: hidden;
  max-width: 100px;
}

.progress-fill {
  height: 100%;
  border-radius: 3px;
}

.status-pill {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 8px;
}

.status-pill.red { background: rgba(239, 68, 68, 0.12); color: #ef4444; }
.status-pill.amber { background: rgba(245, 158, 11, 0.12); color: #f59e0b; }
.status-pill.green { background: rgba(16, 185, 129, 0.12); color: #10b981; }
</style>
