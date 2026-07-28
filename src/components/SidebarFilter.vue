<template>
  <aside class="sidebar-filter" :class="{ 'collapsed': isCollapsed }">
    <!-- Brand Header (ShareInsight exact match) -->
    <div class="sidebar-brand">
      <div class="brand-logo-container" @click="store.activeTab = 'landing'" style="cursor: pointer;" title="Kembali ke Beranda">
        <div class="logo-target">
          <img src="/logo2.svg" alt="Logo" style="width: 24px; height: 24px; object-fit: contain;" />
        </div>
        <span class="brand-name" v-show="!isCollapsed">
          <span class="brand-text-share">Share</span><span class="brand-text-insight">Insight</span>
        </span>
      </div>

      <button class="collapse-toggle" @click="isCollapsed = !isCollapsed" :title="isCollapsed ? 'Buka Sidebar' : 'Tutup Sidebar'">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path v-if="!isCollapsed" d="m15 18-6-6 6-6" />
          <path v-else d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>

    <!-- Toggleable Detail Filters Button -->
    <div class="sidebar-header" v-show="!isCollapsed">
      <button class="back-landing-btn" @click="store.activeTab = 'landing'" title="Kembali ke Beranda / Landing Page">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        <span>Kembali</span>
      </button>

      <button class="detail-filters-btn" :class="{ 'expanded': store.isFilterExpanded }" @click="store.isFilterExpanded = !store.isFilterExpanded">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" x2="4" y1="21" y2="14" /><line x1="4" x2="4" y1="10" y2="3" /><line x1="12" x2="12" y1="21" y2="12" /><line x1="12" x2="12" y1="8" y2="3" /><line x1="20" x2="20" y1="21" y2="16" /><line x1="20" x2="20" y1="12" y2="3" /><line x1="1" x2="7" y1="14" y2="14" /><line x1="9" x2="15" y1="8" y2="8" /><line x1="17" x2="23" y1="16" y2="16" />
        </svg>
        <span>Filters</span>
        <span class="active-count-badge" v-if="activeFilterCount > 0">{{ activeFilterCount }}</span>
      </button>
    </div>

    <!-- Filter Body Scrollable -->
    <div class="sidebar-content" v-show="!isCollapsed">
      
      <!-- 1. Type Section (Visual Match) -->
      <div class="filter-section">
        <div class="section-title">Type</div>
        <div class="search-mini">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" placeholder="Search.." v-model="typeSearch" class="filter-search-input" />
        </div>
        <div class="checkbox-list">
          <label v-for="opt in filteredTypeOptions" :key="opt" class="checkbox-item">
            <input type="checkbox" :value="opt" v-model="store.selectedTypes" @change="notifyFilterChange" />
            <span class="checkbox-box">
              <svg xmlns="http://www.w3.org/2000/svg" class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span class="item-text">{{ opt }}</span>
          </label>
        </div>
        <a href="#" class="see-more-link" @click.prevent="showMoreAlert('Type')">
          <span class="plus-icon">+</span> See more
        </a>
      </div>

      <!-- 2. Province Section (Visual Match) -->
      <div class="filter-section">
        <div class="section-title">Province</div>
        <div class="search-mini">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" placeholder="Search.." v-model="provinceSearch" class="filter-search-input" />
        </div>
        <div class="checkbox-list">
          <label v-for="opt in filteredProvinceOptions" :key="opt" class="checkbox-item">
            <input type="checkbox" :value="opt" v-model="store.selectedProvinces" @change="notifyFilterChange" />
            <span class="checkbox-box">
              <svg xmlns="http://www.w3.org/2000/svg" class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span class="item-text">{{ opt }}</span>
          </label>
        </div>
        <a href="#" class="see-more-link" @click.prevent="showMoreAlert('Province')">
          <span class="plus-icon">+</span> See more
        </a>
      </div>

      <!-- 3. City Section (Visual Match) -->
      <div class="filter-section">
        <div class="section-title">City</div>
        <div class="search-mini">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" placeholder="Search.." v-model="citySearch" class="filter-search-input" />
        </div>
        <div class="checkbox-list">
          <label v-for="opt in filteredCityOptions" :key="opt" class="checkbox-item">
            <input type="checkbox" :value="opt" v-model="store.selectedCities" @change="notifyFilterChange" />
            <span class="checkbox-box">
              <svg xmlns="http://www.w3.org/2000/svg" class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span class="item-text">{{ opt }}</span>
          </label>
        </div>
        <a href="#" class="see-more-link" @click.prevent="showMoreAlert('City')">
          <span class="plus-icon">+</span> See more
        </a>
      </div>

      <!-- =====================================
           EXPANDED GIS STUNTING DETAIL FILTERS
           ===================================== -->
      <div v-show="store.isFilterExpanded" class="detail-filters-wrapper">
        <hr class="separator-line" />

        <!-- Timeline Tahun & Bulan -->
        <div class="filter-section margin-t">
          <div class="section-title text-orange">PERIODE DATA (TIMELINE)</div>
          <div class="year-selector">
            <button
              v-for="year in store.availableYears"
              :key="year"
              :class="['year-pill', { active: store.selectedYear === year }]"
              @click="handleYearChange(year)"
            >
              {{ year }}
            </button>
          </div>
          <div class="select-wrapper">
            <select v-model="store.selectedMonth" class="filter-select" @change="notifyFilterChange">
              <option v-for="m in store.availableMonths" :key="m.value" :value="m.value">
                {{ m.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- Status Stunting -->
        <div class="filter-section">
          <div class="section-title text-orange">STATUS STUNTING</div>
          <div class="radio-list">
            <label class="radio-item">
              <input type="radio" value="all" v-model="store.selectedStatusStunting" @change="notifyFilterChange" />
              <span class="radio-ring"></span>
              <span class="item-text">Semua Status</span>
            </label>
            <label class="radio-item">
              <input type="radio" value="Sangat Pendek" v-model="store.selectedStatusStunting" @change="notifyFilterChange" />
              <span class="radio-ring"></span>
              <span class="color-dot red"></span>
              <span class="item-text">Sangat Pendek</span>
            </label>
            <label class="radio-item">
              <input type="radio" value="Pendek" v-model="store.selectedStatusStunting" @change="notifyFilterChange" />
              <span class="radio-ring"></span>
              <span class="color-dot yellow"></span>
              <span class="item-text">Pendek</span>
            </label>
            <label class="radio-item">
              <input type="radio" value="Risiko Stunting" v-model="store.selectedStatusStunting" @change="notifyFilterChange" />
              <span class="radio-ring"></span>
              <span class="color-dot blue"></span>
              <span class="item-text">Risiko Stunting</span>
            </label>
            <label class="radio-item">
              <input type="radio" value="Normal" v-model="store.selectedStatusStunting" @change="notifyFilterChange" />
              <span class="radio-ring"></span>
              <span class="color-dot green"></span>
              <span class="item-text">Normal</span>
            </label>
          </div>
        </div>

        <!-- Kecamatan Filter -->
        <div class="filter-section">
          <div class="section-title text-orange">KECAMATAN</div>
          <div class="search-mini">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="Cari kecamatan..." v-model="kecamatanSearch" class="filter-search-input" />
          </div>
          <div class="select-wrapper">
            <select v-model="store.selectedKecamatan" class="filter-select" @change="notifyFilterChange">
              <option value="all">Semua Kecamatan ({{ store.kecamatanList.length }})</option>
              <option v-for="kec in filteredKecamatanList" :key="kec.id" :value="kec.name">
                {{ kec.name }} ({{ kec.totalStunting }} kasus)
              </option>
            </select>
          </div>
        </div>

        <!-- Desa / Kelurahan Filter -->
        <div class="filter-section">
          <div class="section-title text-orange">DESA / KELURAHAN</div>
          <div class="select-wrapper">
            <select v-model="store.selectedDesa" class="filter-select" @change="notifyFilterChange">
              <option value="all">Semua Desa / Kelurahan ({{ store.desaList.length }})</option>
              <option v-for="desa in store.desaList" :key="desa.id" :value="desa.name">
                {{ desa.name }} ({{ desa.stuntingRate }}%)
              </option>
            </select>
          </div>
        </div>

        <!-- Fasilitas Kesehatan -->
        <div class="filter-section">
          <div class="section-title text-orange">PUSKESMAS & POSYANDU</div>
          <div class="select-wrapper margin-b">
            <select v-model="store.selectedPuskesmas" class="filter-select" @change="notifyFilterChange">
              <option value="all">Semua Puskesmas</option>
              <option v-for="pus in store.puskesmasList" :key="pus.id" :value="pus.name">
                {{ pus.name }}
              </option>
            </select>
          </div>
          <div class="select-wrapper">
            <select v-model="store.selectedPosyandu" class="filter-select" @change="notifyFilterChange">
              <option value="all">Semua Posyandu</option>
              <option v-for="pos in store.posyanduList" :key="pos.id" :value="pos.name">
                {{ pos.name }} ({{ pos.desa }})
              </option>
            </select>
          </div>
        </div>

        <!-- Demografi -->
        <div class="filter-section">
          <div class="section-title text-orange">DEMOGRAFI BALITA</div>
          <div class="field-label">Jenis Kelamin:</div>
          <div class="radio-pill-group">
            <button :class="['radio-pill', { active: store.selectedGender === 'all' }]" @click="setGender('all')">Semua</button>
            <button :class="['radio-pill', { active: store.selectedGender === 'Laki-laki' }]" @click="setGender('Laki-laki')">Laki-laki</button>
            <button :class="['radio-pill', { active: store.selectedGender === 'Perempuan' }]" @click="setGender('Perempuan')">Perempuan</button>
          </div>

          <div class="field-label margin-t">Kelompok Umur:</div>
          <div class="select-wrapper">
            <select v-model="store.selectedAgeGroup" class="filter-select" @change="notifyFilterChange">
              <option value="all">Semua Umur (0-59 Bulan)</option>
              <option value="0-6">0 - 6 Bulan</option>
              <option value="6-12">6 - 12 Bulan</option>
              <option value="12-24">12 - 24 Bulan</option>
              <option value="24-59">24 - 59 Bulan</option>
            </select>
          </div>
        </div>

        <!-- Status Gizi -->
        <div class="filter-section">
          <div class="section-title text-orange">STATUS GIZI Z-SCORE</div>
          <div class="select-wrapper">
            <select v-model="store.selectedStatusGizi" class="filter-select" @change="notifyFilterChange">
              <option value="all">Semua Status Gizi</option>
              <option value="Gizi Buruk">Gizi Buruk (Z-Score &lt; -3)</option>
              <option value="Gizi Kurang">Gizi Kurang (-3 s.d -2)</option>
              <option value="Gizi Baik">Gizi Baik (-2 s.d +2)</option>
              <option value="Gizi Lebih">Gizi Lebih (&gt; +2)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Reset Filters Action -->
      <button class="reset-filters-btn" @click="handleReset">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
        </svg>
        <span>Reset Semua Filter</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStuntingStore } from '../stores/stuntingStore.js'
import { useToast } from '../composables/useToast.js'

const store = useStuntingStore()
const { success, info } = useToast()

// Ensure store properties are initialized (defensive fallback for hot reload)
if (store.selectedTypes === undefined) store.selectedTypes = ['School']
if (store.selectedProvinces === undefined) store.selectedProvinces = ['West Java', 'DKI Jakarta']
if (store.selectedCities === undefined) store.selectedCities = ['Depok']

const isCollapsed = ref(false)

// ShareInsight visual matching states
const typeSearch = ref('')
const provinceSearch = ref('')
const citySearch = ref('')

const typeOptions = ['Office', 'Cafe', 'School', 'University']
const provinceOptions = ['West Java', 'DKI Jakarta', 'South Tangerang', 'Central Java']
const cityOptions = ['Bandung', 'Bekasi', 'Depok', 'Bogor']

const filteredTypeOptions = computed(() => {
  const q = typeSearch.value.toLowerCase()
  return typeOptions.filter(o => o.toLowerCase().includes(q))
})

const filteredProvinceOptions = computed(() => {
  const q = provinceSearch.value.toLowerCase()
  return provinceOptions.filter(o => o.toLowerCase().includes(q))
})

const filteredCityOptions = computed(() => {
  const q = citySearch.value.toLowerCase()
  return cityOptions.filter(o => o.toLowerCase().includes(q))
})

// Original stunting states
const kecamatanSearch = ref('')

const filteredKecamatanList = computed(() => {
  if (!kecamatanSearch.value) return store.kecamatanList
  const q = kecamatanSearch.value.toLowerCase()
  return store.kecamatanList.filter(k => k.name.toLowerCase().includes(q))
})

const activeFilterCount = computed(() => {
  let count = 0
  if (store.selectedYear !== 2024) count++
  if (store.selectedMonth !== 'all') count++
  if (store.selectedKecamatan !== 'all') count++
  if (store.selectedDesa !== 'all') count++
  if (store.selectedPosyandu !== 'all') count++
  if (store.selectedPuskesmas !== 'all') count++
  if (store.selectedGender !== 'all') count++
  if (store.selectedStatusGizi !== 'all') count++
  if (store.selectedStatusStunting !== 'all') count++
  if (store.selectedAgeGroup !== 'all') count++
  if (store.searchQuery) count++
  
  // Count selected Types (excluding defaults)
  if (store.selectedTypes && (store.selectedTypes.length !== 1 || store.selectedTypes[0] !== 'School')) count++
  // Count selected Provinces (excluding defaults)
  if (store.selectedProvinces && (store.selectedProvinces.length !== 2 || !store.selectedProvinces.includes('West Java') || !store.selectedProvinces.includes('DKI Jakarta'))) count++
  // Count selected Cities (excluding defaults)
  if (store.selectedCities && (store.selectedCities.length !== 1 || store.selectedCities[0] !== 'Depok')) count++

  return count
})

function handleYearChange(year) {
  store.selectedYear = year
  info(`Tahun filter diubah ke ${year}`, 'Filter Diperbarui')
}

function setGender(gender) {
  store.selectedGender = gender
  notifyFilterChange()
}

function notifyFilterChange() {
  info(`Filter diterapkan (${store.filteredBalita.length} data ditemukan)`, 'Filter Aktif')
}

function handleReset() {
  store.resetAllFilters()
  typeSearch.value = ''
  provinceSearch.value = ''
  citySearch.value = ''
  kecamatanSearch.value = ''
  success('Semua filter telah di-reset ke default', 'Reset Filter')
}

function showMoreAlert(section) {
  info(`Menampilkan lebih banyak opsi filter untuk ${section}...`, 'Opsi Filter')
}
</script>

<style scoped>
.sidebar-filter {
  width: 270px;
  background: var(--bg-surface, #ffffff);
  border-right: 1px solid var(--border-color, #cbd5e1);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  z-index: 1100;
  transition: width 0.3s ease;
  flex-shrink: 0;
}

.sidebar-filter.collapsed {
  width: 64px;
}

/* ShareInsight Branding */
.sidebar-brand {
  padding: 16px 14px 16px 20px;
  border-bottom: 1px solid var(--border-color, #cbd5e1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 61px;
  background: var(--bg-surface, #ffffff);
  transition: padding 0.3s ease;
}

.sidebar-filter.collapsed .sidebar-brand {
  padding: 16px 0;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  height: auto;
}

.brand-logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-target {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.brand-name {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  display: inline-flex;
}

.brand-text-share {
  color: #1f2937;
}

.brand-text-insight {
  color: #2563eb;
}

.dark-theme .brand-text-share {
  color: #f8fafc;
}

.sidebar-header {
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-color, #e2e8f0);
  display: flex;
  align-items: center;
  gap: 10px;
}

.back-landing-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 12px;
  border: 1.5px solid #cbd5e1;
  background: #f8fafc;
  color: #475569;
  border-radius: 12px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.back-landing-btn:hover {
  background: #f1f5f9;
  color: #0f172a;
  border-color: #94a3b8;
}

.detail-filters-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 12px;
  border: 1.5px solid #f97316;
  background: #fffbeb;
  color: #f97316;
  border-radius: 12px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.detail-filters-btn:hover {
  background: #fef3c7;
}

.detail-filters-btn.expanded {
  background: #f97316;
  color: #ffffff;
}

.active-count-badge {
  background: #ef4444;
  color: #ffffff;
  font-size: 0.72rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.collapse-toggle {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: 1px solid var(--border-color, #cbd5e1);
  background: #f8fafc;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.collapse-toggle:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.sidebar-filter.collapsed .collapse-toggle {
  margin-top: 4px;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.filter-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-title {
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--text-primary, #0f172a);
  letter-spacing: 0.02em;
}

.text-orange {
  color: #2563eb;
  font-size: 0.72rem;
  text-transform: uppercase;
}

/* Mini Search bar styled like ShareInsight screenshot */
.search-mini {
  position: relative;
  display: flex;
  align-items: center;
}

.search-mini .search-icon {
  position: absolute;
  left: 12px;
  color: #94a3b8;
  pointer-events: none;
  width: 13px;
  height: 13px;
}

.filter-search-input {
  width: 100%;
  padding: 7px 10px 7px 30px;
  border-radius: 20px;
  border: 1px solid #cbd5e1;
  background: #f8fafc;
  color: var(--text-primary, #0f172a);
  font-size: 0.8rem;
  outline: none;
  transition: all 0.2s ease;
}

.filter-search-input:focus {
  border-color: #f97316;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.12);
}

/* Custom Checkbox design matching the UI image */
.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 2px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--text-secondary, #475569);
  cursor: pointer;
  user-select: none;
}

.checkbox-item input {
  display: none;
}

.checkbox-box {
  width: 18px;
  height: 18px;
  border-radius: 5px;
  border: 1.5px solid #cbd5e1;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  flex-shrink: 0;
}

.checkbox-item input:checked + .checkbox-box {
  background: #f97316;
  border-color: #f97316;
}

.check-icon {
  width: 11px;
  height: 11px;
  color: #ffffff;
  stroke-width: 4;
  display: none;
}

.checkbox-item input:checked + .checkbox-box .check-icon {
  display: block;
}

.checkbox-item:hover .checkbox-box {
  border-color: #f97316;
}

/* See More orange link styling */
.see-more-link {
  font-size: 0.78rem;
  font-weight: 700;
  color: #f97316;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 2px;
  width: fit-content;
  transition: color 0.15s ease;
}

.see-more-link:hover {
  color: #ea580c;
}

.plus-icon {
  font-weight: 800;
}

/* Expanded Detail Wrapper separator */
.detail-filters-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.separator-line {
  border: none;
  border-top: 1.5px dashed var(--border-color, #e2e8f0);
  margin: 4px 0;
}

/* Original filter section elements */
.year-selector {
  display: flex;
  gap: 4px;
  background: #f1f5f9;
  padding: 4px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
}

.year-pill {
  flex: 1;
  padding: 6px 0;
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 7px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.year-pill.active {
  background: #3b82f6;
  color: #ffffff;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
}

.select-wrapper {
  position: relative;
}

.margin-b {
  margin-bottom: 8px;
}

.filter-select {
  width: 100%;
  padding: 9px 12px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: var(--text-primary, #0f172a);
  font-size: 0.82rem;
  font-weight: 500;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23334155' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
}

.radio-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--text-primary, #0f172a);
  cursor: pointer;
}

.radio-item input {
  display: none;
}

.radio-ring {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #cbd5e1;
  position: relative;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.radio-item input:checked + .radio-ring {
  border-color: #3b82f6;
}

.radio-item input:checked + .radio-ring::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3b82f6;
}

.color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.color-dot.red { background: #1F2937; border: 1px solid rgba(0, 0, 0, 0.1); }
.color-dot.yellow { background: #2563EB; }
.color-dot.blue { background: #60A5FA; }
.color-dot.green { background: #DBEAFE; border: 1px solid rgba(0, 0, 0, 0.1); }

.item-text {
  flex: 1;
}

.field-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
}

.margin-t {
  margin-top: 8px;
}

.radio-pill-group {
  display: flex;
  gap: 4px;
}

.radio-pill {
  flex: 1;
  padding: 6px 0;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #64748b;
  border-radius: 8px;
  cursor: pointer;
}

.radio-pill.active {
  background: #3b82f6;
  color: #ffffff;
  border-color: #3b82f6;
}

.reset-filters-btn {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  border-radius: 10px;
  border: 1px dashed #cbd5e1;
  background: transparent;
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-filters-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
}
</style>
