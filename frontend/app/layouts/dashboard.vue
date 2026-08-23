<script setup lang="ts">
import type { AppNavigationItem, WordPressSidebarResponse } from '~/types/dashboard'

const route = useRoute()
const sidebarOpen = useState<boolean>('dashboard-sidebar-open', () => false)
const sidebarCollapsed = useState<boolean>('dashboard-sidebar-collapsed', () => false)
const search = ref('')
const { theme, toggleTheme } = useTheme()
const { user, roles, logout } = useAuth()
const { uploadUrl } = useApi()
const toast = useToast()

const { data: sidebarResponse } = await useFetch<WordPressSidebarResponse>('/api/sidebar-links', {
  key: 'wordpress-sidebar-links',
  default: () => ({
    data: [],
    meta: { total: 0, role: null, tree: false, include_disabled: false },
  }),
})

if (import.meta.client) {
  watch(sidebarResponse, response => {
    console.log('[School Dashboard] Sidebar API response:', response)
  }, { immediate: true })
}

const navigation = computed<AppNavigationItem[]>(() => {
  const allowedRoles = new Set(roles.value.map(role => role.toLowerCase()))
  if (allowedRoles.has('platform_admin')) allowedRoles.add('admin')

  return sidebarResponse.value.data
    .filter(item => item.enabled)
    .filter(item => !item.roles.length || item.roles.some(role => allowedRoles.has(role.toLowerCase())))
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

const formattedDate = new Intl.DateTimeFormat('pt-PT', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
}).format(new Date())

const userName = computed(() => {
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

const roleLabel = computed(() => roleLabels[user.value?.role || ''] || 'Conta escolar')
const userImage = computed(() => user.value?.image ? uploadUrl(user.value.image) : '')

const handleLogout = async () => {
  await logout('/')
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
      :show-settings="false"
      @logout="handleLogout"
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
