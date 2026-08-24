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
  if (props.trend === undefined || props.trend === 0) return 'bg-surface-muted text-ink-soft'
  return props.trend > 0
    ? 'bg-brand-100 text-brand-700'
    : 'bg-danger-soft text-danger'
})

const trendIcon = computed(() => {
  if (props.trend === undefined || props.trend === 0) return 'ph:minus'
  return props.trend > 0 ? 'ph:trend-up' : 'ph:trend-down'
})
</script>

<template>
  <article class="relative flex min-h-[190px] min-w-0 flex-col overflow-hidden rounded-surface bg-surface-strong p-4 min-[480px]:min-h-[210px] min-[480px]:p-5 min-[721px]:min-h-[230px] min-[721px]:p-6">
    <template v-if="loading">
      <div class="flex items-start justify-between gap-4">
        <SkeletonLoader class="max-w-28" height="0.8rem" />
        <SkeletonLoader variant="circle" width="2.75rem" height="2.75rem" />
      </div>
      <SkeletonLoader class="mt-auto max-w-32" height="2.5rem" />
      <SkeletonLoader class="mt-5 max-w-44" height="1.7rem" />
    </template>

    <template v-else>
      <Icon
        class="pointer-events-none absolute -top-5 -right-5 text-ink/[0.035]"
        :name="icon"
        size="132"
        aria-hidden="true"
      />

      <div class="relative z-10 flex items-start justify-between gap-4">
        <p class="m-0 min-w-0 overflow-hidden pt-1 text-sm font-normal tracking-[0.075em] text-ellipsis whitespace-nowrap text-ink uppercase" :title="label">{{ label }}</p>
        <span :class="['grid size-12 shrink-0 place-items-center rounded-xl', toneClasses[tone]]">
          <Icon :name="icon" size="22" aria-hidden="true" />
        </span>
      </div>

      <p class="relative z-10 mt-auto mb-0 font-header text-[clamp(1.85rem,2.6vw,2.3rem)] font-black leading-none tracking-[-0.045em] text-ink">
        {{ value }}
      </p>

      <div v-if="helper || trend !== undefined" class="relative z-10 mt-4 flex min-w-0 items-center gap-1.5 text-[clamp(0.7rem,0.9vw,0.875rem)] whitespace-nowrap min-[480px]:mt-5">
        <span
          v-if="trend !== undefined"
          :class="['inline-flex min-h-7 shrink-0 items-center gap-1 rounded-full px-2.5 font-extrabold', trendTone]"
          :aria-label="trendLabel || undefined"
        >
          <Icon :name="trendIcon" size="15" aria-hidden="true" />
          {{ trend > 0 ? '+' : trend < 0 ? '-' : '' }}{{ Math.abs(trend) }}%
        </span>
        <span v-if="helper" class="min-w-0 overflow-hidden font-medium text-ellipsis whitespace-nowrap text-ink-soft" :title="helper">{{ helper }}</span>
      </div>
    </template>
  </article>
</template>
