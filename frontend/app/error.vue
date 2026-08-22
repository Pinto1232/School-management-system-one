<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode?: number
    statusMessage?: string
  }
}>()

const isNotFound = computed(() => props.error.statusCode === 404)
const title = computed(() => isNotFound.value ? 'Página não encontrada' : 'Não foi possível abrir esta página')
const description = computed(() => isNotFound.value
  ? 'A página que procura não existe ou foi movida.'
  : 'Ocorreu um problema inesperado. Pode voltar ao início e tentar novamente.')

const returnHome = () => clearError({ redirect: '/' })

useSeoMeta({
  title: () => title.value,
  robots: 'noindex',
})

useHead({ htmlAttrs: { lang: 'pt' } })
</script>

<template>
  <NuxtLayout>
    <section class="section">
      <div class="container--narrow">
        <div class="panel empty-state">
          <Icon :name="isNotFound ? 'ph:map-trifold' : 'ph:warning-circle'" aria-hidden="true" />
          <span class="eyebrow">Erro {{ error.statusCode || 500 }}</span>
          <h1>{{ title }}</h1>
          <p>{{ description }}</p>
          <button class="button button--primary" type="button" @click="returnHome">
            Voltar ao início
          </button>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
