<template>
  <div class="stats-bar">
    <div class="stat-card">
      <div class="stat-icon stat-icon-blue">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      </div>
      <div class="stat-info">
        <span class="stat-value">
          <AnimatedNumber :value="store.provinces.length" />
        </span>
        <span class="stat-label">Provinsi Terpetakan</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon stat-icon-amber">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      </div>
      <div class="stat-info">
        <span class="stat-value">
          <AnimatedNumber :value="store.nationalAverage" :decimals="1" />%
        </span>
        <span class="stat-label">Rata-rata Nasional</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon stat-icon-red">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      </div>
      <div class="stat-info">
        <span class="stat-value">
          <AnimatedNumber :value="store.highCount" />
        </span>
        <span class="stat-label">Provinsi Tinggi (&gt;20%)</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon stat-icon-green">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>
      <div class="stat-info">
        <span class="stat-value">
          <AnimatedNumber :value="store.lowCount" />
        </span>
        <span class="stat-label">Provinsi Rendah (&lt;10%)</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useStuntingStore } from '../stores/stuntingStore.js'

const store = useStuntingStore()

// Animated number component
const AnimatedNumber = {
  props: {
    value: { type: Number, required: true },
    decimals: { type: Number, default: 0 },
    duration: { type: Number, default: 1200 }
  },
  setup(props) {
    const displayed = ref(0)
    let animationFrame = null

    function animate(from, to) {
      const start = performance.now()
      const diff = to - from

      function step(timestamp) {
        const elapsed = timestamp - start
        const progress = Math.min(elapsed / props.duration, 1)
        // easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        displayed.value = from + diff * eased

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step)
        }
      }

      if (animationFrame) cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(step)
    }

    onMounted(() => animate(0, props.value))
    watch(() => props.value, (newVal, oldVal) => animate(oldVal, newVal))

    return () => {
      const val = props.decimals > 0
        ? displayed.value.toFixed(props.decimals)
        : Math.round(displayed.value)
      return val
    }
  }
}
</script>

<style scoped>
.stats-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 16px 24px;
  max-width: 1600px;
  margin: 0 auto;
}

.stat-card {
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(148, 163, 184, 0.08);
  border-radius: 14px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  background: rgba(30, 41, 59, 0.8);
  border-color: rgba(148, 163, 184, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.stat-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon-blue {
  background: rgba(59, 130, 246, 0.15);
  color: #60A5FA;
}

.stat-icon-amber {
  background: rgba(245, 158, 11, 0.15);
  color: #FBBF24;
}

.stat-icon-red {
  background: rgba(239, 68, 68, 0.15);
  color: #F87171;
}

.stat-icon-green {
  background: rgba(16, 185, 129, 0.15);
  color: #34D399;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-family: 'Outfit', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #F8FAFC;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.75rem;
  color: #94A3B8;
  margin-top: 2px;
  white-space: nowrap;
}

@media (max-width: 900px) {
  .stats-bar {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 12px 16px;
  }
}

@media (max-width: 480px) {
  .stats-bar {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .stat-card {
    padding: 12px;
    gap: 10px;
  }
  .stat-value {
    font-size: 1.15rem;
  }
}
</style>
