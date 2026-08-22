<script setup lang="ts">
const props = withDefaults(defineProps<{
  balance: number
  total?: number
  paid?: number
  currency?: string
  locale?: string
  dueDate?: string
  status?: 'paid' | 'due' | 'overdue' | 'partial'
  title?: string
  loading?: boolean
}>(), {
  total: 0,
  paid: 0,
  currency: 'ZAR',
  locale: 'pt-PT',
  dueDate: '',
  status: 'due',
  title: 'Saldo de propinas',
  loading: false,
})

const emit = defineEmits<{
  pay: []
  viewDetails: []
}>()

const formatter = computed(() => new Intl.NumberFormat(props.locale, {
  style: 'currency',
  currency: props.currency,
  maximumFractionDigits: 2,
}))

const formattedBalance = computed(() => formatter.value.format(props.balance))
const formattedPaid = computed(() => formatter.value.format(props.paid))
const formattedTotal = computed(() => formatter.value.format(props.total))
const paymentProgress = computed(() => props.total > 0 ? Math.min(100, Math.max(0, (props.paid / props.total) * 100)) : 0)

const statusContent = computed(() => {
  if (props.status === 'paid' || props.balance <= 0) return { label: 'Pago', tone: 'success' as const }
  if (props.status === 'overdue') return { label: 'Em atraso', tone: 'danger' as const }
  if (props.status === 'partial') return { label: 'Pagamento parcial', tone: 'warning' as const }
  return { label: 'Pagamento pendente', tone: 'neutral' as const }
})
</script>

<template>
  <article class="overflow-hidden rounded-surface border border-line bg-surface-strong shadow-panel-soft" :aria-busy="loading || undefined">
    <div class="flex items-start justify-between gap-4 border-b border-line p-5 min-[721px]:p-6">
      <div>
        <p class="m-0 text-sm font-bold text-ink-soft">{{ title }}</p>
        <template v-if="loading">
          <SkeletonLoader class="mt-3 w-44" height="2.25rem" />
        </template>
        <p v-else class="mt-2 mb-0 font-header text-[clamp(1.9rem,4vw,2.65rem)] font-black leading-none tracking-[-0.04em] text-ink">{{ formattedBalance }}</p>
      </div>
      <span class="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-800">
        <Icon name="ph:wallet" size="24" aria-hidden="true" />
      </span>
    </div>

    <div class="p-5 min-[721px]:p-6">
      <template v-if="loading">
        <SkeletonLoader :rows="3" />
      </template>

      <template v-else>
        <div class="flex flex-wrap items-center justify-between gap-3">
          <StatusBadge :label="statusContent.label" :tone="statusContent.tone" />
          <p v-if="dueDate && statusContent.tone !== 'success'" class="m-0 text-xs font-semibold text-ink-soft">Prazo: {{ dueDate }}</p>
        </div>

        <div v-if="total > 0" class="mt-5">
          <div class="mb-2 flex items-center justify-between gap-3 text-xs text-ink-soft">
            <span>Pago: <strong class="text-ink">{{ formattedPaid }}</strong></span>
            <span>Total: <strong class="text-ink">{{ formattedTotal }}</strong></span>
          </div>
          <div class="h-2 overflow-hidden rounded-full bg-surface-muted" role="progressbar" aria-label="Progresso do pagamento" :aria-valuenow="Math.round(paymentProgress)" aria-valuemin="0" aria-valuemax="100">
            <div class="h-full rounded-full bg-brand-600" :style="{ width: `${paymentProgress}%` }" />
          </div>
        </div>

        <div class="mt-6 flex flex-col gap-2 min-[421px]:flex-row">
          <slot name="actions">
            <button v-if="statusContent.tone !== 'success'" class="button button--primary flex-1" type="button" @click="emit('pay')">
              <Icon name="ph:credit-card" size="18" aria-hidden="true" />
              Efetuar pagamento
            </button>
            <button class="button button--secondary flex-1" type="button" @click="emit('viewDetails')">Ver movimentos</button>
          </slot>
        </div>
      </template>
    </div>
  </article>
</template>
