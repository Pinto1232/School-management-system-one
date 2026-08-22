<script setup lang="ts">
import { dashboardNavigation, dashboardNavigationForRoles } from '~/data/school'
import type { AppNavigationItem } from '~/types/dashboard'

const route = useRoute()
const sidebarOpen = useState<boolean>('dashboard-sidebar-open', () => false)
const sidebarCollapsed = useState<boolean>('dashboard-sidebar-collapsed', () => false)
const search = ref('')
const { theme, toggleTheme } = useTheme()
const { user, roles, logout } = useAuth()
const { uploadUrl } = useApi()
const toast = useToast()

const activeSlug = computed(() => {
  const value = route.params.view
  if (Array.isArray(value)) return value[0] || 'dashboard'
  return value || 'dashboard'
})

const activeLabel = computed(() => dashboardNavigation.find(item => item.slug === activeSlug.value)?.label || 'Painel')

const navigation = computed<AppNavigationItem[]>(() => dashboardNavigationForRoles(roles.value).map(item => ({
  label: item.label,
  icon: item.icon,
  to: item.slug === 'dashboard' ? '/dashboard' : `/dashboard/${item.slug}`,
  exact: item.slug === 'dashboard',
  disabled: item.slug !== 'dashboard',
})))

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

      <main class="mx-auto min-h-0 w-full max-w-[1500px] p-[clamp(1rem,2.5vw,2rem)] print:p-0">
        <slot />
      </main>
    </div>

  </div>
</template>
