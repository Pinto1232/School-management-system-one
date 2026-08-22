<script setup lang="ts">
import type { DashboardTone, TimetableDay, TimetableEntry } from '~/types/dashboard'

const props = withDefaults(defineProps<{
  days: TimetableDay[]
  entries: TimetableEntry[]
  loading?: boolean
  emptyTitle?: string
}>(), {
  loading: false,
  emptyTitle: 'Sem aulas agendadas',
})

const times = computed(() => [...new Set(props.entries.map(entry => entry.start))].sort((a, b) => a.localeCompare(b)))

const entryFor = (day: string, time: string) => props.entries.find(entry => entry.day === day && entry.start === time)
const entriesForDay = (day: string) => props.entries.filter(entry => entry.day === day).sort((a, b) => a.start.localeCompare(b.start))

const toneClasses: Record<DashboardTone, string> = {
  neutral: 'border-line bg-surface text-ink',
  brand: 'border-brand-200 bg-brand-100 text-brand-800',
  info: 'border-navy-200 bg-navy-100 text-navy-700',
  success: 'border-success/20 bg-success-soft text-success',
  warning: 'border-warning/20 bg-warning-soft text-warning',
  danger: 'border-danger/20 bg-danger-soft text-danger',
}
</script>

<template>
  <div class="min-w-0" :aria-busy="loading || undefined">
    <div v-if="loading" class="grid gap-3 rounded-surface border border-line bg-surface-strong p-4">
      <SkeletonLoader v-for="row in 4" :key="row" variant="table" />
    </div>

    <EmptyState v-else-if="!entries.length" :title="emptyTitle" description="As aulas aparecerão aqui quando o horário for publicado." icon="ph:calendar-blank" />

    <template v-else>
      <div
        class="hidden min-w-[860px] overflow-hidden rounded-surface border border-line bg-surface-strong min-[1281px]:grid"
        :style="{ gridTemplateColumns: `88px repeat(${days.length}, minmax(145px, 1fr))` }"
        role="table"
        aria-label="Horário semanal"
      >
        <div class="[display:contents]" role="row">
          <div class="border-r border-b border-line bg-surface p-3 text-xs font-extrabold text-ink-soft" role="columnheader">Hora</div>
          <div v-for="day in days" :key="day.key" class="border-r border-b border-line bg-surface p-3 last:border-r-0" role="columnheader">
            <strong class="block text-sm text-ink">{{ day.label }}</strong>
            <span v-if="day.date" class="mt-0.5 block text-xs font-normal text-ink-soft">{{ day.date }}</span>
          </div>
        </div>

        <div v-for="time in times" :key="time" class="[display:contents]" role="row">
          <div class="border-r border-b border-line bg-surface/60 p-3 text-xs font-bold text-ink-soft last:border-b-0" role="rowheader">{{ time }}</div>
          <div v-for="day in days" :key="`${day.key}-${time}`" class="min-h-28 border-r border-b border-line p-2.5 last:border-r-0" role="cell">
            <article v-if="entryFor(day.key, time)" :class="['h-full rounded-xl border p-3', toneClasses[entryFor(day.key, time)?.tone || 'neutral']]">
              <p class="m-0 text-sm font-extrabold leading-5">{{ entryFor(day.key, time)?.title }}</p>
              <p v-if="entryFor(day.key, time)?.subtitle" class="mt-1 mb-0 text-xs leading-5 opacity-80">{{ entryFor(day.key, time)?.subtitle }}</p>
              <p v-if="entryFor(day.key, time)?.room" class="mt-2 mb-0 inline-flex items-center gap-1 text-xs font-bold opacity-80">
                <Icon name="ph:map-pin" size="13" aria-hidden="true" />
                {{ entryFor(day.key, time)?.room }}
              </p>
            </article>
            <span v-else class="sr-only">Sem aula</span>
          </div>
        </div>
      </div>

      <div class="grid gap-4 min-[1281px]:hidden">
        <section v-for="day in days" :key="day.key" class="overflow-hidden rounded-surface border border-line bg-surface-strong">
          <header class="border-b border-line bg-surface px-4 py-3">
            <h3 class="m-0 text-base font-extrabold text-ink">{{ day.label }}</h3>
            <p v-if="day.date" class="mt-0.5 mb-0 text-xs text-ink-soft">{{ day.date }}</p>
          </header>
          <div v-if="entriesForDay(day.key).length" class="grid gap-2.5 p-3">
            <article v-for="entry in entriesForDay(day.key)" :key="entry.id" :class="['grid grid-cols-[64px_1fr] gap-3 rounded-xl border p-3', toneClasses[entry.tone || 'neutral']]">
              <div>
                <strong class="block text-sm">{{ entry.start }}</strong>
                <span v-if="entry.end" class="mt-0.5 block text-xs opacity-75">{{ entry.end }}</span>
              </div>
              <div class="min-w-0">
                <h4 class="m-0 text-sm font-extrabold">{{ entry.title }}</h4>
                <p v-if="entry.subtitle" class="mt-1 mb-0 text-xs leading-5 opacity-80">{{ entry.subtitle }}</p>
                <p v-if="entry.room" class="mt-1.5 mb-0 inline-flex items-center gap-1 text-xs font-bold opacity-80">
                  <Icon name="ph:map-pin" size="13" aria-hidden="true" />
                  {{ entry.room }}
                </p>
              </div>
            </article>
          </div>
          <p v-else class="m-0 px-4 py-5 text-sm text-ink-soft">Sem aulas neste dia.</p>
        </section>
      </div>
    </template>
  </div>
</template>
