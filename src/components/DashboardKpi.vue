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
  border: 1.5px solid #bbf7d0;
  border-radius: 18px;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 4px 16px rgba(34, 197, 94, 0.06);
  transition: all 0.25s ease;
}

.kpi-card:hover {
  transform: translateY(-3px);
  border-color: #22c55e;
  box-shadow: 0 10px 24px rgba(34, 197, 94, 0.12);
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

.kpi-card.blue .card-icon { background: rgba(59, 130, 246, 0.12); color: #2563eb; }
.kpi-card.red .card-icon { background: rgba(239, 68, 68, 0.12); color: #dc2626; }
.kpi-card.amber .card-icon { background: rgba(245, 158, 11, 0.12); color: #d97706; }
.kpi-card.green .card-icon { background: rgba(34, 197, 94, 0.15); color: #16a34a; }
.kpi-card.purple .card-icon { background: rgba(139, 92, 246, 0.12); color: #7c3aed; }

.card-content {
  display: flex;
  flex-direction: column;
}

.kpi-value {
  font-family: 'Inter', sans-serif;
  font-size: 1.6rem;
  font-weight: 850;
  color: var(--text-primary, #0f172a);
}

.kpi-label {
  font-size: 0.85rem;
  font-weight: 750;
  color: var(--text-secondary, #334155);
}

.kpi-sub {
  font-size: 0.72rem;
  color: var(--text-muted, #64748b);
  margin-top: 2px;
}

.priority-regions-card {
  background: var(--bg-surface, #ffffff);
  border: 1.5px solid #bbf7d0;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(34, 197, 94, 0.06);
}

.card-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e2e8f0;
}

.card-header-bar h3 {
  font-size: 1.1rem;
  font-weight: 850;
  color: #0f172a;
}

.sub-tag {
  font-size: 0.75rem;
  background: #dcfce7;
  color: #15803d;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 9999px;
}

.ranking-table-wrapper {
  overflow-x: auto;
}

.ranking-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 0.88rem;
}

.ranking-table th {
  background: #f0fdf4;
  color: #15803d;
  font-weight: 800;
  text-align: left;
  padding: 12px 14px;
  border-bottom: 2px solid #bbf7d0;
}

.ranking-table td {
  padding: 12px 14px;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
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
  background: #e2e8f0;
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

