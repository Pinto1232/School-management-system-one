<script setup lang="ts">
import { useId } from 'vue'

const props = withDefaults(defineProps<{
  label?: string
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  compact?: boolean
}>(), {
  label: 'Pesquisar',
  placeholder: 'Pesquisar',
  disabled: false,
  loading: false,
  compact: false,
})

const emit = defineEmits<{
  submit: [query: string]
  clear: []
}>()

const model = defineModel<string>({ default: '' })
const inputId = `search-${useId()}`

const clear = () => {
  model.value = ''
  emit('clear')
}
</script>

<template>
  <div class="relative min-w-0">
    <label class="sr-only" :for="inputId">{{ label }}</label>
    <Icon class="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-ink-soft" name="ph:magnifying-glass" size="19" aria-hidden="true" />
    <input
      :id="inputId"
      v-model="model"
      :class="[
        'w-full rounded-control border border-line bg-surface-strong pr-11 pl-10 text-sm text-ink outline-none transition placeholder:text-ink/45 focus:border-brand-400 focus:ring-3 focus:ring-brand-400/15 disabled:cursor-not-allowed disabled:opacity-60',
        compact ? 'h-10' : 'h-11',
      ]"
      type="search"
      :placeholder="placeholder"
      :disabled="disabled"
      autocomplete="off"
      @keydown.enter="emit('submit', model.trim())"
    >
    <Icon v-if="loading" class="absolute top-1/2 right-3.5 -translate-y-1/2 animate-spin text-brand-700 motion-reduce:animate-none" name="ph:spinner-gap" size="18" aria-label="A pesquisar" />
    <button
      v-else-if="model"
      class="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-md border-0 bg-transparent text-ink-soft transition hover:bg-surface-muted hover:text-ink active:translate-y-[calc(-50%+1px)]"
      type="button"
      aria-label="Limpar pesquisa"
      @click="clear"
    >
      <Icon name="ph:x" size="17" aria-hidden="true" />
    </button>
  </div>
</template>
