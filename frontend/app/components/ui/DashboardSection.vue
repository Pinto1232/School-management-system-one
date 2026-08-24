<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  surface?: boolean
  flush?: boolean
  busy?: boolean
  elevated?: boolean
  bordered?: boolean
  titleWeight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
}>(), {
  title: '',
  description: '',
  surface: true,
  flush: false,
  busy: false,
  elevated: true,
  bordered: true,
  titleWeight: 'extrabold',
})

const titleWeightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
} as const
</script>

<template>
  <section
    :class="[
      'min-w-0',
      surface && 'rounded-surface bg-surface-strong',
      surface && bordered && 'border border-line',
      surface && elevated && 'shadow-panel-soft',
      surface && !flush && 'p-4 min-[721px]:p-6',
    ]"
    :aria-busy="busy || undefined"
  >
    <header v-if="title || description || $slots.actions" :class="['flex min-w-0 flex-col gap-4 min-[641px]:flex-row min-[641px]:flex-wrap min-[641px]:items-start min-[641px]:justify-between', flush && 'px-4 pt-4 min-[721px]:px-6 min-[721px]:pt-6']">
      <div class="min-w-0">
        <h2
          v-if="title"
          :class="['m-0 break-words text-lg tracking-[-0.02em] text-ink min-[721px]:text-xl', titleWeightClasses[titleWeight]]"
        >
          {{ title }}
        </h2>
        <p v-if="description" class="mt-1.5 mb-0 max-w-[65ch] text-sm leading-6 text-ink-soft">{{ description }}</p>
      </div>
      <div v-if="$slots.actions" class="flex min-w-0 max-w-full flex-wrap items-center gap-2 min-[641px]:ml-auto min-[641px]:justify-end">
        <slot name="actions" />
      </div>
    </header>

    <div :class="['min-w-0', (title || description || $slots.actions) && (flush ? 'mt-5' : 'mt-5')]">
      <slot />
    </div>
  </section>
</template>
