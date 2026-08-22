<script setup lang="ts">
import { dashboardNavigation, publicNavigation } from '~/data/school'

const route = useRoute()
const menuOpen = ref(false)
const searchQuery = ref('')
const searchMessage = ref('')
const { theme, toggleTheme } = useTheme()
const { user, isAuthenticated } = useAuth()
const { uploadUrl } = useApi()

const categoryNavigation = [
  { label: 'Student records', to: '/#student-records' },
  { label: 'Teaching tools', to: '/#teaching-tools' },
  { label: 'Family communication', to: '/#family-communication' },
  { label: 'Reports', to: '/#useful-reporting' },
  { label: 'Plans', to: '/#plans' },
]

const searchTargets = computed(() => {
  const publicTargets = [
    { label: 'Home', to: '/', keywords: 'home school overview' },
    { label: 'About', to: '/about', keywords: 'about school platform' },
    { label: 'FAQs', to: '/faq', keywords: 'faq questions help support' },
    ...categoryNavigation.map(item => ({
      ...item,
      keywords: item.label.toLowerCase(),
    })),
  ]

  if (!isAuthenticated.value) return publicTargets

  return [
    ...publicTargets,
    ...dashboardNavigation.map(item => ({
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
  if (!user.value) return 'School user'
  return `${user.value.firstName} ${user.value.lastName}`.trim()
})

const submitSearch = async () => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    searchMessage.value = 'Enter a page or feature to search for.'
    return
  }

  const match = searchTargets.value.find((item) => {
    const searchableText = `${item.label} ${item.keywords}`.toLowerCase()
    return searchableText.includes(query)
  })

  if (!match) {
    searchMessage.value = `No page found for ${searchQuery.value}.`
    return
  }

  searchMessage.value = `Opening ${match.label}.`
  searchQuery.value = ''
  menuOpen.value = false
  await navigateTo(match.to)
}

watch(() => route.fullPath, () => {
  menuOpen.value = false
  searchMessage.value = ''
})
</script>

<template>
  <header class="app-header">
    <div class="app-header__main">
      <div class="container app-header__inner">
        <NuxtLink class="brand" to="/" aria-label="Lusivo home">
          <BrandLogo />
          <span>Lusivo</span>
        </NuxtLink>

        <form class="header-search" role="search" @submit.prevent="submitSearch">
          <label class="sr-only" for="header-search">Search Lusivo</label>
          <input
            id="header-search"
            v-model="searchQuery"
            type="search"
            placeholder="Search"
            autocomplete="off"
          >
          <button type="submit" aria-label="Submit search">
            <Icon name="ph:magnifying-glass" size="23" aria-hidden="true" />
          </button>
        </form>

        <nav class="header-utility" aria-label="Helpful links">
          <NuxtLink to="/about">About</NuxtLink>
          <NuxtLink to="/#teaching-tools">For teachers</NuxtLink>
          <NuxtLink to="/#family-communication">For families</NuxtLink>
        </nav>

        <div class="header-actions">
          <NuxtLink v-if="isAuthenticated" class="header-dashboard-link" to="/dashboard">
            My school
          </NuxtLink>

          <NuxtLink
            v-if="isAuthenticated"
            class="icon-button header-alerts"
            to="/dashboard/events"
            aria-label="Open school events and alerts"
          >
            <Icon name="ph:bell" size="21" aria-hidden="true" />
          </NuxtLink>

          <button
            class="icon-button"
            type="button"
            :aria-label="theme === 'light' ? 'Use dark theme' : 'Use light theme'"
            @click="toggleTheme"
          >
            <Icon :name="theme === 'light' ? 'ph:moon' : 'ph:sun'" size="20" aria-hidden="true" />
          </button>

          <NuxtLink
            v-if="isAuthenticated"
            class="header-avatar"
            to="/dashboard"
            :aria-label="`Open ${userName}'s dashboard`"
          >
            <span class="avatar">
              <img v-if="user?.image" :src="uploadUrl(user.image)" :alt="userName">
              <span v-else aria-hidden="true">{{ initials }}</span>
            </span>
          </NuxtLink>

          <template v-else>
            <NuxtLink class="button button--secondary header-auth-button" to="/login">Log in</NuxtLink>
            <NuxtLink class="button button--primary header-auth-button" to="/register">Sign up</NuxtLink>
          </template>

          <button
            class="icon-button mobile-nav-button"
            type="button"
            :aria-label="menuOpen ? 'Close navigation' : 'Open navigation'"
            :aria-expanded="menuOpen"
            aria-controls="mobile-navigation"
            @click="menuOpen = !menuOpen"
          >
            <Icon :name="menuOpen ? 'ph:x' : 'ph:list'" size="22" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>

    <nav class="category-nav container" aria-label="Platform areas">
      <NuxtLink
        v-for="(item, index) in categoryNavigation"
        :key="item.to"
        :to="item.to"
        :class="{ 'is-current': route.fullPath === item.to || (index === 0 && route.path === '/' && !route.hash) }"
        :aria-current="route.fullPath === item.to || (index === 0 && route.path === '/' && !route.hash) ? 'page' : undefined"
      >
        <span>{{ item.label }}</span>
        <Icon v-if="index === 0" name="ph:caret-down-bold" size="15" aria-hidden="true" />
      </NuxtLink>
    </nav>

    <div id="mobile-navigation" class="mobile-nav" :class="{ 'is-open': menuOpen }">
      <form class="mobile-nav__search" role="search" @submit.prevent="submitSearch">
        <label class="sr-only" for="mobile-header-search">Search Lusivo</label>
        <input
          id="mobile-header-search"
          v-model="searchQuery"
          type="search"
          placeholder="Search"
          autocomplete="off"
        >
        <button type="submit" aria-label="Submit search">
          <Icon name="ph:magnifying-glass" size="21" aria-hidden="true" />
        </button>
      </form>

      <nav class="mobile-nav__links" aria-label="Mobile navigation">
        <NuxtLink v-for="item in publicNavigation" :key="item.to" :to="item.to">
          {{ item.label }}
        </NuxtLink>
        <NuxtLink v-for="item in categoryNavigation" :key="item.to" :to="item.to">
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="mobile-nav__account">
        <NuxtLink v-if="isAuthenticated" class="button button--primary" to="/dashboard">
          Open dashboard
        </NuxtLink>
        <template v-else>
          <NuxtLink class="button button--secondary" to="/login">Log in</NuxtLink>
          <NuxtLink class="button button--primary" to="/register">Sign up</NuxtLink>
        </template>
      </div>
    </div>

    <p class="sr-only" aria-live="polite">{{ searchMessage }}</p>
  </header>
</template>
