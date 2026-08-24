<script setup lang="ts">
import type { AppNavigationItem } from '~/types/dashboard'

const props = withDefaults(defineProps<{
  items: AppNavigationItem[]
  brandName?: string
  homeTo?: string
  settingsTo?: string
  showSettings?: boolean
  showLogout?: boolean
  loading?: boolean
  errorMessage?: string
}>(), {
  brandName: 'Lusivo',
  homeTo: '/dashboard',
  settingsTo: '/dashboard/settings',
  showSettings: true,
  showLogout: true,
  loading: false,
  errorMessage: '',
})

const emit = defineEmits<{
  logout: []
  retry: []
}>()

const open = defineModel<boolean>('open', { default: false })
const collapsed = defineModel<boolean>('collapsed', { default: false })
const route = useRoute()
const navigationScrolling = ref(false)
let navigationScrollTimeout: ReturnType<typeof setTimeout> | undefined

const navigationItemClass = 'flex min-h-11 w-full items-center gap-3 rounded-xl border border-transparent bg-transparent px-3.5 py-2.5 text-left text-base font-semibold text-ink-soft transition duration-200 hover:bg-surface-muted hover:text-ink active:translate-y-px disabled:cursor-not-allowed disabled:opacity-55 disabled:transform-none lg:data-[collapsed=true]:justify-center lg:data-[collapsed=true]:px-2'

const isActive = (item: AppNavigationItem) => {
  if (item.exact) return route.path === item.to
  return route.path === item.to || route.path.startsWith(`${item.to}/`)
}

const close = () => {
  open.value = false
}

const handleNavigationScroll = () => {
  navigationScrolling.value = true
  if (navigationScrollTimeout !== undefined) clearTimeout(navigationScrollTimeout)
  navigationScrollTimeout = setTimeout(() => {
    navigationScrolling.value = false
  }, 700)
}

watch(() => route.fullPath, close)

onBeforeUnmount(() => {
  if (navigationScrollTimeout !== undefined) clearTimeout(navigationScrollTimeout)
})
</script>

<template>
  <button
    :class="[
      'fixed inset-0 z-[60] hidden border-0 bg-navy-900/55 backdrop-blur-sm print:hidden lg:hidden',
      open && 'max-lg:block',
    ]"
    type="button"
    aria-label="Fechar navegação do painel"
    @click="close"
  />

  <aside
    :class="[
      'dashboard-sidebar fixed top-3 left-3 z-[70] flex h-[calc(100dvh-1.5rem)] w-[min(300px,calc(100vw-1.5rem))] min-w-0 flex-col overflow-hidden rounded-[1.4rem] border border-line bg-surface-strong shadow-panel transition-transform duration-300 ease-out print:hidden lg:sticky lg:top-4 lg:z-auto lg:h-[calc(100dvh-2rem)] lg:w-auto lg:translate-x-0 lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none',
      open ? 'translate-x-0' : '-translate-x-[calc(100%+1.5rem)]',
    ]"
    aria-label="Barra lateral do painel"
  >
    <div :class="['flex min-h-[88px] items-center justify-between gap-2', collapsed ? 'px-5 lg:justify-center lg:px-0' : 'px-5 lg:pr-4 lg:pl-6']">
      <NuxtLink
        :class="[
          'inline-flex min-w-0 shrink-0 items-center gap-2.5 text-[1.35rem] font-extrabold tracking-[-0.035em]',
          collapsed && 'lg:hidden',
        ]"
        :to="homeTo"
        :aria-label="`Abrir o painel ${brandName}`"
        @click="close"
      >
        <BrandLogo />
        <span :class="['overflow-hidden text-ellipsis whitespace-nowrap', collapsed && 'lg:hidden']">{{ brandName }}</span>
      </NuxtLink>

      <button
        :class="[
          'hidden shrink-0 place-items-center rounded-full border-brand-200 bg-surface-strong/70 text-ink-soft shadow-dashboard-control transition duration-200 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 active:translate-y-px lg:grid',
          'size-12 border-3',
        ]"
        type="button"
        :aria-label="collapsed ? 'Expandir navegação' : 'Recolher navegação'"
        @click="collapsed = !collapsed"
      >
        <Icon :class="collapsed && 'text-brand-500 lg:size-7'" :name="collapsed ? 'ph:caret-right' : 'ph:caret-left'" size="20" aria-hidden="true" />
      </button>

      <button
        class="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-surface text-ink-soft transition duration-200 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 active:translate-y-px lg:hidden"
        type="button"
        aria-label="Fechar navegação"
        @click="close"
      >
        <Icon name="ph:x" size="20" aria-hidden="true" />
      </button>
    </div>

    <nav
      :class="['sidebar-navigation grid min-h-0 flex-1 content-start gap-1.5 overflow-x-hidden overflow-y-auto px-3 py-4 lg:-mt-1.5 lg:py-0', collapsed && 'is-collapsed lg:px-2', navigationScrolling && 'is-scrolling']"
      aria-label="Navegação principal do painel"
      @scroll.passive="handleNavigationScroll"
    >
      <div v-if="loading" class="grid gap-2" role="status" aria-label="A carregar navegação">
        <div
          v-for="index in 4"
          :key="index"
          :class="['flex min-h-11 items-center gap-3 rounded-xl px-3.5 py-2.5', collapsed && 'lg:justify-center lg:px-2']"
        >
          <span class="size-6 shrink-0 animate-pulse rounded-md bg-surface-muted" />
          <span :class="['h-3.5 flex-1 animate-pulse rounded-full bg-surface-muted', collapsed && 'lg:hidden']" />
        </div>
        <span class="sr-only">A carregar as ligações do painel…</span>
      </div>

      <button
        v-else-if="errorMessage"
        :class="navigationItemClass"
        :data-collapsed="collapsed"
        type="button"
        :title="errorMessage"
        :aria-label="collapsed ? 'Tentar novamente' : undefined"
        @click="emit('retry')"
      >
        <Icon :class="['size-6 shrink-0 text-ink-soft', collapsed && 'lg:size-8 lg:text-brand-500']" name="ph:arrow-clockwise" aria-hidden="true" />
        <span :class="['min-w-0 flex-1', collapsed && 'lg:hidden']">
          <span class="block text-nav-accent">Tentar novamente</span>
          <span class="mt-0.5 block overflow-hidden text-xs font-normal text-ellipsis whitespace-nowrap">{{ errorMessage }}</span>
        </span>
      </button>

      <template v-else>
        <template v-for="item in items" :key="item.to">
          <button
            v-if="item.disabled"
            :class="navigationItemClass"
            :data-collapsed="collapsed"
            type="button"
            disabled
            :title="collapsed ? item.label : undefined"
            :aria-label="collapsed ? item.label : undefined"
          >
            <Icon :class="['shrink-0 text-ink-soft', collapsed && 'lg:size-8 lg:text-brand-500']" :name="item.icon" size="24" aria-hidden="true" />
            <span :class="['min-w-0 flex-1 overflow-hidden text-base text-ellipsis whitespace-nowrap text-nav-accent', collapsed && 'lg:hidden']">{{ item.label }}</span>
            <span v-if="item.badge !== undefined" :class="['rounded-full bg-surface-muted px-2 py-0.5 text-xs font-bold text-ink-soft', collapsed && 'lg:hidden']">{{ item.badge }}</span>
          </button>

          <NuxtLink
            v-else
            :class="[
              navigationItemClass,
              isActive(item) && 'border-brand-200 bg-brand-500/10 text-nav-accent hover:bg-brand-500/10 hover:text-nav-accent',
            ]"
            :data-collapsed="collapsed"
            :to="item.to"
            :target="item.target"
            :rel="item.target === '_blank' ? 'noopener noreferrer' : undefined"
            :title="collapsed ? item.label : undefined"
            :aria-label="collapsed ? item.label : undefined"
            :aria-current="isActive(item) ? 'page' : undefined"
            @click="close"
          >
            <Icon :class="['shrink-0 text-ink-soft', collapsed && 'lg:size-8 lg:text-brand-500']" :name="item.icon" size="24" aria-hidden="true" />
            <span :class="['min-w-0 flex-1 overflow-hidden text-base text-ellipsis whitespace-nowrap text-nav-accent', collapsed && 'lg:hidden']">{{ item.label }}</span>
            <span v-if="item.badge !== undefined" :class="['rounded-full bg-brand-100 px-2 py-0.5 text-xs font-black text-brand-800', collapsed && 'lg:hidden']">{{ item.badge }}</span>
          </NuxtLink>
        </template>
      </template>
    </nav>

    <div :class="['mt-auto grid gap-1.5 border-t border-line px-3 pt-3 pb-4 lg:border-t-0 lg:pt-2 lg:pb-4', collapsed && 'lg:px-2']">
      <slot name="footer" :collapsed="collapsed">
        <NuxtLink
          v-if="showSettings"
          :class="navigationItemClass"
          :data-collapsed="collapsed"
          :to="settingsTo"
          :title="collapsed ? 'Definições' : undefined"
          :aria-label="collapsed ? 'Definições' : undefined"
        >
          <Icon :class="['shrink-0 text-ink-soft', collapsed && 'lg:size-8 lg:text-brand-500']" name="ph:gear" size="24" aria-hidden="true" />
          <span :class="['text-base text-nav-accent', collapsed && 'lg:hidden']">Definições</span>
        </NuxtLink>
        <button
          v-if="showLogout"
          :class="navigationItemClass"
          :data-collapsed="collapsed"
          type="button"
          :title="collapsed ? 'Terminar sessão' : undefined"
          :aria-label="collapsed ? 'Terminar sessão' : undefined"
          @click="emit('logout')"
        >
          <Icon :class="['shrink-0 text-ink-soft', collapsed && 'lg:size-8 lg:text-brand-500']" name="ph:sign-out" size="24" aria-hidden="true" />
          <span :class="['text-base text-nav-accent', collapsed && 'lg:hidden']">Terminar sessão</span>
        </button>
      </slot>
    </div>
  </aside>
</template>

<style scoped>
.sidebar-navigation {
  scrollbar-color: transparent transparent;
  scrollbar-gutter: stable;
  scrollbar-width: thin;
}

.dashboard-sidebar:hover .sidebar-navigation,
.sidebar-navigation:hover,
.sidebar-navigation:focus-within,
.sidebar-navigation.is-scrolling {
  scrollbar-color: color-mix(in srgb, var(--color-brand-500) 55%, transparent) transparent;
}

.sidebar-navigation::-webkit-scrollbar {
  width: 6px;
}

.sidebar-navigation::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-navigation::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: transparent;
}

.dashboard-sidebar:hover .sidebar-navigation::-webkit-scrollbar-thumb,
.sidebar-navigation:hover::-webkit-scrollbar-thumb,
.sidebar-navigation:focus-within::-webkit-scrollbar-thumb,
.sidebar-navigation.is-scrolling::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--color-brand-500) 55%, transparent);
}

@media (min-width: 64rem) {
  .sidebar-navigation.is-collapsed {
    scrollbar-gutter: stable both-edges;
  }
}
</style>
