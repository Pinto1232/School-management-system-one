<script setup lang="ts">
import type { CalendarEvent, CalendarView } from '~/types/dashboard'

const props = withDefaults(defineProps<{
  activeDate: string
  selectedDate?: string
  events?: CalendarEvent[]
  view?: CalendarView
  compact?: boolean
}>(), {
  selectedDate: '',
  events: () => [],
  view: 'month',
  compact: false,
})

const emit = defineEmits<{
  selectDate: [date: string]
  selectEvent: [event: CalendarEvent]
}>()

const weekdayLabels = computed(() => props.compact
  ? ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  : ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'])

const parseDate = (value: string) => {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year || 2026, (month || 1) - 1, day || 1, 12)
}

const toIsoDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const dateLabelFormatter = new Intl.DateTimeFormat('pt-PT', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})
const compactMonthFormatter = new Intl.DateTimeFormat('pt-PT', {
  month: 'long',
  year: 'numeric',
})

const compactMonthLabel = computed(() => {
  const label = compactMonthFormatter.format(parseDate(props.activeDate))
  return label.charAt(0).toLocaleUpperCase('pt-PT') + label.slice(1)
})

const days = computed(() => {
  const focusDate = parseDate(props.selectedDate || props.activeDate)

  if (props.view === 'week' && !props.compact) {
    const weekStart = new Date(focusDate)
    weekStart.setDate(focusDate.getDate() - focusDate.getDay())

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(weekStart)
      date.setDate(weekStart.getDate() + index)
      return date
    })
  }

  const monthDate = parseDate(props.activeDate)
  const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1, 12)
  const gridStart = new Date(monthStart)
  gridStart.setDate(1 - monthStart.getDay())

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + index)
    return date
  })
})

const activeMonth = computed(() => parseDate(props.activeDate).getMonth())

const eventsByDate = computed(() => props.events.reduce<Record<string, CalendarEvent[]>>((grouped, event) => {
  grouped[event.date] ||= []
  grouped[event.date]?.push(event)
  return grouped
}, {}))

const dangerDates = computed(() => new Set(props.events
  .filter(event => event.tone === 'danger')
  .map(event => event.date)))
</script>

<template>
  <div :class="['calendar-grid-wrap', { 'calendar-grid-wrap--compact': compact }]">
    <div v-if="compact" class="calendar-compact-month" aria-live="polite">
      {{ compactMonthLabel }}
    </div>

    <div :class="['calendar-weekdays', { 'calendar-weekdays--compact': compact }]" role="row">
      <div
        v-for="(weekday, index) in weekdayLabels"
        :key="`${weekday}-${index}`"
        :class="['calendar-weekday', { 'calendar-weekday--saturday': index === 6 }]"
        role="columnheader"
      >
        {{ weekday }}
      </div>
    </div>

    <div
      :class="['calendar-days', { 'calendar-days--compact': compact, 'calendar-days--week': view === 'week' && !compact }]"
      role="grid"
      :aria-label="compact ? 'Mini calendário' : 'Calendário de eventos'"
    >
      <div
        v-for="day in days"
        :key="toIsoDate(day)"
        :class="[
          'calendar-day',
          {
            'calendar-day--compact': compact,
            'calendar-day--outside': day.getMonth() !== activeMonth,
            'calendar-day--selected': !compact && toIsoDate(day) === selectedDate,
          },
        ]"
        role="gridcell"
        :aria-selected="toIsoDate(day) === selectedDate || undefined"
      >
        <button
          :class="[
            'calendar-date',
            {
              'calendar-date--compact': compact,
              'calendar-date--outside': day.getMonth() !== activeMonth,
              'calendar-date--danger': compact && dangerDates.has(toIsoDate(day)),
              'calendar-date--selected': toIsoDate(day) === selectedDate,
            },
          ]"
          type="button"
          :aria-label="`${toIsoDate(day) === selectedDate ? 'Selecionado, ' : ''}${dateLabelFormatter.format(day)}`"
          @click="emit('selectDate', toIsoDate(day))"
        >
          {{ day.getDate() }}
        </button>

        <div v-if="!compact && eventsByDate[toIsoDate(day)]?.length" class="calendar-events">
          <button
            v-for="event in eventsByDate[toIsoDate(day)]"
            :key="event.id"
            :class="['calendar-event', `calendar-event--${event.tone}`]"
            type="button"
            :title="event.title"
            :aria-label="`${event.title}, ${dateLabelFormatter.format(day)}`"
            @click="emit('selectEvent', event)"
          >
            {{ event.title }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-grid-wrap {
  min-width: 0;
  width: 100%;
  color: var(--calendar-text, var(--color-ink));
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  height: 46px;
  border-top: 1px solid var(--calendar-border-soft, var(--color-line));
  border-bottom: 1px solid var(--calendar-border-soft, var(--color-line));
  background: var(--calendar-panel, var(--color-surface-strong));
}

.calendar-weekday {
  display: grid;
  place-items: center;
  color: var(--calendar-text, var(--color-ink));
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.015em;
}

.calendar-weekday--saturday {
  color: var(--calendar-danger, var(--color-danger));
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-template-rows: 134px 138px 137px 137px 136px 112px;
  background: var(--calendar-panel, var(--color-surface-strong));
}

.calendar-days--week {
  grid-template-rows: 794px;
}

.calendar-day {
  position: relative;
  min-width: 0;
  border-right: 1px solid var(--calendar-border-soft, var(--color-line));
  border-bottom: 1px solid var(--calendar-border-soft, var(--color-line));
  background: var(--calendar-panel, var(--color-surface-strong));
  padding: 10px;
}

.calendar-day:nth-child(7n) {
  border-right: 0;
}

.calendar-day--outside {
  background: var(--calendar-control, var(--color-surface));
}

.calendar-day--selected {
  box-shadow: inset 0 0 0 1px var(--calendar-brand, var(--color-brand-500));
}

.calendar-date {
  display: flex;
  width: 27px;
  height: 27px;
  align-items: center;
  justify-content: flex-start;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--calendar-text, var(--color-ink));
  font-size: 14px;
  font-weight: 650;
  line-height: 1;
  transition: background-color 120ms ease, color 120ms ease;
}

.calendar-date:hover {
  background: var(--calendar-brand-soft-hover, var(--color-brand-50));
  color: var(--calendar-brand-text, var(--color-nav-accent));
}

.calendar-date--outside {
  color: var(--calendar-date-outside, var(--color-ink-soft));
}

.calendar-date--selected {
  justify-content: center;
  background: var(--calendar-brand-soft, var(--color-brand-100));
  color: var(--calendar-brand-text, var(--color-nav-accent));
  font-weight: 800;
}

.calendar-events {
  display: grid;
  gap: 4px;
  margin-top: 4px;
}

.calendar-event {
  display: block;
  width: 100%;
  min-width: 0;
  height: 27px;
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 0 8px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 10px;
  font-weight: 650;
  line-height: 25px;
  transition: filter 120ms ease, transform 120ms ease;
}

.calendar-event:hover {
  filter: saturate(1.08) brightness(0.98);
}

.calendar-event:active {
  transform: translateY(1px);
}

.calendar-event--navy {
  border-color: var(--calendar-chip-navy-border, var(--color-navy-200));
  background: var(--calendar-chip-navy-bg, var(--color-navy-100));
  color: var(--calendar-chip-navy-text, var(--color-navy-700));
}

.calendar-event--danger {
  border-color: var(--calendar-chip-danger-border, var(--color-danger));
  background: var(--calendar-chip-danger-bg, var(--color-danger-soft));
  color: var(--calendar-chip-danger-text, var(--color-danger));
}

.calendar-event--brand {
  border-color: var(--calendar-chip-brand-border, var(--color-brand-200));
  background: var(--calendar-chip-brand-bg, var(--color-brand-100));
  color: var(--calendar-chip-brand-text, var(--color-brand-700));
}

.calendar-grid-wrap--compact {
  min-width: 0;
  width: 100%;
  padding: 13px 17px 14px;
  border: 1px solid var(--calendar-border-soft, var(--color-line));
  border-radius: 10px;
  background: var(--calendar-surface, var(--color-surface));
  box-shadow: var(--calendar-panel-shadow, var(--shadow-panel-soft));
}

.calendar-compact-month {
  margin: 0 0 7px;
  padding: 0 1px 8px;
  border-bottom: 1px solid var(--calendar-border-soft, var(--color-line));
  color: var(--calendar-text, var(--color-ink));
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
}

.calendar-weekdays--compact {
  height: 25px;
  border: 0;
  background: transparent;
}

.calendar-weekdays--compact .calendar-weekday {
  color: var(--calendar-text-muted, var(--color-ink-soft));
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
}

.calendar-days--compact {
  grid-template-rows: repeat(6, 27px);
  background: transparent;
}

.calendar-day--compact {
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  padding: 0;
}

.calendar-date--compact {
  width: 26px;
  height: 26px;
  justify-content: center;
  font-size: 14px;
  font-weight: 550;
}

.calendar-date--compact.calendar-date--outside {
  color: var(--calendar-date-outside, var(--color-ink-soft));
}

.calendar-date--danger:not(.calendar-date--selected) {
  color: var(--calendar-danger, var(--color-danger));
  font-weight: 750;
}

.calendar-date--compact.calendar-date--selected {
  background: var(--calendar-brand, var(--color-brand-500));
  color: var(--calendar-on-brand, #f4fffd);
  font-weight: 800;
}

@media (max-width: 860px) {
  .calendar-grid-wrap:not(.calendar-grid-wrap--compact) {
    min-width: 680px;
  }

  .calendar-days {
    grid-template-rows: repeat(6, 118px);
  }

  .calendar-days--week {
    grid-template-rows: 708px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .calendar-date,
  .calendar-event {
    transition: none;
  }
}
</style>
