<script setup lang="ts">
import type { DashboardAlert, DashboardEvent } from '~/types/dashboard'

const props = withDefaults(defineProps<{
  events: DashboardEvent[]
  alerts: DashboardAlert[]
  messageCount?: number
}>(), {
  messageCount: 0,
})

const emit = defineEmits<{
  calendar: []
  eventsMenu: []
  markRead: []
  alertAction: [id: string]
}>()

const unreadCount = computed(() => props.alerts.filter(alert => alert.unread).length)

const dateToneClasses = {
  navy: 'bg-navy-900 text-white',
  brand: 'bg-brand-500 text-brand-variation',
} as const

const alertIconClasses = {
  brand: 'bg-brand-100 text-brand-700',
  neutral: 'bg-line/75 text-ink',
} as const
</script>

<template>
  <div class="grid min-w-0 gap-3 min-[641px]:gap-4 min-[1360px]:grid-cols-2">
    <DashboardSection class="h-full" title="Próximos Eventos" title-weight="semibold" :elevated="false" :bordered="false">
      <template #actions>
        <button
          class="grid size-11 place-items-center rounded-lg border-0 bg-transparent text-ink-soft transition hover:bg-surface-muted hover:text-ink active:translate-y-px min-[1280px]:size-14 min-[1600px]:size-15"
          type="button"
          aria-label="Abrir opções dos próximos eventos"
          @click="emit('eventsMenu')"
        >
          <Icon name="ph:dots-three-vertical" size="24" aria-hidden="true" />
        </button>
      </template>

      <ul class="grid gap-3" aria-label="Próximos eventos da escola">
        <li
          v-for="event in events"
          :key="event.id"
          class="grid min-w-0 grid-cols-1 items-start gap-3 rounded-xl border border-line bg-surface-muted/55 p-3 min-[360px]:grid-cols-[4rem_minmax(0,1fr)] min-[360px]:items-center min-[480px]:grid-cols-[4.25rem_minmax(0,1fr)] min-[480px]:gap-4 min-[480px]:p-4"
        >
          <time
            :class="[
              'grid size-16 shrink-0 place-content-center rounded-xl text-center min-[480px]:size-[4.25rem]',
              dateToneClasses[event.tone || 'navy'],
            ]"
            :datetime="event.date"
          >
            <span class="text-[0.65rem] font-medium leading-none tracking-[0.06em] uppercase">{{ event.month }}</span>
            <strong class="mt-1 font-header text-2xl font-bold leading-none">{{ event.day }}</strong>
          </time>

          <div class="min-w-0">
            <StatusBadge
              :label="event.category"
              :tone="event.tone === 'brand' ? 'brand' : 'neutral'"
            />
            <h3 class="mt-2 mb-0 text-base font-semibold text-ink">{{ event.title }}</h3>
            <div class="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-soft">
              <span class="inline-flex items-center gap-1.5 whitespace-nowrap">
                <Icon name="ph:clock" size="18" aria-hidden="true" />
                {{ event.time }}
              </span>
              <span aria-hidden="true">•</span>
              <span class="inline-flex min-w-0 items-center gap-1.5">
                <Icon class="shrink-0" name="ph:map-pin" size="18" aria-hidden="true" />
                <span>{{ event.location }}</span>
              </span>
            </div>
          </div>
        </li>
      </ul>

      <button
        class="button button--secondary mt-5 min-h-12 w-full px-3 text-sm font-medium min-[480px]:mt-6 min-[480px]:min-h-14 min-[480px]:px-4 min-[480px]:text-base min-[1600px]:min-h-15"
        type="button"
        @click="emit('calendar')"
      >
        Ver Calendário Completo
      </button>
    </DashboardSection>

    <DashboardSection class="h-full" title="Alertas Recentes" title-weight="semibold" :elevated="false" :bordered="false">
      <template #actions>
        <StatusBadge :label="`${unreadCount} ${unreadCount === 1 ? 'Novo' : 'Novos'}`" tone="danger" />
        <StatusBadge :label="`${messageCount} ${messageCount === 1 ? 'Mensagem' : 'Mensagens'}`" tone="neutral" icon="ph:envelope-simple" />
        <button
          class="min-h-11 rounded-lg border-0 bg-transparent px-2 text-xs font-bold tracking-[0.08em] whitespace-nowrap text-brand-600 uppercase transition hover:bg-brand-50 hover:text-brand-800 disabled:cursor-default disabled:opacity-45 min-[1280px]:min-h-14 min-[1600px]:min-h-15"
          type="button"
          :disabled="unreadCount === 0"
          @click="emit('markRead')"
        >
          Marcar lidos
        </button>
      </template>

      <ul class="grid gap-3" aria-label="Alertas recentes da escola">
        <li
          v-for="alert in alerts"
          :key="alert.id"
          class="grid min-w-0 grid-cols-1 items-start gap-3 rounded-xl border border-line bg-surface-muted/55 p-3 min-[360px]:grid-cols-[2.5rem_minmax(0,1fr)] min-[480px]:grid-cols-[3rem_minmax(0,1fr)] min-[480px]:gap-4 min-[480px]:p-4"
        >
          <span
            :class="[
              'grid size-10 shrink-0 place-items-center rounded-full min-[480px]:size-12',
              alertIconClasses[alert.tone || 'neutral'],
            ]"
            aria-hidden="true"
          >
            <Icon class="size-5 min-[480px]:size-[25px]" :name="alert.icon" />
          </span>

          <div class="min-w-0 pt-0.5">
            <h3 class="m-0 flex min-w-0 items-center gap-2 text-sm font-semibold text-ink min-[480px]:text-base">
              <span class="min-w-0 break-words">{{ alert.title }}</span>
              <span v-if="alert.unread" class="size-2 shrink-0 rounded-full bg-brand-500">
                <span class="sr-only">Não lido</span>
              </span>
            </h3>
            <p class="mt-1.5 mb-0 text-sm leading-6 text-ink-soft">{{ alert.description }}</p>
            <button
              v-if="alert.actionLabel"
              class="mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-md border-0 bg-transparent p-0 text-xs font-bold tracking-[0.08em] text-brand-600 transition hover:text-brand-800 active:translate-y-px min-[1280px]:min-h-14 min-[1600px]:min-h-15"
              type="button"
              @click="emit('alertAction', alert.id)"
            >
              {{ alert.actionLabel }}
              <Icon name="ph:arrow-right" size="16" aria-hidden="true" />
            </button>
          </div>
        </li>
      </ul>
    </DashboardSection>
  </div>
</template>
