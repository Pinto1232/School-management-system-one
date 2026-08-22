<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'text' | 'circle' | 'card' | 'table'
  width?: string
  height?: string
  rows?: number
}>(), {
  variant: 'text',
  width: '100%',
  height: '',
  rows: 1,
})

const resolvedHeight = computed(() => {
  if (props.height) return props.height
  if (props.variant === 'circle') return props.width
  if (props.variant === 'card') return '9rem'
  if (props.variant === 'table') return '2.75rem'
  return '1rem'
})
</script>

<template>
  <div class="grid gap-2.5" aria-hidden="true">
    <span
      v-for="row in rows"
      :key="row"
      :class="[
        'skeleton-loader__line block overflow-hidden bg-surface-muted',
        variant === 'circle' ? 'rounded-full' : variant === 'card' ? 'rounded-surface' : 'rounded-md',
      ]"
      :style="{
        width: row === rows && rows > 1 ? `min(${width}, 72%)` : width,
        height: resolvedHeight,
      }"
    />
  </div>
</template>

<style scoped>
@keyframes shimmer {
  to {
    transform: translateX(100%);
  }
}

.skeleton-loader__line::before {
  display: block;
  width: 100%;
  height: 100%;
  content: '';
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-surface-strong) 70%, transparent), transparent);
  animation: shimmer 1.6s infinite;
  transform: translateX(-100%);
}

@media (prefers-reduced-motion: reduce) {
  .skeleton-loader__line::before {
    animation: none;
  }
}
</style>
