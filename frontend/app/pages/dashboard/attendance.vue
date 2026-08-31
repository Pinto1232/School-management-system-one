<script setup lang="ts">
type AttendanceState = 'present' | 'absent' | 'excused'

interface AttendanceStudent {
  id: string
  number: string
  name: string
  status: AttendanceState
  observation: string
}

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  alias: ['/dashboard/presencas'],
})
useSeoMeta({ title: 'Registar Presença', robots: 'noindex' })

const toast = useToast()
const query = ref('')
const academicYear = ref('2023/2024')
const selectedClass = ref('10.º A')
const subject = ref('Matemática A')

const academicYears = ['2023/2024', '2024/2025', '2025/2026', '2026/2027']
const classes = ['10.º A', '10.º B', '11.º A']
const subjects = ['Matemática A', 'Português', 'Física']

const students = ref<AttendanceStudent[]>([
  { id: 'student-01', number: '01', name: 'Ana Almeida', status: 'present', observation: '' },
  { id: 'student-02', number: '02', name: 'Bruno Costa', status: 'absent', observation: 'Aviso do encarregado' },
  { id: 'student-03', number: '03', name: 'Catarina Dias', status: 'present', observation: '' },
  { id: 'student-04', number: '04', name: 'Diogo Fernandes', status: 'excused', observation: 'Consulta médica' },
])

const savedSnapshot = ref('')

const statusOptions: Array<{
  value: AttendanceState
  shortLabel: string
  label: string
  icon: string
}> = [
  { value: 'present', shortLabel: 'Pres', label: 'Presente', icon: 'ph:check-circle-fill' },
  { value: 'absent', shortLabel: 'Falta', label: 'Falta', icon: 'ph:x-circle-fill' },
  { value: 'excused', shortLabel: 'Just', label: 'Justificada', icon: 'ph:info-fill' },
]

const normalise = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('pt-PT')

const filteredStudents = computed(() => {
  const value = normalise(query.value.trim())
  if (!value) return students.value

  return students.value.filter(student => normalise(`${student.number} ${student.name}`).includes(value))
})

const snapshot = computed(() => JSON.stringify({
  academicYear: academicYear.value,
  selectedClass: selectedClass.value,
  subject: subject.value,
  students: students.value,
}))

const isDirty = computed(() => Boolean(savedSnapshot.value) && snapshot.value !== savedSnapshot.value)

const initials = (name: string) => name
  .split(/\s+/)
  .slice(0, 2)
  .map(part => part[0])
  .join('')
  .toLocaleUpperCase('pt-PT')

const setStatus = (student: AttendanceStudent, status: AttendanceState) => {
  student.status = status
}

const clearQuery = () => {
  query.value = ''
}

const saveAttendance = () => {
  savedSnapshot.value = snapshot.value
  toast.success('Presenças guardadas', `O registo de presenças de ${students.value.length} alunos foi atualizado.`)
}

const cancel = () => navigateTo('/dashboard')

const csvCell = (value: string) => {
  const safeValue = /^[=+\-@]/.test(value) ? `'${value}` : value
  return `"${safeValue.replaceAll('"', '""')}"`
}

const exportAttendance = () => {
  if (!import.meta.client) return

  const statusLabels: Record<AttendanceState, string> = {
    present: 'Presente',
    absent: 'Falta',
    excused: 'Justificada',
  }
  const rows = [
    ['Número', 'Nome do aluno', 'Estado de presença', 'Observações'],
    ...students.value.map(student => [
      student.number,
      student.name,
      statusLabels[student.status],
      student.observation,
    ]),
  ]
  const csv = `\uFEFF${rows.map(row => row.map(csvCell).join(';')).join('\n')}`
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = `presencas-${selectedClass.value.replaceAll(' ', '-').toLocaleLowerCase('pt-PT')}-2023-10-24.csv`
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
  toast.success('Exportação concluída', 'O ficheiro CSV foi preparado para download.')
}

onMounted(() => {
  savedSnapshot.value = snapshot.value
})
</script>

<template>
  <section class="attendance-page" aria-labelledby="attendance-page-title">
    <header class="attendance-page__header">
      <div>
        <nav class="attendance-breadcrumbs" aria-label="Navegação estrutural">
          <NuxtLink to="/dashboard/students">Alunos</NuxtLink>
          <Icon name="ph:caret-right" size="15" aria-hidden="true" />
          <span aria-current="page">Registar Presença</span>
        </nav>
        <h1 id="attendance-page-title">Registar Presença</h1>
      </div>

      <button class="attendance-button attendance-button--outline" type="button" @click="exportAttendance">
        <Icon name="ph:download-simple" size="18" aria-hidden="true" />
        Exportar
      </button>
    </header>

    <section class="attendance-filters" aria-labelledby="attendance-filters-title">
      <div class="attendance-filters__fields">
        <div class="attendance-filters__top">
          <div class="attendance-filters__label">
            <Icon name="ph:funnel-simple" size="21" aria-hidden="true" />
            <h2 id="attendance-filters-title">Filtros</h2>
          </div>
        </div>

        <div class="attendance-filters__bottom">
          <label class="attendance-field attendance-field--class">
            <span>Turma</span>
            <span class="attendance-select-wrap">
              <select v-model="selectedClass">
                <option v-for="className in classes" :key="className" :value="className">{{ className }}</option>
              </select>
              <Icon name="ph:caret-down" size="17" aria-hidden="true" />
            </span>
          </label>

          <label class="attendance-field attendance-field--subject">
            <span>Disciplina</span>
            <span class="attendance-select-wrap">
              <select v-model="subject">
                <option v-for="subjectName in subjects" :key="subjectName" :value="subjectName">{{ subjectName }}</option>
              </select>
              <Icon name="ph:caret-down" size="17" aria-hidden="true" />
            </span>
          </label>

          <label class="attendance-field attendance-field--year">
            <span>Ano letivo</span>
            <span class="attendance-select-wrap">
              <select v-model="academicYear">
                <option v-for="year in academicYears" :key="year" :value="year">{{ year }}</option>
              </select>
              <Icon name="ph:caret-down" size="17" aria-hidden="true" />
            </span>
          </label>
        </div>
      </div>

      <dl class="attendance-session" aria-label="Dados da aula">
        <div>
          <Icon name="ph:calendar-blank" size="21" aria-hidden="true" />
          <dt class="sr-only">Data</dt>
          <dd>24 de outubro de 2023</dd>
        </div>
        <div>
          <Icon name="ph:clock-fill" size="20" aria-hidden="true" />
          <dt class="sr-only">Horário</dt>
          <dd>08:30 - 10:00</dd>
        </div>
        <div>
          <Icon name="ph:user-fill" size="20" aria-hidden="true" />
          <dt class="sr-only">Professor</dt>
          <dd>Prof. Rui Silva</dd>
        </div>
      </dl>
    </section>

    <section class="attendance-register" aria-labelledby="attendance-register-title">
      <h2 id="attendance-register-title" class="sr-only">Lista de presenças</h2>

      <div class="attendance-toolbar">
        <label class="attendance-search" for="attendance-search">
          <Icon name="ph:magnifying-glass" size="24" aria-hidden="true" />
          <input
            id="attendance-search"
            v-model="query"
            type="search"
            placeholder="Pesquisar por nome ou número…"
            autocomplete="off"
          >
          <button v-if="query" type="button" aria-label="Limpar pesquisa" @click="clearQuery">
            <Icon name="ph:x" size="16" aria-hidden="true" />
          </button>
        </label>

        <ul class="attendance-legend" aria-label="Legenda dos estados de presença">
          <li class="is-present">Presente</li>
          <li class="is-absent">Falta</li>
          <li class="is-excused">Justificada</li>
        </ul>
      </div>

      <div class="attendance-table-scroll">
        <div class="attendance-table" role="table" aria-label="Presenças dos alunos">
          <div class="attendance-table__header" role="row">
            <span role="columnheader">N.º</span>
            <span role="columnheader">Nome do aluno</span>
            <span role="columnheader">Estado de presença</span>
            <span role="columnheader">Observações</span>
          </div>

          <div v-if="filteredStudents.length" class="attendance-table__body" role="rowgroup">
            <div
              v-for="student in filteredStudents"
              :key="student.id"
              :class="['attendance-row', `attendance-row--${student.status}`]"
              role="row"
            >
              <span class="attendance-row__number" role="cell">{{ student.number }}</span>

              <div class="attendance-student" role="cell">
                <span class="attendance-student__avatar" aria-hidden="true">{{ initials(student.name) }}</span>
                <strong>{{ student.name }}</strong>
              </div>

              <div role="cell">
                <div class="attendance-status" role="radiogroup" :aria-label="`Presença de ${student.name}`">
                  <button
                    v-for="option in statusOptions"
                    :key="option.value"
                    :class="['attendance-status__option', `is-${option.value}`, { 'is-active': student.status === option.value }]"
                    type="button"
                    role="radio"
                    :aria-checked="student.status === option.value"
                    :aria-label="`${student.name}: ${option.label}`"
                    @click="setStatus(student, option.value)"
                  >
                    <Icon v-if="student.status === option.value" :name="option.icon" size="16" aria-hidden="true" />
                    {{ option.shortLabel }}
                  </button>
                </div>
              </div>

              <label class="attendance-observation" role="cell">
                <span class="sr-only">Observação para {{ student.name }}</span>
                <input
                  v-model="student.observation"
                  :class="{ 'is-alert': student.status === 'absent' && student.observation }"
                  type="text"
                  placeholder="Adicionar nota…"
                >
              </label>
            </div>
          </div>

          <div v-else class="attendance-empty" role="row">
            <Icon name="ph:student" size="32" aria-hidden="true" />
            <strong>Nenhum aluno encontrado</strong>
            <span>Altere a pesquisa para ver outros alunos.</span>
            <button type="button" @click="clearQuery">Limpar pesquisa</button>
          </div>
        </div>
      </div>

      <footer class="attendance-actions">
        <p class="attendance-actions__state" aria-live="polite">
          {{ isDirty ? 'Alterações por guardar' : 'Registo atualizado' }}
        </p>
        <button class="attendance-button attendance-button--outline" type="button" @click="cancel">Cancelar</button>
        <button class="attendance-button attendance-button--primary" type="button" @click="saveAttendance">
          <Icon name="ph:floppy-disk" size="19" aria-hidden="true" />
          Guardar Presença
        </button>
      </footer>
    </section>
  </section>
</template>

<style scoped>
.attendance-page {
  --attendance-excused: #9aaddb;
  --attendance-excused-ink: #26375d;
  min-width: 0;
  width: 100%;
  overflow: hidden;
  border-radius: 1rem;
  background: var(--color-surface);
  color: var(--color-ink);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
  font-size: 1rem;
  font-feature-settings: "kern" 1, "liga" 1;
  line-height: 1.5;
}

.attendance-page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  min-height: 132px;
  margin: 0 2.5rem;
}

.attendance-page__header > div {
  min-width: 0;
}

.attendance-breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.45rem;
  color: var(--color-ink-soft);
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.4;
}

.attendance-breadcrumbs a {
  transition: color 150ms ease;
}

.attendance-breadcrumbs a:hover {
  color: var(--color-brand-700);
}

.attendance-breadcrumbs span[aria-current='page'] {
  color: var(--color-ink);
  font-weight: 600;
}

.attendance-page__header h1 {
  margin: 0;
  color: var(--color-navy-900);
  font-size: clamp(2.125rem, 3vw, 2.35rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.12;
}

:root[data-theme='dark'] .attendance-page__header h1 {
  color: var(--color-ink);
}

.attendance-button {
  display: inline-flex;
  flex: 0 0 auto;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  border: 0;
  border-radius: 0.625rem;
  padding: 0.75rem 1.35rem;
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  transition: background-color 150ms ease, color 150ms ease, transform 150ms ease;
}

.attendance-button:hover {
  transform: translateY(-1px);
}

.attendance-button:active {
  transform: translateY(1px);
}

.attendance-button--outline {
  background: var(--color-surface-muted);
  color: var(--color-ink);
}

.attendance-button--outline:hover {
  background: var(--color-brand-50);
  color: var(--color-brand-700);
}

.attendance-button--primary {
  min-width: 255px;
  background: var(--color-brand-500);
  color: var(--color-brand-variation);
}

.attendance-button--primary:hover {
  background: var(--color-brand-600);
  color: #f5fffd;
}

.attendance-filters {
  display: grid;
  min-width: 0;
  grid-template-columns: minmax(660px, 820px) minmax(420px, 1fr);
  align-items: stretch;
  gap: clamp(1rem, 2vw, 2rem);
  padding: 2rem 2.5rem 1.75rem;
  background: var(--color-surface-muted);
}

.attendance-filters__fields {
  display: grid;
  min-width: 0;
  grid-template-rows: repeat(2, auto);
  gap: 1.5rem;
}

.attendance-filters__top {
  display: block;
}

.attendance-filters__bottom {
  display: grid;
  grid-row: 2;
  grid-template-columns: repeat(3, minmax(0, 260px));
  gap: 1.25rem;
}

.attendance-filters__label {
  display: flex;
  align-items: center;
  align-self: end;
  gap: 0.7rem;
  min-height: 47px;
  color: var(--color-ink-soft);
}

.attendance-filters__label > .iconify {
  color: var(--color-brand-500);
}

.attendance-filters__label h2 {
  margin: 0;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  line-height: 1.3;
  text-transform: uppercase;
}

.attendance-field {
  display: grid;
  min-width: 0;
  gap: 0.4rem;
  color: var(--color-ink-soft);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.055em;
  line-height: 1.3;
  text-transform: uppercase;
}

.attendance-field--year {
  width: 100%;
}

.attendance-field--class,
.attendance-field--subject {
  width: 100%;
}

.attendance-select-wrap {
  position: relative;
  display: block;
  min-width: 0;
}

.attendance-select-wrap select {
  width: 100%;
  height: 47px;
  appearance: none;
  border: 0;
  border-radius: 0.35rem;
  background: var(--color-surface-strong);
  padding: 0 2.7rem 0 0.85rem;
  color: var(--color-ink);
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0;
  outline: 2px solid transparent;
  outline-offset: 1px;
  text-transform: none;
  transition: outline-color 150ms ease;
}

.attendance-select-wrap select:focus {
  outline-color: var(--color-brand-500);
}

.attendance-select-wrap > .iconify {
  position: absolute;
  top: 50%;
  right: 0.85rem;
  pointer-events: none;
  transform: translateY(-50%);
}

.attendance-session {
  display: grid;
  grid-template-columns: 1.18fr 0.92fr 0.9fr;
  align-self: end;
  min-height: 72px;
  margin: 0;
  border-radius: 0.9rem;
  background: color-mix(in srgb, var(--color-surface-strong) 72%, transparent);
}

.attendance-session > div {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-width: 0;
  padding: 0.8rem 1.25rem;
}

.attendance-session .iconify {
  flex: 0 0 auto;
  color: var(--color-brand-700);
}

.attendance-session dd {
  min-width: 0;
  margin: 0;
  overflow: hidden;
  color: var(--color-ink);
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.attendance-register {
  padding: 2.8rem 2.5rem 0;
}

.attendance-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 1.8rem;
}

.attendance-search {
  position: relative;
  display: flex;
  width: min(368px, 100%);
  height: 46px;
  align-items: center;
  border-radius: 0.5rem;
  background: var(--color-surface-muted);
  color: var(--color-ink-soft);
  outline: 2px solid transparent;
  outline-offset: 1px;
}

.attendance-search > .iconify {
  position: absolute;
  left: 0.9rem;
}

.attendance-search input {
  width: 100%;
  height: 100%;
  border: 0;
  background: transparent;
  padding: 0 2.8rem 0 3rem;
  outline: none;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.4;
}

.attendance-search input::placeholder {
  color: color-mix(in srgb, var(--color-ink-soft) 80%, transparent);
}

.attendance-search:focus-within {
  outline-color: var(--color-brand-500);
}

.attendance-search button {
  position: absolute;
  right: 0.4rem;
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border: 0;
  border-radius: 0.4rem;
  background: transparent;
  color: var(--color-ink-soft);
}

.attendance-search button:hover {
  background: var(--color-surface-muted);
  color: var(--color-ink);
}

.attendance-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  color: var(--color-ink-soft);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.055em;
  line-height: 1.3;
  list-style: none;
  text-transform: uppercase;
}

.attendance-legend li {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
}

.attendance-legend li::before {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  content: '';
}

.attendance-legend .is-present::before {
  background: var(--color-brand-500);
}

.attendance-legend .is-absent::before {
  background: var(--color-danger);
}

.attendance-legend .is-excused::before {
  background: var(--attendance-excused);
}

.attendance-table-scroll {
  overflow-x: auto;
}

.attendance-table {
  min-width: 940px;
}

.attendance-table__header,
.attendance-row {
  display: grid;
  grid-template-columns: 95px minmax(245px, 1.15fr) minmax(355px, 1.4fr) minmax(215px, 0.85fr);
  align-items: center;
}

.attendance-table__header {
  min-height: 48px;
  margin-bottom: 0.25rem;
  color: var(--color-ink-soft);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.055em;
  line-height: 1.3;
  text-transform: uppercase;
}

.attendance-table__header > span,
.attendance-row > * {
  min-width: 0;
  padding-right: 1rem;
  padding-left: 1.7rem;
}

.attendance-row {
  min-height: 87px;
  border-radius: 0.5rem;
  background: color-mix(in srgb, var(--color-surface-strong) 68%, transparent);
  transition: background-color 150ms ease;
}

.attendance-table__body {
  display: grid;
  gap: 0.25rem;
}

.attendance-row:hover {
  background: color-mix(in srgb, var(--color-brand-50) 35%, transparent);
}

.attendance-row--absent {
  background: color-mix(in srgb, var(--color-danger-soft) 32%, transparent);
}

.attendance-row--excused {
  background: var(--color-surface-strong);
}

.attendance-row__number {
  color: var(--color-navy-900);
  font-size: 1.05rem;
  font-weight: 500;
  line-height: 1.4;
}

:root[data-theme='dark'] .attendance-row__number {
  color: var(--color-ink);
}

.attendance-student {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.attendance-student__avatar {
  display: grid;
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  place-items: center;
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-line) 68%, var(--color-surface-strong));
  color: var(--color-brand-700);
  font-size: 0.74rem;
  font-weight: 600;
  line-height: 1;
}

.attendance-student strong {
  overflow: hidden;
  color: var(--color-navy-900);
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:root[data-theme='dark'] .attendance-student strong {
  color: var(--color-ink);
}

.attendance-status {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.2rem;
  min-height: 40px;
  max-width: 355px;
  padding: 0.25rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-surface-muted) 72%, var(--color-surface-strong));
}

.attendance-status__option {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--color-ink-soft);
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1;
  transition: background-color 150ms ease, color 150ms ease, transform 150ms ease;
}

.attendance-status__option:hover:not(.is-active) {
  color: var(--color-ink);
}

.attendance-status__option:active {
  transform: scale(0.98);
}

.attendance-status__option.is-active {
  font-weight: 600;
}

.attendance-status__option.is-present.is-active {
  background: var(--color-brand-500);
  color: var(--color-brand-variation);
}

.attendance-status__option.is-absent.is-active {
  background: #c81921;
  color: #fff8f8;
}

.attendance-status__option.is-excused.is-active {
  background: var(--attendance-excused);
  color: var(--attendance-excused-ink);
}

.attendance-observation {
  display: block;
}

.attendance-observation input {
  width: 100%;
  height: 42px;
  border: 0;
  border-radius: 0.5rem;
  background: transparent;
  padding: 0 0.75rem;
  color: var(--color-ink);
  outline: 2px solid transparent;
  outline-offset: 1px;
  font-size: 0.95rem;
  font-weight: 400;
  line-height: 1.4;
  transition: background-color 150ms ease, outline-color 150ms ease;
}

.attendance-observation input::placeholder {
  color: var(--color-ink-soft);
}

.attendance-observation input:hover {
  background: color-mix(in srgb, var(--color-surface-strong) 58%, transparent);
}

.attendance-observation input:focus {
  background: var(--color-surface-strong);
  outline-color: var(--color-brand-500);
}

.attendance-observation input.is-alert {
  color: var(--color-danger);
}

.attendance-empty {
  display: grid;
  min-height: 245px;
  place-items: center;
  align-content: center;
  gap: 0.5rem;
  color: var(--color-ink-soft);
  text-align: center;
}

.attendance-empty .iconify {
  margin-bottom: 0.3rem;
  color: var(--color-brand-600);
}

.attendance-empty strong {
  color: var(--color-ink);
  font-weight: 600;
}

.attendance-empty button {
  margin-top: 0.4rem;
  border: 0;
  background: transparent;
  color: var(--color-brand-700);
  font-weight: 600;
}

.attendance-actions {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 1rem;
  min-height: 104px;
  margin-top: 2.25rem;
}

.attendance-actions__state {
  margin: 0;
  color: var(--color-ink-soft);
  font-size: 0.85rem;
  font-weight: 400;
  line-height: 1.4;
}

@media (max-width: 1199px) {
  .attendance-filters {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .attendance-filters__fields {
    gap: 2rem;
  }

  .attendance-session {
    width: 100%;
  }
}

@media (max-width: 767px) {
  .attendance-page {
    border-radius: 0.75rem;
  }

  .attendance-page__header {
    min-height: auto;
    align-items: flex-start;
    gap: 0.75rem;
    margin: 0 1rem;
    padding: 1.4rem 0;
  }

  .attendance-page__header h1 {
    font-size: 1.65rem;
  }

  .attendance-page__header .attendance-button {
    min-height: 42px;
    flex-basis: 42px;
    padding: 0.65rem 0.8rem;
    font-size: 0;
  }

  .attendance-page__header .attendance-button .iconify {
    width: 19px;
    height: 19px;
  }

  .attendance-filters {
    min-height: auto;
    padding: 1.5rem 1rem;
  }

  .attendance-filters__top,
  .attendance-filters__bottom {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .attendance-filters__bottom {
    grid-row: auto;
  }

  .attendance-filters__label,
  .attendance-field--year,
  .attendance-field--class,
  .attendance-field--subject {
    grid-column: 1;
    grid-row: auto;
    width: 100%;
  }

  .attendance-filters__label {
    min-height: auto;
    margin-bottom: 0.15rem;
  }

  .attendance-session {
    grid-template-columns: 1fr;
  }

  .attendance-session > div {
    justify-content: flex-start;
    min-height: 52px;
    padding: 0.65rem 1rem;
  }

  .attendance-register {
    padding: 1.5rem 1rem 0;
  }

  .attendance-toolbar {
    align-items: stretch;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .attendance-search {
    width: 100%;
  }

  .attendance-legend {
    justify-content: flex-start;
    gap: 0.75rem 1.15rem;
  }

  .attendance-actions {
    grid-template-columns: 1fr 1fr;
    min-height: auto;
    padding: 1rem 0;
  }

  .attendance-actions__state {
    grid-column: 1 / -1;
  }

  .attendance-actions .attendance-button {
    width: 100%;
    min-width: 0;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
  }
}

@media (max-width: 480px) {
  .attendance-breadcrumbs {
    font-size: 0.78rem;
  }

  .attendance-actions {
    grid-template-columns: 1fr;
  }

  .attendance-actions__state {
    grid-column: 1;
  }

  .attendance-actions .attendance-button--primary {
    grid-row: 2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .attendance-page *,
  .attendance-page *::before,
  .attendance-page *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
