<script setup lang="ts">
withDefaults(defineProps<{
  activeCount?: number
  clearLabel?: string
  sticky?: boolean
}>(), {
  activeCount: 0,
  clearLabel: 'Limpar filtros',
  sticky: false,
})

const emit = defineEmits<{
  clear: []
}>()
</script>

<template>
  <div
    :class="[
      'flex flex-col gap-3 rounded-xl border border-line bg-surface p-3 min-[641px]:flex-row min-[641px]:items-center',
      sticky && 'sticky top-24 z-20 shadow-panel-soft',
    ]"
    role="region"
    aria-label="Filtros da lista"
  >
    <div class="grid min-w-0 flex-1 grid-cols-1 gap-3 min-[721px]:grid-cols-[minmax(220px,1fr)_auto]">
      <slot />
    </div>

    <div class="flex shrink-0 flex-wrap items-center gap-2">
      <slot name="actions" />
      <button
        v-if="activeCount > 0"
        class="button button--ghost min-h-10 px-3 py-2 text-sm"
        type="button"
        @click="emit('clear')"
      >
        {{ clearLabel }}
        <span class="grid min-w-5 place-items-center rounded-full bg-surface-muted px-1.5 py-0.5 text-[0.7rem] font-black" aria-hidden="true">{{ activeCount }}</span>
      </button>
    </div>
  </div>
</template>
