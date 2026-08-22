<script setup lang="ts">
import { useId } from 'vue'

const props = withDefaults(defineProps<{
  title: string
  subtitle?: string
  searchPlaceholder?: string
  showSearch?: boolean
  userName?: string
  userRole?: string
  userImage?: string
  theme?: 'light' | 'dark'
  notificationCount?: number
}>(), {
  subtitle: '',
  searchPlaceholder: 'Pesquisar no painel',
  showSearch: true,
  userName: 'Utilizador da escola',
  userRole: '',
  userImage: '',
  theme: 'light',
  notificationCount: 0,
})

const emit = defineEmits<{
  openSidebar: []
  submitSearch: [query: string]
  toggleTheme: []
  openNotifications: []
}>()

const search = defineModel<string>('search', { default: '' })
const searchId = `dashboard-search-${useId()}`

const initials = computed(() => props.userName
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map(part => part[0])
  .join('')
  .toUpperCase() || 'SU')

const submitSearch = () => emit('submitSearch', search.value.trim())
</script>

<template>
  <header class="sticky top-0 z-30 grid min-h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-line bg-canvas/95 px-1 backdrop-blur-sm print:hidden min-[721px]:min-h-[92px] min-[721px]:gap-5 min-[721px]:px-[clamp(0.25rem,1.6vw,1.5rem)] lg:min-h-[110px] lg:grid-cols-[minmax(180px,240px)_minmax(280px,540px)_minmax(0,1fr)]">
    <div class="flex min-w-0 items-center gap-2 min-[721px]:gap-3">
      <button
        class="inline-grid size-11 min-w-11 place-items-center rounded-control border border-line bg-surface-strong text-ink transition duration-150 hover:border-brand-400 hover:bg-brand-50 active:translate-y-px lg:hidden"
        type="button"
        aria-label="Abrir navegação do painel"
        @click="emit('openSidebar')"
      >
        <Icon name="ph:list" size="22" aria-hidden="true" />
      </button>

      <div class="min-w-0">
        <h1 class="m-0 overflow-hidden text-lg font-extrabold text-ellipsis whitespace-nowrap min-[721px]:text-[1.45rem]">
          {{ title }}
        </h1>
        <p v-if="subtitle" class="mt-1 mb-0 overflow-hidden text-xs text-ellipsis whitespace-nowrap text-ink-soft min-[721px]:text-sm">
          {{ subtitle }}
        </p>
      </div>
    </div>

    <form
      v-if="showSearch"
      class="hidden min-w-0 items-center gap-3 rounded-full border border-line bg-surface-strong px-5 shadow-panel-soft transition focus-within:border-brand-400 focus-within:ring-3 focus-within:ring-brand-400/15 min-[901px]:flex"
      role="search"
      @submit.prevent="submitSearch"
    >
      <Icon class="shrink-0 text-ink-soft" name="ph:magnifying-glass" size="21" aria-hidden="true" />
      <label class="sr-only" :for="searchId">Pesquisar no painel</label>
      <input
        :id="searchId"
        v-model="search"
        class="h-14 min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-ink outline-none placeholder:text-ink/45"
        type="search"
        :placeholder="searchPlaceholder"
        autocomplete="off"
      >
      <button
        v-if="search"
        class="grid size-8 shrink-0 place-items-center rounded-full border-0 bg-transparent text-ink-soft transition hover:bg-surface-muted hover:text-ink"
        type="button"
        aria-label="Limpar pesquisa"
        @click="search = ''"
      >
        <Icon name="ph:x" size="17" aria-hidden="true" />
      </button>
    </form>

    <div class="ml-auto flex min-w-0 items-center justify-end gap-2 min-[721px]:gap-3">
      <slot name="actions" />

      <button
        class="inline-grid size-11 min-w-11 place-items-center rounded-full border border-line bg-surface-strong text-ink shadow-panel-soft transition duration-150 hover:border-brand-400 hover:bg-brand-50 active:translate-y-px min-[721px]:size-[50px] min-[721px]:min-w-[50px]"
        type="button"
        :aria-label="theme === 'light' ? 'Utilizar tema escuro' : 'Utilizar tema claro'"
        @click="emit('toggleTheme')"
      >
        <Icon :name="theme === 'light' ? 'ph:moon' : 'ph:sun'" size="20" aria-hidden="true" />
      </button>

      <button
        class="relative hidden size-11 min-w-11 place-items-center rounded-full border border-line bg-surface-strong text-ink shadow-panel-soft transition duration-150 hover:border-brand-400 hover:bg-brand-50 active:translate-y-px min-[461px]:inline-grid min-[721px]:size-[50px] min-[721px]:min-w-[50px]"
        type="button"
        :aria-label="notificationCount ? `Abrir ${notificationCount} notificações` : 'Abrir notificações'"
        @click="emit('openNotifications')"
      >
        <Icon name="ph:bell" size="20" aria-hidden="true" />
        <span
          v-if="notificationCount"
          class="absolute -top-0.5 -right-0.5 grid min-h-5 min-w-5 place-items-center rounded-full bg-danger px-1 text-[0.65rem] font-black leading-none text-white ring-2 ring-canvas"
          aria-hidden="true"
        >{{ notificationCount > 99 ? '99+' : notificationCount }}</span>
      </button>

      <div class="flex min-w-0 items-center gap-2.5" role="group" :aria-label="userRole ? `${userName}, ${userRole}` : userName">
        <div class="grid size-12 shrink-0 place-items-center rounded-full border border-line bg-surface-strong p-1 shadow-panel-soft min-[721px]:size-[58px]">
          <div class="grid size-9 place-items-center overflow-hidden rounded-full bg-brand-100 text-[0.82rem] font-black text-brand-800 min-[721px]:size-[42px]">
            <img v-if="userImage" class="size-full object-cover" :src="userImage" :alt="userName">
            <span v-else aria-hidden="true">{{ initials }}</span>
          </div>
        </div>
        <div class="hidden min-w-0 2xl:block">
          <p class="m-0 max-w-44 overflow-hidden text-sm font-bold text-ellipsis whitespace-nowrap">{{ userName }}</p>
          <p v-if="userRole" class="m-0 mt-0.5 max-w-44 overflow-hidden text-xs text-ellipsis whitespace-nowrap text-ink-soft">{{ userRole }}</p>
        </div>
      </div>
    </div>
  </header>
</template>
