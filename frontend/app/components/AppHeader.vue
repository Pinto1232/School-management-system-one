<script setup lang="ts">
import { publicNavigation } from '~/data/school'

const route = useRoute()
const menuOpen = ref(false)
const { theme, toggleTheme } = useTheme()
const { isAuthenticated } = useAuth()

watch(() => route.fullPath, () => {
  menuOpen.value = false
})
</script>

<template>
  <header class="app-header">
    <div class="container app-header__inner">
      <NuxtLink class="brand" to="/" aria-label="School System home">
        <img src="/images/logo-96.png" alt="" width="42" height="42">
        <span>School System</span>
      </NuxtLink>

      <nav class="primary-nav" aria-label="Primary navigation">
        <NuxtLink v-for="item in publicNavigation" :key="item.to" :to="item.to">
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="header-actions">
        <button
          class="icon-button"
          type="button"
          :aria-label="theme === 'light' ? 'Use dark theme' : 'Use light theme'"
          @click="toggleTheme"
        >
          <Icon :name="theme === 'light' ? 'ph:moon' : 'ph:sun'" size="20" aria-hidden="true" />
        </button>

        <NuxtLink v-if="isAuthenticated" class="button button--secondary" to="/dashboard">
          Dashboard
        </NuxtLink>
        <template v-else>
          <NuxtLink class="button button--secondary" to="/login">Log in</NuxtLink>
          <NuxtLink class="button button--primary" to="/register">Sign up</NuxtLink>
        </template>

        <button
          class="icon-button mobile-nav-button"
          type="button"
          aria-label="Toggle navigation"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          <Icon :name="menuOpen ? 'ph:x' : 'ph:list'" size="22" aria-hidden="true" />
        </button>
      </div>
    </div>

    <nav class="mobile-nav" :class="{ 'is-open': menuOpen }" aria-label="Mobile navigation">
      <NuxtLink v-for="item in publicNavigation" :key="item.to" :to="item.to">
        {{ item.label }}
      </NuxtLink>
      <NuxtLink :to="isAuthenticated ? '/dashboard' : '/login'">
        {{ isAuthenticated ? 'Dashboard' : 'Log in' }}
      </NuxtLink>
    </nav>
  </header>
</template>
