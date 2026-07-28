<template>
  <div class="statistics-charts-container">
    <div class="charts-grid">
      <!-- 1. Area / Line Chart: Tren Tahunan 2022-2025 -->
      <div class="chart-card wide">
        <div class="chart-header">
          <div>
            <h3>Grafik Tren Prevalensi Stunting Tahunan (2022 - 2025)</h3>
            <p class="chart-sub">Perkembangan penurunan stunting nasional & daerah</p>
          </div>
          <span class="chart-badge">Area Chart</span>
        </div>
        <div class="chart-body">
          <Line :data="yearlyTrendChartData" :options="lineChartOptions" />
        </div>
      </div>

      <!-- 2. Bar Chart: Distribusi Kasus Per Kecamatan -->
      <div class="chart-card">
        <div class="chart-header">
          <div>
            <h3>Kasus Stunting Berdasarkan Kecamatan</h3>
            <p class="chart-sub">Jumlah balita stunting per wilayah kecamatan</p>
          </div>
          <span class="chart-badge">Bar Chart</span>
        </div>
        <div class="chart-body">
          <Bar :data="kecamatanChartData" :options="barChartOptions" />
        </div>
      </div>

      <!-- 3. Doughnut Chart: Proporsi Status Stunting -->
      <div class="chart-card">
        <div class="chart-header">
          <div>
            <h3>Proporsi Status Stunting</h3>
            <p class="chart-sub">Persentase kategori status stunting</p>
          </div>
          <span class="chart-badge">Doughnut Chart</span>
        </div>
        <div class="chart-body donut-body">
          <Doughnut :data="statusDoughnutChartData" :options="doughnutOptions" />
        </div>
      </div>

      <!-- 4. Pie Chart: Statistik Berdasarkan Jenis Kelamin -->
      <div class="chart-card">
        <div class="chart-header">
          <div>
            <h3>Statistik Jenis Kelamin</h3>
            <p class="chart-sub">Distribusi balita Laki-laki vs Perempuan</p>
          </div>
          <span class="chart-badge">Pie Chart</span>
        </div>
        <div class="chart-body donut-body">
          <Pie :data="genderPieChartData" :options="doughnutOptions" />
        </div>
      </div>

      <!-- 5. Bar Chart: Distribusi Kelompok Umur -->
      <div class="chart-card">
        <div class="chart-header">
          <div>
            <h3>Statistik Kelompok Umur (Bulan)</h3>
            <p class="chart-sub">Rentang usia balita terindikasi stunting</p>
          </div>
          <span class="chart-badge">Bar Chart</span>
        </div>
        <div class="chart-body">
          <Bar :data="ageGroupChartData" :options="barChartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler
} from 'chart.js'
import { Bar, Line, Pie, Doughnut } from 'vue-chartjs'
import { useStuntingStore } from '../stores/stuntingStore.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler
)

const store = useStuntingStore()

// 1. Line/Area Chart Data: Yearly Trend
const yearlyTrendChartData = computed(() => {
  return {
    labels: store.yearlyTrend.map(y => y.year.toString()),
    datasets: [
      {
        label: 'Prevalensi Stunting (%)',
        data: store.yearlyTrend.map(y => y.percentage),
        borderColor: '#1F2937',
        backgroundColor: 'rgba(31, 41, 55, 0.15)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#1F2937',
        pointRadius: 5
      },
      {
        label: 'Target Pemerintah (%)',
        data: [25.0, 21.5, 15.0, 11.0],
        borderColor: '#2563EB',
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0
      }
    ]
  }
})

// 2. Bar Chart Data: Kecamatan Breakdown
const kecamatanChartData = computed(() => {
  return {
    labels: store.kecamatanRanking.map(k => k.name),
    datasets: [
      {
        label: 'Kasus Stunting',
        data: store.kecamatanRanking.map(k => k.stunting),
        backgroundColor: '#1F2937',
        borderRadius: 6
      },
      {
        label: 'Balita Normal',
        data: store.kecamatanRanking.map(k => k.count - k.stunting),
        backgroundColor: '#60A5FA',
        borderRadius: 6
      }
    ]
  }
})

// 3. Doughnut Chart Data: Status Stunting
const statusDoughnutChartData = computed(() => {
  return {
    labels: ['Sangat Pendek', 'Pendek', 'Risiko Stunting', 'Normal'],
    datasets: [
      {
        data: [
          store.filteredBalita.filter(b => b.statusStunting === 'Sangat Pendek').length || 2,
          store.filteredBalita.filter(b => b.statusStunting === 'Pendek').length || 3,
          store.riskCount || 2,
          store.normalCount || 3
        ],
        backgroundColor: ['#1F2937', '#2563EB', '#60A5FA', '#DBEAFE']
      }
    ]
  }
})

// 4. Pie Chart Data: Gender
const genderPieChartData = computed(() => {
  return {
    labels: ['Laki-laki', 'Perempuan'],
    datasets: [
      {
        data: [store.genderBreakdown.male, store.genderBreakdown.female],
        backgroundColor: ['#3b82f6', '#ec4899']
      }
    ]
  }
})

// 5. Bar Chart Data: Age Groups
const ageGroupChartData = computed(() => {
  return {
    labels: ['0-6 Bulan', '6-12 Bulan', '12-24 Bulan', '24-59 Bulan'],
    datasets: [
      {
        label: 'Jumlah Balita',
        data: [
          store.ageBreakdown.g0_6,
          store.ageBreakdown.g6_12,
          store.ageBreakdown.g12_24,
          store.ageBreakdown.g24_59
        ],
        backgroundColor: '#8b5cf6',
        borderRadius: 6
      }
    ]
  }
})

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(148, 163, 184, 0.1)' }
    },
    x: {
      grid: { color: 'rgba(148, 163, 184, 0.1)' }
    }
  }
}

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(148, 163, 184, 0.1)' }
    },
    x: {
      grid: { display: false }
    }
  }
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' }
  }
}
</script>

<style scoped>
.statistics-charts-container {
  display: flex;
  flex-direction: column;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.chart-card {
  background: var(--bg-surface, #ffffff);
  border: 1.5px solid #bbf7d0;
  border-radius: 20px;
  padding: 22px;
  box-shadow: 0 4px 16px rgba(34, 197, 94, 0.06);
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
}

.chart-card:hover {
  border-color: #22c55e;
  box-shadow: 0 8px 24px rgba(34, 197, 94, 0.1);
}

.chart-card.wide {
  grid-column: span 2;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.chart-header h3 {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--text-primary, #0f172a);
  margin: 0;
}

.chart-sub {
  font-size: 0.78rem;
  color: var(--text-secondary, #64748b);
  margin-top: 2px;
}

.chart-badge {
  font-size: 0.7rem;
  font-weight: 800;
  background: #dbeafe;
  color: #2563eb;
  padding: 4px 10px;
  border-radius: 9999px;
  border: 1px solid #93c5fd;
}


.chart-body {
  height: 260px;
  position: relative;
}

.donut-body {
  height: 240px;
}

@media (max-width: 900px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
  .chart-card.wide {
    grid-column: span 1;
  }
}
</style>
