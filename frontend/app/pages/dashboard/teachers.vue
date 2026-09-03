<script setup lang="ts">
interface TeacherRecord {
  id: string
  name: string
  email: string
  phone: string
  department: string
  subjects: string[]
  workload: number
  active: boolean
  isNew: boolean
  lastActivity: string
  avatarTone: string
}

interface NewTeacherForm {
  name: string
  email: string
  phone: string
  department: string
  subject: string
  workload: number
}

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  alias: ['/dashboard/professores'],
})

useSeoMeta({ title: 'Professores', robots: 'noindex' })

const toast = useToast()
const route = useRoute()
const pageSize = 3
const isTeacherRegistrationRoute = computed(() => route.path === '/dashboard/teachers/new')

const seedTeachers: TeacherRecord[] = [
  {
    id: 'teacher-1',
    name: 'Carlos Almeida',
    email: 'carlos.almeida@lusivo.pt',
    phone: '+351 912 345 678',
    department: 'Matemática',
    subjects: ['Álgebra', 'Geometria'],
    workload: 22,
    active: true,
    isNew: false,
    lastActivity: 'Há 2 horas',
    avatarTone: 'avatar-teal',
  },
  {
    id: 'teacher-2',
    name: 'Marta Sousa',
    email: 'marta.sousa@lusivo.pt',
    phone: '+351 913 608 421',
    department: 'Ciências',
    subjects: ['Biologia', 'Química'],
    workload: 24,
    active: true,
    isNew: true,
    lastActivity: 'Há 35 minutos',
    avatarTone: 'avatar-blue',
  },
  {
    id: 'teacher-3',
    name: 'João Ribeiro',
    email: 'joao.ribeiro@lusivo.pt',
    phone: '+351 914 052 839',
    department: 'Artes',
    subjects: ['História da Arte', 'Desenho'],
    workload: 20,
    active: false,
    isNew: false,
    lastActivity: 'Há 3 dias',
    avatarTone: 'avatar-coral',
  },
]

const firstNames = [
  'Inês', 'Tiago', 'Leonor', 'Miguel', 'Beatriz', 'Tomás', 'Mariana', 'Gonçalo', 'Sofia', 'Diogo',
  'Carolina', 'Afonso', 'Rita', 'Duarte', 'Catarina', 'Martim', 'Madalena', 'Francisco', 'Joana', 'Pedro',
  'Ana', 'Rodrigo', 'Teresa', 'Rafael', 'Luísa', 'André', 'Cláudia', 'Nuno', 'Patrícia', 'Bruno',
  'Helena', 'Ricardo', 'Mónica', 'Vasco', 'Susana', 'Eduardo', 'Daniela', 'Paulo', 'Filipa',
]

const lastNames = [
  'Ferreira', 'Costa', 'Martins', 'Correia', 'Lopes', 'Mendes', 'Pereira', 'Rodrigues', 'Santos', 'Oliveira',
  'Gomes', 'Marques', 'Carvalho', 'Nunes', 'Matos', 'Teixeira', 'Vieira', 'Monteiro', 'Barbosa', 'Moreira',
  'Pinto', 'Coelho', 'Neves', 'Cardoso', 'Faria', 'Tavares', 'Fonseca', 'Moura', 'Cunha', 'Reis',
  'Machado', 'Baptista', 'Rocha', 'Azevedo', 'Freitas', 'Campos', 'Antunes', 'Borges', 'Leal',
]

const departmentSubjects: Record<string, string[]> = {
  Matemática: ['Álgebra', 'Geometria', 'Estatística'],
  Ciências: ['Biologia', 'Química', 'Física'],
  Artes: ['Desenho', 'História da Arte', 'Expressão Plástica'],
  Humanidades: ['História', 'Geografia', 'Filosofia'],
  Línguas: ['Português', 'Inglês', 'Francês'],
  Tecnologia: ['Informática', 'Robótica', 'Multimédia'],
}

const departments = Object.keys(departmentSubjects)
const avatarTones = ['avatar-navy', 'avatar-teal', 'avatar-blue', 'avatar-mint', 'avatar-coral', 'avatar-violet']

const generatedTeachers: TeacherRecord[] = firstNames.map((firstName, index) => {
  const lastName = lastNames[index]
  const name = `${firstName} ${lastName}`
  const department = departments[index % departments.length]!
  const subjectOptions = departmentSubjects[department]!
  const subjects = [
    subjectOptions[index % subjectOptions.length]!,
    subjectOptions[(index + 1) % subjectOptions.length]!,
  ]

  return {
    id: `teacher-${index + 4}`,
    name,
    email: `${firstName}.${lastName}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() + '@lusivo.pt',
    phone: `+351 91${(5000000 + index * 7319).toString().padStart(7, '0').slice(0, 7)}`,
    department,
    subjects,
    workload: [20, 22, 24, 21, 23, 22][index % 6]!,
    active: ![8, 19, 30].includes(index),
    isNew: [5, 16, 27, 36].includes(index),
    lastActivity: index % 5 === 0 ? 'Ontem' : `Há ${(index % 9) + 1} horas`,
    avatarTone: avatarTones[index % avatarTones.length]!,
  }
})

const teachers = ref<TeacherRecord[]>([...seedTeachers, ...generatedTeachers])
const query = ref('')
const departmentFilter = ref('')
const statusFilter = ref('')
const subjectFilter = ref('')
const minimumWorkload = ref<number | ''>('')
const currentPage = ref(1)
const showMoreFilters = ref(false)
const addTeacherOpen = ref(false)
const openMenuId = ref<string | null>(null)

const newTeacher = reactive<NewTeacherForm>({
  name: '',
  email: '',
  phone: '',
  department: '',
  subject: '',
  workload: 22,
})

onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem('lusivo-added-teachers') || '[]')
    if (!Array.isArray(saved)) return

    const storedTeachers = saved.filter((record): record is TeacherRecord => (
      record
      && typeof record.id === 'string'
      && typeof record.name === 'string'
      && typeof record.email === 'string'
      && typeof record.phone === 'string'
      && typeof record.department === 'string'
      && Array.isArray(record.subjects)
      && typeof record.workload === 'number'
      && typeof record.active === 'boolean'
    ))

    const storedIds = new Set(storedTeachers.map(teacher => teacher.id))
    teachers.value = [...storedTeachers, ...teachers.value.filter(teacher => !storedIds.has(teacher.id))]
  }
  catch {
    localStorage.removeItem('lusivo-added-teachers')
  }
})

const totalTeachers = computed(() => teachers.value.length)
const activeTeachers = computed(() => teachers.value.filter(teacher => teacher.active).length)
const newHires = computed(() => teachers.value.filter(teacher => teacher.isNew).length)
const averageWorkload = computed(() => {
  if (!teachers.value.length) return 0
  return Math.round(teachers.value.reduce((total, teacher) => total + teacher.workload, 0) / teachers.value.length)
})

const allSubjects = computed(() => [...new Set(teachers.value.flatMap(teacher => teacher.subjects))].sort((a, b) => a.localeCompare(b, 'pt-PT')))

const normalizedQuery = computed(() => query.value.trim().toLocaleLowerCase('pt-PT'))
const filteredTeachers = computed(() => teachers.value.filter((teacher) => {
  const matchesQuery = !normalizedQuery.value || [
    teacher.name,
    teacher.email,
    teacher.department,
    ...teacher.subjects,
  ].some(value => value.toLocaleLowerCase('pt-PT').includes(normalizedQuery.value))
  const matchesDepartment = !departmentFilter.value || teacher.department === departmentFilter.value
  const matchesStatus = !statusFilter.value || (statusFilter.value === 'active' ? teacher.active : !teacher.active)
  const matchesSubject = !subjectFilter.value || teacher.subjects.includes(subjectFilter.value)
  const matchesWorkload = minimumWorkload.value === '' || teacher.workload >= minimumWorkload.value

  return matchesQuery && matchesDepartment && matchesStatus && matchesSubject && matchesWorkload
}))

const pageCount = computed(() => Math.max(1, Math.ceil(filteredTeachers.value.length / pageSize)))
const pageTeachers = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredTeachers.value.slice(start, start + pageSize)
})
const firstResult = computed(() => filteredTeachers.value.length ? (currentPage.value - 1) * pageSize + 1 : 0)
const lastResult = computed(() => Math.min(currentPage.value * pageSize, filteredTeachers.value.length))
const activeFilterCount = computed(() => [
  departmentFilter.value,
  statusFilter.value,
  subjectFilter.value,
  minimumWorkload.value,
].filter(value => value !== '').length)

const paginationItems = computed<Array<number | 'ellipsis-start' | 'ellipsis-end'>>(() => {
  if (pageCount.value <= 5) return Array.from({ length: pageCount.value }, (_, index) => index + 1)
  if (currentPage.value <= 2) return [1, 2, 3, 'ellipsis-end']
  if (currentPage.value >= pageCount.value - 1) return ['ellipsis-start', pageCount.value - 2, pageCount.value - 1, pageCount.value]
  return ['ellipsis-start', currentPage.value - 1, currentPage.value, currentPage.value + 1, 'ellipsis-end']
})

watch([query, departmentFilter, statusFilter, subjectFilter, minimumWorkload], () => {
  currentPage.value = 1
  openMenuId.value = null
})

watch(pageCount, (count) => {
  if (currentPage.value > count) currentPage.value = count
})

const initials = (name: string) => name
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map(part => part[0])
  .join('')
  .toUpperCase()

const departmentTone = (department: string) => ({
  Matemática: 'department-math',
  Ciências: 'department-science',
  Artes: 'department-arts',
  Humanidades: 'department-humanities',
  Línguas: 'department-languages',
  Tecnologia: 'department-technology',
}[department] || 'department-neutral')

const setPage = (page: number) => {
  if (page < 1 || page > pageCount.value || page === currentPage.value) return
  currentPage.value = page
  openMenuId.value = null
}

const clearFilters = () => {
  departmentFilter.value = ''
  statusFilter.value = ''
  subjectFilter.value = ''
  minimumWorkload.value = ''
}

const toggleStatus = (teacher: TeacherRecord) => {
  teacher.active = !teacher.active
  toast.success(
    teacher.active ? 'Professor ativado' : 'Professor desativado',
    `${teacher.name} está agora ${teacher.active ? 'ativo' : 'inativo'} no diretório.`,
  )
}

const exportTeachers = () => {
  if (!import.meta.client) return

  const quote = (value: string | number) => `"${String(value).replaceAll('"', '""')}"`
  const lines = [
    ['Professor', 'Email', 'Telefone', 'Departamento', 'Disciplinas', 'Estado', 'Carga horária'],
    ...filteredTeachers.value.map(teacher => [
      teacher.name,
      teacher.email,
      teacher.phone,
      teacher.department,
      teacher.subjects.join(', '),
      teacher.active ? 'Ativo' : 'Inativo',
      `${teacher.workload}h`,
    ]),
  ].map(row => row.map(quote).join(';')).join('\n')

  const blob = new Blob([`\uFEFF${lines}`], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'professores-lusivo.csv'
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
  toast.success('Exportação concluída', `${filteredTeachers.value.length} registos foram exportados em CSV.`)
}

const resetNewTeacher = () => {
  Object.assign(newTeacher, {
    name: '',
    email: '',
    phone: '',
    department: '',
    subject: '',
    workload: 22,
  })
}

const addTeacher = () => {
  const record: TeacherRecord = {
    id: `teacher-${Date.now()}`,
    name: newTeacher.name.trim(),
    email: newTeacher.email.trim().toLowerCase(),
    phone: newTeacher.phone.trim(),
    department: newTeacher.department,
    subjects: [newTeacher.subject.trim()],
    workload: Number(newTeacher.workload),
    active: true,
    isNew: true,
    lastActivity: 'Agora',
    avatarTone: avatarTones[teachers.value.length % avatarTones.length]!,
  }

  teachers.value = [record, ...teachers.value]
  clearFilters()
  query.value = ''
  currentPage.value = 1
  addTeacherOpen.value = false
  resetNewTeacher()
  toast.success('Professor adicionado', `${record.name} foi adicionado ao diretório.`)
}

const handleRowAction = (teacher: TeacherRecord, action: 'profile' | 'edit') => {
  openMenuId.value = null
  toast.info(
    action === 'profile' ? 'Perfil do professor' : 'Editar professor',
    `${teacher.name}: esta ação será ligada ao respetivo fluxo de gestão.`,
  )
}

const openTeacherRegistration = () => navigateTo('/dashboard/teachers/new')
</script>

<template>
  <NuxtPage v-if="isTeacherRegistrationRoute" />

  <section v-else class="teachers-page" aria-labelledby="teachers-title">
    <header class="teachers-header">
      <div class="teachers-heading">
        <h1 id="teachers-title">Professores</h1>
        <p>
          <Icon name="ph:users-three" size="20" aria-hidden="true" />
          Total de {{ totalTeachers }} professores registados
        </p>
      </div>

      <div class="teachers-actions">
        <button class="teachers-button teachers-button--secondary" type="button" @click="exportTeachers">
          <Icon name="ph:download-simple" size="19" aria-hidden="true" />
          Exportar
        </button>
        <button class="teachers-button teachers-button--primary" type="button" @click="openTeacherRegistration">
          <Icon name="ph:plus" size="20" aria-hidden="true" />
          Adicionar professor
        </button>
      </div>
    </header>

    <section class="teacher-metrics" aria-label="Resumo dos professores">
      <article class="teacher-metric">
        <span class="teacher-metric__icon teacher-metric__icon--brand">
          <Icon name="ph:users-three" size="24" aria-hidden="true" />
        </span>
        <div>
          <p>Total de professores</p>
          <strong>{{ totalTeachers }}</strong>
        </div>
      </article>

      <article class="teacher-metric">
        <span class="teacher-metric__icon teacher-metric__icon--success">
          <Icon name="ph:check-circle" size="24" aria-hidden="true" />
        </span>
        <div>
          <p>Docentes ativos</p>
          <strong>{{ activeTeachers }}</strong>
        </div>
      </article>

      <article class="teacher-metric">
        <span class="teacher-metric__icon teacher-metric__icon--info">
          <Icon name="ph:user-plus" size="24" aria-hidden="true" />
        </span>
        <div>
          <p>Novas contratações</p>
          <strong>{{ newHires }}</strong>
        </div>
      </article>

      <article class="teacher-metric">
        <span class="teacher-metric__icon teacher-metric__icon--neutral">
          <Icon name="ph:clock" size="24" aria-hidden="true" />
        </span>
        <div>
          <p>Carga horária média</p>
          <strong>{{ averageWorkload }}h</strong>
        </div>
      </article>
    </section>

    <section class="teachers-filters" aria-label="Pesquisa e filtros">
      <SearchInput
        v-model="query"
        label="Pesquisar professores"
        placeholder="Procurar por nome ou disciplina..."
        @clear="query = ''"
      />

      <div class="teachers-filters__controls">
        <label class="teachers-select">
          <span class="sr-only">Departamento</span>
          <select v-model="departmentFilter" aria-label="Filtrar por departamento">
            <option value="">Departamento</option>
            <option v-for="department in departments" :key="department" :value="department">{{ department }}</option>
          </select>
          <Icon class="teachers-select__icon" name="ph:caret-down" size="15" aria-hidden="true" />
        </label>

        <label class="teachers-select teachers-select--status">
          <span class="sr-only">Estado</span>
          <select v-model="statusFilter" aria-label="Filtrar por estado">
            <option value="">Estado</option>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
          <Icon class="teachers-select__icon" name="ph:caret-down" size="15" aria-hidden="true" />
        </label>

        <button
          :class="['teachers-button teachers-button--filter', showMoreFilters && 'is-active']"
          type="button"
          :aria-expanded="showMoreFilters"
          aria-controls="additional-teacher-filters"
          @click="showMoreFilters = !showMoreFilters"
        >
          <Icon name="ph:funnel-simple" size="18" aria-hidden="true" />
          Mais filtros
          <span v-if="activeFilterCount" class="filter-count">{{ activeFilterCount }}</span>
        </button>
      </div>

      <div v-if="showMoreFilters" id="additional-teacher-filters" class="teachers-filters__additional">
        <label>
          <span>Disciplina</span>
          <select v-model="subjectFilter">
            <option value="">Todas as disciplinas</option>
            <option v-for="subject in allSubjects" :key="subject" :value="subject">{{ subject }}</option>
          </select>
        </label>

        <label>
          <span>Carga horária mínima</span>
          <select v-model="minimumWorkload">
            <option value="">Qualquer carga horária</option>
            <option :value="20">20 horas</option>
            <option :value="22">22 horas</option>
            <option :value="24">24 horas</option>
          </select>
        </label>

        <button v-if="activeFilterCount" class="teachers-clear-filters" type="button" @click="clearFilters">
          Limpar filtros
        </button>
      </div>
    </section>

    <section class="teachers-directory" aria-label="Diretório de professores">
      <div v-if="pageTeachers.length" class="teachers-table-wrap">
        <table class="teachers-table">
          <caption class="sr-only">Lista de professores registados</caption>
          <thead>
            <tr>
              <th scope="col">Foto</th>
              <th scope="col">Professor</th>
              <th scope="col">Contacto</th>
              <th scope="col">Departamento</th>
              <th scope="col">Disciplinas</th>
              <th class="teachers-table__center" scope="col">Estado</th>
              <th scope="col">Última atividade</th>
              <th scope="col"><span class="sr-only">Ações</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="teacher in pageTeachers" :key="teacher.id">
              <td>
                <span :class="['teacher-avatar', teacher.avatarTone]" aria-hidden="true">{{ initials(teacher.name) }}</span>
              </td>
              <td>
                <strong class="teacher-name">{{ teacher.name }}</strong>
              </td>
              <td>
                <a class="teacher-contact" :href="`mailto:${teacher.email}`">{{ teacher.email }}</a>
                <a class="teacher-contact teacher-contact--secondary" :href="`tel:${teacher.phone.replaceAll(' ', '')}`">{{ teacher.phone }}</a>
              </td>
              <td>
                <span :class="['department-tag', departmentTone(teacher.department)]">{{ teacher.department }}</span>
              </td>
              <td>
                <div class="subject-tags">
                  <span v-for="subject in teacher.subjects" :key="subject">{{ subject }}</span>
                </div>
              </td>
              <td class="teachers-table__center">
                <button
                  :class="['status-switch', teacher.active && 'is-active']"
                  type="button"
                  role="switch"
                  :aria-checked="teacher.active"
                  :aria-label="`${teacher.active ? 'Desativar' : 'Ativar'} ${teacher.name}`"
                  @click="toggleStatus(teacher)"
                >
                  <span />
                </button>
              </td>
              <td>
                <span class="teacher-activity">{{ teacher.lastActivity }}</span>
              </td>
              <td class="teacher-row-actions">
                <button
                  class="teacher-menu-button"
                  type="button"
                  :aria-label="`Abrir ações de ${teacher.name}`"
                  :aria-expanded="openMenuId === teacher.id"
                  @click="openMenuId = openMenuId === teacher.id ? null : teacher.id"
                >
                  <Icon name="ph:dots-three-vertical" size="21" aria-hidden="true" />
                </button>
                <div v-if="openMenuId === teacher.id" class="teacher-row-menu">
                  <button type="button" @click="handleRowAction(teacher, 'profile')">
                    <Icon name="ph:user" size="17" aria-hidden="true" />
                    Ver perfil
                  </button>
                  <button type="button" @click="handleRowAction(teacher, 'edit')">
                    <Icon name="ph:pencil-simple" size="17" aria-hidden="true" />
                    Editar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="pageTeachers.length" class="teachers-mobile-list">
        <article v-for="teacher in pageTeachers" :key="teacher.id" class="teacher-mobile-card">
          <div class="teacher-mobile-card__header">
            <span :class="['teacher-avatar', teacher.avatarTone]" aria-hidden="true">{{ initials(teacher.name) }}</span>
            <div>
              <strong class="teacher-name">{{ teacher.name }}</strong>
              <a class="teacher-contact" :href="`mailto:${teacher.email}`">{{ teacher.email }}</a>
            </div>
            <button
              :class="['status-switch', teacher.active && 'is-active']"
              type="button"
              role="switch"
              :aria-checked="teacher.active"
              :aria-label="`${teacher.active ? 'Desativar' : 'Ativar'} ${teacher.name}`"
              @click="toggleStatus(teacher)"
            >
              <span />
            </button>
          </div>

          <dl>
            <div>
              <dt>Departamento</dt>
              <dd><span :class="['department-tag', departmentTone(teacher.department)]">{{ teacher.department }}</span></dd>
            </div>
            <div>
              <dt>Carga horária</dt>
              <dd>{{ teacher.workload }}h</dd>
            </div>
            <div>
              <dt>Disciplinas</dt>
              <dd class="subject-tags"><span v-for="subject in teacher.subjects" :key="subject">{{ subject }}</span></dd>
            </div>
            <div>
              <dt>Última atividade</dt>
              <dd>{{ teacher.lastActivity }}</dd>
            </div>
          </dl>
        </article>
      </div>

      <EmptyState
        v-if="!pageTeachers.length"
        title="Nenhum professor encontrado"
        description="Ajuste a pesquisa ou limpe os filtros para voltar a ver o diretório."
        icon="ph:chalkboard-teacher"
        compact
      >
        <button v-if="query || activeFilterCount" class="teachers-button teachers-button--secondary" type="button" @click="query = ''; clearFilters()">
          Limpar pesquisa e filtros
        </button>
      </EmptyState>

      <nav v-if="pageTeachers.length" class="teachers-pagination" aria-label="Paginação dos professores">
        <p>Mostrando {{ firstResult }} a {{ lastResult }} de {{ filteredTeachers.length }} resultados</p>
        <div>
          <button
            class="pagination-arrow"
            type="button"
            aria-label="Página anterior"
            :disabled="currentPage === 1"
            @click="setPage(currentPage - 1)"
          >
            <Icon name="ph:caret-left" size="17" aria-hidden="true" />
          </button>

          <template v-for="item in paginationItems" :key="item">
            <span v-if="typeof item !== 'number'" class="pagination-ellipsis" aria-hidden="true">...</span>
            <button
              v-else
              :class="['pagination-page', currentPage === item && 'is-current']"
              type="button"
              :aria-current="currentPage === item ? 'page' : undefined"
              :aria-label="`Página ${item}`"
              @click="setPage(item)"
            >
              {{ item }}
            </button>
          </template>

          <button
            class="pagination-arrow"
            type="button"
            aria-label="Página seguinte"
            :disabled="currentPage === pageCount"
            @click="setPage(currentPage + 1)"
          >
            <Icon name="ph:caret-right" size="17" aria-hidden="true" />
          </button>
        </div>
      </nav>
    </section>

    <BaseModal
      v-model="addTeacherOpen"
      title="Adicionar professor"
      description="Preencha os dados principais para criar um novo registo no diretório."
      size="md"
    >
      <form id="add-teacher-form" class="add-teacher-form" @submit.prevent="addTeacher">
        <label>
          <span>Nome completo</span>
          <input v-model="newTeacher.name" type="text" autocomplete="name" placeholder="Nome do professor" required autofocus>
        </label>

        <label>
          <span>Email</span>
          <input v-model="newTeacher.email" type="email" autocomplete="email" placeholder="nome@lusivo.pt" required>
        </label>

        <label>
          <span>Telefone</span>
          <input v-model="newTeacher.phone" type="tel" autocomplete="tel" placeholder="+351 900 000 000" required>
        </label>

        <label>
          <span>Departamento</span>
          <select v-model="newTeacher.department" required>
            <option value="" disabled>Selecionar departamento</option>
            <option v-for="department in departments" :key="department" :value="department">{{ department }}</option>
          </select>
        </label>

        <label>
          <span>Disciplina principal</span>
          <input v-model="newTeacher.subject" type="text" placeholder="Ex: Matemática" required>
        </label>

        <label>
          <span>Carga horária semanal</span>
          <input v-model="newTeacher.workload" type="number" min="1" max="45" inputmode="numeric" required>
        </label>
      </form>

      <template #footer="{ close }">
        <button class="teachers-button teachers-button--secondary" type="button" @click="close">Cancelar</button>
        <button class="teachers-button teachers-button--primary" type="submit" form="add-teacher-form">
          <Icon name="ph:plus" size="19" aria-hidden="true" />
          Adicionar professor
        </button>
      </template>
    </BaseModal>
  </section>
</template>

<style scoped>
.teachers-page {
  width: 100%;
  color: var(--color-ink);
}

.teachers-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
}

.teachers-heading h1 {
  margin: 0;
  font-family: var(--font-header);
  font-size: clamp(2rem, 3vw, 2.55rem);
  font-weight: 800;
  letter-spacing: -0.04em;
}

.teachers-heading p {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0.55rem 0 0;
  color: var(--color-ink-soft);
  font-size: 1rem;
  font-weight: 500;
}

.teachers-actions {
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 4vw, 9rem);
  padding-top: 0.25rem;
}

.teachers-button {
  display: inline-flex;
  min-height: 3rem;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  border: 1px solid transparent;
  border-radius: 0.65rem;
  padding: 0.75rem 1.4rem;
  font-size: 0.94rem;
  font-weight: 750;
  line-height: 1;
  white-space: nowrap;
  transition: transform 150ms ease, border-color 150ms ease, background-color 150ms ease, color 150ms ease;
}

.teachers-button:hover {
  transform: translateY(-1px);
}

.teachers-button:active {
  transform: translateY(1px);
}

.teachers-button--primary {
  min-width: 13.5rem;
  background: var(--color-brand-600);
  color: #f7fffd;
}

.teachers-button--primary:hover {
  background: var(--color-brand-700);
}

.teachers-button--secondary,
.teachers-button--filter {
  border-color: var(--color-line-strong);
  background: var(--color-surface-strong);
  color: var(--color-ink);
  box-shadow: var(--shadow-dashboard-control);
}

.teachers-button--secondary:hover,
.teachers-button--filter:hover,
.teachers-button--filter.is-active {
  border-color: var(--color-brand-500);
  background: var(--color-brand-50);
  color: var(--color-brand-800);
}

.teacher-metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2.4rem;
}

.teacher-metric {
  display: flex;
  min-width: 0;
  min-height: 7.5rem;
  align-items: center;
  gap: 1rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-surface);
  background: var(--color-surface-strong);
  padding: 1.15rem 1.35rem;
  box-shadow: var(--shadow-dashboard-control);
}

.teacher-metric__icon {
  display: grid;
  width: 3.15rem;
  height: 3.15rem;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
}

.teacher-metric__icon--brand {
  background: var(--color-brand-50);
  color: var(--color-brand-600);
}

.teacher-metric__icon--success {
  background: var(--color-brand-100);
  color: var(--color-brand-700);
}

.teacher-metric__icon--info {
  background: var(--color-navy-50);
  color: var(--color-navy-400);
}

.teacher-metric__icon--neutral {
  background: var(--color-surface-muted);
  color: var(--color-navy-800);
}

.teacher-metric p {
  max-width: 12ch;
  margin: 0;
  color: color-mix(in srgb, var(--color-ink) 76%, transparent);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.035em;
  line-height: 1.4;
  text-transform: uppercase;
}

.teacher-metric strong {
  display: block;
  margin-top: 0.18rem;
  font-family: var(--font-header);
  font-size: 1.8rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.035em;
}

.teachers-filters {
  display: grid;
  grid-template-columns: minmax(18rem, 1fr) auto;
  gap: 1rem 1.5rem;
  margin-top: 2rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-surface);
  background: var(--color-surface-strong);
  padding: 1.5rem;
  box-shadow: var(--shadow-dashboard-control);
}

.teachers-filters__controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.teachers-select {
  position: relative;
  display: block;
}

.teachers-select select,
.teachers-filters__additional select,
.add-teacher-form input,
.add-teacher-form select {
  width: 100%;
  min-height: 2.75rem;
  appearance: none;
  border: 1px solid var(--color-line-strong);
  border-radius: var(--radius-control);
  background: var(--color-surface);
  color: var(--color-ink);
  outline: none;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.teachers-select select {
  min-width: 9.2rem;
  padding: 0.65rem 2.25rem 0.65rem 0.85rem;
  font-size: 0.9rem;
}

.teachers-select--status select {
  min-width: 6.6rem;
}

.teachers-select__icon {
  position: absolute;
  top: 50%;
  right: 0.75rem;
  pointer-events: none;
  transform: translateY(-50%);
  color: var(--color-ink-soft);
}

.teachers-select select:focus,
.teachers-filters__additional select:focus,
.add-teacher-form input:focus,
.add-teacher-form select:focus {
  border-color: var(--color-brand-500);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-brand-400) 18%, transparent);
}

.teachers-button--filter {
  min-height: 2.75rem;
  padding: 0.65rem 0.95rem;
  box-shadow: none;
}

.filter-count {
  display: grid;
  min-width: 1.25rem;
  min-height: 1.25rem;
  place-items: center;
  border-radius: 999px;
  background: var(--color-brand-600);
  color: #f7fffd;
  font-size: 0.68rem;
}

.teachers-filters__additional {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 16rem)) auto;
  align-items: end;
  gap: 1rem;
  border-top: 1px solid var(--color-line);
  padding-top: 1rem;
}

.teachers-filters__additional label,
.add-teacher-form label {
  display: grid;
  gap: 0.45rem;
  min-width: 0;
  color: var(--color-ink);
  font-size: 0.82rem;
  font-weight: 750;
}

.teachers-filters__additional select,
.add-teacher-form input,
.add-teacher-form select {
  padding: 0.65rem 0.85rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.teachers-clear-filters {
  min-height: 2.75rem;
  border: 0;
  border-radius: var(--radius-control);
  background: transparent;
  padding: 0.65rem 0.85rem;
  color: var(--color-brand-700);
  font-size: 0.86rem;
  font-weight: 750;
}

.teachers-clear-filters:hover {
  background: var(--color-brand-50);
}

.teachers-directory {
  margin-top: 2rem;
  overflow: visible;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-surface);
  background: var(--color-surface-strong);
  box-shadow: var(--shadow-dashboard-control);
}

.teachers-table-wrap {
  overflow-x: auto;
  border-radius: var(--radius-surface) var(--radius-surface) 0 0;
  scrollbar-color: var(--color-line-strong) transparent;
  scrollbar-width: thin;
}

.teachers-table {
  width: 100%;
  min-width: 69rem;
  border-collapse: separate;
  border-spacing: 0;
  text-align: left;
}

.teachers-table th {
  height: 4.15rem;
  border-bottom: 1px solid var(--color-line);
  background: var(--color-surface);
  padding: 0.85rem 0.8rem;
  color: color-mix(in srgb, var(--color-ink) 72%, transparent);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.035em;
  line-height: 1.3;
  text-transform: uppercase;
}

.teachers-table th:first-child,
.teachers-table td:first-child {
  width: 5.4rem;
  padding-left: 1.5rem;
}

.teachers-table th:nth-child(2) {
  width: 11rem;
}

.teachers-table th:nth-child(3) {
  width: 14rem;
}

.teachers-table th:nth-child(4) {
  width: 10.5rem;
}

.teachers-table th:nth-child(5) {
  width: 13rem;
}

.teachers-table th:nth-child(6) {
  width: 6.5rem;
}

.teachers-table th:nth-child(7) {
  width: 8.4rem;
}

.teachers-table th:last-child,
.teachers-table td:last-child {
  width: 3.5rem;
  padding-right: 1rem;
}

.teachers-table td {
  height: 5.6rem;
  border-bottom: 1px solid var(--color-line);
  padding: 0.9rem 0.8rem;
  color: var(--color-ink);
  font-size: 0.88rem;
  vertical-align: middle;
}

.teachers-table tbody tr:last-child td {
  border-bottom: 0;
}

.teachers-table tbody tr {
  transition: background-color 150ms ease;
}

.teachers-table tbody tr:hover {
  background: color-mix(in srgb, var(--color-brand-50) 45%, var(--color-surface-strong));
}

.teachers-table__center {
  text-align: center;
}

.teacher-avatar {
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  place-items: center;
  overflow: hidden;
  border: 2px solid var(--color-surface-strong);
  border-radius: 50%;
  color: #f8fffd;
  font-size: 0.75rem;
  font-weight: 850;
  letter-spacing: 0.02em;
  box-shadow: 0 0 0 1px var(--color-line);
}

.avatar-teal { background: #168e86; }
.avatar-blue { background: #396aa8; }
.avatar-coral { background: #b55c55; }
.avatar-navy { background: #183d6e; }
.avatar-mint { background: #2d7b69; }
.avatar-violet { background: #6c6694; }

.teacher-name {
  display: block;
  max-width: 10rem;
  font-size: 0.92rem;
  font-weight: 800;
  line-height: 1.4;
}

.teacher-contact {
  display: block;
  max-width: 13rem;
  overflow: hidden;
  color: color-mix(in srgb, var(--color-ink) 83%, transparent);
  font-size: 0.85rem;
  line-height: 1.45;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.teacher-contact:hover {
  color: var(--color-brand-700);
  text-decoration: underline;
}

.teacher-contact--secondary {
  color: var(--color-ink-soft);
  font-size: 0.76rem;
}

.department-tag {
  display: inline-flex;
  min-height: 1.8rem;
  max-width: 100%;
  align-items: center;
  border-radius: 999px;
  padding: 0.34rem 0.8rem;
  font-size: 0.78rem;
  font-weight: 750;
  line-height: 1;
  white-space: nowrap;
}

.department-math { background: #dfe6ff; color: #1b3768; }
.department-science { background: #bff5ed; color: #075c58; }
.department-arts { background: #ffd9d5; color: #8f2924; }
.department-humanities { background: #f9e9bd; color: #79520b; }
.department-languages { background: #e5dcf7; color: #55417c; }
.department-technology { background: #d5edf7; color: #205c78; }
.department-neutral { background: var(--color-surface-muted); color: var(--color-ink-soft); }

:global(:root[data-theme='dark']) .department-math,
:global(:root[data-theme='dark']) .department-science,
:global(:root[data-theme='dark']) .department-arts,
:global(:root[data-theme='dark']) .department-humanities,
:global(:root[data-theme='dark']) .department-languages,
:global(:root[data-theme='dark']) .department-technology {
  filter: saturate(0.8) brightness(0.78);
  color: #f2f7ff;
}

.subject-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.subject-tags span {
  display: inline-flex;
  min-height: 1.45rem;
  align-items: center;
  border-radius: 0.3rem;
  background: var(--color-surface-muted);
  padding: 0.2rem 0.55rem;
  color: color-mix(in srgb, var(--color-ink) 78%, transparent);
  font-size: 0.71rem;
  line-height: 1;
  white-space: nowrap;
}

.status-switch {
  position: relative;
  width: 2.9rem;
  height: 1.7rem;
  border: 0;
  border-radius: 999px;
  background: var(--color-line);
  padding: 0.18rem;
  transition: background-color 180ms ease;
}

.status-switch span {
  display: block;
  width: 1.34rem;
  height: 1.34rem;
  border-radius: 50%;
  background: var(--color-surface-strong);
  box-shadow: 0 1px 3px rgb(0 20 55 / 0.22);
  transition: transform 180ms ease;
}

.status-switch.is-active {
  background: var(--color-brand-500);
}

.status-switch.is-active span {
  transform: translateX(1.2rem);
}

.teacher-activity {
  color: color-mix(in srgb, var(--color-ink) 82%, transparent);
  font-size: 0.84rem;
}

.teacher-row-actions {
  position: relative;
  text-align: right;
}

.teacher-menu-button {
  display: inline-grid;
  width: 2.25rem;
  height: 2.25rem;
  place-items: center;
  border: 0;
  border-radius: var(--radius-control);
  background: transparent;
  color: var(--color-ink-soft);
}

.teacher-menu-button:hover {
  background: var(--color-surface-muted);
  color: var(--color-ink);
}

.teacher-row-menu {
  position: absolute;
  top: calc(50% + 1.25rem);
  right: 0.75rem;
  z-index: 10;
  display: grid;
  width: 9.5rem;
  overflow: hidden;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-control);
  background: var(--color-surface-strong);
  padding: 0.35rem;
  box-shadow: var(--shadow-panel);
}

.teacher-row-menu button {
  display: flex;
  min-height: 2.35rem;
  align-items: center;
  gap: 0.55rem;
  border: 0;
  border-radius: 0.45rem;
  background: transparent;
  padding: 0.5rem 0.65rem;
  color: var(--color-ink);
  font-size: 0.8rem;
  font-weight: 650;
  text-align: left;
}

.teacher-row-menu button:hover {
  background: var(--color-surface-muted);
}

.teachers-pagination {
  display: flex;
  min-height: 4.3rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid var(--color-line);
  padding: 0.85rem 1.5rem;
}

.teachers-pagination p {
  margin: 0;
  color: color-mix(in srgb, var(--color-ink) 82%, transparent);
  font-size: 0.86rem;
}

.teachers-pagination > div {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.pagination-arrow,
.pagination-page,
.pagination-ellipsis {
  display: grid;
  width: 2.25rem;
  height: 2.25rem;
  place-items: center;
  border-radius: 0.35rem;
}

.pagination-arrow,
.pagination-page {
  border: 0;
  background: transparent;
  color: color-mix(in srgb, var(--color-ink) 80%, transparent);
  font-size: 0.86rem;
  font-weight: 750;
}

.pagination-arrow:hover:not(:disabled),
.pagination-page:hover:not(.is-current) {
  background: var(--color-surface-muted);
}

.pagination-arrow:disabled {
  cursor: not-allowed;
  opacity: 0.35;
}

.pagination-page.is-current {
  background: var(--color-brand-600);
  color: #f7fffd;
}

.pagination-ellipsis {
  color: var(--color-ink-soft);
  font-size: 0.85rem;
}

.teachers-mobile-list {
  display: none;
}

.add-teacher-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

@media (max-width: 79.999rem) {
  .teachers-actions {
    gap: 0.75rem;
  }

  .teacher-metric {
    padding: 1rem;
  }

  .teacher-metric__icon {
    width: 2.8rem;
    height: 2.8rem;
  }
}

@media (max-width: 63.999rem) {
  .teacher-metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .teachers-filters {
    grid-template-columns: 1fr;
  }

  .teachers-filters__controls {
    justify-content: flex-end;
  }
}

@media (max-width: 51.25rem) {
  .teachers-table-wrap {
    display: none;
  }

  .teachers-mobile-list {
    display: grid;
    gap: 0;
  }

  .teacher-mobile-card {
    padding: 1.2rem;
    border-bottom: 1px solid var(--color-line);
  }

  .teacher-mobile-card__header {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.8rem;
  }

  .teacher-mobile-card__header .teacher-contact,
  .teacher-mobile-card__header .teacher-name {
    max-width: 100%;
  }

  .teacher-mobile-card dl {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    margin: 1.1rem 0 0;
  }

  .teacher-mobile-card dl > div {
    min-width: 0;
  }

  .teacher-mobile-card dt {
    margin-bottom: 0.35rem;
    color: var(--color-ink-soft);
    font-size: 0.69rem;
    font-weight: 800;
    letter-spacing: 0.035em;
    text-transform: uppercase;
  }

  .teacher-mobile-card dd {
    margin: 0;
    font-size: 0.84rem;
  }

  .teachers-pagination {
    border-top: 0;
  }
}

@media (max-width: 45rem) {
  .teachers-header {
    display: grid;
  }

  .teachers-actions {
    width: 100%;
  }

  .teachers-actions .teachers-button {
    flex: 1 1 auto;
  }

  .teachers-button--primary {
    min-width: 0;
  }

  .teachers-filters__controls {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .teachers-select select {
    min-width: 0;
  }

  .teachers-button--filter {
    grid-column: 1 / -1;
  }

  .teachers-filters__additional {
    grid-template-columns: 1fr;
  }

  .teachers-pagination {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 34rem) {
  .teacher-metrics {
    grid-template-columns: 1fr;
    margin-top: 1.5rem;
  }

  .teacher-metric {
    min-height: 6.3rem;
  }

  .teachers-actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .teachers-filters {
    min-width: 0;
    margin-top: 1.5rem;
    padding: 1rem;
  }

  .teacher-mobile-card dl,
  .add-teacher-form {
    grid-template-columns: 1fr;
  }

  .teachers-pagination {
    padding-inline: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .teachers-button,
  .teachers-table tbody tr,
  .status-switch,
  .status-switch span {
    transition: none;
  }
}
</style>
