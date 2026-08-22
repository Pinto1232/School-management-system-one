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
  id: '', name: '', email: '', role: 'Aluno', group: '', attendance: 100, status: 'Ativo',
})

const filtered = computed(() => {
  const value = query.value.trim().toLowerCase()
  if (!value) return props.people
  return props.people.filter(person => [person.name, person.email, person.role, person.group, person.status]
    .some(field => String(field).toLowerCase().includes(value)))
})

const openCreate = () => {
  editingId.value = null
  Object.assign(form, { id: '', name: '', email: '', role: 'Aluno', group: '', attendance: 100, status: 'Ativo', image: undefined })
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
const statusClass = (status: SchoolPerson['status']) => ({
  Ativo: 'status--active',
  Pendente: 'status--pending',
  Inativo: 'status--inactive',
}[status])

const exportCsv = () => {
  const header = ['Nome', 'E-mail', 'Perfil', 'Grupo', 'Presença', 'Estado']
  const values = filtered.value.map(person => [person.name, person.email, person.role, person.group, person.attendance, person.status])
  const csv = [header, ...values]
    .map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(','))
    .join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'pessoas-da-escola.csv'
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <section>
    <div class="page-toolbar">
      <div class="page-toolbar__search">
        <Icon name="ph:magnifying-glass" size="19" aria-hidden="true" />
        <input v-model="query" class="search-input" type="search" aria-label="Pesquisar pessoas" placeholder="Pesquisar por nome, e-mail, perfil ou turma">
      </div>
      <div style="display: flex; gap: 0.55rem; flex-wrap: wrap">
        <button class="button button--secondary" type="button" @click="exportCsv">
          <Icon name="ph:download-simple" size="19" aria-hidden="true" /> Exportar CSV
        </button>
        <button class="button button--primary" type="button" @click="openCreate">
          <Icon name="ph:plus" size="19" aria-hidden="true" /> Adicionar pessoa
        </button>
      </div>
    </div>

    <AppAlert v-if="error" type="info" :message="error" style="margin-bottom: 1rem" />
    <AppAlert v-else-if="sample" type="info" message="Os registos em tempo real estão indisponíveis. São apresentados dados de exemplo e as alterações locais duram apenas nesta sessão." style="margin-bottom: 1rem" />

    <div class="panel">
      <div v-if="loading" class="panel__body form-stack" aria-label="A carregar pessoas">
        <AppSkeleton v-for="index in 5" :key="index" height="54px" />
      </div>
      <div v-else-if="filtered.length" class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Pessoa</th><th>Perfil</th><th>Turma ou grupo</th><th>Presença</th><th>Estado</th><th>Ações</th></tr></thead>
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
              <td><span class="status" :class="statusClass(person.status)">{{ person.status }}</span></td>
              <td>
                <div style="display: flex; gap: 0.35rem">
                  <button class="icon-button" type="button" :aria-label="`Editar ${person.name}`" @click="openEdit(person)">
                    <Icon name="ph:pencil-simple" size="18" aria-hidden="true" />
                  </button>
                  <button class="icon-button" type="button" :aria-label="`Eliminar ${person.name}`" @click="emit('delete', person)">
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
        <strong>Nenhuma pessoa encontrada</strong>
        <span>Altere a pesquisa ou adicione um novo registo escolar.</span>
      </div>
    </div>

    <div v-if="modalOpen" class="modal-backdrop" role="presentation" @click.self="modalOpen = false">
      <section class="modal" role="dialog" aria-modal="true" :aria-label="editingId ? 'Editar pessoa' : 'Adicionar pessoa'">
        <header class="modal__header">
          <h2>{{ editingId ? 'Editar pessoa' : 'Adicionar pessoa' }}</h2>
          <button class="icon-button" type="button" aria-label="Fechar" @click="modalOpen = false"><Icon name="ph:x" /></button>
        </header>
        <form @submit.prevent="save">
          <div class="modal__body form-stack">
            <div class="field"><label for="person-name">Nome completo</label><input id="person-name" v-model="form.name" required type="text" placeholder="Nome completo"></div>
            <div class="field"><label for="person-email">Endereço de e-mail</label><input id="person-email" v-model="form.email" required type="email" placeholder="nome@escola.co.za"></div>
            <div class="form-grid">
              <div class="field"><label for="person-role">Perfil</label><select id="person-role" v-model="form.role"><option>Aluno</option><option>Professor</option><option>Encarregado de educação</option><option>Funcionário</option><option>Administrador</option></select></div>
              <div class="field"><label for="person-group">Turma ou grupo</label><input id="person-group" v-model="form.group" type="text" placeholder="10.ª classe A"></div>
            </div>
            <div class="form-grid">
              <div class="field"><label for="person-attendance">Percentagem de presença</label><input id="person-attendance" v-model.number="form.attendance" type="number" min="0" max="100"></div>
              <div class="field"><label for="person-status">Estado</label><select id="person-status" v-model="form.status"><option>Ativo</option><option>Pendente</option><option>Inativo</option></select></div>
            </div>
          </div>
          <footer class="modal__footer">
            <button class="button button--secondary" type="button" @click="modalOpen = false">Cancelar</button>
            <button class="button button--primary" type="submit">Guardar pessoa</button>
          </footer>
        </form>
      </section>
    </div>
  </section>
</template>
