<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  description?: string
  backTo?: string
  backLabel?: string
}>(), {
  description: '',
  backTo: '',
  backLabel: 'Voltar',
})
</script>

<template>
  <header class="mb-6 flex flex-col gap-5 min-[721px]:mb-8 min-[721px]:flex-row min-[721px]:items-end min-[721px]:justify-between">
    <div class="min-w-0 max-w-3xl">
      <NuxtLink
        v-if="backTo"
        class="mb-3 inline-flex min-h-9 items-center gap-2 rounded-control text-sm font-bold text-ink-soft transition hover:text-brand-700 active:translate-y-px"
        :to="backTo"
      >
        <Icon name="ph:arrow-left" size="18" aria-hidden="true" />
        {{ backLabel }}
      </NuxtLink>
      <h2 class="m-0 text-[clamp(1.75rem,3vw,2.55rem)] font-black tracking-[-0.035em] text-ink">
        {{ title }}
      </h2>
      <p v-if="description" class="mt-2 mb-0 max-w-[65ch] text-sm leading-6 text-ink-soft min-[721px]:text-base">
        {{ description }}
      </p>
      <slot name="meta" />
    </div>

    <div v-if="$slots.actions" class="flex shrink-0 flex-wrap items-center gap-2.5">
      <slot name="actions" />
    </div>
  </header>
</template>
