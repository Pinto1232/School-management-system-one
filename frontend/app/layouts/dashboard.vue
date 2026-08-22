<script setup lang="ts">
import { dashboardNavigation } from '~/data/school'

const route = useRoute()
const sidebarOpen = useState<boolean>('dashboard-sidebar-open', () => false)
const { theme, toggleTheme } = useTheme()

const activeSlug = computed(() => {
  const value = route.params.view
  if (Array.isArray(value)) return value[0] || 'dashboard'
  return value || 'dashboard'
})

const activeLabel = computed(() => dashboardNavigation.find(item => item.slug === activeSlug.value)?.label || 'Dashboard')
</script>

<template>
  <div class="dashboard-layout">
    <DashboardSidebar />
    <div class="dashboard-main">
      <header class="dashboard-topbar">
        <button
          class="icon-button dashboard-menu-button"
          type="button"
          aria-label="Open dashboard navigation"
          @click="sidebarOpen = true"
        >
          <Icon name="ph:list" size="22" aria-hidden="true" />
        </button>
        <h1>{{ activeLabel }}</h1>
        <div class="dashboard-topbar__actions">
          <button
            class="icon-button"
            type="button"
            :aria-label="theme === 'light' ? 'Use dark theme' : 'Use light theme'"
            @click="toggleTheme"
          >
            <Icon :name="theme === 'light' ? 'ph:moon' : 'ph:sun'" size="20" aria-hidden="true" />
          </button>
          <NuxtLink class="icon-button" to="/" aria-label="Open public website">
            <Icon name="ph:house" size="20" aria-hidden="true" />
          </NuxtLink>
        </div>
      </header>
      <main class="dashboard-content">
        <slot />
      </main>
    </div>
  </div>
</template>
