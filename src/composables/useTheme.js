import { ref, watchEffect } from 'vue'

const currentTheme = ref(localStorage.getItem('gis_theme') || 'dark')

export function useTheme() {
  function toggleTheme() {
    currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem('gis_theme', currentTheme.value)
  }

  function setTheme(theme) {
    if (theme === 'dark' || theme === 'light') {
      currentTheme.value = theme
      localStorage.setItem('gis_theme', theme)
    }
  }

  watchEffect(() => {
    if (currentTheme.value === 'light') {
      document.documentElement.classList.add('light-theme')
      document.documentElement.classList.remove('dark-theme')
    } else {
      document.documentElement.classList.add('dark-theme')
      document.documentElement.classList.remove('light-theme')
    }
  })

  return {
    theme: currentTheme,
    toggleTheme,
    setTheme
  }
}
