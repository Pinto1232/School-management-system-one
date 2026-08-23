<script setup lang="ts">
import logoDarkUrl from '~/assets/logo-transparent-dark.png'
import logoLightUrl from '~/assets/logo-transparent.png'
</script>

<template>
  <span class="brand-logo" aria-hidden="true">
    <img class="brand-logo__image brand-logo__image--light" :src="logoLightUrl" alt="">
    <img class="brand-logo__image brand-logo__image--dark" :src="logoDarkUrl" alt="">
  </span>
</template>
