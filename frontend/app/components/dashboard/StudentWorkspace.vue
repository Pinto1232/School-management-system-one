<script setup lang="ts">
import { announcements, assignments as assignmentSource, courses, grades, schoolEvents } from '~/data/school'
import type { SchoolPerson } from '~/types'

const props = defineProps<{ people: SchoolPerson[] }>()
const activeTab = ref('profile')
const assignments = ref(assignmentSource.map(item => ({ ...item })))

const tabs = [
  { slug: 'profile', label: 'Perfil', icon: 'ph:user-circle' },
  { slug: 'grades', label: 'Notas', icon: 'ph:exam' },
  { slug: 'events', label: 'Eventos', icon: 'ph:calendar-dots' },
  { slug: 'announcements', label: 'Comunicados', icon: 'ph:megaphone' },
  { slug: 'assignments', label: 'Tarefas', icon: 'ph:clipboard-text' },
  { slug: 'courses', label: 'Disciplinas', icon: 'ph:books' },
  { slug: 'streaming', label: 'Aulas online', icon: 'ph:video-camera' },
]

const student = computed(() => props.people.find(person => person.role === 'Aluno') || props.people[0])
const initials = computed(() => student.value?.name.split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase() || 'ST')
const average = computed(() => Math.round(grades.reduce((sum, grade) => sum + grade.current, 0) / grades.length))
const printReport = () => window.print()

const exportGrades = () => {
  const rows = [['Disciplina', '1.º período', '2.º período', 'Atual', 'Nota'], ...grades.map(item => [item.subject, item.term1, item.term2, item.current, item.grade])]
  const csv = rows.map(row => row.join(',')).join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'relatorio-de-notas.csv'
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <section>
    <div class="dashboard-welcome">
      <div><h2>Espaço do aluno</h2><p>Perfil, progresso académico, trabalhos e comunicação numa única vista.</p></div>
    </div>

    <div class="tabs" role="tablist" aria-label="Informações do aluno">
      <button
        v-for="tab in tabs"
        :key="tab.slug"
        type="button"
        role="tab"
        :aria-selected="activeTab === tab.slug"
        :class="{ 'is-active': activeTab === tab.slug }"
        @click="activeTab = tab.slug"
      >
        <Icon :name="tab.icon" size="18" aria-hidden="true" /> {{ tab.label }}
      </button>
    </div>

    <div v-if="activeTab === 'profile'" class="profile-grid">
      <article class="panel profile-card">
        <div class="avatar">{{ initials }}</div>
        <h3>{{ student?.name || 'Perfil do aluno' }}</h3>
        <p>{{ student?.group || 'Turma não atribuída' }}</p>
        <span class="status status--active" style="margin-top: 1rem">{{ student?.status || 'Ativo' }}</span>
      </article>
      <section class="panel">
        <div class="panel__header"><h2>Informações do perfil</h2><button class="button button--secondary" type="button"><Icon name="ph:pencil-simple" /> Editar perfil</button></div>
        <div class="panel__body detail-list">
          <div class="detail-item"><span>Endereço de e-mail</span><strong>{{ student?.email || 'Indisponível' }}</strong></div>
          <div class="detail-item"><span>Número do aluno</span><strong>{{ student?.id || 'Indisponível' }}</strong></div>
          <div class="detail-item"><span>Turma</span><strong>{{ student?.group || 'Não atribuída' }}</strong></div>
          <div class="detail-item"><span>Presença</span><strong>{{ student?.attendance || 0 }}%</strong></div>
          <div class="detail-item"><span>Média atual</span><strong>{{ average }}%</strong></div>
          <div class="detail-item"><span>Estado da matrícula</span><strong>{{ student?.status || 'Ativo' }}</strong></div>
        </div>
      </section>
    </div>

    <section v-else-if="activeTab === 'grades'" class="panel">
      <div class="panel__header">
        <div><h2>Resumo das notas</h2><span style="color: var(--ink-soft); font-size: 0.8rem">Média atual: {{ average }}%</span></div>
        <div class="panel-header-actions">
          <button class="button button--secondary" type="button" @click="exportGrades"><Icon name="ph:download-simple" /> CSV</button>
          <button class="button button--secondary" type="button" @click="printReport"><Icon name="ph:printer" /> Imprimir / PDF</button>
        </div>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Disciplina</th><th>1.º período</th><th>2.º período</th><th>Atual</th><th>Nota</th></tr></thead>
          <tbody><tr v-for="item in grades" :key="item.subject"><td><strong>{{ item.subject }}</strong></td><td>{{ item.term1 }}%</td><td>{{ item.term2 }}%</td><td>{{ item.current }}%</td><td><span class="status status--active">{{ item.grade }}</span></td></tr></tbody>
        </table>
      </div>
    </section>

    <section v-else-if="activeTab === 'events'" class="panel">
      <div class="panel__header"><h2>Calendário escolar</h2></div>
      <div class="panel__body event-list">
        <div v-for="event in schoolEvents" :key="event.id" class="event-item"><div class="event-date"><strong>{{ event.day }}</strong><span>{{ event.month }}</span></div><div><h3>{{ event.title }}</h3><p>{{ event.meta }}</p></div></div>
      </div>
    </section>

    <section v-else-if="activeTab === 'announcements'" class="panel">
      <div class="panel__header"><h2>Comunicados</h2></div>
      <div class="panel__body announcement-list">
        <article v-for="item in announcements" :key="item.id" class="announcement-item"><h3>{{ item.title }}</h3><p>{{ item.date }}</p><p style="margin-top: 0.5rem; color: var(--ink)">{{ item.body }}</p></article>
      </div>
    </section>

    <section v-else-if="activeTab === 'assignments'" class="panel">
      <div class="panel__header"><h2>Tarefas</h2></div>
      <div class="panel__body task-list">
        <article v-for="item in assignments" :key="item.id" class="task-item">
          <div><h3>{{ item.name }}</h3><p>{{ item.course }} | Prazo: {{ item.due }}</p></div>
          <button class="button" :class="item.status === 'Entregue' ? 'button--secondary' : 'button--primary'" type="button" @click="item.status = item.status === 'Entregue' ? 'Aberta' : 'Entregue'">
            {{ item.status === 'Entregue' ? 'Entregue' : 'Entregar tarefa' }}
          </button>
        </article>
      </div>
    </section>

    <div v-else-if="activeTab === 'courses'" class="course-grid">
      <article v-for="course in courses" :key="course.id" class="course-card">
        <img :src="course.image" :alt="course.name" width="560" height="180" loading="lazy">
        <div class="course-card__body"><span class="status">{{ course.code }}</span><h3 style="margin-top: 0.8rem">{{ course.name }}</h3><p style="color: var(--ink-soft)">{{ course.teacher }}</p><div class="course-card__meta"><span>{{ course.learners }} alunos</span><span>{{ course.progress }}% concluído</span></div><button class="button button--secondary" type="button">Abrir disciplina</button></div>
      </article>
    </div>

    <section v-else class="panel">
      <div class="panel__header"><h2>Sala de aula online</h2></div>
      <div class="empty-state">
        <Icon name="ph:video-camera" aria-hidden="true" />
        <strong>Não há nenhuma aula em direto neste momento</strong>
        <span>As aulas em direto agendadas e as gravações aparecerão aqui.</span>
        <button class="button button--primary" type="button" style="margin-top: 1rem">Agendar sessão</button>
      </div>
    </section>
  </section>
</template>
