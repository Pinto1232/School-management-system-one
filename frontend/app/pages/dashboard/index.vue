<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth' })
useSeoMeta({ title: 'Painel', robots: 'noindex' })
</script>

<template>
  <DashboardWorkspace view="dashboard" />
</template>
