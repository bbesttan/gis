<template>
  <div id="gis-stunting-app" :class="[theme + '-theme']">
    <!-- Top Header Bar -->
    <AppHeader />

    <!-- Main Workspace Layout -->
    <div class="workspace-layout">
      <!-- Left Sidebar Filter -->
      <SidebarFilter />

      <!-- Center Main Content -->
      <main class="main-content">
        <!-- 1. Peta GIS View -->
        <div v-show="store.activeTab === 'map'" class="view-panel map-view-panel">
          <MapView />
          <BottomChildCards />
        </div>

        <!-- 2. Dashboard KPI & Ranking View -->
        <div v-show="store.activeTab === 'dashboard'" class="view-panel scrollable-panel">
          <DashboardKpi />
          <StatisticsCharts class="margin-t" />
        </div>

        <!-- 3. Data Table View -->
        <div v-show="store.activeTab === 'table'" class="view-panel scrollable-panel">
          <BalitaDataTable />
        </div>

        <!-- 4. Hotspot Analysis & Skripsi Value-Add View -->
        <div v-show="store.activeTab === 'hotspot'" class="view-panel scrollable-panel">
          <HotspotAnalysis />
        </div>
      </main>
    </div>

    <!-- Modals & Overlays -->
    <ChildDetailModal />
    <RegionDetailDrawer />
    <WhatsAppButton />
    <ToastNotification />
  </div>
</template>

<script setup>
import { useStuntingStore } from './stores/stuntingStore.js'
import { useTheme } from './composables/useTheme.js'
import AppHeader from './components/AppHeader.vue'
import SidebarFilter from './components/SidebarFilter.vue'
import MapView from './components/MapView.vue'
import BottomChildCards from './components/BottomChildCards.vue'
import DashboardKpi from './components/DashboardKpi.vue'
import StatisticsCharts from './components/StatisticsCharts.vue'
import BalitaDataTable from './components/BalitaDataTable.vue'
import HotspotAnalysis from './components/HotspotAnalysis.vue'
import ChildDetailModal from './components/ChildDetailModal.vue'
import RegionDetailDrawer from './components/RegionDetailDrawer.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'
import ToastNotification from './components/ToastNotification.vue'

const store = useStuntingStore()
const { theme } = useTheme()
</script>

<style scoped>
#gis-stunting-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-app);
}

.workspace-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.view-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.map-view-panel {
  overflow: hidden;
}

.scrollable-panel {
  overflow-y: auto;
  padding: 24px;
  max-width: 1800px;
  width: 100%;
  margin: 0 auto;
}

.margin-t {
  margin-top: 24px;
}
</style>
