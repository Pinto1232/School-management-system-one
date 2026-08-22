<script setup lang="ts">
import type { SchoolPerson } from '~/types'

const props = withDefaults(defineProps<{
  people: SchoolPerson[]
  loading?: boolean
  error?: string
  sample?: boolean
}>(), {
  loading: false,
  error: '',
  sample: false,
})

const emit = defineEmits<{
  save: [person: SchoolPerson]
  delete: [person: SchoolPerson]
}>()

const { uploadUrl } = useApi()
const query = ref('')
const modalOpen = ref(false)
const editingId = ref<string | null>(null)
const form = reactive<SchoolPerson>({
  id: '', name: '', email: '', role: 'Student', group: '', attendance: 100, status: 'Active',
})

const filtered = computed(() => {
  const value = query.value.trim().toLowerCase()
  if (!value) return props.people
  return props.people.filter(person => [person.name, person.email, person.role, person.group, person.status]
    .some(field => String(field).toLowerCase().includes(value)))
})

const openCreate = () => {
  editingId.value = null
  Object.assign(form, { id: '', name: '', email: '', role: 'Student', group: '', attendance: 100, status: 'Active', image: undefined })
  modalOpen.value = true
}

const openEdit = (person: SchoolPerson) => {
  editingId.value = person.id
  Object.assign(form, person)
  modalOpen.value = true
}

const save = () => {
  if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) return
  emit('save', {
    ...form,
    id: editingId.value || `local-${Date.now()}`,
    name: form.name.trim(),
    email: form.email.trim(),
    attendance: Math.min(100, Math.max(0, Number(form.attendance))),
  })
  modalOpen.value = false
}

const initials = (name: string) => name.split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase()

const exportCsv = () => {
  const header = ['Name', 'Email', 'Role', 'Group', 'Attendance', 'Status']
  const values = filtered.value.map(person => [person.name, person.email, person.role, person.group, person.attendance, person.status])
  const csv = [header, ...values]
    .map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(','))
    .join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'school-people.csv'
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <section>
    <div class="page-toolbar">
      <div class="page-toolbar__search">
        <Icon name="ph:magnifying-glass" size="19" aria-hidden="true" />
        <input v-model="query" class="search-input" type="search" aria-label="Search people" placeholder="Search by name, email, role, or class">
      </div>
      <div style="display: flex; gap: 0.55rem; flex-wrap: wrap">
        <button class="button button--secondary" type="button" @click="exportCsv">
          <Icon name="ph:download-simple" size="19" aria-hidden="true" /> Export CSV
        </button>
        <button class="button button--primary" type="button" @click="openCreate">
          <Icon name="ph:plus" size="19" aria-hidden="true" /> Add person
        </button>
      </div>
    </div>

    <AppAlert v-if="error" type="info" :message="error" style="margin-bottom: 1rem" />
    <AppAlert v-else-if="sample" type="info" message="Live user records are unavailable, so sample records are shown. Local edits last for this session." style="margin-bottom: 1rem" />

    <div class="panel">
      <div v-if="loading" class="panel__body form-stack" aria-label="Loading people">
        <AppSkeleton v-for="index in 5" :key="index" height="54px" />
      </div>
      <div v-else-if="filtered.length" class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Person</th><th>Role</th><th>Class/Group</th><th>Attendance</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            <tr v-for="person in filtered" :key="person.id">
              <td>
                <div class="person-cell">
                  <div class="avatar">
                    <img v-if="person.image" :src="uploadUrl(person.image)" :alt="person.name">
                    <span v-else>{{ initials(person.name) }}</span>
                  </div>
                  <div><strong>{{ person.name }}</strong><span>{{ person.email }}</span></div>
                </div>
              </td>
              <td>{{ person.role }}</td>
              <td>{{ person.group }}</td>
              <td>{{ person.attendance }}%</td>
              <td><span class="status" :class="`status--${person.status.toLowerCase()}`">{{ person.status }}</span></td>
              <td>
                <div style="display: flex; gap: 0.35rem">
                  <button class="icon-button" type="button" :aria-label="`Edit ${person.name}`" @click="openEdit(person)">
                    <Icon name="ph:pencil-simple" size="18" aria-hidden="true" />
                  </button>
                  <button class="icon-button" type="button" :aria-label="`Delete ${person.name}`" @click="emit('delete', person)">
                    <Icon name="ph:trash" size="18" aria-hidden="true" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="empty-state">
        <Icon name="ph:users" aria-hidden="true" />
        <strong>No people found</strong>
        <span>Change the search or add a new school record.</span>
      </div>
    </div>

    <div v-if="modalOpen" class="modal-backdrop" role="presentation" @click.self="modalOpen = false">
      <section class="modal" role="dialog" aria-modal="true" :aria-label="editingId ? 'Edit person' : 'Add person'">
        <header class="modal__header">
          <h2>{{ editingId ? 'Edit person' : 'Add person' }}</h2>
          <button class="icon-button" type="button" aria-label="Close" @click="modalOpen = false"><Icon name="ph:x" /></button>
        </header>
        <form @submit.prevent="save">
          <div class="modal__body form-stack">
            <div class="field"><label for="person-name">Full name</label><input id="person-name" v-model="form.name" required type="text" placeholder="Full name"></div>
            <div class="field"><label for="person-email">Email address</label><input id="person-email" v-model="form.email" required type="email" placeholder="name@school.co.za"></div>
            <div class="form-grid">
              <div class="field"><label for="person-role">Role</label><select id="person-role" v-model="form.role"><option>Student</option><option>Teacher</option><option>Parent</option><option>Staff</option><option>Admin</option></select></div>
              <div class="field"><label for="person-group">Class or group</label><input id="person-group" v-model="form.group" type="text" placeholder="Grade 10A"></div>
            </div>
            <div class="form-grid">
              <div class="field"><label for="person-attendance">Attendance percentage</label><input id="person-attendance" v-model.number="form.attendance" type="number" min="0" max="100"></div>
              <div class="field"><label for="person-status">Status</label><select id="person-status" v-model="form.status"><option>Active</option><option>Pending</option><option>Inactive</option></select></div>
            </div>
          </div>
          <footer class="modal__footer">
            <button class="button button--secondary" type="button" @click="modalOpen = false">Cancel</button>
            <button class="button button--primary" type="submit">Save person</button>
          </footer>
        </form>
      </section>
    </div>
  </section>
</template>
