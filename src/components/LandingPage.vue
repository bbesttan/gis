<template>
  <div class="landing-page eco-illustrated-theme">
    <!-- Navbar Header -->
    <header class="eco-navbar">
      <div class="navbar-container">
        <div class="brand-logo" @click="navigateTo('landing')">
          <div class="logo-icon-wrapper">
            <img src="/logo2.svg" alt="Logo" style="width: 34px; height: 34px; object-fit: contain;" />
          </div>
          <div class="brand-text">
            <span class="brand-title">Share<span class="text-blue-600">Insight</span></span>
            <span class="brand-tag">GIS Stunting</span>
          </div>
        </div>

        <nav class="navbar-menu">
          <a href="#kabar" class="nav-item">Kabar Terbaru</a>
          <a href="#wilayah" class="nav-item">Jelajahi Wilayah</a>
          <a href="#peta-spasial" class="nav-item highlight">Peta Spasial</a>
          <a href="#galeri" class="nav-item">Galeri Posyandu</a>
        </nav>

        <div class="navbar-actions">
          <button class="btn-green-pill" @click="navigateTo('map')">
            <span>Buka Peta GIS</span>
            <ArrowRight class="w-4 h-4" />
          </button>
          <button class="mobile-toggle" @click="mobileMenuOpen = !mobileMenuOpen">
            <Menu v-if="!mobileMenuOpen" />
            <X v-else />
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown -->
      <transition name="fade-slide">
        <div v-if="mobileMenuOpen" class="mobile-dropdown">
          <a href="#kabar" class="mobile-link" @click="mobileMenuOpen = false">Kabar Terbaru</a>
          <a href="#wilayah" class="mobile-link" @click="mobileMenuOpen = false">Jelajahi Wilayah</a>
          <a href="#peta-spasial" class="mobile-link" @click="mobileMenuOpen = false">Peta Spasial GIS</a>
          <a href="#galeri" class="mobile-link" @click="mobileMenuOpen = false">Galeri Posyandu</a>
          <button class="btn-green-full" @click="navigateTo('map'); mobileMenuOpen = false">Buka Peta GIS</button>
        </div>
      </transition>
    </header>

    <!-- SECTION 1: HERO WITH ILLUSTRATED CHILD PARK BANNER & SEARCH BAR -->
    <section class="hero-illustrated-section">
      <div class="hero-banner-frame">
        <img :src="heroBannerImg" alt="Ilustrasi Anak & Posyandu" class="hero-banner-img" />
        
        <!-- Central Search Bar inside Illustration Banner (Matching Reference Image) -->
        <div class="hero-search-overlay">
          <form @submit.prevent="handleSearch" class="search-pill-form">
            <input 
              type="text" 
              v-model="searchQueryInput" 
              placeholder="Cari nama balita, NIK, posyandu, atau desa..." 
              class="search-pill-input" 
            />
            <button type="submit" class="search-pill-btn">
              <Search class="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      <!-- News Ticker Row (Matching Reference Image) -->
      <div id="kabar" class="news-ticker-container">
        <div class="news-badge-tag">
          <span class="sprout-icon">🌱</span>
          <span class="badge-text">Kabar Terbaru</span>
        </div>

        <div class="news-items-row">
          <div class="news-item-card" @click="navigateTo('dashboard')">
            <span class="news-title">Edukasi MP-ASI & Pemberian PMT Balita Posyandu Dahlia</span>
            <span class="news-date">2026-07-20</span>
          </div>
          <div class="news-item-card" @click="navigateTo('map')">
            <span class="news-title">Hasil Pemetaan Radius Buffer Faskes Kecamatan Beji</span>
            <span class="news-date">2026-07-18</span>
          </div>
          <div class="news-item-card" @click="navigateTo('dashboard')">
            <span class="news-title">Laporan Pemantauan Prevalensi Stunting Bulan Juli 2026</span>
            <span class="news-date">2026-07-15</span>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 2: REGION & CATEGORY EXPLORER (Matching Reference Image Chips & Cards) -->
    <section id="wilayah" class="region-explorer-section">
      <div class="section-container text-center">
        <h2 class="eco-section-title">
          Jelajahi Pemantauan Gizi & Posyandu <br />
          <span class="text-blue-600">Berbasis Wilayah Spasial</span>
        </h2>

        <!-- Main Category Toggle Buttons (Green Pills matching Reference) -->
        <div class="category-toggle-bar">
          <button 
            class="cat-toggle-btn" 
            :class="{ active: activeCategory === 'wilayah' }" 
            @click="activeCategory = 'wilayah'"
          >
            Wilayah Kecamatan
          </button>
          <button 
            class="cat-toggle-btn" 
            :class="{ active: activeCategory === 'gizi' }" 
            @click="activeCategory = 'gizi'"
          >
            Kategori Status Gizi
          </button>
        </div>

        <!-- Horizontal Scrolling Region Chips Bar (Matching Reference) -->
        <div class="region-chips-wrapper">
          <button class="chip-scroll-btn left" @click="scrollChips(-200)">‹</button>
          
          <div ref="chipsContainer" class="region-chips-track">
            <button 
              v-for="chip in regionChips" 
              :key="chip" 
              class="region-chip" 
              :class="{ active: selectedChip === chip }" 
              @click="selectedChip = chip"
            >
              {{ chip }}
            </button>
          </div>

          <button class="chip-scroll-btn right" @click="scrollChips(200)">›</button>
        </div>

        <!-- Horizontal Cards Gallery Carousel (Matching Reference Cards) -->
        <div class="facility-cards-grid">
          <div 
            v-for="card in filteredFacilities" 
            :key="card.id" 
            class="facility-card"
            @click="navigateTo('map')"
          >
            <div class="facility-img-box">
              <img :src="card.image" :alt="card.name" class="facility-img" />
              <span class="facility-badge">{{ card.badge }}</span>
            </div>
            <div class="facility-info">
              <h4 class="facility-name">{{ card.name }}</h4>
              <p class="facility-desc">{{ card.desc }}</p>
              <div class="facility-footer">
                <span class="stat-tag">{{ card.statText }}</span>
                <span class="arrow-link">Detail →</span>
              </div>
            </div>
          </div>
        </div>

        <div class="view-all-row">
          <button class="btn-outline-green" @click="navigateTo('map')">
            Lihat Semua Wilayah +
          </button>
        </div>
      </div>
    </section>

    <!-- SECTION 3: INTERACTIVE GIS MAP SHOWCASE ("Pemantauan Stunting Dalam Satu Peta") -->
    <section id="peta-spasial" class="map-showcase-section">
      <div class="map-showcase-bg">
        <div class="cloud-shape cloud-1"></div>
        <div class="cloud-shape cloud-2"></div>
      </div>

      <div class="section-container text-center relative-z">
        <!-- Header Illustration & Title -->
        <div class="map-header-illustration">
          <img :src="explorerBannerImg" alt="Anak Menjelajah Peta" class="explorer-img" />
        </div>

        <h2 class="map-showcase-title">
          ShareInsight GIS Stunting, <br />
          <span class="text-emerald-600">Pemantauan Dalam Satu Peta</span>
        </h2>

        <!-- Hashtag Filter Pills (Matching Reference Image) -->
        <div class="hashtag-pills-row">
          <span class="hash-pill">#PetaSpasial</span>
          <span class="hash-pill">#Choropleth</span>
          <span class="hash-pill">#BufferFaskes3KM</span>
          <span class="hash-pill">#Posyandu</span>
          <span class="hash-pill">#ZonasiRisiko</span>
        </div>

        <!-- Big Rounded Blue GIS Map Frame (Matching Reference Image Frame) -->
        <div class="rounded-map-frame">
          <!-- Interactive Map Header Controls -->
          <div class="map-frame-header font-mono">
            <span class="flex items-center gap-2">
              <span class="live-dot-blue"></span>
              PETA_SPASIAL_STUNTING.DEPOK
            </span>
            <span class="text-xs text-blue-700">ZOOM: 12x | LAYER: CHOROPLETH</span>
          </div>

          <!-- Embedded SVG/Leaflet Map Container -->
          <div class="map-canvas-container">
            <svg viewBox="0 0 800 420" class="map-svg-canvas">
              <!-- Regional Polygons (Subdistricts) using Brand Monochromatic Blue Palette -->
              <path d="M40 50 L240 30 L320 140 L160 210 L50 170 Z" fill="rgba(96, 165, 250, 0.25)" stroke="#60a5fa" stroke-width="2.5" />
              <path d="M240 30 L520 40 L600 170 L420 250 L320 140 Z" fill="rgba(37, 99, 235, 0.25)" stroke="#2563eb" stroke-width="2.5" />
              <path d="M160 210 L320 140 L420 250 L280 390 L120 340 Z" fill="rgba(31, 41, 55, 0.25)" stroke="#1f2937" stroke-width="2.5" />
              <path d="M420 250 L600 170 L750 220 L660 380 L480 360 Z" fill="rgba(96, 165, 250, 0.2)" stroke="#60a5fa" stroke-width="2.5" />

              <!-- Buffer Concentric Circle -->
              <circle cx="340" cy="180" r="110" fill="rgba(59, 130, 246, 0.12)" stroke="#2563eb" stroke-width="2" stroke-dasharray="6 4" />
              <circle cx="340" cy="180" r="50" fill="rgba(59, 130, 246, 0.18)" stroke="#2563eb" stroke-width="1.5" />
              <circle cx="340" cy="180" r="8" fill="#2563eb" />

              <!-- Rivers & Landmarks -->
              <path d="M0 120 C180 180, 400 60, 800 240" fill="none" stroke="#38bdf8" stroke-width="4" opacity="0.6" />
            </svg>

            <!-- Floating Green Pill Location Markers (Matching Reference Image Map Markers) -->
            <div class="map-floating-tags">
              <button class="map-pill-marker marker-1" @click="navigateTo('map')">
                <span>Posyandu Beji Timur</span>
                <ArrowRight class="w-3.5 h-3.5" />
              </button>
              <button class="map-pill-marker marker-2" @click="navigateTo('map')">
                <span>Puskesmas Sawangan</span>
                <ArrowRight class="w-3.5 h-3.5" />
              </button>
              <button class="map-pill-marker marker-3" @click="navigateTo('map')">
                <span>Posyandu Dahlia Tapos</span>
                <ArrowRight class="w-3.5 h-3.5" />
              </button>
              <button class="map-pill-marker marker-4" @click="navigateTo('map')">
                <span>Desa Prioritas Limo</span>
                <ArrowRight class="w-3.5 h-3.5" />
              </button>
            </div>

            <!-- Green Map Floating Controls (+ - buttons matching reference image) -->
            <div class="map-control-widgets">
              <button class="map-ctrl-btn" @click="navigateTo('map')">🎯</button>
              <button class="map-ctrl-btn" @click="navigateTo('map')">+</button>
              <button class="map-ctrl-btn" @click="navigateTo('map')">−</button>
            </div>
          </div>
        </div>

        <div class="map-cta-row">
          <button class="btn-green-lg" @click="navigateTo('map')">
            <span>Buka Peta Spasial Selengkapnya</span>
            <ArrowRight class="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>

    <!-- SECTION 4: CHILD ACTIVITIES & POSYANDU FEED (Matching Reference Gallery Grid) -->
    <section id="galeri" class="gallery-feed-section">
      <div class="section-container">
        <div class="gallery-inner-grid">
          <!-- Left Header Card -->
          <div class="gallery-header-card">
            <div class="sprout-badge">🌱 ShareInsight Posyandu</div>
            <h3 class="gallery-title">Galeri Pemantauan Tumbuh Kembang Anak</h3>
            <p class="gallery-desc">
              Dokumentasi kegiatan pengukuran antropometri bulanan, distribusi PMT, dan edukasi gizi di posyandu.
            </p>

            <div class="gallery-pagination">
              <button class="pag-arrow" @click="prevPage">‹</button>
              <span class="pag-counter font-mono">{{ currentPage }} / {{ totalPages }}</span>
              <button class="pag-arrow" @click="nextPage">›</button>
            </div>
          </div>

          <!-- Right Grid of Square Photos (Matching Reference Images) -->
          <div class="gallery-photos-grid">
            <div v-for="(photo, pIdx) in activeGalleryPhotos" :key="pIdx" class="photo-card">
              <img :src="photo.url" :alt="photo.caption" class="photo-img" />
              <div class="photo-overlay">
                <span class="photo-caption">{{ photo.caption }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 5: ILLUSTRATED NATURE FOOTER -->
    <footer class="eco-footer">
      <!-- Nature Hills Background SVG Edge (Matching Reference Image) -->
      <div class="hills-footer-edge">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" class="hills-svg">
          <path d="M0 60 Q 300 20, 600 50 T 1200 30 L 1200 120 L 0 120 Z" fill="#2563EB" opacity="0.4" />
          <path d="M0 80 Q 400 40, 800 70 T 1200 50 L 1200 120 L 0 120 Z" fill="#1F2937" />
        </svg>
      </div>

      <div class="footer-inner-container">
        <div class="footer-content-grid">
          <div class="footer-brand-col">
            <div class="brand-logo footer">
              <div class="logo-icon-wrapper">
                <img src="/logo2.svg" alt="Logo" style="width: 30px; height: 30px; object-fit: contain;" />
              </div>
              <span class="brand-title text-white">ShareInsight <span class="text-blue-400">GIS</span></span>
            </div>
            <p class="footer-tagline-eco">
              Sistem Informasi Geografis Pemantauan Gizi Anak & Pencegahan Stunting Nasional. Membantu Kader Posyandu & Pemerintah Daerah Berbasis Data Spasial Presisi.
            </p>
          </div>

          <div class="footer-links-col">
            <h4>PETA & WILAYAH</h4>
            <a href="#peta-spasial" @click.prevent="navigateTo('map')">Peta Koroplet Stunting</a>
            <a href="#peta-spasial" @click.prevent="navigateTo('map')">Buffer Radius Faskes 3KM</a>
            <a href="#wilayah">Zonasi Risiko Kecamatan</a>
          </div>

          <div class="footer-links-col">
            <h4>STANDAR GIZI</h4>
            <a href="https://who.int" target="_blank">Standar Deviasi WHO Antropometri</a>
            <a href="https://kemkes.go.id" target="_blank">Kementerian Kesehatan RI</a>
            <a href="#kabar">Edukasi Makanan Tambahan (PMT)</a>
          </div>

          <div class="footer-links-col">
            <h4>AKSES PETA</h4>
            <button class="btn-green-full text-center" @click="navigateTo('map')">
              BUKA PETA INTERAKTIF
            </button>
          </div>
        </div>

        <div class="footer-bottom-bar font-mono">
          <span>&copy; 2026 ShareInsight GIS Stunting Indonesia. Semua Hak Dilindungi.</span>
          <span>Program Penurunan Stunting Nasional - Standar WHO & Kemenkes</span>
        </div>
      </div>
    </footer>

    <!-- PUBLIC CHILD SEARCH RESULT MODAL -->
    <transition name="fade">
      <div v-if="store.isPublicSearchModalOpen" class="public-modal-overlay" @click.self="store.closePublicSearchModal">
        <div class="public-modal-card">
          <button class="modal-close-btn" @click="store.closePublicSearchModal">
            <X class="w-5 h-5" />
          </button>

          <!-- Result Found -->
          <div v-if="store.publicSearchResult" class="public-result-body">
            <div class="public-header-badge">
              <span class="sprout-icon">👶</span>
              <span>Pencarian Status Gizi Balita Publik</span>
            </div>

            <h3 class="child-public-name">{{ store.publicSearchResult.name }}</h3>
            <p class="child-public-meta">
              {{ store.publicSearchResult.ageMonths }} Bulan | Gender: {{ store.publicSearchResult.gender }} | {{ store.publicSearchResult.desaName }}, {{ store.publicSearchResult.kecamatanName }}
            </p>

            <div class="public-status-card font-mono">
              <div class="status-row">
                <span>STATUS TB/U (WHO):</span>
                <span class="status-pill-badge" :class="getStatusBadgeClass(store.publicSearchResult.statusStunting)">
                  {{ store.publicSearchResult.statusStunting }}
                </span>
              </div>
              <div class="status-details">
                <div>Tinggi Badan: <strong>{{ store.publicSearchResult.heightCm }} cm</strong></div>
                <div>Berat Badan: <strong>{{ store.publicSearchResult.weightKg }} kg</strong></div>
                <div>Z-Score: <strong>{{ store.publicSearchResult.zScoreHeight }} SD</strong></div>
              </div>
            </div>

            <div class="posyandu-location-box">
              <div class="loc-head font-mono">LOKASI POSYANDU TERDAFTAR:</div>
              <div class="loc-title">{{ store.publicSearchResult.posyanduName }}</div>
              <div class="loc-sub">Kader Penanggung Jawab: Ibu Nurhayati | Posyandu {{ store.publicSearchResult.desaName }}</div>
            </div>

            <div class="privacy-notice font-mono">
              🔒 <em>Catatan Privasi: NIK & rekam medis lengkap hanya dapat diakses oleh Admin Posyandu Terotorisasi.</em>
            </div>

            <button class="btn-green-full w-full mt-4" @click="store.closePublicSearchModal">
              Tutup Hasil Pencarian
            </button>
          </div>

          <!-- Result Not Found -->
          <div v-else class="public-result-empty text-center">
            <div class="empty-icon font-mono text-3xl mb-2">🔍</div>
            <h3 class="empty-title font-bold text-lg text-slate-800">Data Balita Tidak Ditemukan</h3>
            <p class="empty-desc text-sm text-slate-600 mt-2">
              Pencarian untuk "<strong>{{ store.publicSearchQuery }}</strong>" tidak cocok dengan data publik terdaftar. Silakan periksa kembali ejaan nama balita atau hubungi Kader Posyandu setempat.
            </p>
            <button class="btn-outline-green mt-4" @click="store.closePublicSearchModal">
              Coba Cari Lagi
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStuntingStore } from '../stores/stuntingStore.js'
import {
  Search,
  ArrowRight,
  Menu,
  X
} from 'lucide-vue-next'

import heroBannerImg from '../assets/child_park_hero_banner.png'
import explorerBannerImg from '../assets/child_explorer_banner.png'

const store = useStuntingStore()

function navigateTo(tab) {
  store.activeTab = tab
}

const mobileMenuOpen = ref(false)
const searchQueryInput = ref('')
const activeCategory = ref('wilayah')
const selectedChip = ref('Semua Wilayah')
const chipsContainer = ref(null)

const handleSearch = () => {
  if (searchQueryInput.value) {
    store.searchChildPublic(searchQueryInput.value)
  }
}

const getStatusBadgeClass = (status) => {
  if (status === 'Sangat Pendek') return 'pill-crimson'
  if (status === 'Pendek') return 'pill-amber'
  if (status === 'Risiko Stunting') return 'pill-yellow'
  return 'pill-emerald'
}


// Region chips array matching reference image
const regionChips = [
  'Semua Wilayah',
  'Beji',
  'Kukusan',
  'Sawangan',
  'Limo',
  'Tapos',
  'Pancoran Mas',
  'Cimanggis',
  'Bojongsari'
]

const scrollChips = (offset) => {
  if (chipsContainer.value) {
    chipsContainer.value.scrollBy({ left: offset, behavior: 'smooth' })
  }
}

// Facilities / Regional cards matching reference image grid
const facilitiesList = [
  {
    id: 1,
    name: 'Posyandu Beji Timur',
    kecamatan: 'Beji',
    desc: 'Pemantauan tumbuh kembang 124 balita secara rutin tiap bulan.',
    badge: 'Kec. Beji',
    statText: '124 Balita Terdata',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Puskesmas Sawangan',
    kecamatan: 'Sawangan',
    desc: 'Fasilitas kesehatan rujukan primer dengan buffer jangkauan 3 KM.',
    badge: 'Kec. Sawangan',
    statText: 'Buffer 3KM Aktif',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Posyandu Dahlia Tapos',
    kecamatan: 'Tapos',
    desc: 'Penyaluran biskuit makanan tambahan (PMT) untuk balita risiko.',
    badge: 'Kec. Tapos',
    statText: 'Penyaluran PMT',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    name: 'Posyandu Anggrek Limo',
    kecamatan: 'Limo',
    desc: 'Wilayah prioritas zonasi hijau dengan tingkat prevalensi < 10%.',
    badge: 'Kec. Limo',
    statText: 'Zonasi Hijau',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    name: 'Posyandu Mawar Cimanggis',
    kecamatan: 'Cimanggis',
    desc: 'Pemetaan titik koordinat tempat tinggal balita berisiko tinggi.',
    badge: 'Kec. Cimanggis',
    statText: 'Pemetaan Titik',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&auto=format&fit=crop&q=80'
  }
]

const filteredFacilities = computed(() => {
  if (selectedChip.value === 'Semua Wilayah') return facilitiesList
  return facilitiesList.filter(f => f.kecamatan === selectedChip.value)
})

// Gallery Feed Page State
const currentPage = ref(1)
const totalPages = ref(5)

const galleryPhotos = [
  { url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&auto=format&fit=crop&q=80', caption: 'Pengukuran Tinggi Badan Balita' },
  { url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&auto=format&fit=crop&q=80', caption: 'Penyaluran Makanan Tambahan PMT' },
  { url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&auto=format&fit=crop&q=80', caption: 'Pemeriksaan Kesehatan Anak di Posyandu' },
  { url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&auto=format&fit=crop&q=80', caption: 'Edukasi Gizi Ibu & Anak' }
]

const activeGalleryPhotos = computed(() => galleryPhotos)

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
</script>

<style scoped>
/* Warm Child-Friendly Illustrated Design System */
.eco-illustrated-theme {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #1e293b;
  background: #f8fafc;
  width: 100%;
  overflow-x: hidden;
  position: relative;
}

.font-mono {
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
}

.text-center { text-align: center; }

/* Navbar */
.eco-navbar {
  background: #ffffff;
  border-bottom: 1.5px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 12px 24px;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.brand-title {
  font-size: 1.3rem;
  font-weight: 850;
  color: #0f172a;
}

.brand-tag {
  font-size: 0.65rem;
  background: #dbeafe;
  color: #2563eb;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
  margin-left: 6px;
}

.navbar-menu {
  display: flex;
  gap: 28px;
}

.nav-item {
  color: #475569;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.92rem;
  transition: color 0.2s ease;
}

.nav-item:hover { color: #2563eb; }
.nav-item.highlight { color: #2563eb; font-weight: 750; }

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-green-pill {
  background: #2563eb;
  color: #ffffff;
  border: none;
  padding: 8px 20px;
  border-radius: 9999px;
  font-weight: 750;
  font-size: 0.88rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
  transition: all 0.2s ease;
}

.btn-green-pill:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  color: #0f172a;
  cursor: pointer;
}

.mobile-dropdown {
  position: absolute;
  top: 100%; left: 0; right: 0;
  background: #ffffff;
  border-bottom: 2px solid #2563eb;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.mobile-link {
  color: #334155;
  text-decoration: none;
  font-weight: 600;
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;
}

.btn-green-full {
  background: #2563eb;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 12px;
  font-weight: 750;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-green-full:hover {
  background: #1d4ed8;
}

/* SECTION 1: HERO WITH ILLUSTRATED BANNER & SEARCH BAR */
.hero-illustrated-section {
  background: #f3f4f6;
  padding-bottom: 24px;
}

.hero-banner-frame {
  position: relative;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  overflow: hidden;
}

.hero-banner-img {
  width: 100%;
  height: auto;
  max-height: 480px;
  object-fit: cover;
  display: block;
}

.hero-search-overlay {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 620px;
  z-index: 10;
}

.search-pill-form {
  background: #ffffff;
  border: 3px solid #22c55e;
  border-radius: 9999px;
  padding: 6px 8px 6px 24px;
  display: flex;
  align-items: center;
  box-shadow: 0 10px 30px rgba(22, 197, 94, 0.25);
}

.search-pill-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  color: #0f172a;
  background: transparent;
}

.search-pill-input::placeholder { color: #94a3b8; }

.search-pill-btn {
  background: #16a34a;
  color: #ffffff;
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.search-pill-btn:hover { background: #1f2937; }

/* News Ticker Row */
.news-ticker-container {
  max-width: 1200px;
  margin: -20px auto 0;
  position: relative;
  z-index: 20;
  background: #ffffff;
  border-radius: 16px;
  border: 1.5px solid #dcfce7;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

.news-badge-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #dbeafe;
  color: #2563eb;
  font-weight: 800;
  font-size: 0.82rem;
  padding: 6px 14px;
  border-radius: 9999px;
  border: 1px solid #93c5fd;
  white-space: nowrap;
}

.news-items-row {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  flex: 1;
}

.news-item-card {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: #334155;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.news-item-card:hover { color: #16a34a; }
.news-title { font-weight: 600; }
.news-date { font-size: 0.72rem; color: #94a3b8; font-family: monospace; }

/* SECTION 2: REGION EXPLORER & CHIPS */
.region-explorer-section {
  padding: 80px 24px;
  background: #ffffff;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
}

.eco-section-title {
  font-size: 2.2rem;
  font-weight: 850;
  color: #0f172a;
  line-height: 1.25;
  margin-bottom: 28px;
}

.category-toggle-bar {
  display: inline-flex;
  gap: 12px;
  background: #f1f5f9;
  padding: 6px;
  border-radius: 9999px;
  margin-bottom: 32px;
}

.cat-toggle-btn {
  background: transparent;
  border: none;
  padding: 8px 24px;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.9rem;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cat-toggle-btn.active {
  background: #16a34a;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(22, 163, 74, 0.3);
}

.region-chips-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
  position: relative;
}

.chip-scroll-btn {
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  color: #334155;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.chip-scroll-btn:hover { background: #e2e8f0; }

.region-chips-track {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 4px 0;
  scrollbar-width: none;
}

.region-chips-track::-webkit-scrollbar { display: none; }

.region-chip {
  background: #ffffff;
  border: 1.5px solid #cbd5e1;
  color: #475569;
  padding: 8px 20px;
  border-radius: 9999px;
  font-weight: 650;
  font-size: 0.88rem;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
}

.region-chip.active {
  background: #0f172a;
  color: #ffffff;
  border-color: #0f172a;
}

/* Facility Cards Carousel Grid */
.facility-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.facility-card {
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 18px;
  overflow: hidden;
  text-align: left;
  cursor: pointer;
  transition: all 0.25s ease;
}

.facility-card:hover {
  transform: translateY(-4px);
  border-color: #22c55e;
  box-shadow: 0 12px 24px rgba(34, 197, 94, 0.1);
}

.facility-img-box {
  position: relative;
  height: 140px;
  overflow: hidden;
}

.facility-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.facility-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(15, 23, 42, 0.75);
  color: #ffffff;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  backdrop-filter: blur(4px);
}

.facility-info { padding: 16px; }

.facility-name {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 6px;
}

.facility-desc {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.4;
  margin-bottom: 14px;
}

.facility-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
}

.stat-tag {
  background: #dbeafe;
  color: #2563eb;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
}

.arrow-link {
  color: #2563eb;
  font-weight: 750;
}

.view-all-row { margin-top: 40px; }

.btn-outline-green {
  background: transparent;
  border: 2px solid #2563eb;
  color: #2563eb;
  padding: 10px 28px;
  border-radius: 9999px;
  font-weight: 750;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-outline-green:hover {
  background: #2563eb;
  color: #ffffff;
}

/* SECTION 3: INTERACTIVE GIS MAP SHOWCASE ("Pemantauan Stunting Dalam Satu Peta") */
.map-showcase-section {
  background: #e0f2fe;
  padding: 90px 24px;
  position: relative;
  overflow: hidden;
}

.relative-z { position: relative; z-index: 10; }

.cloud-shape {
  position: absolute;
  background: #ffffff;
  border-radius: 100px;
  opacity: 0.6;
  pointer-events: none;
}

.cloud-1 { width: 300px; height: 80px; top: 40px; left: -50px; }
.cloud-2 { width: 250px; height: 70px; top: 80px; right: -40px; }

.explorer-img {
  max-width: 280px;
  height: auto;
  margin-bottom: 16px;
}

.map-showcase-title {
  font-size: 2.3rem;
  font-weight: 900;
  color: #0f172a;
  line-height: 1.25;
  margin-bottom: 24px;
}

.hashtag-pills-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 36px;
}

.hash-pill {
  background: #ffffff;
  color: #2563eb;
  border: 1.5px solid #93c5fd;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 4px 14px;
  border-radius: 9999px;
}

/* Big Rounded Green GIS Map Frame (Matching Reference Image) */
.rounded-map-frame {
  max-width: 960px;
  margin: 0 auto;
  background: #ffffff;
  border: 4px solid #2563eb;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(37, 99, 235, 0.15);
}

.map-frame-header {
  background: #f3f4f6;
  border-bottom: 2px solid #e5e7eb;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 0.82rem;
  color: #1f2937;
}

.live-dot-blue {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.25);
  display: inline-block;
}

.map-canvas-container {
  position: relative;
  background: #f8fafc;
  height: 380px;
}

.map-svg-canvas {
  width: 100%;
  height: 100%;
}

.map-floating-tags {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.map-pill-marker {
  position: absolute;
  pointer-events: auto;
  background: #2563eb;
  color: #ffffff;
  border: 2px solid #ffffff;
  padding: 6px 14px;
  border-radius: 9999px;
  font-weight: 750;
  font-size: 0.78rem;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

.map-pill-marker:hover {
  background: #1d4ed8;
  transform: scale(1.05);
}

.marker-1 { top: 25%; left: 20%; }
.marker-2 { top: 40%; left: 55%; }
.marker-3 { top: 65%; left: 30%; }
.marker-4 { top: 75%; left: 65%; }

.map-control-widgets {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.map-ctrl-btn {
  background: #2563eb;
  color: #ffffff;
  border: 2px solid #ffffff;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.map-cta-row { margin-top: 36px; }

.btn-green-lg {
  background: #2563eb;
  color: #ffffff;
  border: none;
  padding: 14px 36px;
  border-radius: 9999px;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.3);
  transition: all 0.2s ease;
}

.btn-green-lg:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

/* SECTION 4: CHILD ACTIVITIES & POSYANDU FEED */
.gallery-feed-section {
  padding: 90px 24px;
  background: #ffffff;
}

.gallery-inner-grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  align-items: center;
}

.gallery-header-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.sprout-badge {
  background: #dbeafe;
  color: #2563eb;
  font-weight: 800;
  font-size: 0.78rem;
  padding: 4px 12px;
  border-radius: 9999px;
  margin-bottom: 16px;
}

.gallery-title {
  font-size: 2.2rem;
  font-weight: 850;
  color: #0f172a;
  line-height: 1.25;
  margin-bottom: 16px;
}

.gallery-desc {
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 28px;
}

.gallery-pagination {
  display: flex;
  align-items: center;
  gap: 16px;
}

.pag-arrow {
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
}

.pag-counter {
  font-weight: 750;
  color: #334155;
}

.gallery-photos-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.photo-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 160px;
}

.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(15, 23, 42, 0.8), transparent);
  display: flex;
  align-items: flex-end;
  padding: 12px;
}

.photo-caption {
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 700;
}

/* SECTION 5: ILLUSTRATED NATURE FOOTER */
.eco-footer {
  background: #1F2937;
  color: #ffffff;
  position: relative;
  padding-top: 40px;
}

.hills-footer-edge {
  position: absolute;
  top: -60px;
  left: 0;
  right: 0;
  height: 60px;
  overflow: hidden;
  pointer-events: none;
}

.hills-svg {
  width: 100%;
  height: 100%;
}

.footer-inner-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.footer-content-grid {
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  gap: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.footer-brand-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.brand-logo.footer { cursor: default; }

.footer-tagline-eco {
  font-size: 0.88rem;
  line-height: 1.6;
  color: #bbf7d0;
  max-width: 300px;
}

.footer-links-col h4 {
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #ffffff;
  margin-bottom: 16px;
}

.footer-links-col a {
  display: block;
  color: #dcfce7;
  text-decoration: none;
  font-size: 0.88rem;
  margin-bottom: 10px;
  transition: color 0.2s ease;
}

.footer-links-col a:hover { color: #facc15; }

.footer-bottom-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  font-size: 0.78rem;
  color: #bbf7d0;
}

/* Animations */
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.25s ease; }
.fade-slide-enter-from, .fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }

/* Responsive Queries */
@media (max-width: 1024px) {
  .eco-section-title, .map-showcase-title, .gallery-title { font-size: 1.8rem; }
  .gallery-inner-grid { grid-template-columns: 1fr; }
  .footer-content-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 768px) {
  .navbar-menu, .btn-green-pill { display: none; }
  .mobile-toggle { display: block; }
  .hero-search-overlay { width: 95%; top: 50%; }
  .search-pill-form { padding: 4px 6px 4px 16px; }
  .search-pill-input { font-size: 0.88rem; }
  .news-ticker-container { flex-direction: column; align-items: flex-start; }
  .gallery-photos-grid { grid-template-columns: 1fr; }
  .footer-content-grid { grid-template-columns: 1fr; }
  .footer-bottom-bar { flex-direction: column; gap: 10px; text-align: text-center; }
}

/* Public Child Search Result Modal */
.public-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.public-modal-card {
  background: #ffffff;
  border-radius: 24px;
  max-width: 520px;
  width: 100%;
  padding: 32px;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  border: 3px solid #2563eb;
}

.public-header-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #dbeafe;
  color: #2563eb;
  font-weight: 800;
  font-size: 0.8rem;
  padding: 4px 12px;
  border-radius: 9999px;
  margin-bottom: 12px;
}

.child-public-name {
  font-size: 1.6rem;
  font-weight: 900;
  color: #0f172a;
  margin-bottom: 4px;
}

.child-public-meta {
  font-size: 0.88rem;
  color: #64748b;
  margin-bottom: 20px;
}

.public-status-card {
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
}

.status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #475569;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #cbd5e1;
}

.status-pill-badge {
  font-size: 0.75rem;
  font-weight: 800;
  padding: 3px 10px;
  border-radius: 6px;
}

.pill-crimson { background: #ffe4e6; color: #e11d48; border: 1px solid #fda4af; }
.pill-amber { background: #fef3c7; color: #d97706; border: 1px solid #fcd34d; }
.pill-yellow { background: #fef9c3; color: #ca8a04; border: 1px solid #fef08a; }
.pill-emerald { background: #dcfce7; color: #16a34a; border: 1px solid #86efac; }

.status-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  font-size: 0.78rem;
  color: #334155;
}

.posyandu-location-box {
  background: #dbeafe;
  border: 1.5px solid #93c5fd;
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 16px;
}

.loc-head { font-size: 0.68rem; color: #2563eb; font-weight: 800; margin-bottom: 4px; }
.loc-title { font-size: 1rem; font-weight: 800; color: #0f172a; }
.loc-sub { font-size: 0.78rem; color: #475569; margin-top: 2px; }

.privacy-notice {
  font-size: 0.72rem;
  color: #64748b;
  line-height: 1.4;
  background: #f1f5f9;
  padding: 10px 14px;
  border-radius: 10px;
}

</style>
