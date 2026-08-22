<script setup lang="ts">
import { samplePeople } from '~/data/school'
import type { SchoolPerson, User } from '~/types'

const props = defineProps<{ view: string }>()
const { request } = useApi()

const people = ref<SchoolPerson[]>(samplePeople.map(person => ({ ...person })))
const loading = ref(false)
const loadError = ref('')
const usingSample = ref(true)

interface UsersResponse {
  data: Array<User & { _id?: string; image?: string }>
  pageInfo?: { totalUsers?: number }
}

const normaliseUser = (user: User & { _id?: string }): SchoolPerson => ({
  id: String(user.id || user._id || `user-${Date.now()}`),
  name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
  email: user.email,
  role: user.role ? user.role.replace(/^./, value => value.toUpperCase()) : 'User',
  group: user.role === 'teacher' ? 'Teaching staff' : 'School community',
  attendance: 100,
  status: 'Active',
  image: user.image,
})

const loadPeople = async () => {
  if (!['dashboard', 'students'].includes(props.view)) return
  loading.value = true
  loadError.value = ''
  try {
    const response = await request<UsersResponse>('/users')
    people.value = Array.isArray(response.data) ? response.data.map(normaliseUser) : []
    usingSample.value = false
  } catch (error) {
    loadError.value = 'Live user records could not be loaded. Sample records are available so the workspace remains usable.'
    usingSample.value = true
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
  const confirmed = window.confirm(`Delete ${person.name} from this view?`)
  if (!confirmed) return

  if (!usingSample.value && !person.id.startsWith('local-')) {
    try {
      await request(`/users/user/${encodeURIComponent(person.id)}`, { method: 'DELETE' })
    } catch (error) {
      loadError.value = getApiErrorMessage(error, 'The user could not be deleted.')
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
      <DashboardOverview :people-count="people.length" :sample="usingSample" />
      <section style="margin-top: 1rem">
        <div class="dashboard-welcome" style="margin-bottom: 1rem">
          <div><h2 style="font-size: 1.4rem">School directory</h2><p>Search, add, update, export, or remove people records.</p></div>
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
    </template>
    <StudentWorkspace v-else-if="view === 'students'" :people="people" />
    <DashboardFeature v-else :slug="view" />
  </div>
</template>
