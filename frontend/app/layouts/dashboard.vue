<script setup lang="ts">
import type { AppNavigationItem } from '~/types/dashboard'

const route = useRoute()
const sidebarOpen = useState<boolean>('dashboard-sidebar-open', () => false)
const sidebarCollapsed = useState<boolean>('dashboard-sidebar-collapsed', () => false)
const search = ref('')
const { theme, toggleTheme } = useTheme()
const { user, logout } = useAuth()
const { uploadUrl } = useApi()
const toast = useToast()
const nuxtApp = useNuxtApp()
const isMounted = ref(false)
const isLoggingOut = ref(false)

onMounted(() => {
  isMounted.value = true
})

const sidebarQuery = useSidebarLinksQuery(computed(() => isMounted.value && !isLoggingOut.value))
const sidebarResponse = sidebarQuery.data

if (import.meta.client && import.meta.dev) {
  watch(sidebarResponse, response => {
    if (!response) return
    const linksSnapshot = response.data.map(link => ({
      ...link,
      roles: [...link.roles],
    }))
    console.log('[School Dashboard] Sidebar links data:', linksSnapshot)
  }, { immediate: true })

  watch(sidebarQuery.error, error => {
    if (!error) return
    console.error('[School Dashboard] Sidebar API error:', error)
  }, { immediate: true })
}

// In Vue Query, a disabled query is still `pending`; `isLoading` additionally
// requires an active fetch and therefore cannot leave the skeleton stuck.
const sidebarLoading = computed(() => !isMounted.value || sidebarQuery.isLoading.value)
const sidebarErrorMessage = computed(() => sidebarQuery.isError.value
  ? getApiErrorMessage(sidebarQuery.error.value, 'Não foi possível carregar a navegação.')
  : '')

const navigation = computed<AppNavigationItem[]>(() => {
  if (!isMounted.value) return []

  return (sidebarResponse.value?.data || [])
    .filter(item => item.enabled && item.path !== '/dashboard')
    .sort((a, b) => a.position - b.position)
    .map(item => ({
      label: item.label,
      icon: item.icon,
      to: item.path,
      exact: item.path === '/dashboard',
      target: item.target,
    }))
})

const activeLabel = computed(() => navigation.value.find(item => (
  item.exact ? route.path === item.to : route.path === item.to || route.path.startsWith(`${item.to}/`)
))?.label || 'Painel')

const dateFormatter = new Intl.DateTimeFormat('pt-PT', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})
const formattedDate = computed(() => isMounted.value ? dateFormatter.format(new Date()) : '')

const userName = computed(() => {
  if (!isMounted.value) return 'Utilizador da escola'

  const name = `${user.value?.firstName || ''} ${user.value?.lastName || ''}`.trim()
  return name || user.value?.email || 'Utilizador da escola'
})

const roleLabels: Record<string, string> = {
  platform_admin: 'Administrador da plataforma',
  admin: 'Administrador escolar',
  teacher: 'Professor',
  staff: 'Funcionário',
  parent: 'Encarregado de educação',
  student: 'Aluno',
}

const roleLabel = computed(() => isMounted.value
  ? roleLabels[user.value?.role || ''] || 'Conta escolar'
  : 'Conta escolar')
const userImage = computed(() => isMounted.value && user.value?.image ? uploadUrl(user.value.image) : '')

const handleLogout = async () => {
  isLoggingOut.value = true

  try {
    await nuxtApp.$queryClient.cancelQueries()
    nuxtApp.$queryClient.clear()
    await logout('/')
  }
  finally {
    isLoggingOut.value = false
  }
}

const handleSidebarRetry = () => {
  void sidebarQuery.refetch()
}

const handleSearch = (query: string) => {
  if (!query) return
  toast.info('Pesquisa em preparação', `A pesquisa por “${query}” será ligada aos módulos do painel.`)
}

const handleNotifications = () => {
  toast.info('Sem novas notificações', 'Os avisos da escola aparecerão aqui quando estiverem disponíveis.')
}
</script>

<template>
  <div
    :class="[
      'grid min-h-dvh grid-cols-1 gap-3 bg-canvas p-3 transition-[grid-template-columns] duration-300 ease-out print:block print:p-0 lg:gap-[clamp(0.75rem,1.3vw,1.25rem)] lg:p-4',
      sidebarCollapsed
        ? 'lg:grid-cols-[88px_minmax(0,1fr)]'
        : 'lg:grid-cols-[282px_minmax(0,1fr)]',
    ]"
  >
    <AppSidebar
      v-model:open="sidebarOpen"
      v-model:collapsed="sidebarCollapsed"
      :items="navigation"
      :loading="sidebarLoading"
      :error-message="sidebarErrorMessage"
      :show-settings="false"
      @logout="handleLogout"
      @retry="handleSidebarRetry"
    />

    <div class="grid min-w-0 grid-rows-[auto_1fr]">
      <AppHeader
        v-model:search="search"
        :title="activeLabel"
        :subtitle="formattedDate"
        :theme="theme"
        :user-name="userName"
        :user-role="roleLabel"
        :user-image="userImage"
        @open-sidebar="sidebarOpen = true"
        @toggle-theme="toggleTheme"
        @submit-search="handleSearch"
        @open-notifications="handleNotifications"
      />

      <main class="mx-auto min-h-0 w-full max-w-375 p-[clamp(1rem,2.5vw,2rem)] print:p-0">
        <slot />
      </main>
    </div>

  </div>
</template>
