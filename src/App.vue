<template>
  <div id="gis-stunting-app" :class="[theme + '-theme']" class="app-layout">
    <!-- If active tab is landing, render LandingPage full screen -->
    <LandingPage v-if="store.activeTab === 'landing'" />

    <!-- Otherwise, render the main dashboard layout -->
    <template v-else>
      <!-- Left Sidebar Filter -->
      <SidebarFilter />

      <!-- Right Side Area (Header + Main Content) -->
      <div class="main-container">
        <!-- Top Header Bar -->
        <AppHeader />

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
    </template>

    <!-- Modals & Overlays -->
    <ChildDetailModal />
    <RegionDetailDrawer />
    <AdminLoginModal />
    <WhatsAppButton />
    <ToastNotification />
  </div>
</template>

<script setup>
import { useStuntingStore } from './stores/stuntingStore.js'
import { useTheme } from './composables/useTheme.js'
import LandingPage from './components/LandingPage.vue'
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
import AdminLoginModal from './components/AdminLoginModal.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'
import ToastNotification from './components/ToastNotification.vue'


const store = useStuntingStore()
const { theme } = useTheme()
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  background: var(--bg-app);
  overflow: hidden;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
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
