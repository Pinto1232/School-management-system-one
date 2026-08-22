<script setup lang="ts">
import { dashboardNavigationForRoles } from '~/data/school'

const route = useRoute()
const sidebarOpen = useState<boolean>('dashboard-sidebar-open', () => false)
const sidebarCollapsed = useState<boolean>('dashboard-sidebar-collapsed', () => false)
const { logout, roles } = useAuth()

const navigation = computed(() => dashboardNavigationForRoles(roles.value).filter(item => item.slug !== 'dashboard'))
const navigationItemClass = 'flex min-h-11 w-full items-center gap-3 rounded-xl border-0 bg-transparent px-3.5 py-2.5 text-left text-[0.92rem] font-semibold text-ink-soft transition duration-200 hover:bg-surface-muted hover:text-ink disabled:cursor-default disabled:opacity-100 disabled:hover:bg-transparent disabled:hover:text-ink-soft lg:data-[collapsed=true]:justify-center lg:data-[collapsed=true]:px-2'

const close = () => {
  sidebarOpen.value = false
}

const handleLogout = async () => {
  await logout('/')
}

const toggleCollapsed = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

watch(() => route.fullPath, close)
</script>

<template>
  <button
    :class="[
      'fixed inset-0 z-[60] hidden border-0 bg-navy-900/50 backdrop-blur-sm print:hidden lg:hidden',
      sidebarOpen && 'max-lg:block',
    ]"
    type="button"
    aria-label="Fechar navegação do painel"
    @click="close"
  />
  <aside
    :class="[
      'fixed top-3 left-3 z-[70] flex h-[calc(100dvh-1.5rem)] w-[min(300px,calc(100vw-1.5rem))] min-w-0 flex-col overflow-hidden rounded-[1.4rem] border border-line bg-surface-strong shadow-panel transition-transform duration-300 ease-out print:hidden lg:sticky lg:top-4 lg:z-auto lg:h-[calc(100dvh-2rem)] lg:w-auto lg:translate-x-0 lg:shadow-panel-soft',
      sidebarOpen ? 'translate-x-0' : '-translate-x-[calc(100%+1.5rem)]',
    ]"
  >
    <div :class="['flex min-h-[88px] items-center justify-between gap-2 px-5', sidebarCollapsed && 'lg:px-2']">
      <NuxtLink
        :class="[
          'inline-flex min-w-0 shrink-0 items-center gap-2.5 text-[1.35rem] font-extrabold tracking-[-0.035em]',
          sidebarCollapsed && 'lg:gap-0',
        ]"
        to="/dashboard"
        @click="close"
      >
        <BrandLogo :class="sidebarCollapsed ? 'lg:size-8 lg:[&_img]:top-[-19px] lg:[&_img]:left-[-29px] lg:[&_img]:h-[88px] lg:[&_img]:w-[88px]' : ''" />
        <span :class="['overflow-hidden text-ellipsis whitespace-nowrap', sidebarCollapsed && 'lg:hidden']">Lusivo</span>
      </NuxtLink>
      <button
        class="hidden size-9 shrink-0 place-items-center rounded-full border border-line bg-surface text-ink-soft transition duration-200 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 lg:grid"
        type="button"
        :aria-label="sidebarCollapsed ? 'Expandir navegação' : 'Recolher navegação'"
        @click="toggleCollapsed"
      >
        <Icon :name="sidebarCollapsed ? 'ph:caret-right' : 'ph:caret-left'" size="20" aria-hidden="true" />
      </button>
      <button class="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-surface text-ink-soft transition duration-200 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 lg:hidden" type="button" aria-label="Fechar navegação" @click="close">
        <Icon name="ph:x" size="20" aria-hidden="true" />
      </button>
    </div>

    <nav :class="['grid gap-1.5 overflow-y-auto px-3 py-4 [scrollbar-color:color-mix(in_srgb,var(--color-brand-500)_35%,transparent)_transparent] [scrollbar-width:thin]', sidebarCollapsed && 'lg:px-2']" aria-label="Navegação do painel">
      <NuxtLink
        :class="[navigationItemClass, 'bg-brand-500/10 text-nav-accent hover:bg-brand-500/10 hover:text-nav-accent']"
        :data-collapsed="sidebarCollapsed"
        to="/dashboard"
        :title="sidebarCollapsed ? 'Painel' : undefined"
      >
        <Icon class="size-5 shrink-0" name="ph:squares-four" aria-hidden="true" />
        <span :class="sidebarCollapsed ? 'lg:hidden' : ''">Painel</span>
      </NuxtLink>
      <ClientOnly>
        <button
          v-for="item in navigation"
          :key="item.slug"
          :class="navigationItemClass"
          :data-collapsed="sidebarCollapsed"
          type="button"
          disabled
          :title="sidebarCollapsed ? item.label : undefined"
        >
          <Icon class="size-5 shrink-0" :name="item.icon" aria-hidden="true" />
          <span :class="sidebarCollapsed ? 'lg:hidden' : ''">{{ item.label }}</span>
        </button>
      </ClientOnly>
    </nav>

    <div :class="['mt-auto grid gap-1.5 px-3 pt-3 pb-4', sidebarCollapsed && 'lg:px-2']">
      <button :class="navigationItemClass" :data-collapsed="sidebarCollapsed" type="button" disabled :title="sidebarCollapsed ? 'Definições' : undefined">
        <Icon class="size-5 shrink-0" name="ph:gear" size="20" aria-hidden="true" />
        <span :class="sidebarCollapsed ? 'lg:hidden' : ''">Definições</span>
      </button>
      <button :class="navigationItemClass" :data-collapsed="sidebarCollapsed" type="button" :title="sidebarCollapsed ? 'Terminar sessão' : undefined" @click="handleLogout">
        <Icon class="size-5 shrink-0" name="ph:sign-out" size="19" aria-hidden="true" />
        <span :class="sidebarCollapsed ? 'lg:hidden' : ''">Terminar sessão</span>
      </button>
    </div>
  </aside>
</template>
