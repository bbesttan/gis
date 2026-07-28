<template>
  <div class="dynamic-map-legend" v-if="store.showChoropleth || store.showHeatmap">
    <div class="legend-header">
      <span class="legend-title">Legenda Peta</span>
      <span class="legend-sub">{{ store.choroplethLevel === 'desa' ? 'Tingkat Desa' : 'Tingkat Kecamatan' }}</span>
    </div>

    <!-- Choropleth Color Scale -->
    <div class="legend-body" v-if="store.showChoropleth">
      <div class="legend-row">
        <span class="color-box red"></span>
        <span class="label">Sangat Tinggi / Merah (&gt; 20%)</span>
      </div>
      <div class="legend-row">
        <span class="color-box amber"></span>
        <span class="label">Sedang / Kuning (10% - 20%)</span>
      </div>
      <div class="legend-row">
        <span class="color-box blue"></span>
        <span class="label">Risiko Stunting / Biru</span>
      </div>
      <div class="legend-row">
        <span class="color-box green"></span>
        <span class="label">Rendah / Hijau (&lt; 10%)</span>
      </div>
    </div>

    <!-- Heatmap Scale -->
    <div class="legend-body margin-t" v-if="store.showHeatmap">
      <span class="legend-title">Kepadatan Heatmap</span>
      <div class="heatmap-gradient-bar"></div>
      <div class="gradient-labels">
        <span>Rendah</span>
        <span>Tinggi</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStuntingStore } from '../stores/stuntingStore.js'
const store = useStuntingStore()
</script>

<style scoped>
.dynamic-map-legend {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 900;
  background: var(--bg-surface, rgba(255, 255, 255, 0.92));
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 14px;
  padding: 12px 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  min-width: 210px;
}

.legend-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--border-color, #e2e8f0);
  padding-bottom: 6px;
}

.legend-title {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-primary, #0f172a);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.legend-sub {
  font-size: 0.68rem;
  color: var(--text-secondary, #64748b);
  font-weight: 500;
}

.legend-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.legend-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-box {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  flex-shrink: 0;
}

.color-box.red { background: #ef4444; }
.color-box.amber { background: #f59e0b; }
.color-box.blue { background: #3b82f6; }
.color-box.green { background: #10b981; }

.label {
  font-size: 0.75rem;
  color: var(--text-primary, #334155);
}

.margin-t {
  margin-top: 8px;
}

.heatmap-gradient-bar {
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(to right, blue, cyan, lime, yellow, red);
  margin-top: 4px;
}

.gradient-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.65rem;
  color: var(--text-secondary, #64748b);
}

.buffer-circle {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px dashed #3b82f6;
  background: rgba(59, 130, 246, 0.15);
}
</style>
