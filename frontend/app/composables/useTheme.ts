export type ThemeMode = 'light' | 'dark'

export const useTheme = () => {
  const theme = useState<ThemeMode>('theme-mode', () => 'light')

  const applyTheme = (mode: ThemeMode) => {
    theme.value = mode
    if (import.meta.client) {
      document.documentElement.dataset.theme = mode
      document.documentElement.style.colorScheme = mode
      localStorage.setItem('school-theme', mode)
    }
  }

  const initialiseTheme = () => {
    if (!import.meta.client) return
    const saved = localStorage.getItem('school-theme') as ThemeMode | null
    applyTheme(saved || 'light')
  }

  const toggleTheme = () => applyTheme(theme.value === 'light' ? 'dark' : 'light')

  return { theme: readonly(theme), initialiseTheme, toggleTheme }
}
