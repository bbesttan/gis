import { ref } from 'vue'

const toasts = ref([])
let toastIdCounter = 0

export function useToast() {
  function showToast({ title, message, type = 'info', duration = 3500 }) {
    const id = ++toastIdCounter
    const toast = { id, title, message, type }
    toasts.value.push(toast)

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }

  function removeToast(id) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  function success(message, title = 'Berhasil') {
    showToast({ title, message, type: 'success' })
  }

  function error(message, title = 'Terjadi Kesalahan') {
    showToast({ title, message, type: 'error' })
  }

  function info(message, title = 'Informasi') {
    showToast({ title, message, type: 'info' })
  }

  function warning(message, title = 'Peringatan') {
    showToast({ title, message, type: 'warning' })
  }

  return {
    toasts,
    showToast,
    removeToast,
    success,
    error,
    info,
    warning
  }
}
