<template>
  <div class="filter-panel">
    <div class="filter-group">
      <label class="filter-label">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
        Tahun
      </label>
      <div class="year-toggle">
        <button
          v-for="year in store.availableYears"
          :key="year"
          :class="['year-btn', { active: store.selectedYear === year }]"
          @click="store.setYear(year)"
        >
          {{ year }}
        </button>
      </div>
    </div>

    <div class="filter-group search-group">
      <div class="search-wrapper">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          id="province-search"
          type="text"
          placeholder="Cari provinsi..."
          :value="store.searchQuery"
          @input="onSearch"
          class="search-input"
        />
        <button v-if="store.searchQuery" class="search-clear" @click="clearSearch">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <!-- Search suggestions dropdown -->
      <div v-if="showSuggestions && suggestions.length > 0" class="suggestions-dropdown">
        <button
          v-for="prov in suggestions"
          :key="prov.name"
          class="suggestion-item"
          @click="selectSuggestion(prov)"
        >
          <span class="suggestion-name">{{ prov.name }}</span>
          <span :class="['suggestion-badge', `badge-${prov.category.toLowerCase()}`]">
            {{ prov.percentage }}%
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStuntingStore } from '../stores/stuntingStore.js'

const store = useStuntingStore()
const showSuggestions = ref(false)

const suggestions = computed(() => {
  if (!store.searchQuery || store.searchQuery.length < 1) return []
  return store.filteredProvinces.slice(0, 6)
})

function onSearch(e) {
  store.setSearch(e.target.value)
  showSuggestions.value = e.target.value.length > 0
}

function clearSearch() {
  store.setSearch('')
  showSuggestions.value = false
}

function selectSuggestion(prov) {
  store.setSearch(prov.name)
  store.selectProvince(prov.name)
  showSuggestions.value = false
}
</script>

<style scoped>
.filter-panel {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 24px;
  max-width: 1600px;
  margin: 0 auto;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #94A3B8;
  font-weight: 500;
  white-space: nowrap;
}

.year-toggle {
  display: flex;
  background: rgba(30, 41, 59, 0.6);
  border-radius: 10px;
  padding: 3px;
  border: 1px solid rgba(148, 163, 184, 0.1);
}

.year-btn {
  padding: 6px 16px;
  border: none;
  background: transparent;
  color: #94A3B8;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.25s ease;
  font-family: 'Inter', sans-serif;
}

.year-btn:hover {
  color: #CBD5E1;
}

.year-btn.active {
  background: linear-gradient(135deg, #3B82F6, #6366F1);
  color: #fff;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.search-group {
  position: relative;
  flex: 1;
  max-width: 360px;
  margin-left: auto;
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: #64748B;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 8px 36px 8px 36px;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 10px;
  color: #F8FAFC;
  font-size: 0.8rem;
  font-family: 'Inter', sans-serif;
  outline: none;
  transition: all 0.25s ease;
}

.search-input::placeholder {
  color: #64748B;
}

.search-input:focus {
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background: rgba(30, 41, 59, 0.8);
}

.search-clear {
  position: absolute;
  right: 8px;
  background: rgba(148, 163, 184, 0.15);
  border: none;
  color: #94A3B8;
  cursor: pointer;
  border-radius: 6px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.search-clear:hover {
  background: rgba(148, 163, 184, 0.25);
  color: #F8FAFC;
}

.suggestions-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: rgba(15, 23, 42, 0.96);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 12px;
  padding: 6px;
  z-index: 1100;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  animation: dropdown-in 0.2s ease;
}

@keyframes dropdown-in {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}

.suggestion-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 12px;
  background: transparent;
  border: none;
  color: #E2E8F0;
  font-size: 0.8rem;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.15s ease;
  font-family: 'Inter', sans-serif;
}

.suggestion-item:hover {
  background: rgba(59, 130, 246, 0.12);
}

.suggestion-name {
  font-weight: 500;
}

.suggestion-badge {
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
}

.badge-rendah {
  background: rgba(16, 185, 129, 0.15);
  color: #34D399;
}

.badge-sedang {
  background: rgba(245, 158, 11, 0.15);
  color: #FBBF24;
}

.badge-tinggi {
  background: rgba(239, 68, 68, 0.15);
  color: #F87171;
}

@media (max-width: 640px) {
  .filter-panel {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 10px 16px;
  }
  .filter-group {
    width: 100%;
  }
  .search-group {
    max-width: 100%;
    margin-left: 0;
  }
}
</style>
