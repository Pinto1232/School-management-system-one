<script setup lang="ts">
import { dashboardNavigationForRoles, publicNavigation } from '~/data/school'

const route = useRoute()
const menuOpen = ref(false)
const searchQuery = ref('')
const searchMessage = ref('')
const { theme, toggleTheme } = useTheme()
const { user, isAuthenticated, roles } = useAuth()
const { uploadUrl } = useApi()
const { cartItem, initialiseCart } = useSchoolCart()

const cartRoute = computed(() => cartItem.value ? '/cart' : '/#plans')
const cartLabel = computed(() => cartItem.value
  ? `Abrir carrinho, pacote ${cartItem.value.name} selecionado`
  : 'O carrinho está vazio, escolha um pacote')

const categoryNavigation = [
  { label: 'Planos', to: '/#plans' },
  { label: 'Gestão escolar', to: '/#gestao-escolar' },
  { label: 'Gestão académica', to: '/#gestao-academica' },
  { label: 'Comunicação', to: '/#comunicacao' },
  { label: 'Finanças', to: '/#financas' },
  { label: 'Relatórios', to: '/#relatorios' },
]

const isCurrentCategory = (to: string) => {
  const [path, hash] = to.split('#')
  return route.path === (path || '/') && route.hash === (hash ? `#${hash}` : '')
}

const searchTargets = computed(() => {
  const publicTargets = [
    { label: 'Início', to: '/', keywords: 'início escola visão geral' },
    { label: 'Sobre', to: '/about', keywords: 'sobre escola plataforma' },
    { label: 'Perguntas frequentes', to: '/faq', keywords: 'perguntas ajuda suporte' },
    ...categoryNavigation.map(item => ({
      ...item,
      keywords: item.label.toLowerCase(),
    })),
  ]

  if (!isAuthenticated.value) return publicTargets

  return [
    ...publicTargets,
    ...dashboardNavigationForRoles(roles.value).map(item => ({
      label: item.label,
      to: item.slug === 'dashboard' ? '/dashboard' : `/dashboard/${item.slug}`,
      keywords: `${item.label} dashboard`.toLowerCase(),
    })),
  ]
})

const initials = computed(() => {
  const first = user.value?.firstName?.[0] || 'S'
  const last = user.value?.lastName?.[0] || 'U'
  return `${first}${last}`.toUpperCase()
})

const userName = computed(() => {
  if (!user.value) return 'Utilizador da escola'
  return `${user.value.firstName} ${user.value.lastName}`.trim()
})

const submitSearch = async () => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    searchMessage.value = 'Introduza uma página ou funcionalidade para pesquisar.'
    return
  }

  const match = searchTargets.value.find((item) => {
    const searchableText = `${item.label} ${item.keywords}`.toLowerCase()
    return searchableText.includes(query)
  })

  if (!match) {
    searchMessage.value = `Não foi encontrada nenhuma página para ${searchQuery.value}.`
    return
  }

  searchMessage.value = `A abrir ${match.label}.`
  searchQuery.value = ''
  menuOpen.value = false
  await navigateTo(match.to)
}

watch(() => route.fullPath, () => {
  menuOpen.value = false
  searchMessage.value = ''
})

onMounted(initialiseCart)
</script>

<template>
  <header class="app-header">
    <div class="app-header__main">
      <div class="container app-header__inner">
        <NuxtLink class="brand" to="/" aria-label="Página inicial da Lusivo">
          <BrandLogo />
          <span>Lusivo</span>
        </NuxtLink>

        <form class="header-search" role="search" @submit.prevent="submitSearch">
          <label class="sr-only" for="header-search">Pesquisar na Lusivo</label>
          <input
            id="header-search"
            v-model="searchQuery"
            type="search"
            placeholder="Pesquisar"
            autocomplete="off"
          >
          <button type="submit" aria-label="Iniciar pesquisa">
            <Icon name="ph:magnifying-glass" size="23" aria-hidden="true" />
          </button>
        </form>

        <nav class="header-utility" aria-label="Ligações úteis">
          <NuxtLink to="/about">Sobre</NuxtLink>
          <NuxtLink to="/faq">Perguntas frequentes</NuxtLink>
        </nav>

        <div class="header-actions">
          <NuxtLink v-if="isAuthenticated" class="header-dashboard-link" to="/dashboard">
            Minha escola
          </NuxtLink>

          <NuxtLink
            v-if="isAuthenticated"
            class="icon-button header-alerts"
            to="/dashboard/events"
            aria-label="Abrir eventos e alertas da escola"
          >
            <Icon name="ph:bell" size="21" aria-hidden="true" />
          </NuxtLink>

          <NuxtLink
            class="icon-button header-cart-button"
            :class="{ 'has-items': cartItem }"
            :to="cartRoute"
            :aria-label="cartLabel"
          >
            <Icon :name="cartItem ? 'ph:shopping-cart-simple-fill' : 'ph:shopping-cart-simple'" size="21" aria-hidden="true" />
            <span v-if="cartItem" class="header-cart-count" aria-hidden="true">1</span>
          </NuxtLink>

          <button
            class="icon-button"
            type="button"
            :aria-label="theme === 'light' ? 'Utilizar tema escuro' : 'Utilizar tema claro'"
            @click="toggleTheme"
          >
            <Icon :name="theme === 'light' ? 'ph:moon' : 'ph:sun'" size="20" aria-hidden="true" />
          </button>

          <NuxtLink
            v-if="isAuthenticated"
            class="header-avatar"
            to="/dashboard"
            :aria-label="`Abrir o painel de ${userName}`"
          >
            <span class="avatar">
              <img v-if="user?.image" :src="uploadUrl(user.image)" :alt="userName">
              <span v-else aria-hidden="true">{{ initials }}</span>
            </span>
          </NuxtLink>

          <template v-else>
            <NuxtLink class="button button--secondary header-auth-button" to="/login">Iniciar sessão</NuxtLink>
            <NuxtLink class="button button--primary header-auth-button" to="/register">Criar conta</NuxtLink>
          </template>

          <button
            class="icon-button mobile-nav-button"
            type="button"
            :aria-label="menuOpen ? 'Fechar navegação' : 'Abrir navegação'"
            :aria-expanded="menuOpen"
            aria-controls="mobile-navigation"
            @click="menuOpen = !menuOpen"
          >
            <Icon :name="menuOpen ? 'ph:x' : 'ph:list'" size="22" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>

    <nav class="category-nav container" aria-label="Áreas da plataforma">
      <NuxtLink
        v-for="item in categoryNavigation"
        :key="item.to"
        :to="item.to"
        :class="{ 'is-current': isCurrentCategory(item.to) }"
        :aria-current="isCurrentCategory(item.to) ? 'page' : undefined"
      >
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>

    <div id="mobile-navigation" class="mobile-nav" :class="{ 'is-open': menuOpen }">
      <form class="mobile-nav__search" role="search" @submit.prevent="submitSearch">
        <label class="sr-only" for="mobile-header-search">Pesquisar na Lusivo</label>
        <input
          id="mobile-header-search"
          v-model="searchQuery"
          type="search"
          placeholder="Pesquisar"
          autocomplete="off"
        >
        <button type="submit" aria-label="Iniciar pesquisa">
          <Icon name="ph:magnifying-glass" size="21" aria-hidden="true" />
        </button>
      </form>

      <nav class="mobile-nav__links" aria-label="Navegação móvel">
        <NuxtLink v-for="item in publicNavigation" :key="item.to" :to="item.to">
          {{ item.label }}
        </NuxtLink>
        <NuxtLink v-for="item in categoryNavigation" :key="item.to" :to="item.to">
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="mobile-nav__account">
        <NuxtLink v-if="isAuthenticated" class="button button--primary" to="/dashboard">
          Abrir painel
        </NuxtLink>
        <template v-else>
          <NuxtLink class="button button--secondary" to="/login">Iniciar sessão</NuxtLink>
          <NuxtLink class="button button--primary" to="/register">Criar conta</NuxtLink>
        </template>
      </div>
    </div>

    <p class="sr-only" aria-live="polite">{{ searchMessage }}</p>
    <p class="sr-only" aria-live="polite">
      {{ cartItem ? `O pacote ${cartItem.name} foi adicionado ao carrinho.` : 'O carrinho está vazio.' }}
    </p>
  </header>
</template>
