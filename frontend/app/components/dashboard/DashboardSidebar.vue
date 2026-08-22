<script setup lang="ts">
import { dashboardNavigation } from '~/data/school'

const route = useRoute()
const sidebarOpen = useState<boolean>('dashboard-sidebar-open', () => false)
const { user, logout } = useAuth()
const { uploadUrl } = useApi()

const activeSlug = computed(() => {
  const value = route.params.view
  if (Array.isArray(value)) return value[0] || 'dashboard'
  return value || 'dashboard'
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

const close = () => {
  sidebarOpen.value = false
}

const handleLogout = async () => {
  logout()
  await navigateTo('/')
}

watch(() => route.fullPath, close)
</script>

<template>
  <button
    class="sidebar-backdrop"
    :class="{ 'is-open': sidebarOpen }"
    type="button"
    aria-label="Fechar navegação do painel"
    @click="close"
  />
  <aside class="dashboard-sidebar" :class="{ 'is-open': sidebarOpen }">
    <div class="dashboard-sidebar__head">
      <NuxtLink class="brand" to="/dashboard" @click="close">
        <BrandLogo />
        <span>Lusivo</span>
      </NuxtLink>
    </div>

    <nav class="dashboard-sidebar__nav" aria-label="Navegação do painel">
      <NuxtLink
        v-for="item in dashboardNavigation"
        :key="item.slug"
        :to="item.slug === 'dashboard' ? '/dashboard' : `/dashboard/${item.slug}`"
        :class="{ 'is-active': activeSlug === item.slug }"
      >
        <Icon :name="item.icon" aria-hidden="true" />
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>

    <div class="dashboard-sidebar__footer">
      <div class="dashboard-user">
        <div class="avatar">
          <img v-if="user?.image" :src="uploadUrl(user.image)" :alt="userName">
          <span v-else>{{ initials }}</span>
        </div>
        <div>
          <strong>{{ userName }}</strong>
          <span>{{ user?.role || 'Conta escolar' }}</span>
        </div>
      </div>
      <button class="button button--ghost" type="button" style="width: 100%" @click="handleLogout">
        <Icon name="ph:sign-out" size="19" aria-hidden="true" />
        Terminar sessão
      </button>
    </div>
  </aside>
</template>
