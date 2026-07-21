<template>
  <header class="app-header">
    <div class="header-container">
      <!-- Left: Logo & Title -->
      <div class="header-left">
        <div class="logo-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="m12 2 4 10-4 10-4-10z" />
          </svg>
        </div>
        <div class="brand-info">
          <h1 class="brand-title">ShareInsight <span class="brand-badge">GIS Stunting</span></h1>
          <p class="brand-sub">Sistem Informasi Geografis Pemantauan Stunting</p>
        </div>
      </div>

      <!-- Center: Global Search Bar (ShareInsight style) -->
      <div class="header-center">
        <div class="search-box">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            v-model="store.searchQuery"
            placeholder="Cari nama anak, NIK, orang tua, desa, kecamatan, posyandu..."
            class="search-input"
            @focus="isSearching = true"
            @blur="setTimeout(() => isSearching = false, 200)"
          />
          <button v-if="store.searchQuery" class="clear-btn" @click="store.searchQuery = ''">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <!-- Search Suggestions Dropdown -->
        <div v-if="isSearching && searchResults.length" class="search-results-dropdown">
          <div
            v-for="item in searchResults"
            :key="item.id"
            class="search-item"
            @click="handleSelectSearchItem(item)"
          >
            <div class="item-avatar">
              <img :src="item.photo" :alt="item.name" />
            </div>
            <div class="item-details">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-meta">{{ item.desa }}, Kec. {{ item.kecamatan }} • Ortu: {{ item.parentName }}</span>
            </div>
            <span class="item-badge" :style="{ backgroundColor: item.statusColor + '20', color: item.statusColor }">
              {{ item.statusStunting }}
            </span>
          </div>
        </div>
      </div>

      <!-- Right: Action Navigation Tabs & User Profile -->
      <div class="header-right">
        <!-- View Mode Navigation Tabs -->
        <div class="view-tabs">
          <button
            :class="['tab-btn', { active: store.activeTab === 'map' }]"
            @click="store.activeTab = 'map'"
            title="Interactive Map"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
              <line x1="9" y1="3" x2="9" y2="18" />
              <line x1="15" y1="6" x2="15" y2="21" />
            </svg>
            <span>Peta GIS</span>
          </button>

          <button
            :class="['tab-btn', { active: store.activeTab === 'dashboard' }]"
            @click="store.activeTab = 'dashboard'"
            title="Dashboard Statistics"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="9" rx="1" />
              <rect x="14" y="3" width="7" height="5" rx="1" />
              <rect x="14" y="12" width="7" height="9" rx="1" />
              <rect x="3" y="16" width="7" height="5" rx="1" />
            </svg>
            <span>Dashboard</span>
          </button>

          <button
            :class="['tab-btn', { active: store.activeTab === 'table' }]"
            @click="store.activeTab = 'table'"
            title="Data Table"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <line x1="3" x2="21" y1="9" y2="9" />
              <line x1="3" x2="21" y1="15" y2="15" />
              <line x1="9" x2="9" y1="3" y2="21" />
              <line x1="15" x2="15" y1="3" y2="21" />
            </svg>
            <span>Data Balita</span>
          </button>

          <button
            :class="['tab-btn', { active: store.activeTab === 'hotspot' }]"
            @click="store.activeTab = 'hotspot'"
            title="Analisis & KPI"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span>Hotspot & KPI</span>
          </button>
        </div>

        <!-- Quick Tools -->
        <div class="user-tools">
          <button class="tool-btn" @click="toggleTheme" :title="theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'">
            <svg v-if="theme === 'dark'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </button>

          <!-- User Avatar Profile -->
          <div class="user-profile">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="User Avatar" class="user-avatar" />
            <div class="user-text">
              <span class="user-name">David Oscar</span>
              <span class="user-role">Analik GIS & Stunting</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStuntingStore } from '../stores/stuntingStore.js'
import { useTheme } from '../composables/useTheme.js'
import { useToast } from '../composables/useToast.js'

const store = useStuntingStore()
const { theme, toggleTheme } = useTheme()
const { info } = useToast()

const isSearching = ref(false)

const searchResults = computed(() => {
  if (!store.searchQuery || store.searchQuery.length < 2) return []
  return store.filteredBalita.slice(0, 5)
})

function handleSelectSearchItem(item) {
  store.openBalitaDetail(item)
  store.activeTab = 'map'
  info(`Menampilkan data ${item.name}`, 'Hasil Pencarian')
}
</script>

<style scoped>
.app-header {
  background: var(--bg-header, #ffffff);
  border-bottom: 1px solid var(--border-color, #e2e8f0);
  padding: 10px 24px;
  position: sticky;
  top: 0;
  z-index: 1200;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  max-width: 1800px;
  margin: 0 auto;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-box {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.brand-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary, #0f172a);
  margin: 0;
  line-height: 1.2;
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-badge {
  background: rgba(245, 158, 11, 0.12);
  color: #d97706;
  font-size: 0.72rem;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 600;
  border: 1px solid rgba(245, 158, 11, 0.25);
}

.brand-sub {
  font-size: 0.75rem;
  color: var(--text-secondary, #64748b);
  margin: 2px 0 0;
}

.header-center {
  flex: 1;
  max-width: 480px;
  position: relative;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 14px;
  color: var(--text-muted, #94a3b8);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 9px 36px 9px 42px;
  border-radius: 30px;
  border: 1px solid var(--border-color, #e2e8f0);
  background: var(--bg-input, #f8fafc);
  color: var(--text-primary, #0f172a);
  font-size: 0.85rem;
  outline: none;
  transition: all 0.25s ease;
}

.search-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  background: var(--bg-surface, #ffffff);
}

.clear-btn {
  position: absolute;
  right: 12px;
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
}

.search-results-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: var(--bg-surface, #ffffff);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 16px;
  padding: 8px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  z-index: 1300;
}

.search-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.search-item:hover {
  background: var(--bg-hover, #f1f5f9);
}

.item-avatar img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary, #0f172a);
}

.item-meta {
  font-size: 0.72rem;
  color: var(--text-secondary, #64748b);
}

.item-badge {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 8px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.view-tabs {
  display: flex;
  background: var(--bg-input, #f1f5f9);
  padding: 3px;
  border-radius: 12px;
  border: 1px solid var(--border-color, #e2e8f0);
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border: none;
  background: transparent;
  color: var(--text-secondary, #64748b);
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 9px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  color: var(--text-primary, #0f172a);
}

.tab-btn.active {
  background: var(--bg-surface, #ffffff);
  color: #3b82f6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.user-tools {
  display: flex;
  align-items: center;
  gap: 14px;
}

.tool-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--border-color, #e2e8f0);
  background: var(--bg-surface, #ffffff);
  color: var(--text-secondary, #64748b);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tool-btn:hover {
  color: #3b82f6;
  border-color: #3b82f6;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #3b82f6;
}

.user-text {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-primary, #0f172a);
}

.user-role {
  font-size: 0.7rem;
  color: var(--text-secondary, #64748b);
}

@media (max-width: 1024px) {
  .header-center {
    max-width: 280px;
  }
  .user-text {
    display: none;
  }
}

@media (max-width: 768px) {
  .app-header {
    padding: 10px 14px;
  }
  .header-container {
    flex-wrap: wrap;
  }
  .header-center {
    order: 3;
    max-width: 100%;
    width: 100%;
  }
  .tab-btn span {
    display: none;
  }
}
</style>
