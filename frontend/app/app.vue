<script setup lang="ts">
import logoUrl from '~/assets/logo.png'

const { initialiseTheme } = useTheme()
const { initialiseAuth } = useAuth()

onMounted(() => {
  initialiseTheme()
  initialiseAuth()
})

useHead({
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'icon', type: 'image/png', href: logoUrl }],
})
</script>

<template>
  <NuxtLoadingIndicator color="#18c1ae" :height="3" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
