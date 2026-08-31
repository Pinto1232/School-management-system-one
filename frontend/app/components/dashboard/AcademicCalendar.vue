<script setup lang="ts">
import type { CalendarEvent, CalendarView } from '~/types/dashboard'

const props = defineProps<{
  events: CalendarEvent[]
}>()

const emit = defineEmits<{
  selectEvent: [event: CalendarEvent]
}>()

const activeDate = defineModel<string>('activeDate', { required: true })
const selectedDate = defineModel<string>('selectedDate', { required: true })
const view = defineModel<CalendarView>('view', { required: true })
const eventType = defineModel<string>('eventType', { default: 'all' })
const department = defineModel<string>('department', { default: 'all' })

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

const titleCase = (value: string) => value.charAt(0).toLocaleUpperCase('pt-PT') + value.slice(1)
const monthFormatter = new Intl.DateTimeFormat('pt-PT', { month: 'long', year: 'numeric' })
const shortDateFormatter = new Intl.DateTimeFormat('pt-PT', { day: 'numeric', month: 'short' })

const title = computed(() => {
  const current = parseDate(activeDate.value)
  if (view.value === 'month') return titleCase(monthFormatter.format(current))

  const start = parseDate(selectedDate.value)
  start.setDate(start.getDate() - start.getDay())
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  return `${shortDateFormatter.format(start)} - ${shortDateFormatter.format(end)}`
})

const eventTypes = computed(() => [...new Set(props.events.map(event => event.category))])
const departments = computed(() => [...new Set(props.events.map(event => event.department))])

const filteredEvents = computed(() => props.events.filter(event => (
  (eventType.value === 'all' || event.category === eventType.value)
  && (department.value === 'all' || event.department === department.value)
)))

const move = (direction: -1 | 1) => {
  const next = parseDate(view.value === 'week' ? selectedDate.value : activeDate.value)

  if (view.value === 'month') {
    next.setDate(1)
    next.setMonth(next.getMonth() + direction)
  } else {
    next.setDate(next.getDate() + (direction * 7))
  }

  const nextDate = toIsoDate(next)
  activeDate.value = nextDate
  selectedDate.value = nextDate
}
</script>

<template>
  <section class="academic-calendar" aria-label="Calendário académico">
    <header class="academic-calendar__toolbar">
      <div class="academic-calendar__period">
        <h2>{{ title }}</h2>
        <div class="academic-calendar__navigation" aria-label="Navegação do calendário">
          <button type="button" :aria-label="view === 'month' ? 'Mês anterior' : 'Semana anterior'" @click="move(-1)">
            <Icon name="ph:caret-left" size="23" aria-hidden="true" />
          </button>
          <button type="button" :aria-label="view === 'month' ? 'Mês seguinte' : 'Semana seguinte'" @click="move(1)">
            <Icon name="ph:caret-right" size="23" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div class="academic-calendar__filters">
        <label class="calendar-select calendar-select--type">
          <span class="sr-only">Filtrar por tipo de evento</span>
          <select v-model="eventType">
            <option value="all">Tipo de Evento</option>
            <option v-for="type in eventTypes" :key="type" :value="type">{{ type }}</option>
          </select>
          <Icon class="calendar-select__icon" name="ph:caret-down" size="16" aria-hidden="true" />
        </label>

        <label class="calendar-select calendar-select--department">
          <span class="sr-only">Filtrar por departamento</span>
          <select v-model="department">
            <option value="all">Departamento</option>
            <option v-for="item in departments" :key="item" :value="item">{{ item }}</option>
          </select>
          <Icon class="calendar-select__icon" name="ph:caret-down" size="16" aria-hidden="true" />
        </label>
      </div>
    </header>

    <div class="academic-calendar__grid">
      <CalendarMonthGrid
        :active-date="activeDate"
        :selected-date="selectedDate"
        :events="filteredEvents"
        :view="view"
        @select-date="selectedDate = $event"
        @select-event="emit('selectEvent', $event)"
      />
    </div>
  </section>
</template>

<style scoped>
.academic-calendar {
  width: 100%;
  overflow: hidden;
  border: 1px solid var(--calendar-border-soft, var(--color-line));
  border-radius: 14px;
  background: var(--calendar-panel, var(--color-surface-strong));
  box-shadow: var(--calendar-subtle-shadow, var(--shadow-panel-soft));
}

.academic-calendar__toolbar {
  display: flex;
  height: 95px;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 0 26px;
}

.academic-calendar__period,
.academic-calendar__navigation,
.academic-calendar__filters {
  display: flex;
  align-items: center;
}

.academic-calendar__period {
  min-width: 0;
  gap: 17px;
}

.academic-calendar__period h2 {
  min-width: 128px;
  margin: 0;
  color: var(--calendar-text, var(--color-ink));
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
  white-space: nowrap;
}

.academic-calendar__navigation {
  gap: 14px;
}

.academic-calendar__navigation button {
  display: grid;
  width: 26px;
  height: 36px;
  place-items: center;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--calendar-text, var(--color-ink));
  transition: background-color 120ms ease, transform 120ms ease;
}

.academic-calendar__navigation button:hover {
  background: var(--calendar-surface-hover, var(--color-surface-muted));
}

.academic-calendar__navigation button:active {
  transform: translateY(1px);
}

.academic-calendar__filters {
  gap: 13px;
}

.calendar-select {
  position: relative;
  display: block;
  height: 42px;
}

.calendar-select--type {
  width: 150px;
}

.calendar-select--department {
  width: 150px;
}

.calendar-select select {
  width: 100%;
  height: 100%;
  appearance: none;
  border: 1px solid var(--calendar-border, var(--color-line));
  border-radius: 9px;
  background: var(--calendar-control, var(--color-surface-muted));
  padding: 0 36px 0 14px;
  color: var(--calendar-text, var(--color-ink));
  font-size: 14px;
  font-weight: 550;
  outline: none;
  box-shadow: var(--calendar-subtle-shadow, var(--shadow-dashboard-control));
  transition: border-color 120ms ease, box-shadow 120ms ease;
}

.calendar-select select:hover {
  border-color: var(--calendar-border-strong, var(--color-line-strong));
}

.calendar-select select:focus-visible {
  border-color: var(--calendar-brand, var(--color-brand-500));
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--calendar-brand, var(--color-brand-500)) 18%, transparent);
}

.calendar-select__icon {
  position: absolute;
  top: 50%;
  right: 13px;
  color: var(--calendar-text-subtle, var(--color-ink-soft));
  pointer-events: none;
  transform: translateY(-50%);
}

.academic-calendar__grid {
  overflow-x: auto;
  scrollbar-width: thin;
}

@media (max-width: 1060px) {
  .academic-calendar__toolbar {
    height: auto;
    min-height: 95px;
    flex-wrap: wrap;
    padding-block: 18px;
  }
}

@media (max-width: 560px) {
  .academic-calendar__toolbar {
    align-items: flex-start;
  }

  .academic-calendar__period,
  .academic-calendar__filters {
    width: 100%;
  }

  .academic-calendar__period {
    justify-content: space-between;
  }

  .academic-calendar__filters {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .calendar-select--type,
  .calendar-select--department {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .academic-calendar__navigation button,
  .calendar-select select {
    transition: none;
  }
}
</style>
