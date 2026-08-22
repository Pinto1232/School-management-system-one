<script setup lang="ts">
const { initialiseTheme } = useTheme()
const { initialiseAuth } = useAuth()

onMounted(() => {
  initialiseTheme()
  initialiseAuth()
})

useHead({ htmlAttrs: { lang: 'en' } })
</script>

<template>
  <NuxtLoadingIndicator color="#0f766e" :height="3" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
