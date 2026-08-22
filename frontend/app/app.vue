<script setup lang="ts">
const { initialiseTheme } = useTheme()
const { initialiseAuth } = useAuth()
const route = useRoute()

onMounted(() => {
  initialiseTheme()
  initialiseAuth()
})

useHead({
  htmlAttrs: { lang: 'pt' },
  link: [
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
    { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-192.png' },
  ],
})
</script>

<template>
  <NuxtLoadingIndicator color="#18c1ae" :height="3" />
  <AppErrorBoundary :key="route.path">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </AppErrorBoundary>
</template>
