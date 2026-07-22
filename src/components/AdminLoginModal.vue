<template>
  <transition name="fade">
    <div v-if="store.isAdminLoginModalOpen" class="login-modal-overlay" @click.self="store.closeAdminLoginModal">
      <div class="login-modal-card">
        <button class="modal-close-btn" @click="store.closeAdminLoginModal">
          <X class="w-5 h-5" />
        </button>

        <div class="modal-header text-center">
          <div class="badge-icon">
            <ShieldCheck class="w-8 h-8 text-green-600" />
          </div>
          <h3 class="modal-title">Akses Login Terotorisasi</h3>
          <p class="modal-subtitle">
            Halaman ini khusus untuk Kader Posyandu, Petugas Puskesmas, dan Dinas Kesehatan yang memerlukan akses ke seluruh database balita & analitis GIS.
          </p>
        </div>

        <!-- Quick 1-Click Demo Login -->
        <div class="demo-login-box">
          <span class="demo-title">PILIH LOGIN DEMO CEPAT:</span>
          <div class="demo-buttons">
            <button class="btn-demo green" @click="handleDemoLogin('posyandu')">
              <UserCheck class="w-4 h-4" />
              <span>Login sbg Kader Posyandu</span>
            </button>

            <button class="btn-demo blue" @click="handleDemoLogin('dinas')">
              <Building2 class="w-4 h-4" />
              <span>Login sbg Dinas Kesehatan</span>
            </button>
          </div>
        </div>

        <div class="divider">
          <span>atau login manual</span>
        </div>

        <!-- Manual Login Form -->
        <form @submit.prevent="handleManualLogin" class="login-form">
          <div class="form-group">
            <label>NIP / Username Officers:</label>
            <input type="text" v-model="username" placeholder="Masukkan username / NIP..." class="form-input" required />
          </div>

          <div class="form-group">
            <label>Kata Sandi:</label>
            <input type="password" v-model="password" placeholder="••••••••" class="form-input" required />
          </div>

          <button type="submit" class="btn-submit-login">
            <span>Masuk ke System Admin</span>
          </button>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import { useStuntingStore } from '../stores/stuntingStore.js'
import { ShieldCheck, UserCheck, Building2, X } from 'lucide-vue-next'

const store = useStuntingStore()
const username = ref('')
const password = ref('')

const handleDemoLogin = (roleType) => {
  store.loginAsAdmin(roleType)
}

const handleManualLogin = () => {
  store.loginAsAdmin('posyandu')
}
</script>

<style scoped>
.login-modal-overlay {
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

.login-modal-card {
  background: #ffffff;
  border-radius: 24px;
  max-width: 480px;
  width: 100%;
  padding: 36px;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  border: 2px solid #22c55e;
}

.modal-close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: #f1f5f9;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
}

.modal-close-btn:hover { background: #e2e8f0; color: #0f172a; }

.badge-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #dcfce7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.modal-title {
  font-size: 1.4rem;
  font-weight: 850;
  color: #0f172a;
  margin-bottom: 8px;
}

.modal-subtitle {
  font-size: 0.88rem;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 24px;
}

.demo-login-box {
  background: #f0fdf4;
  border: 1.5px solid #bbf7d0;
  border-radius: 16px;
  padding: 18px;
  margin-bottom: 20px;
}

.demo-title {
  font-size: 0.72rem;
  font-weight: 800;
  color: #15803d;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 12px;
}

.demo-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-demo {
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 750;
  font-size: 0.88rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.btn-demo.green {
  background: #16a34a;
  color: #ffffff;
  box-shadow: 0 4px 10px rgba(22, 163, 74, 0.2);
}

.btn-demo.green:hover { background: #15803d; }

.btn-demo.blue {
  background: #2563eb;
  color: #ffffff;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
}

.btn-demo.blue:hover { background: #1d4ed8; }

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: #94a3b8;
  font-size: 0.75rem;
  margin: 16px 0;
}

.divider::before, .divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e2e8f0;
}

.divider span { padding: 0 10px; }

.login-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
}

.form-group label {
  font-size: 0.8rem;
  font-weight: 700;
  color: #334155;
}

.form-input {
  width: 100%;
  border: 1.5px solid #cbd5e1;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 0.9rem;
  outline: none;
}

.form-input:focus { border-color: #22c55e; }

.btn-submit-login {
  background: #0f172a;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 10px;
  font-weight: 750;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 6px;
}

.btn-submit-login:hover { background: #1e293b; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
