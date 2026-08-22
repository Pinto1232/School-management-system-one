<script setup lang="ts">
import type { DashboardTone } from '~/types/dashboard'

const props = withDefaults(defineProps<{
  label: string
  tone?: DashboardTone | 'auto'
  icon?: string
}>(), {
  tone: 'auto',
  icon: '',
})

const inferredTone = computed<DashboardTone>(() => {
  if (props.tone !== 'auto') return props.tone

  const value = props.label.toLocaleLowerCase('pt-PT')
  if (/(ativo|presente|pago|conclu|aprovado|aberta)/.test(value)) return 'success'
  if (/(pendente|atrasado|revisão|rascunho|licença)/.test(value)) return 'warning'
  if (/(inativo|ausente|vencido|cancelado|rejeitado)/.test(value)) return 'danger'
  if (/(informação|agendado|justificado)/.test(value)) return 'info'
  return 'neutral'
})

const toneClasses: Record<DashboardTone, string> = {
  neutral: 'border-line bg-surface-muted text-ink-soft',
  brand: 'border-brand-200 bg-brand-100 text-brand-800',
  info: 'border-navy-200 bg-navy-100 text-navy-700',
  success: 'border-success/20 bg-success-soft text-success',
  warning: 'border-warning/20 bg-warning-soft text-warning',
  danger: 'border-danger/20 bg-danger-soft text-danger',
}
</script>

<template>
  <span :class="['inline-flex min-h-7 max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-extrabold leading-none', toneClasses[inferredTone]]">
    <Icon v-if="icon" :name="icon" size="14" aria-hidden="true" />
    <span class="overflow-hidden text-ellipsis whitespace-nowrap">{{ label }}</span>
  </span>
</template>
