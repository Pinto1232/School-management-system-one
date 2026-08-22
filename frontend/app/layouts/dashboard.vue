<script setup lang="ts">
import { dashboardNavigation } from '~/data/school'

const route = useRoute()
const sidebarOpen = useState<boolean>('dashboard-sidebar-open', () => false)
const sidebarCollapsed = useState<boolean>('dashboard-sidebar-collapsed', () => false)
const { theme, toggleTheme } = useTheme()
const { user } = useAuth()
const { uploadUrl } = useApi()

const activeSlug = computed(() => {
  const value = route.params.view
  if (Array.isArray(value)) return value[0] || 'dashboard'
  return value || 'dashboard'
})

const activeLabel = computed(() => dashboardNavigation.find(item => item.slug === activeSlug.value)?.label || 'Painel')

const formattedDate = new Intl.DateTimeFormat('pt-PT', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
}).format(new Date())

const userName = computed(() => {
  const name = `${user.value?.firstName || ''} ${user.value?.lastName || ''}`.trim()
  return name || user.value?.email || 'Utilizador da escola'
})

const initials = computed(() => userName.value
  .split(/\s+/)
  .slice(0, 2)
  .map(part => part[0])
  .join('')
  .toUpperCase())

const roleLabels: Record<string, string> = {
  platform_admin: 'Administrador da plataforma',
  admin: 'Administrador escolar',
  teacher: 'Professor',
  staff: 'Funcionário',
  parent: 'Encarregado de educação',
  student: 'Aluno',
}

const roleLabel = computed(() => roleLabels[user.value?.role || ''] || 'Conta escolar')
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
    <DashboardSidebar />
    <div class="grid min-w-0 grid-rows-[auto_1fr]">
      <header class="sticky top-0 z-30 grid min-h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-b border-line bg-canvas px-1 print:hidden min-[721px]:min-h-[92px] min-[721px]:gap-5 min-[721px]:px-[clamp(0.25rem,1.6vw,1.5rem)] lg:min-h-[110px] lg:grid-cols-[minmax(180px,240px)_minmax(280px,540px)_minmax(0,1fr)]">
        <div class="flex min-w-0 items-center gap-2 min-[721px]:gap-3">
          <button
            class="inline-grid size-11 min-w-11 place-items-center rounded-control border border-line bg-surface-strong text-ink transition duration-150 hover:border-brand-400 hover:bg-brand-50 active:translate-y-px print:hidden lg:hidden"
            type="button"
            aria-label="Abrir navegação do painel"
            @click="sidebarOpen = true"
          >
            <Icon name="ph:list" size="22" aria-hidden="true" />
          </button>
          <div>
            <h1 class="m-0 max-w-[36vw] overflow-hidden text-lg font-extrabold text-ellipsis whitespace-nowrap min-[721px]:max-w-none min-[721px]:text-[1.45rem]">
              {{ activeLabel }}
            </h1>
            <time class="mt-1 block text-xs capitalize text-ink-soft min-[721px]:text-sm" :datetime="new Date().toISOString().slice(0, 10)">
              {{ formattedDate }}
            </time>
          </div>
        </div>

        <div class="hidden min-w-0 items-center gap-3 min-[901px]:flex">
          <form class="flex h-14 min-w-0 flex-1 items-center gap-3 rounded-full border border-line bg-surface-strong px-5 shadow-panel-soft transition focus-within:border-brand-400 focus-within:ring-3 focus-within:ring-brand-400/15" role="search" @submit.prevent>
            <Icon class="shrink-0 text-ink-soft" name="ph:magnifying-glass" size="22" aria-hidden="true" />
            <input class="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-ink outline-none placeholder:text-ink/45" type="search" aria-label="Pesquisar no painel" placeholder="Pesquisar...">
          </form>
          <button class="inline-grid size-14 min-w-14 place-items-center rounded-full border border-line bg-surface-strong text-ink shadow-panel-soft transition duration-150 hover:border-brand-400 hover:bg-brand-50 active:translate-y-px print:hidden" type="button" aria-label="Pesquisa por voz">
            <Icon name="ph:microphone" size="21" aria-hidden="true" />
          </button>
        </div>

        <div class="ml-auto flex min-w-0 items-center justify-end gap-2 min-[721px]:gap-3">
          <ClientOnly>
            <button
              class="flex h-11 items-center rounded-full border border-line bg-surface-strong p-1 shadow-panel-soft transition min-[721px]:h-[50px]"
              type="button"
              :aria-label="theme === 'light' ? 'Utilizar tema escuro' : 'Utilizar tema claro'"
              @click="toggleTheme"
            >
              <span
                :class="[
                  'grid size-8 place-items-center rounded-full text-ink-soft transition duration-200 min-[721px]:size-10',
                  theme === 'light' && 'bg-brand-500/10 text-nav-accent',
                ]"
              ><Icon name="ph:sun" size="19" aria-hidden="true" /></span>
              <span
                :class="[
                  'grid size-8 place-items-center rounded-full text-ink-soft transition duration-200 min-[721px]:size-10',
                  theme === 'dark' && 'bg-brand-500/10 text-nav-accent',
                ]"
              ><Icon name="ph:moon" size="19" aria-hidden="true" /></span>
            </button>
            <template #fallback>
              <div class="flex h-11 items-center rounded-full border border-line bg-surface-strong p-1 shadow-panel-soft min-[721px]:h-[50px]" aria-hidden="true">
                <span class="grid size-8 place-items-center rounded-full bg-brand-500/10 text-nav-accent min-[721px]:size-10"><Icon name="ph:sun" size="19" /></span>
                <span class="grid size-8 place-items-center rounded-full text-ink-soft min-[721px]:size-10"><Icon name="ph:moon" size="19" /></span>
              </div>
            </template>
          </ClientOnly>
          <button class="hidden size-11 min-w-11 place-items-center rounded-full border border-line bg-surface-strong text-ink shadow-panel-soft transition duration-150 hover:border-brand-400 hover:bg-brand-50 active:translate-y-px print:hidden min-[461px]:inline-grid min-[721px]:size-[50px] min-[721px]:min-w-[50px]" type="button" aria-label="Abrir notificações">
            <Icon name="ph:bell" size="20" aria-hidden="true" />
          </button>
          <ClientOnly>
            <div class="grid size-12 shrink-0 place-items-center rounded-full border border-line bg-surface-strong p-1 shadow-panel-soft min-[721px]:size-[58px]" role="group" :aria-label="`${userName}, ${roleLabel}`">
              <div class="grid size-9 place-items-center overflow-hidden rounded-full bg-brand-100 text-[0.82rem] font-black text-brand-800 min-[721px]:size-[42px]">
                <img v-if="user?.image" class="size-full object-cover" :src="uploadUrl(user.image)" :alt="userName">
                <span v-else>{{ initials }}</span>
              </div>
            </div>
            <template #fallback>
              <div class="grid size-12 shrink-0 place-items-center rounded-full border border-line bg-surface-strong p-1 shadow-panel-soft min-[721px]:size-[58px]" aria-hidden="true">
                <div class="grid size-9 place-items-center overflow-hidden rounded-full bg-brand-100 text-[0.82rem] font-black text-brand-800 min-[721px]:size-[42px]"><span>SU</span></div>
              </div>
            </template>
          </ClientOnly>
        </div>
      </header>
      <main class="mx-auto min-h-0 w-full max-w-[1500px] p-[clamp(1rem,2.5vw,2rem)] print:p-0">
        <slot />
      </main>
    </div>
  </div>
</template>
