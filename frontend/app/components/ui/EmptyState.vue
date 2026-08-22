<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  description?: string
  icon?: string
  compact?: boolean
}>(), {
  description: '',
  icon: 'ph:tray',
  compact: false,
})
</script>

<template>
  <div :class="['mx-auto grid max-w-lg justify-items-center px-5 text-center', compact ? 'py-8' : 'py-14']" role="status">
    <span class="grid size-14 place-items-center rounded-2xl bg-surface-muted text-ink-soft">
      <Icon :name="icon" size="28" aria-hidden="true" />
    </span>
    <h3 class="mt-4 mb-0 text-lg font-extrabold text-ink">{{ title }}</h3>
    <p v-if="description" class="mt-2 mb-0 max-w-[46ch] text-sm leading-6 text-ink-soft">{{ description }}</p>
    <div v-if="$slots.actions" class="mt-5 flex flex-wrap justify-center gap-2.5">
      <slot name="actions" />
    </div>
  </div>
</template>
