<script setup lang="ts">
import type { SchoolPerson, User } from '~/types'

const props = defineProps<{ view: string }>()
const { request } = useApi()
const { roles } = useAuth()

const people = ref<SchoolPerson[]>([])
const loading = ref(false)
const loadError = ref('')
const usingSample = ref(false)
const canManagePeople = computed(() => roles.value.some(role => ['platform_admin', 'admin', 'teacher', 'staff'].includes(role)))

interface UsersResponse {
  data: Array<User & { _id?: string; image?: string }>
  pageInfo?: { totalUsers?: number }
}

const normaliseUser = (user: User & { _id?: string }): SchoolPerson => ({
  id: String(user.id || user._id || `user-${Date.now()}`),
  name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
  email: user.email,
  role: user.role === 'teacher' ? 'Professor' : user.role === 'student' ? 'Aluno' : user.role === 'parent' ? 'Encarregado de educação' : 'Utilizador',
  group: user.role === 'teacher' ? 'Corpo docente' : 'Comunidade escolar',
  attendance: 100,
  status: 'Ativo',
  image: user.image,
})

const loadPeople = async () => {
  if (!canManagePeople.value || !['dashboard', 'students'].includes(props.view)) return
  loading.value = true
  loadError.value = ''
  try {
    const response = await request<UsersResponse>('/users')
    people.value = Array.isArray(response.data) ? response.data.map(normaliseUser) : []
    usingSample.value = false
  } catch (error) {
    people.value = []
    loadError.value = getApiErrorMessage(error, 'Não foi possível carregar os registos em tempo real.')
  } finally {
    loading.value = false
  }
}

const savePerson = (person: SchoolPerson) => {
  const index = people.value.findIndex(item => item.id === person.id)
  if (index >= 0) people.value[index] = person
  else people.value.unshift(person)
}

const deletePerson = async (person: SchoolPerson) => {
  const confirmed = window.confirm(`Eliminar ${person.name} desta vista?`)
  if (!confirmed) return

  if (!usingSample.value && !person.id.startsWith('local-')) {
    try {
      await request(`/users/user/${encodeURIComponent(person.id)}`, { method: 'DELETE' })
    } catch (error) {
      loadError.value = getApiErrorMessage(error, 'Não foi possível eliminar o utilizador.')
      return
    }
  }
  people.value = people.value.filter(item => item.id !== person.id)
}

onMounted(loadPeople)
</script>

<template>
  <div>
    <template v-if="view === 'dashboard'">
      <DashboardOverview v-if="canManagePeople" :people-count="people.length" :sample="false" />
      <section v-if="canManagePeople" class="dashboard-directory">
        <div class="dashboard-welcome dashboard-welcome--compact">
          <div><h2>Diretório escolar</h2><p>Pesquise, adicione, atualize, exporte ou remova registos de pessoas.</p></div>
        </div>
        <PeopleTable
          :people="people"
          :loading="loading"
          :error="loadError"
          :sample="usingSample"
          @save="savePerson"
          @delete="deletePerson"
        />
      </section>
      <section v-else class="panel">
        <h2>Bem-vindo ao seu espaço escolar</h2>
        <p>Utilize a navegação para abrir as áreas disponíveis para a sua função.</p>
      </section>
    </template>
    <StudentWorkspace v-else-if="view === 'students'" :people="people" />
    <DashboardFeature v-else :slug="view" />
  </div>
</template>
