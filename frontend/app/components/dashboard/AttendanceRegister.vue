<script setup lang="ts">
import type { AttendanceStatus, AttendanceStudent, DataTableColumn, DataTableRow } from '~/types/dashboard'

const props = withDefaults(defineProps<{
  students: AttendanceStudent[]
  date: string
  title?: string
  description?: string
  loading?: boolean
  readonly?: boolean
  saving?: boolean
}>(), {
  title: 'Registo de presenças',
  description: 'Registe a situação de cada aluno antes de guardar.',
  loading: false,
  readonly: false,
  saving: false,
})

const emit = defineEmits<{
  save: [attendance: Record<string, AttendanceStatus>, date: string]
}>()

const attendance = defineModel<Record<string, AttendanceStatus>>({ default: () => ({}) })
const query = ref('')

const columns: DataTableColumn[] = [
  { key: 'student', label: 'Aluno', width: '42%' },
  { key: 'status', label: 'Presença' },
]

const statusOptions: Array<{ value: AttendanceStatus, label: string, icon: string, activeClass: string }> = [
  { value: 'present', label: 'Presente', icon: 'ph:check', activeClass: 'border-success/30 bg-success-soft text-success' },
  { value: 'late', label: 'Atrasado', icon: 'ph:clock', activeClass: 'border-warning/30 bg-warning-soft text-warning' },
  { value: 'absent', label: 'Ausente', icon: 'ph:x', activeClass: 'border-danger/30 bg-danger-soft text-danger' },
  { value: 'excused', label: 'Justificado', icon: 'ph:note', activeClass: 'border-navy-200 bg-navy-100 text-navy-700' },
]

const filteredStudents = computed(() => {
  const value = query.value.trim().toLocaleLowerCase('pt-PT')
  if (!value) return props.students
  return props.students.filter(student => `${student.name} ${student.secondary || ''}`.toLocaleLowerCase('pt-PT').includes(value))
})

const rows = computed<DataTableRow[]>(() => filteredStudents.value.map(student => ({
  id: student.id,
  student: student.name,
  secondary: student.secondary,
  image: student.image,
  status: attendance.value[student.id],
})))

const recordedCount = computed(() => props.students.filter(student => attendance.value[student.id]).length)
const allRecorded = computed(() => props.students.length > 0 && recordedCount.value === props.students.length)

const setStatus = (studentId: string, status: AttendanceStatus) => {
  if (props.readonly) return
  attendance.value = { ...attendance.value, [studentId]: status }
}

const markAllPresent = () => {
  if (props.readonly) return
  attendance.value = props.students.reduce<Record<string, AttendanceStatus>>((values, student) => {
    values[student.id] = 'present'
    return values
  }, {})
}

const save = () => {
  if (!allRecorded.value || props.readonly || props.saving) return
  emit('save', { ...attendance.value }, props.date)
}
</script>

<template>
  <DashboardSection :title="title" :description="description" flush :busy="loading || saving">
    <template #actions>
      <StatusBadge :label="`${recordedCount}/${students.length} registados`" :tone="allRecorded ? 'success' : 'neutral'" />
      <button class="button button--primary min-h-10 px-3 py-2 text-sm" type="button" :disabled="!allRecorded || readonly || saving" @click="save">
        <Icon v-if="saving" class="animate-spin motion-reduce:animate-none" name="ph:spinner-gap" size="18" aria-hidden="true" />
        <Icon v-else name="ph:floppy-disk" size="18" aria-hidden="true" />
        {{ saving ? 'A guardar' : 'Guardar' }}
      </button>
    </template>

    <div class="px-4 pb-4 min-[721px]:px-6 min-[721px]:pb-6">
      <FilterBar class="mb-4">
        <SearchInput v-model="query" placeholder="Pesquisar aluno" compact />
        <div class="flex flex-wrap items-center gap-2">
          <label class="sr-only" for="attendance-date">Data da presença</label>
          <input id="attendance-date" class="h-10 rounded-control border border-line bg-surface-strong px-3 text-sm text-ink outline-none focus:border-brand-400 focus:ring-3 focus:ring-brand-400/15" type="date" :value="date" disabled>
          <button class="button button--secondary min-h-10 px-3 py-2 text-sm" type="button" :disabled="readonly || !students.length" @click="markAllPresent">
            Marcar todos presentes
          </button>
        </div>
      </FilterBar>

      <div class="overflow-hidden rounded-xl border border-line">
        <DataTable
          :columns="columns"
          :rows="rows"
          :loading="loading"
          empty-title="Nenhum aluno encontrado"
          empty-description="Altere a pesquisa para ver outros alunos."
          caption="Lista de presenças dos alunos"
        >
          <template #cell-student="{ row }">
            <div class="flex min-w-0 items-center gap-3 text-left">
              <span class="grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-brand-100 text-xs font-black text-brand-800">
                <img v-if="row.image" class="size-full object-cover" :src="String(row.image)" :alt="String(row.student)">
                <span v-else aria-hidden="true">{{ String(row.student).split(/\s+/).slice(0, 2).map(part => part[0]).join('') }}</span>
              </span>
              <span class="min-w-0">
                <strong class="block overflow-hidden text-sm text-ellipsis whitespace-nowrap text-ink">{{ row.student }}</strong>
                <small v-if="row.secondary" class="mt-0.5 block overflow-hidden text-xs text-ellipsis whitespace-nowrap text-ink-soft">{{ row.secondary }}</small>
              </span>
            </div>
          </template>

          <template #cell-status="{ row }">
            <div class="flex min-w-[420px] flex-wrap gap-1.5" role="group" :aria-label="`Presença de ${row.student}`">
              <button
                v-for="option in statusOptions"
                :key="option.value"
                :class="[
                  'inline-flex min-h-9 items-center gap-1.5 rounded-control border px-2.5 py-1.5 text-xs font-bold transition active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60',
                  attendance[String(row.id)] === option.value
                    ? option.activeClass
                    : 'border-line bg-surface-strong text-ink-soft hover:border-line-strong hover:bg-surface',
                ]"
                type="button"
                :disabled="readonly"
                :aria-pressed="attendance[String(row.id)] === option.value"
                @click="setStatus(String(row.id), option.value)"
              >
                <Icon :name="option.icon" size="15" aria-hidden="true" />
                {{ option.label }}
              </button>
            </div>
          </template>
        </DataTable>
      </div>
    </div>
  </DashboardSection>
</template>
