<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
    showDetails?: boolean
  }>(),
  {
    title: 'Não foi possível apresentar este conteúdo',
    description: 'Algo correu mal ao carregar esta área. Pode tentar novamente ou voltar ao início em segurança.',
    showDetails: true,
  },
)

const emit = defineEmits<{
  error: [error: unknown]
}>()

const titleId = useId()

const getErrorMessage = (error: unknown) => {
  const message = error instanceof Error
    ? error.message
    : typeof error === 'string'
      ? error
      : 'Não foram fornecidos detalhes adicionais.'

  const normalisedMessage = message.replace(/\s+/g, ' ').trim()

  if (!normalisedMessage) {
    return 'Não foram fornecidos detalhes adicionais.'
  }

  return normalisedMessage.length > 320
    ? `${normalisedMessage.slice(0, 320)}…`
    : normalisedMessage
}

const handleError = (error: unknown) => {
  emit('error', error)
}

const goHome = async (clearError: () => void) => {
  clearError()
  await navigateTo('/')
}
</script>

<template>
  <NuxtErrorBoundary @error="handleError">
    <slot />

    <template #error="{ error, clearError }">
      <main class="error-boundary">
        <section
          class="error-boundary__card"
          role="alert"
          aria-live="assertive"
          :aria-labelledby="titleId"
        >
          <div class="error-boundary__icon" aria-hidden="true">
            <Icon name="ph:warning-diamond-fill" />
          </div>

          <div class="error-boundary__content">
            <span class="eyebrow">Ocorreu um erro</span>
            <h1 :id="titleId">{{ title }}</h1>
            <p>{{ description }}</p>

            <details v-if="showDetails" class="error-boundary__details">
              <summary>
                <Icon name="ph:info" aria-hidden="true" />
                Ver detalhes do erro
              </summary>
              <code>{{ getErrorMessage(error) }}</code>
            </details>

            <div class="error-boundary__actions">
              <button class="button button--primary" type="button" @click="clearError">
                <Icon name="ph:arrow-clockwise-bold" aria-hidden="true" />
                Tentar novamente
              </button>
              <button class="button button--secondary" type="button" @click="goHome(clearError)">
                <Icon name="ph:house-bold" aria-hidden="true" />
                Voltar ao início
              </button>
            </div>
          </div>
        </section>
      </main>
    </template>
  </NuxtErrorBoundary>
</template>
