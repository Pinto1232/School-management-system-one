<script setup lang="ts">
import { dashboardNavigation } from '~/data/school'

definePageMeta({ layout: 'dashboard', middleware: 'auth' })

const route = useRoute()
const view = computed(() => {
  const param = route.params.view
  return Array.isArray(param) ? param[0] || 'dashboard' : String(param || 'dashboard')
})
const validViews = new Set(dashboardNavigation.map(item => item.slug))

if (!validViews.has(view.value)) {
  throw createError({ statusCode: 404, statusMessage: 'Dashboard view not found' })
}

useSeoMeta({
  title: () => dashboardNavigation.find(item => item.slug === view.value)?.label || 'Dashboard',
  robots: 'noindex',
})
</script>

<template>
  <DashboardWorkspace :view="view" />
</template>
