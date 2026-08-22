<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth' })
useSeoMeta({ title: 'Dashboard', robots: 'noindex' })
</script>

<template>
  <DashboardWorkspace view="dashboard" />
</template>
