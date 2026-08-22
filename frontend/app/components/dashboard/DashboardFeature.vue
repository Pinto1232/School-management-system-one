<script setup lang="ts">
import {
  announcements,
  courses,
  grades,
  performance,
  samplePeople,
  schoolEvents,
  tasks as taskSource,
  teachers,
  timetable,
} from '~/data/school'

const props = defineProps<{ slug: string }>()

const attendance = ref(samplePeople.map(person => ({ ...person, present: person.attendance >= 90 })))
const attendanceSaved = ref(false)
const tasks = ref(taskSource.map(task => ({ ...task, complete: task.status === 'Concluída' })))
const events = ref(schoolEvents.map(event => ({ ...event })))
const lessonPlans = ref([
  { id: 'lp-1', title: 'Funções quadráticas', course: 'Matemática', date: '25 ago. 2026', status: 'Pronto' },
  { id: 'lp-2', title: 'Momento e impulso', course: 'Ciências Físicas', date: '27 ago. 2026', status: 'Rascunho' },
])
const lessonForm = reactive({ title: '', course: courses[0]?.name || '', date: '', objective: '' })
const eventForm = reactive({ title: '', date: '', time: '', location: '' })
const formMessage = ref('')

const applicants = [
  { id: 'AD-2041', name: 'Siyabonga Cele', grade: '8.ª classe', submitted: '18 ago. 2026', status: 'Em revisão' },
  { id: 'AD-2042', name: 'Mila Jacobs', grade: '10.ª classe', submitted: '19 ago. 2026', status: 'Pendente' },
  { id: 'AD-2043', name: 'Refilwe Molefe', grade: '9.ª classe', submitted: '20 ago. 2026', status: 'Aceite' },
  { id: 'AD-2044', name: 'Aphiwe Dlamini', grade: '8.ª classe', submitted: '21 ago. 2026', status: 'Em revisão' },
]

const fees = [
  { id: 'INV-6831', family: 'Família Mokoena', item: 'Propina do 3.º período', amount: 7350, due: '31 ago. 2026', status: 'Pago' },
  { id: 'INV-6842', family: 'Família Khumalo', item: 'Propina do 3.º período', amount: 7350, due: '31 ago. 2026', status: 'Pendente' },
  { id: 'INV-6857', family: 'Família Patel', item: 'Taxa de atividades', amount: 1250, due: '05 set. 2026', status: 'Pago' },
  { id: 'INV-6870', family: 'Família Mthembu', item: 'Transporte', amount: 980, due: '05 set. 2026', status: 'Em atraso' },
]

const staff = [
  ...teachers.map(item => ({ id: item.id, name: item.name, department: 'Área académica', position: `Professor de ${item.subject}`, status: item.status })),
  { id: 'sf-54', name: 'Nombuso Radebe', department: 'Administração', position: 'Responsável pelas admissões', status: 'Ativo' },
  { id: 'sf-63', name: 'Pieter van Wyk', department: 'Operações', position: 'Gestor de instalações', status: 'Ativo' },
]

const pageCopy: Record<string, { title: string; description: string }> = {
  teachers: { title: 'Professores', description: 'Atribuições de ensino, carga de turmas e disponibilidade do corpo docente.' },
  courses: { title: 'Disciplinas', description: 'Materiais, responsáveis pelas turmas e progresso académico.' },
  attendance: { title: 'Presenças', description: 'Registe as presenças de hoje e reveja a participação dos alunos.' },
  events: { title: 'Calendário e eventos', description: 'Planifique atividades, reuniões, avaliações e prazos escolares.' },
  'lesson-planning': { title: 'Planificação de aulas', description: 'Prepare objetivos, horários e recursos de ensino.' },
  admissions: { title: 'Admissões', description: 'Reveja candidaturas e acompanhe o estado de admissão de cada aluno.' },
  reports: { title: 'Relatórios', description: 'Reveja indicadores académicos e operacionais e exporte os dados necessários.' },
  fees: { title: 'Propinas', description: 'Acompanhe faturas, recibos, saldos e estados de pagamento.' },
  grading: { title: 'Avaliações', description: 'Reveja as notas do período e prepare relatórios dos alunos.' },
  tasks: { title: 'Tarefas', description: 'Coordene o trabalho operacional entre os departamentos da escola.' },
  'parent-portal': { title: 'Portal dos encarregados', description: 'Uma vista familiar da aprendizagem, presenças, comunicados e propinas.' },
  staff: { title: 'Funcionários', description: 'Funcionários, funções, departamentos e disponibilidade da escola.' },
  timetable: { title: 'Horário', description: 'Vista semanal das aulas, períodos letivos e atividades partilhadas.' },
}

const copy = computed(() => pageCopy[props.slug] || { title: 'Espaço escolar', description: 'Este módulo está pronto para receber dados ligados.' })

const saveAttendance = () => {
  attendanceSaved.value = true
  setTimeout(() => { attendanceSaved.value = false }, 3500)
}

const saveLesson = () => {
  if (!lessonForm.title.trim() || !lessonForm.date) {
    formMessage.value = 'Adicione o título e a data da aula.'
    return
  }
  lessonPlans.value.unshift({
    id: `lp-${Date.now()}`,
    title: lessonForm.title.trim(),
    course: lessonForm.course,
    date: new Intl.DateTimeFormat('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${lessonForm.date}T00:00:00`)),
    status: 'Rascunho',
  })
  Object.assign(lessonForm, { title: '', course: courses[0]?.name || '', date: '', objective: '' })
  formMessage.value = 'Plano de aula guardado.'
}

const addEvent = () => {
  if (!eventForm.title.trim() || !eventForm.date) {
    formMessage.value = 'Adicione o título e a data do evento.'
    return
  }
  const date = new Date(`${eventForm.date}T00:00:00`)
  events.value.push({
    id: `ev-${Date.now()}`,
    day: String(date.getDate()).padStart(2, '0'),
    month: new Intl.DateTimeFormat('pt-PT', { month: 'short' }).format(date),
    title: eventForm.title.trim(),
    meta: [eventForm.time, eventForm.location].filter(Boolean).join(' - ') || 'Horário por confirmar',
  })
  Object.assign(eventForm, { title: '', date: '', time: '', location: '' })
  formMessage.value = 'Evento adicionado ao calendário escolar.'
}

const downloadCsv = (filename: string, rows: Array<Array<string | number>>) => {
  const csv = rows.map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

const exportGrades = () => downloadCsv('relatorio-de-notas.csv', [
  ['Disciplina', '1.º período', '2.º período', 'Atual', 'Nota'],
  ...grades.map(item => [item.subject, item.term1, item.term2, item.current, item.grade]),
])

const exportFees = () => downloadCsv('relatorio-de-propinas.csv', [
  ['Fatura', 'Família', 'Item', 'Valor', 'Prazo', 'Estado'],
  ...fees.map(item => [item.id, item.family, item.item, item.amount, item.due, item.status]),
])

const printPage = () => window.print()
</script>

<template>
  <section>
    <div class="dashboard-welcome">
      <div><h2>{{ copy.title }}</h2><p>{{ copy.description }}</p></div>
      <span class="dashboard-date">Dados escolares de exemplo</span>
    </div>

    <template v-if="slug === 'teachers'">
      <div class="page-toolbar"><div class="page-toolbar__search"><Icon name="ph:magnifying-glass" /><input class="search-input" type="search" aria-label="Pesquisar professores" placeholder="Pesquisar professores"></div><button class="button button--primary" type="button"><Icon name="ph:plus" /> Adicionar professor</button></div>
      <div class="panel table-wrap">
        <table class="data-table"><thead><tr><th>Professor</th><th>Disciplina</th><th>Turmas</th><th>Alunos</th><th>Estado</th></tr></thead><tbody><tr v-for="item in teachers" :key="item.id"><td><div class="person-cell"><div class="avatar">{{ item.name.split(' ').map(part => part[0]).slice(0, 2).join('') }}</div><strong>{{ item.name }}</strong></div></td><td>{{ item.subject }}</td><td>{{ item.classes }}</td><td>{{ item.students }}</td><td><span class="status" :class="item.status === 'Ativo' ? 'status--active' : 'status--pending'">{{ item.status }}</span></td></tr></tbody></table>
      </div>
    </template>

    <div v-else-if="slug === 'courses'" class="course-grid">
      <article v-for="course in courses" :key="course.id" class="course-card">
        <img :src="course.image" :alt="course.name" width="560" height="180">
        <div class="course-card__body"><span class="status">{{ course.code }}</span><h3 style="margin-top: 0.8rem">{{ course.name }}</h3><p style="color: var(--ink-soft)">{{ course.teacher }}</p><div class="course-card__meta"><span>{{ course.learners }} alunos</span><span>{{ course.progress }}% concluído</span></div><div class="progress-inline__line" style="width: 100%; height: 6px"><span :style="{ width: `${course.progress}%` }" /></div><button class="button button--secondary" type="button" style="margin-top: 1rem">Abrir disciplina</button></div>
      </article>
    </div>

    <template v-else-if="slug === 'attendance'">
      <AppAlert v-if="attendanceSaved" type="success" message="As presenças desta turma foram registadas." style="margin-bottom: 1rem" />
      <div class="page-toolbar"><div class="billing-toggle"><button class="is-active" type="button">11.ª classe A</button><button type="button">11.ª classe B</button><button type="button">12.ª classe A</button></div><button class="button button--primary" type="button" @click="saveAttendance"><Icon name="ph:check" /> Registar presenças</button></div>
      <div class="panel table-wrap">
        <table class="data-table"><thead><tr><th>Aluno</th><th>Turma</th><th>Presença histórica</th><th>Hoje</th></tr></thead><tbody><tr v-for="person in attendance" :key="person.id"><td><strong>{{ person.name }}</strong><br><span style="color: var(--ink-soft); font-size: 0.78rem">{{ person.email }}</span></td><td>{{ person.group }}</td><td>{{ person.attendance }}%</td><td><button class="button" :class="person.present ? 'button--primary' : 'button--secondary'" type="button" @click="person.present = !person.present">{{ person.present ? 'Presente' : 'Ausente' }}</button></td></tr></tbody></table>
      </div>
    </template>

    <div v-else-if="slug === 'events'" class="dashboard-grid" style="margin-top: 0">
      <section class="panel"><div class="panel__header"><h2>Próximos eventos</h2></div><div class="panel__body event-list"><div v-for="event in events" :key="event.id" class="event-item"><div class="event-date"><strong>{{ event.day }}</strong><span>{{ event.month }}</span></div><div><h3>{{ event.title }}</h3><p>{{ event.meta }}</p></div></div></div></section>
      <section class="panel"><div class="panel__header"><h2>Adicionar evento</h2></div><form class="panel__body form-stack" @submit.prevent="addEvent"><AppAlert v-if="formMessage" :type="formMessage.startsWith('Evento adicionado') ? 'success' : 'error'" :message="formMessage" /><div class="field"><label for="event-title">Título do evento</label><input id="event-title" v-model="eventForm.title" type="text" placeholder="Título do evento"></div><div class="form-grid"><div class="field"><label for="event-date">Data</label><input id="event-date" v-model="eventForm.date" type="date"></div><div class="field"><label for="event-time">Hora</label><input id="event-time" v-model="eventForm.time" type="time"></div></div><div class="field"><label for="event-location">Local</label><input id="event-location" v-model="eventForm.location" type="text" placeholder="Salão da escola"></div><button class="button button--primary" type="submit">Adicionar evento</button></form></section>
    </div>

    <div v-else-if="slug === 'lesson-planning'" class="dashboard-grid" style="margin-top: 0">
      <section class="panel"><div class="panel__header"><h2>Novo plano de aula</h2></div><form class="panel__body form-stack" @submit.prevent="saveLesson"><AppAlert v-if="formMessage" :type="formMessage.startsWith('Plano de aula guardado') ? 'success' : 'error'" :message="formMessage" /><div class="field"><label for="lesson-title">Título da aula</label><input id="lesson-title" v-model="lessonForm.title" type="text" placeholder="Tema ou título da aula"></div><div class="form-grid"><div class="field"><label for="lesson-course">Disciplina</label><select id="lesson-course" v-model="lessonForm.course"><option v-for="course in courses" :key="course.id">{{ course.name }}</option></select></div><div class="field"><label for="lesson-date">Data da aula</label><input id="lesson-date" v-model="lessonForm.date" type="date"></div></div><div class="field"><label for="lesson-objective">Objetivo de aprendizagem</label><textarea id="lesson-objective" v-model="lessonForm.objective" rows="5" placeholder="O que devem os alunos compreender ou conseguir fazer?"></textarea></div><button class="button button--primary" type="submit">Guardar plano de aula</button></form></section>
      <section class="panel"><div class="panel__header"><h2>Planos recentes</h2></div><div class="panel__body task-list"><article v-for="plan in lessonPlans" :key="plan.id" class="task-item"><div><h3>{{ plan.title }}</h3><p>{{ plan.course }} | {{ plan.date }}</p></div><span class="status" :class="plan.status === 'Pronto' ? 'status--active' : 'status--draft'">{{ plan.status }}</span></article></div></section>
    </div>

    <template v-else-if="slug === 'admissions'">
      <div class="page-toolbar"><div class="page-toolbar__search"><Icon name="ph:magnifying-glass" /><input class="search-input" type="search" aria-label="Pesquisar candidaturas" placeholder="Pesquisar candidaturas"></div><button class="button button--primary" type="button"><Icon name="ph:plus" /> Nova candidatura</button></div>
      <div class="panel table-wrap"><table class="data-table"><thead><tr><th>Candidatura</th><th>Aluno</th><th>Classe pretendida</th><th>Enviada</th><th>Estado</th><th>Ação</th></tr></thead><tbody><tr v-for="item in applicants" :key="item.id"><td>{{ item.id }}</td><td><strong>{{ item.name }}</strong></td><td>{{ item.grade }}</td><td>{{ item.submitted }}</td><td><span class="status" :class="item.status === 'Aceite' ? 'status--active' : 'status--pending'">{{ item.status }}</span></td><td><button class="button button--secondary" type="button">Rever</button></td></tr></tbody></table></div>
    </template>

    <template v-else-if="slug === 'reports'">
      <div class="page-toolbar"><div></div><div style="display: flex; gap: 0.5rem"><button class="button button--secondary" type="button" @click="exportGrades"><Icon name="ph:download-simple" /> Exportar CSV</button><button class="button button--primary" type="button" @click="printPage"><Icon name="ph:printer" /> Imprimir relatório</button></div></div>
      <div class="metric-grid"><article class="metric"><span class="metric__label">Média académica</span><strong class="metric__value">81%</strong><span class="metric__change">Relatório de exemplo do 3.º período</span></article><article class="metric"><span class="metric__label">Presenças</span><strong class="metric__value">93%</strong><span class="metric__change">Média de toda a escola</span></article><article class="metric"><span class="metric__label">Propinas cobradas</span><strong class="metric__value">87%</strong><span class="metric__change">Ciclo de faturação atual</span></article><article class="metric"><span class="metric__label">Admissões</span><strong class="metric__value">24</strong><span class="metric__change">Candidaturas abertas</span></article></div>
      <section class="panel" style="margin-top: 1rem"><div class="panel__header"><h2>Tendência de desempenho</h2></div><div class="panel__body"><div class="chart"><div v-for="point in performance" :key="point.label" class="chart__item"><div class="chart__bar" :style="{ height: `${point.value}%` }" /><span class="chart__label">{{ point.label }}</span></div></div></div></section>
    </template>

    <template v-else-if="slug === 'fees'">
      <div class="page-toolbar"><div class="billing-toggle"><button class="is-active" type="button">Todas as faturas</button><button type="button">Em dívida</button><button type="button">Pagas</button></div><button class="button button--secondary" type="button" @click="exportFees"><Icon name="ph:download-simple" /> Exportar</button></div>
      <div class="panel table-wrap"><table class="data-table"><thead><tr><th>Fatura</th><th>Família</th><th>Item</th><th>Valor</th><th>Prazo</th><th>Estado</th></tr></thead><tbody><tr v-for="item in fees" :key="item.id"><td>{{ item.id }}</td><td><strong>{{ item.family }}</strong></td><td>{{ item.item }}</td><td>R{{ item.amount.toLocaleString('pt-PT') }}</td><td>{{ item.due }}</td><td><span class="status" :class="item.status === 'Pago' ? 'status--paid' : item.status === 'Pendente' ? 'status--pending' : ''">{{ item.status }}</span></td></tr></tbody></table></div>
    </template>

    <template v-else-if="slug === 'grading'">
      <div class="page-toolbar"><div class="billing-toggle"><button class="is-active" type="button">3.º período</button><button type="button">2.º período</button><button type="button">1.º período</button></div><div style="display: flex; gap: 0.5rem"><button class="button button--secondary" type="button" @click="exportGrades">Exportar CSV</button><button class="button button--primary" type="button" @click="printPage">Imprimir / PDF</button></div></div>
      <div class="panel table-wrap"><table class="data-table"><thead><tr><th>Disciplina</th><th>1.º período</th><th>2.º período</th><th>Atual</th><th>Nota</th></tr></thead><tbody><tr v-for="item in grades" :key="item.subject"><td><strong>{{ item.subject }}</strong></td><td>{{ item.term1 }}%</td><td>{{ item.term2 }}%</td><td>{{ item.current }}%</td><td><span class="status status--active">{{ item.grade }}</span></td></tr></tbody></table></div>
    </template>

    <section v-else-if="slug === 'tasks'" class="panel">
      <div class="panel__header"><h2>Quadro de tarefas da equipa</h2><button class="button button--primary" type="button"><Icon name="ph:plus" /> Adicionar tarefa</button></div>
      <div class="panel__body task-list"><article v-for="item in tasks" :key="item.id" class="task-item"><div style="display: flex; align-items: flex-start; gap: 0.75rem"><input v-model="item.complete" type="checkbox" :aria-label="`Marcar ${item.title} como concluída`" style="margin-top: 0.25rem"><div><h3 :style="item.complete ? { textDecoration: 'line-through', color: 'var(--ink-soft)' } : undefined">{{ item.title }}</h3><p>{{ item.owner }} | Prazo: {{ item.due }}</p></div></div><span class="status" :class="item.complete ? 'status--done' : item.status === 'Revisão' ? 'status--review' : ''">{{ item.complete ? 'Concluída' : item.status }}</span></article></div>
    </section>

    <template v-else-if="slug === 'parent-portal'">
      <AppAlert type="info" message="Esta pré-visualização mostra as informações disponíveis para uma conta de encarregado de educação ligada." style="margin-bottom: 1rem" />
      <div class="metric-grid"><article class="metric"><span class="metric__label">Presenças</span><strong class="metric__value">96%</strong><span class="metric__change">Naledi Mokoena</span></article><article class="metric"><span class="metric__label">Média atual</span><strong class="metric__value">82%</strong><span class="metric__change">3.º período</span></article><article class="metric"><span class="metric__label">Tarefas abertas</span><strong class="metric__value">3</strong><span class="metric__change">Próximo prazo: 28 ago.</span></article><article class="metric"><span class="metric__label">Saldo de propinas</span><strong class="metric__value">R0</strong><span class="metric__change">Conta em dia</span></article></div>
      <div class="dashboard-grid"><section class="panel"><div class="panel__header"><h2>Notas recentes</h2></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Disciplina</th><th>Nota atual</th><th>Classificação</th></tr></thead><tbody><tr v-for="item in grades.slice(0, 4)" :key="item.subject"><td>{{ item.subject }}</td><td>{{ item.current }}%</td><td><span class="status status--active">{{ item.grade }}</span></td></tr></tbody></table></div></section><section class="panel"><div class="panel__header"><h2>Comunicados</h2></div><div class="panel__body announcement-list"><article v-for="item in announcements.slice(0, 2)" :key="item.id" class="announcement-item"><h3>{{ item.title }}</h3><p>{{ item.date }}</p><p style="margin-top: 0.4rem; color: var(--ink)">{{ item.body }}</p></article></div></section></div>
    </template>

    <template v-else-if="slug === 'staff'">
      <div class="page-toolbar"><div class="page-toolbar__search"><Icon name="ph:magnifying-glass" /><input class="search-input" type="search" aria-label="Pesquisar funcionários" placeholder="Pesquisar funcionários"></div><button class="button button--primary" type="button"><Icon name="ph:plus" /> Adicionar funcionário</button></div>
      <div class="panel table-wrap"><table class="data-table"><thead><tr><th>Funcionário</th><th>Departamento</th><th>Cargo</th><th>Estado</th></tr></thead><tbody><tr v-for="item in staff" :key="item.id"><td><strong>{{ item.name }}</strong></td><td>{{ item.department }}</td><td>{{ item.position }}</td><td><span class="status" :class="item.status === 'Ativo' ? 'status--active' : 'status--pending'">{{ item.status }}</span></td></tr></tbody></table></div>
    </template>

    <section v-else-if="slug === 'timetable'" class="panel">
      <div class="panel__header"><h2>Horário semanal da 11.ª classe A</h2><button class="button button--secondary" type="button" @click="printPage"><Icon name="ph:printer" /> Imprimir</button></div>
      <div class="table-wrap"><div class="schedule-grid"><div class="schedule-grid__head">Hora</div><div v-for="day in ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira']" :key="day" class="schedule-grid__head">{{ day }}</div><template v-for="row in timetable" :key="row.time"><div class="schedule-grid__time">{{ row.time }}</div><div>{{ row.monday }}</div><div>{{ row.tuesday }}</div><div>{{ row.wednesday }}</div><div>{{ row.thursday }}</div><div>{{ row.friday }}</div></template></div></div>
    </section>

    <div v-else class="panel empty-state">
      <Icon name="ph:folder-open" aria-hidden="true" />
      <strong>{{ copy.title }} está pronto para receber dados</strong>
      <span>Ligue esta vista à rota correspondente do servidor para a preencher.</span>
    </div>
  </section>
</template>
