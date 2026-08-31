<script setup lang="ts">
import type { CalendarEvent, CalendarEventTone, CalendarView } from '~/types/dashboard'
import { schoolCalendarEvents } from '~/data/calendar'

definePageMeta({ layout: false, middleware: 'auth' })
useSeoMeta({ title: 'Calendário Académico', robots: 'noindex' })

const toast = useToast()
const { theme } = useTheme()

const parseDate = (value: string) => {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year || 2026, (month || 1) - 1, day || 1, 12)
}

const activeDate = ref('2026-08-01')
const selectedDate = ref('2026-08-26')
const view = ref<CalendarView>('month')
const eventType = ref('all')
const department = ref('all')
const events = ref<CalendarEvent[]>(schoolCalendarEvents.map(event => ({ ...event })))
const selectedEvent = ref<CalendarEvent | null>(null)
const eventModalOpen = ref(false)
const createModalOpen = ref(false)

const newEvent = reactive({
  title: '',
  date: selectedDate.value,
  category: 'Académico',
  department: 'Todos os departamentos',
  startTime: '08:00',
  location: '',
  allDay: false,
})

const formErrors = reactive({ title: '', date: '' })

const categoryLabels: Record<string, string> = {
  Administrativo: 'ADMINISTRATIVO',
  Académico: 'ACADÉMICO',
}

const eventAccentClasses: Record<CalendarEventTone, string> = {
  navy: 'upcoming-event--navy',
  brand: 'upcoming-event--brand',
  danger: 'upcoming-event--danger',
}

const dateFormatter = new Intl.DateTimeFormat('pt-PT', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

const upcomingEvents = computed(() => [...events.value]
  .sort((a, b) => a.date.localeCompare(b.date) || (a.startTime || '').localeCompare(b.startTime || ''))
  .slice(0, 3))

const monthLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

const formatUpcomingDate = (event: CalendarEvent) => {
  const date = parseDate(event.date)
  const dateLabel = `${date.getDate()} ${monthLabels[date.getMonth()]}`
  if (event.allDay) return `${dateLabel}, Dia Inteiro`
  if (event.startTime && event.endTime) {
    return `${dateLabel}, ${event.startTime} - ${event.endTime}`
  }
  return event.startTime ? `${dateLabel}, ${event.startTime}` : dateLabel
}

const formatEventDate = (event: CalendarEvent) => {
  const date = dateFormatter.format(parseDate(event.date))
  if (event.allDay) return `${date}, dia inteiro`
  if (event.startTime && event.endTime) return `${date}, ${event.startTime} - ${event.endTime}`
  return event.startTime ? `${date}, ${event.startTime}` : date
}

const formatEventTime = (event: CalendarEvent) => {
  if (event.allDay) return 'Dia inteiro'
  if (event.startTime && event.endTime) return `${event.startTime} - ${event.endTime}`
  return event.startTime || 'Horário por confirmar'
}

const selectDate = (date: string) => {
  selectedDate.value = date
  activeDate.value = date
}

const openEvent = (event: CalendarEvent) => {
  selectedEvent.value = event
  eventModalOpen.value = true
}

const openCreateModal = () => {
  newEvent.date = selectedDate.value
  createModalOpen.value = true
}

const createEvent = () => {
  formErrors.title = newEvent.title.trim() ? '' : 'Introduza o nome do evento.'
  formErrors.date = newEvent.date ? '' : 'Selecione a data do evento.'
  if (formErrors.title || formErrors.date) return

  events.value.push({
    id: `event-${Date.now()}`,
    title: newEvent.title.trim(),
    date: newEvent.date,
    category: newEvent.category,
    department: newEvent.department,
    startTime: newEvent.allDay ? undefined : newEvent.startTime,
    allDay: newEvent.allDay,
    location: newEvent.location.trim() || 'Local por confirmar',
    tone: newEvent.category === 'Administrativo' ? 'navy' : 'brand',
  })

  selectedDate.value = newEvent.date
  activeDate.value = newEvent.date
  createModalOpen.value = false
  toast.success('Evento adicionado', 'O evento já aparece no calendário.')
  newEvent.title = ''
  newEvent.location = ''
  newEvent.allDay = false
  formErrors.title = ''
  formErrors.date = ''
}
</script>

<template>
  <section class="calendar-page" :data-theme="theme" aria-label="Calendário Académico">
    <main class="calendar-page__main">
      <header class="calendar-page__header">
        <div class="calendar-page__identity">
          <h1>Calendário Académico</h1>
          <nav class="calendar-breadcrumbs" aria-label="Navegação estrutural">
            <NuxtLink to="/dashboard">Painel</NuxtLink>
            <Icon name="ph:caret-right" size="16" aria-hidden="true" />
            <span aria-current="page">Calendário</span>
          </nav>
        </div>

        <div class="calendar-page__actions">
          <div class="calendar-view-toggle" aria-label="Vista do calendário">
            <button type="button" :class="{ 'is-active': view === 'month' }" :aria-pressed="view === 'month'" @click="view = 'month'">
              Mês
            </button>
            <button type="button" :class="{ 'is-active': view === 'week' }" :aria-pressed="view === 'week'" @click="view = 'week'">
              Semana
            </button>
          </div>

          <button class="add-event-button" type="button" @click="openCreateModal">
            <span class="add-event-button__plus" aria-hidden="true">
              <Icon name="ph:plus" size="18" />
            </span>
            <span class="add-event-button__label">Adicionar Evento</span>
          </button>
        </div>
      </header>

      <AcademicCalendar
        v-model:active-date="activeDate"
        v-model:selected-date="selectedDate"
        v-model:view="view"
        v-model:event-type="eventType"
        v-model:department="department"
        class="calendar-page__calendar"
        :events="events"
        @select-event="openEvent"
      />
    </main>

    <aside class="calendar-page__sidebar" aria-label="Resumo do calendário">
      <section aria-labelledby="upcoming-events-heading">
        <h2 id="upcoming-events-heading" class="sidebar-heading">Próximos Eventos</h2>
        <ul class="upcoming-events" aria-label="Próximos eventos da escola">
          <li v-for="event in upcomingEvents" :key="event.id">
            <button
              :class="['upcoming-event', eventAccentClasses[event.tone], { 'upcoming-event--with-secondary': event.id !== 'classes-start' }]"
              type="button"
              @click="openEvent(event)"
            >
              <span class="upcoming-event__category">{{ categoryLabels[event.category] || event.category.toUpperCase() }}</span>
              <strong>{{ event.title }}</strong>
              <span class="upcoming-event__detail">
                <Icon name="ph:clock" size="17" aria-hidden="true" />
                {{ formatUpcomingDate(event) }}
              </span>
              <span v-if="event.id === 'teachers-meeting'" class="upcoming-event__detail upcoming-event__detail--secondary">
                <Icon name="ph:map-pin" size="17" aria-hidden="true" />
                {{ event.location }}
              </span>
              <span v-else-if="event.id === 'final-exams'" class="upcoming-event__detail upcoming-event__detail--secondary">
                <Icon name="ph:users-three" size="18" aria-hidden="true" />
                Todos os Departamentos
              </span>
            </button>
          </li>
        </ul>
      </section>

      <section class="mini-calendar-section" aria-labelledby="mini-calendar-heading">
        <h2 id="mini-calendar-heading" class="sidebar-heading sidebar-heading--mini">Mini Calendário</h2>
        <CalendarMonthGrid
          compact
          :active-date="activeDate"
          :selected-date="selectedDate"
          :events="events"
          @select-date="selectDate"
        />
      </section>
    </aside>

    <BaseModal v-model="eventModalOpen" :title="selectedEvent?.title || 'Detalhes do evento'" size="sm">
      <div v-if="selectedEvent" class="grid gap-4">
        <span class="w-fit rounded-md bg-brand-100 px-2.5 py-1 text-xs font-extrabold text-brand-800 uppercase">
          {{ categoryLabels[selectedEvent.category] || selectedEvent.category }}
        </span>
        <dl class="m-0 grid gap-3 text-sm">
          <div class="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-2">
            <Icon class="mt-0.5 text-ink-soft" name="ph:calendar-blank" size="19" aria-hidden="true" />
            <div><dt class="sr-only">Data</dt><dd class="m-0 font-semibold text-ink">{{ formatEventDate(selectedEvent) }}</dd></div>
          </div>
          <div class="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-2">
            <Icon class="mt-0.5 text-ink-soft" name="ph:clock" size="19" aria-hidden="true" />
            <div><dt class="sr-only">Horário</dt><dd class="m-0 text-ink-soft">{{ formatEventTime(selectedEvent) }}</dd></div>
          </div>
          <div v-if="selectedEvent.location" class="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-2">
            <Icon class="mt-0.5 text-ink-soft" name="ph:map-pin" size="19" aria-hidden="true" />
            <div><dt class="sr-only">Local</dt><dd class="m-0 text-ink-soft">{{ selectedEvent.location }}</dd></div>
          </div>
          <div class="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-2">
            <Icon class="mt-0.5 text-ink-soft" name="ph:buildings" size="19" aria-hidden="true" />
            <div><dt class="sr-only">Departamento</dt><dd class="m-0 text-ink-soft">{{ selectedEvent.department }}</dd></div>
          </div>
        </dl>
        <p v-if="selectedEvent.description" class="m-0 border-t border-line pt-4 text-sm leading-6 text-ink-soft">{{ selectedEvent.description }}</p>
      </div>
    </BaseModal>

    <BaseModal v-model="createModalOpen" title="Adicionar evento" description="Crie um evento para o calendário académico." size="md">
      <form id="create-calendar-event" class="grid gap-4" @submit.prevent="createEvent">
        <FormField label="Nome do evento" name="calendar-event-title" :error="formErrors.title" required>
          <template #default="field">
            <input
              :id="field.id"
              v-model="newEvent.title"
              class="h-11 w-full rounded-control border border-line bg-surface-strong px-3 outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-400/20"
              type="text"
              autocomplete="off"
              :aria-describedby="field.describedBy"
              :aria-invalid="field.invalid"
              :required="field.required"
            >
          </template>
        </FormField>

        <div class="grid gap-4 min-[560px]:grid-cols-2">
          <FormField label="Data" name="calendar-event-date" :error="formErrors.date" required>
            <template #default="field">
              <input
                :id="field.id"
                v-model="newEvent.date"
                class="h-11 w-full rounded-control border border-line bg-surface-strong px-3 outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-400/20"
                type="date"
                :aria-describedby="field.describedBy"
                :aria-invalid="field.invalid"
                :required="field.required"
              >
            </template>
          </FormField>

          <FormField label="Hora de início" name="calendar-event-time">
            <template #default="field">
              <input
                :id="field.id"
                v-model="newEvent.startTime"
                class="h-11 w-full rounded-control border border-line bg-surface-strong px-3 outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-400/20 disabled:opacity-50"
                type="time"
                :disabled="newEvent.allDay"
              >
            </template>
          </FormField>
        </div>

        <div class="grid gap-4 min-[560px]:grid-cols-2">
          <FormField label="Tipo de evento" name="calendar-event-category">
            <template #default="field">
              <select :id="field.id" v-model="newEvent.category" class="h-11 w-full rounded-control border border-line bg-surface-strong px-3 outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-400/20">
                <option>Académico</option>
                <option>Administrativo</option>
              </select>
            </template>
          </FormField>

          <FormField label="Departamento" name="calendar-event-department">
            <template #default="field">
              <select :id="field.id" v-model="newEvent.department" class="h-11 w-full rounded-control border border-line bg-surface-strong px-3 outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-400/20">
                <option>Todos os departamentos</option>
                <option>Administração</option>
                <option>Área académica</option>
              </select>
            </template>
          </FormField>
        </div>

        <FormField label="Local" name="calendar-event-location">
          <template #default="field">
            <input :id="field.id" v-model="newEvent.location" class="h-11 w-full rounded-control border border-line bg-surface-strong px-3 outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-400/20" type="text">
          </template>
        </FormField>

        <label class="flex min-h-11 items-center gap-3 rounded-control border border-line bg-surface px-3 text-sm font-semibold text-ink">
          <input v-model="newEvent.allDay" class="size-4 accent-brand-600" type="checkbox">
          Evento de dia inteiro
        </label>
      </form>

      <template #footer>
        <button class="button button--secondary" type="button" @click="createModalOpen = false">Cancelar</button>
        <button class="button button--primary" type="submit" form="create-calendar-event">Adicionar evento</button>
      </template>
    </BaseModal>
  </section>
</template>

<style scoped>
.calendar-page {
  --calendar-canvas: #f7f9fb;
  --calendar-panel: #ffffff;
  --calendar-surface: #f7f9fa;
  --calendar-surface-hover: #f2f6f7;
  --calendar-control: #f8fafb;
  --calendar-control-active: #f2f4f7;
  --calendar-text: #071735;
  --calendar-heading: #061534;
  --calendar-text-muted: #465250;
  --calendar-text-subtle: #697577;
  --calendar-date-outside: #aab1b4;
  --calendar-border: #dfe4e8;
  --calendar-border-soft: #edf0f2;
  --calendar-border-strong: #bfc9ce;
  --calendar-brand: #1abfae;
  --calendar-brand-hover: #12ad9e;
  --calendar-brand-text: #08786f;
  --calendar-brand-soft: #d8f7f3;
  --calendar-brand-soft-hover: #e4f8f5;
  --calendar-danger: #d42c2c;
  --calendar-navy-accent: #526a9e;
  --calendar-navy-text: #53678f;
  --calendar-on-brand: #ffffff;
  --calendar-chip-navy-border: #bdccef;
  --calendar-chip-navy-bg: #dce5ff;
  --calendar-chip-navy-text: #17305f;
  --calendar-chip-danger-border: #ffd0cd;
  --calendar-chip-danger-bg: #ffd9d6;
  --calendar-chip-danger-text: #c52222;
  --calendar-chip-brand-border: #afe8e1;
  --calendar-chip-brand-bg: #c9f1ec;
  --calendar-chip-brand-text: #16796f;
  --calendar-control-shadow: 0 1px 3px rgb(7 23 53 / 0.09);
  --calendar-panel-shadow: 0 1px 5px rgb(8 23 53 / 0.08);
  --calendar-subtle-shadow: 0 1px 3px rgb(7 23 53 / 0.025);
  --calendar-sidebar-shadow: -8px 0 28px rgb(7 23 53 / 0.018);
  display: grid;
  grid-template-columns: minmax(0, 69.1176%) minmax(300px, 30.8824%);
  min-height: 100dvh;
  background: var(--calendar-panel);
  color: var(--calendar-text);
  font-family: "Avenir Next", Avenir, "Segoe UI", system-ui, sans-serif;
}

.calendar-page[data-theme='dark'] {
  --calendar-canvas: var(--color-canvas);
  --calendar-panel: var(--color-surface-strong);
  --calendar-surface: var(--color-surface-muted);
  --calendar-surface-hover: color-mix(in srgb, var(--color-surface-muted) 76%, var(--color-line));
  --calendar-control: var(--color-surface-muted);
  --calendar-control-active: color-mix(in srgb, var(--color-surface-muted) 68%, var(--color-line));
  --calendar-text: var(--color-ink);
  --calendar-heading: var(--color-ink);
  --calendar-text-muted: var(--color-ink-soft);
  --calendar-text-subtle: color-mix(in srgb, var(--color-ink-soft) 84%, var(--color-surface-strong));
  --calendar-date-outside: color-mix(in srgb, var(--color-ink-soft) 68%, var(--color-surface-strong));
  --calendar-border: var(--color-line);
  --calendar-border-soft: color-mix(in srgb, var(--color-line) 76%, transparent);
  --calendar-border-strong: var(--color-line-strong);
  --calendar-brand: var(--color-brand-500);
  --calendar-brand-hover: var(--color-brand-400);
  --calendar-brand-text: var(--color-brand-400);
  --calendar-brand-soft: color-mix(in srgb, var(--color-brand-500) 18%, var(--color-surface-strong));
  --calendar-brand-soft-hover: color-mix(in srgb, var(--color-brand-500) 24%, var(--color-surface-strong));
  --calendar-danger: var(--color-danger);
  --calendar-navy-accent: #7f9dcc;
  --calendar-navy-text: #b4ccff;
  --calendar-on-brand: #f4fffd;
  --calendar-chip-navy-border: #3b5b7e;
  --calendar-chip-navy-bg: #1a3158;
  --calendar-chip-navy-text: #d8e5ff;
  --calendar-chip-danger-border: #79413d;
  --calendar-chip-danger-bg: var(--color-danger-soft);
  --calendar-chip-danger-text: #ffb0a8;
  --calendar-chip-brand-border: #17685f;
  --calendar-chip-brand-bg: #123d3c;
  --calendar-chip-brand-text: #91eee1;
  --calendar-control-shadow: var(--shadow-dashboard-control);
  --calendar-panel-shadow: var(--shadow-panel-soft);
  --calendar-subtle-shadow: 0 1px 3px rgb(0 8 28 / 0.22);
  --calendar-sidebar-shadow: -8px 0 28px rgb(0 8 28 / 0.24);
  color-scheme: dark;
}

.calendar-page__main {
  min-width: 0;
  min-height: 100dvh;
  padding: 41px 45px 36px 43px;
  background: var(--calendar-canvas);
}

.calendar-page__header {
  display: flex;
  min-height: 72px;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
}

.calendar-page__identity {
  min-width: 0;
  padding-top: 4px;
}

.calendar-page__identity h1 {
  margin: 0;
  color: var(--calendar-heading);
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.05;
  white-space: nowrap;
}

.calendar-breadcrumbs {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  color: var(--calendar-text-muted);
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
}

.calendar-breadcrumbs a {
  transition: color 120ms ease;
}

.calendar-breadcrumbs a:hover {
  color: var(--calendar-brand-text);
}

.calendar-breadcrumbs span {
  color: var(--calendar-text);
  font-weight: 700;
}

.calendar-page__actions {
  display: flex;
  flex: 0 0 auto;
  align-items: flex-start;
  gap: 13px;
}

.calendar-view-toggle {
  display: inline-flex;
  width: 149px;
  height: 47px;
  margin-top: 0;
  padding: 5px;
  border: 1px solid var(--calendar-border);
  border-radius: 10px;
  background: var(--calendar-panel);
  box-shadow: var(--calendar-control-shadow);
}

.calendar-view-toggle button {
  flex: 1;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--calendar-text-muted);
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  transition: background-color 120ms ease, color 120ms ease, transform 120ms ease;
}

.calendar-view-toggle button.is-active {
  background: var(--calendar-control-active);
  color: var(--calendar-text);
  font-weight: 700;
}

.calendar-view-toggle button:active,
.add-event-button:active {
  transform: translateY(1px);
}

.add-event-button {
  display: flex;
  width: 182px;
  height: 47px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: 9px;
  background: var(--calendar-brand);
  padding: 0 15px;
  color: var(--calendar-on-brand);
  font-size: 15px;
  font-weight: 650;
  line-height: 1.55;
  transition: background-color 120ms ease, transform 120ms ease;
}

.add-event-button:hover {
  background: var(--calendar-brand-hover);
}

.add-event-button__label {
  text-align: center;
  white-space: nowrap;
}

.add-event-button__plus {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
}

.calendar-page__calendar {
  margin-top: 35px;
}

.calendar-page__sidebar {
  min-width: 0;
  min-height: 100dvh;
  padding: 27px 10px 36px 26px;
  background: var(--calendar-panel);
  box-shadow: var(--calendar-sidebar-shadow);
}

.sidebar-heading {
  margin: 0 0 28px;
  color: var(--calendar-text);
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.upcoming-events {
  display: grid;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.upcoming-event {
  display: block;
  width: 100%;
  min-height: 112px;
  border: 0;
  border-left: 4px solid;
  border-radius: 11px;
  background: var(--calendar-surface);
  padding: 17px 16px 15px 18px;
  color: var(--calendar-text);
  text-align: left;
  box-shadow: var(--calendar-subtle-shadow);
  transition: background-color 120ms ease, transform 120ms ease;
}

.upcoming-event--with-secondary {
  min-height: 130px;
}

.upcoming-event:hover {
  background: var(--calendar-surface-hover);
}

.upcoming-event:active {
  transform: translateY(1px);
}

.upcoming-event--navy {
  border-left-color: var(--calendar-navy-accent);
}

.upcoming-event--danger {
  border-left-color: var(--calendar-danger);
}

.upcoming-event--brand {
  border-left-color: var(--calendar-brand-text);
}

.upcoming-event__category {
  display: block;
  color: var(--calendar-navy-text);
  font-size: 12px;
  font-weight: 700;
  line-height: 1.25;
}

.upcoming-event--danger .upcoming-event__category {
  color: var(--calendar-danger);
}

.upcoming-event--brand .upcoming-event__category {
  color: var(--calendar-brand-text);
}

.upcoming-event strong {
  display: block;
  margin-top: 6px;
  color: var(--calendar-text);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.012em;
  line-height: 1.2;
}

.upcoming-event__detail {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  color: var(--calendar-text-muted);
  font-size: 12px;
  font-weight: 450;
  line-height: 1.2;
  white-space: nowrap;
}

.upcoming-event__detail :deep(svg) {
  flex: 0 0 auto;
}

.upcoming-event__detail--secondary {
  margin-top: 5px;
}

.mini-calendar-section {
  margin-top: 35px;
  padding-top: 20px;
  border-top: 1px solid var(--calendar-border-soft);
}

.sidebar-heading--mini {
  margin-bottom: 21px;
}

.mini-calendar-section :deep(.calendar-grid-wrap--compact) {
  height: auto;
  padding-bottom: 4px;
}

@media (min-width: 64rem) and (max-width: 79.999rem) {
  .calendar-page {
    min-height: 113.6364dvh;
    zoom: 0.88;
  }
}

@media (min-width: 80rem) and (max-width: 99.999rem) {
  .calendar-page {
    min-height: 128.2052dvh;
    zoom: 0.78;
  }
}

@media (min-width: 100rem) {
  .calendar-page {
    min-height: 131.579dvh;
    zoom: 0.76;
  }
}

@media (max-width: 980px) {
  .calendar-page {
    grid-template-columns: minmax(0, 1fr) 320px;
  }

  .calendar-page__main {
    padding-right: 28px;
    padding-left: 28px;
  }

  .calendar-page__header {
    flex-direction: column;
    min-height: auto;
  }

  .calendar-page__actions {
    width: 100%;
  }

  .calendar-view-toggle {
    margin-top: 0;
  }

  .calendar-page__calendar {
    margin-top: 26px;
  }
}

@media (max-width: 760px) {
  .calendar-page {
    display: block;
  }

  .calendar-page__main,
  .calendar-page__sidebar {
    min-height: auto;
    padding: 24px 16px 30px;
  }

  .calendar-page__identity h1 {
    font-size: clamp(28px, 8vw, 34px);
  }

  .calendar-page__actions {
    display: grid;
    grid-template-columns: 1fr 1.15fr;
  }

  .calendar-view-toggle,
  .add-event-button {
    width: 100%;
  }

  .calendar-page__sidebar {
    border-top: 1px solid var(--calendar-border-soft);
  }

  .upcoming-event__detail {
    white-space: normal;
  }
}

@media (prefers-reduced-motion: reduce) {
  .calendar-breadcrumbs a,
  .calendar-view-toggle button,
  .add-event-button,
  .upcoming-event {
    transition: none;
  }
}

@media print {
  .calendar-page {
    min-height: 100dvh;
    zoom: 1;
  }
}
</style>
