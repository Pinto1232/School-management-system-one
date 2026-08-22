<script setup lang="ts">
import type { DashboardTone } from '~/types/dashboard'

const props = withDefaults(defineProps<{
  label: string
  value: string | number
  helper?: string
  icon?: string
  tone?: DashboardTone
  trend?: number
  trendLabel?: string
  loading?: boolean
}>(), {
  helper: '',
  icon: 'ph:chart-line',
  tone: 'brand',
  trend: undefined,
  trendLabel: '',
  loading: false,
})

const toneClasses: Record<DashboardTone, string> = {
  neutral: 'bg-surface-muted text-ink-soft',
  brand: 'bg-brand-100 text-brand-800',
  info: 'bg-navy-100 text-navy-700',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
}

const trendTone = computed(() => {
  if (props.trend === undefined || props.trend === 0) return 'text-ink-soft'
  return props.trend > 0 ? 'text-success' : 'text-danger'
})
</script>

<template>
  <article class="min-w-0 rounded-surface border border-line bg-surface-strong p-5 shadow-panel-soft">
    <template v-if="loading">
      <div class="flex items-start justify-between gap-4">
        <SkeletonLoader class="max-w-28" height="0.8rem" />
        <SkeletonLoader variant="circle" width="2.75rem" height="2.75rem" />
      </div>
      <SkeletonLoader class="mt-5 max-w-32" height="2.2rem" />
      <SkeletonLoader class="mt-3 max-w-44" height="0.75rem" />
    </template>

    <template v-else>
      <div class="flex items-start justify-between gap-4">
        <p class="m-0 text-sm font-bold text-ink-soft">{{ label }}</p>
        <span :class="['grid size-11 shrink-0 place-items-center rounded-xl', toneClasses[tone]]">
          <Icon :name="icon" size="22" aria-hidden="true" />
        </span>
      </div>

      <p class="mt-4 mb-0 font-header text-[clamp(1.75rem,3vw,2.35rem)] font-black leading-none tracking-[-0.04em] text-ink">
        {{ value }}
      </p>

      <div v-if="helper || trend !== undefined" class="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        <span v-if="trend !== undefined" :class="['inline-flex items-center gap-1 font-extrabold', trendTone]">
          <Icon :name="trend >= 0 ? 'ph:trend-up' : 'ph:trend-down'" size="15" aria-hidden="true" />
          {{ Math.abs(trend) }}%
          <span v-if="trendLabel" class="sr-only">{{ trendLabel }}</span>
        </span>
        <span v-if="helper" class="text-ink-soft">{{ helper }}</span>
      </div>
    </template>
  </article>
</template>
