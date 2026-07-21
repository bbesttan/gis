<template>
  <div class="data-table-container">
    <!-- Top Action Toolbar -->
    <div class="table-toolbar">
      <div class="toolbar-left">
        <div class="table-search">
          <svg class="search-ic" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            v-model="tableSearch"
            placeholder="Cari nama, NIK, desa, posyandu..."
            class="table-search-input"
          />
        </div>
      </div>

      <div class="toolbar-right">
        <!-- Export & Print Buttons (Clean SVG icons, NO EMOJIS) -->
        <button class="export-btn csv" @click="handleExportCSV">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" />
          </svg>
          <span>Export CSV</span>
        </button>

        <button class="export-btn excel" @click="handleExportExcel">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M8 13h2" /><path d="M8 17h2" /><path d="M14 13h2" /><path d="M14 17h2" />
          </svg>
          <span>Export Excel</span>
        </button>

        <button class="export-btn print" @click="handlePrint">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect width="12" height="8" x="6" y="14" />
          </svg>
          <span>Print</span>
        </button>
      </div>
    </div>

    <!-- Table Wrapper -->
    <div class="table-card">
      <div class="table-responsive">
        <table class="modern-table">
          <thead>
            <tr>
              <th @click="sortBy('name')">Nama Balita <span class="sort-ic">{{ sortKey === 'name' ? (sortAsc ? '▲' : '▼') : '↕' }}</span></th>
              <th @click="sortBy('nik')">NIK</th>
              <th @click="sortBy('ageMonths')">Umur <span class="sort-ic">{{ sortKey === 'ageMonths' ? (sortAsc ? '▲' : '▼') : '↕' }}</span></th>
              <th>Desa & Kec</th>
              <th @click="sortBy('weightKg')">BB (kg)</th>
              <th @click="sortBy('heightCm')">TB (cm)</th>
              <th @click="sortBy('zScore')">Z-Score</th>
              <th>Status Stunting</th>
              <th>Posyandu</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="paginatedData.length === 0">
              <td colspan="10" class="empty-state-td">
                <div class="empty-box">
                  <span>Tidak ada data balita yang cocok dengan filter</span>
                </div>
              </td>
            </tr>
            <tr v-for="b in paginatedData" :key="b.id" class="table-row">
              <td>
                <div class="child-cell">
                  <img :src="b.photo" :alt="b.name" class="avatar-sm" />
                  <div class="cell-text">
                    <span class="c-name">{{ b.name }}</span>
                    <span class="c-sub">{{ b.gender }} • Ortu: {{ b.parentName }}</span>
                  </div>
                </div>
              </td>
              <td><code>{{ b.nik }}</code></td>
              <td>{{ b.ageMonths }} bln</td>
              <td>
                <div class="cell-text">
                  <span class="c-name">{{ b.desa }}</span>
                  <span class="c-sub">Kec. {{ b.kecamatan }}</span>
                </div>
              </td>
              <td><strong>{{ b.weightKg }}</strong></td>
              <td><strong>{{ b.heightCm }}</strong></td>
              <td>
                <span class="z-badge" :style="{ color: b.statusColor }">{{ b.zScore }}</span>
              </td>
              <td>
                <span class="status-badge-cell" :style="{ backgroundColor: b.statusColor + '18', color: b.statusColor, borderColor: b.statusColor + '30' }">
                  {{ b.statusStunting }}
                </span>
              </td>
              <td>{{ b.posyandu }}</td>
              <td>
                <div class="row-actions">
                  <button class="act-btn" @click="store.openBalitaDetail(b)" title="Detail">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="16" y2="12" /><line x1="12" x2="12.01" y1="8" y2="8" />
                    </svg>
                  </button>
                  <button class="act-btn wa" @click="handleWA(b)" title="WhatsApp">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Bar -->
      <div class="pagination-bar">
        <span class="page-info">Menampilkan {{ pageStart + 1 }} - {{ Math.min(pageEnd, sortedData.length) }} dari {{ sortedData.length }} balita</span>
        <div class="page-btns">
          <button :disabled="currentPage === 1" @click="currentPage--" class="page-nav">Prev</button>
          <button v-for="p in totalPages" :key="p" :class="['page-num', { active: currentPage === p }]" @click="currentPage = p">{{ p }}</button>
          <button :disabled="currentPage === totalPages" @click="currentPage++" class="page-nav">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStuntingStore } from '../stores/stuntingStore.js'
import { useExport } from '../composables/useExport.js'
import { useWhatsApp } from '../composables/useWhatsApp.js'
import { useToast } from '../composables/useToast.js'

const store = useStuntingStore()
const { exportToCSV, exportToExcel, printWindow } = useExport()
const { openWhatsApp } = useWhatsApp()
const { success } = useToast()

const tableSearch = ref('')
const sortKey = ref('name')
const sortAsc = ref(true)
const currentPage = ref(1)
const pageSize = 10

function sortBy(key) {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value
  } else {
    sortKey.value = key
    sortAsc.value = true
  }
}

const searchedData = computed(() => {
  let list = store.filteredBalita
  if (tableSearch.value) {
    const q = tableSearch.value.toLowerCase()
    list = list.filter(b =>
      b.name.toLowerCase().includes(q) ||
      b.nik.includes(q) ||
      b.desa.toLowerCase().includes(q) ||
      b.posyandu.toLowerCase().includes(q)
    )
  }
  return list
})

const sortedData = computed(() => {
  return [...searchedData.value].sort((a, b) => {
    let valA = a[sortKey.value]
    let valB = b[sortKey.value]
    if (typeof valA === 'string') valA = valA.toLowerCase()
    if (typeof valB === 'string') valB = valB.toLowerCase()

    if (valA < valB) return sortAsc.value ? -1 : 1
    if (valA > valB) return sortAsc.value ? 1 : -1
    return 0
  })
})

const totalPages = computed(() => Math.ceil(sortedData.value.length / pageSize) || 1)
const pageStart = computed(() => (currentPage.value - 1) * pageSize)
const pageEnd = computed(() => currentPage.value * pageSize)

const paginatedData = computed(() => {
  return sortedData.value.slice(pageStart.value, pageEnd.value)
})

function handleExportCSV() {
  exportToCSV(sortedData.value, 'data-balita-stunting.csv')
  success('Data berhasil di-export ke CSV', 'Export CSV')
}

function handleExportExcel() {
  exportToExcel(sortedData.value, 'data-balita-stunting.xlsx')
  success('Data berhasil di-export ke Excel', 'Export Excel')
}

function handlePrint() {
  printWindow()
}

function handleWA(balita) {
  openWhatsApp(balita.desa, balita.name)
}
</script>

<style scoped>
.data-table-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.table-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.table-search {
  position: relative;
  width: 320px;
}

.search-ic {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary, #64748b);
}

.table-search-input {
  width: 100%;
  padding: 8px 12px 8px 36px;
  border-radius: 10px;
  border: 1px solid var(--border-color, #e2e8f0);
  background: var(--bg-surface, #ffffff);
  color: var(--text-primary, #0f172a);
  font-size: 0.82rem;
  outline: none;
}

.toolbar-right {
  display: flex;
  gap: 8px;
}

.export-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid var(--border-color, #e2e8f0);
  background: var(--bg-surface, #ffffff);
  color: var(--text-primary, #0f172a);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.export-btn:hover {
  background: var(--bg-hover, #f8fafc);
  border-color: #3b82f6;
  color: #3b82f6;
}

.table-card {
  background: var(--bg-surface, #ffffff);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

.table-responsive {
  overflow-x: auto;
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
}

.modern-table th {
  background: var(--bg-input, #f8fafc);
  color: var(--text-secondary, #64748b);
  text-align: left;
  padding: 12px 14px;
  font-weight: 700;
  border-bottom: 1px solid var(--border-color, #e2e8f0);
  cursor: pointer;
  user-select: none;
}

.sort-ic {
  font-size: 0.7rem;
  color: #3b82f6;
}

.modern-table td {
  padding: 10px 14px;
  border-bottom: 1px solid var(--border-color, #f1f5f9);
  color: var(--text-primary, #0f172a);
  vertical-align: middle;
}

.child-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar-sm {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.cell-text {
  display: flex;
  flex-direction: column;
}

.c-name {
  font-weight: 600;
  color: var(--text-primary, #0f172a);
}

.c-sub {
  font-size: 0.7rem;
  color: var(--text-secondary, #64748b);
}

.z-badge {
  font-weight: 800;
}

.status-badge-cell {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 8px;
  border: 1px solid transparent;
  white-space: nowrap;
}

.row-actions {
  display: flex;
  gap: 4px;
}

.act-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid var(--border-color, #e2e8f0);
  background: var(--bg-input, #f8fafc);
  color: var(--text-secondary, #64748b);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.act-btn.wa {
  color: #128c7e;
  background: rgba(37, 211, 102, 0.1);
}

.pagination-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--bg-input, #f8fafc);
  border-top: 1px solid var(--border-color, #e2e8f0);
}

.page-info {
  font-size: 0.75rem;
  color: var(--text-secondary, #64748b);
}

.page-btns {
  display: flex;
  gap: 4px;
}

.page-nav, .page-num {
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid var(--border-color, #e2e8f0);
  background: var(--bg-surface, #ffffff);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}

.page-num.active {
  background: #3b82f6;
  color: #ffffff;
  border-color: #3b82f6;
}

.empty-state-td {
  text-align: center;
  padding: 40px;
  color: var(--text-secondary, #64748b);
}
</style>
