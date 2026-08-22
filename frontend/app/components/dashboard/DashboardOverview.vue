<script setup lang="ts">
import { courses, performance, schoolEvents } from '~/data/school'

const props = withDefaults(defineProps<{
  peopleCount?: number
  sample?: boolean
}>(), {
  peopleCount: 0,
  sample: true,
})

const { user } = useAuth()

const firstName = computed(() => user.value?.firstName || '')
const formattedDate = computed(() => new Intl.DateTimeFormat('pt-PT', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date()))

const metrics = computed(() => [
  { label: 'Alunos ativos', value: props.peopleCount || 486, change: 'Em todas as classes', icon: 'ph:student' },
  { label: 'Corpo docente', value: 34, change: '31 atualmente na escola', icon: 'ph:chalkboard-teacher' },
  { label: 'Presenças hoje', value: '93%', change: 'Acima da média semanal', icon: 'ph:check-square' },
  { label: 'Tarefas abertas', value: 18, change: '6 com prazo esta semana', icon: 'ph:list-checks' },
])

const activity = [
  { icon: 'ph:clipboard-text', title: 'Notas do período atualizadas', time: 'Há 12 minutos' },
  { icon: 'ph:user-plus', title: 'Três candidaturas recebidas', time: 'Há 48 minutos' },
  { icon: 'ph:megaphone', title: 'Aviso da reunião de encarregados publicado', time: 'Há 2 horas' },
  { icon: 'ph:bus', title: 'Transporte para o atletismo confirmado', time: 'Ontem' },
]
</script>

<template>
  <section>
    <div class="dashboard-welcome">
      <div>
        <h2>Bom dia<span v-if="firstName">, {{ firstName }}</span>.</h2>
        <p>Veja o que precisa de atenção em toda a escola.</p>
      </div>
      <time class="dashboard-date">{{ formattedDate }}</time>
    </div>

    <AppAlert
      v-if="sample"
      type="info"
      message="O painel apresenta indicadores académicos de exemplo até que os relatórios em tempo real estejam disponíveis."
      style="margin-bottom: 1rem"
    />

    <div class="metric-grid">
      <article v-for="metric in metrics" :key="metric.label" class="metric">
        <div class="metric__top">
          <span class="metric__label">{{ metric.label }}</span>
          <span class="metric__icon"><Icon :name="metric.icon" aria-hidden="true" /></span>
        </div>
        <strong class="metric__value">{{ metric.value }}</strong>
        <span class="metric__change">{{ metric.change }}</span>
      </article>
    </div>

    <div class="dashboard-grid">
      <section class="panel">
        <div class="panel__header">
          <h2>Desempenho académico</h2>
          <span class="status status--active">3.º período</span>
        </div>
        <div class="panel__body">
          <div class="chart" aria-label="Gráfico mensal de exemplo do desempenho académico">
            <div v-for="point in performance" :key="point.label" class="chart__item">
              <div class="chart__bar" :style="{ height: `${point.value}%` }" :title="`${point.value}%`" />
              <span class="chart__label">{{ point.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="panel__header">
          <h2>Atividade recente</h2>
        </div>
        <div class="panel__body activity-list">
          <div v-for="item in activity" :key="item.title" class="activity-item">
            <div class="activity-item__icon"><Icon :name="item.icon" aria-hidden="true" /></div>
            <div><strong>{{ item.title }}</strong><span>{{ item.time }}</span></div>
          </div>
        </div>
      </section>
    </div>

    <div class="dashboard-grid">
      <section class="panel">
        <div class="panel__header">
          <h2>Progresso das disciplinas</h2>
          <NuxtLink class="text-link" to="/dashboard/courses">Ver disciplinas</NuxtLink>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Disciplina</th><th>Professor</th><th>Alunos</th><th>Progresso</th></tr></thead>
            <tbody>
              <tr v-for="course in courses" :key="course.id">
                <td><strong>{{ course.name }}</strong><br><span style="color: var(--ink-soft); font-size: 0.78rem">{{ course.code }}</span></td>
                <td>{{ course.teacher }}</td>
                <td>{{ course.learners }}</td>
                <td>
                  <span class="progress-inline">
                    <span class="progress-inline__line"><span :style="{ width: `${course.progress}%` }" /></span>
                    {{ course.progress }}%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="panel">
        <div class="panel__header">
          <h2>Próximos eventos</h2>
          <NuxtLink class="text-link" to="/dashboard/events">Calendário</NuxtLink>
        </div>
        <div class="panel__body event-list">
          <div v-for="event in schoolEvents.slice(0, 3)" :key="event.id" class="event-item">
            <div class="event-date"><strong>{{ event.day }}</strong><span>{{ event.month }}</span></div>
            <div><h3>{{ event.title }}</h3><p>{{ event.meta }}</p></div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
