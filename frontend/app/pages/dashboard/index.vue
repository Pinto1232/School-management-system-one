<script setup lang="ts">
import type { DashboardAlert, DashboardEvent, DashboardTone } from '~/types/dashboard'

definePageMeta({ layout: 'dashboard', middleware: 'auth' })
useSeoMeta({ title: 'Painel', robots: 'noindex' })
const toast = useToast()

interface DashboardMetric {
  label: string
  value: string
  icon: string
  tone: DashboardTone
  trend: number
  comparison: string
  trendLabel: string
}

const metrics: DashboardMetric[] = [
  {
    label: 'Total alunos',
    value: '1,240',
    icon: 'ph:users-three',
    tone: 'info',
    trend: 5,
    comparison: 'vs mês passado',
    trendLabel: 'Aumento de 5 por cento em relação ao mês passado',
  },
  {
    label: 'Professores ativos',
    value: '86',
    icon: 'ph:graduation-cap',
    tone: 'brand',
    trend: 0,
    comparison: 'vs mês passado',
    trendLabel: 'Sem alteração em relação ao mês passado',
  },
  {
    label: 'Presença média',
    value: '94%',
    icon: 'ph:user-check',
    tone: 'info',
    trend: 2,
    comparison: 'vs semana passada',
    trendLabel: 'Aumento de 2 por cento em relação à semana passada',
  },
  {
    label: 'Saúde financeira',
    value: '92%',
    icon: 'ph:money',
    tone: 'brand',
    trend: 3,
    comparison: 'Propinas pagas',
    trendLabel: 'Aumento de 3 por cento nas propinas pagas',
  },
]

const weeklyAttendance = [
  { label: 'Seg', value: 40 },
  { label: 'Ter', value: 60 },
  { label: 'Qua', value: 80 },
  { label: 'Qui', value: 95, current: true },
  { label: 'Sex', value: 70 },
]

const levelDistribution = [
  { label: 'Ensino Secundário', count: 558, percentage: 45, color: 'var(--color-navy-900)' },
  { label: 'Ensino Básico', count: 372, percentage: 30, color: 'var(--color-brand-500)' },
  { label: 'Pré-escolar', count: 186, percentage: 15, color: 'var(--color-brand-700)' },
  { label: 'Creche', count: 124, percentage: 10, color: 'var(--color-line-strong)' },
]

const quickActions = [
  { label: 'Matricular aluno', icon: 'ph:user-plus', tone: 'navy' as const },
  { label: 'Registar presença', icon: 'ph:user-check', tone: 'brand' as const },
  { label: 'Enviar comunicado', icon: 'ph:paper-plane-tilt', tone: 'outline' as const },
]

const upcomingEvents: DashboardEvent[] = [
  {
    id: 'teachers-meeting',
    date: '2026-08-26',
    month: 'AGO',
    day: '26',
    category: 'Administração',
    title: 'Reunião de Professores',
    time: '14:00',
    location: 'Sala de Docentes',
    tone: 'navy',
  },
  {
    id: 'classes-start',
    date: '2026-09-01',
    month: 'SET',
    day: '01',
    category: 'Académico',
    title: 'Início das Aulas',
    time: '08:00',
    location: 'Todo o Campus',
    tone: 'brand',
  },
]

const recentAlerts = ref<DashboardAlert[]>([
  {
    id: 'new-admissions',
    title: 'Novos Pedidos de Admissão',
    description: 'Existem 3 novas candidaturas aguardando revisão para o 1.º Ciclo.',
    icon: 'ph:user-plus',
    unread: true,
    actionLabel: 'Rever Candidaturas',
    tone: 'brand',
  },
  {
    id: 'fees-update',
    title: 'Atualização de Propinas',
    description: 'Lote mensal de faturas gerado com sucesso para o próximo mês.',
    icon: 'ph:money',
    unread: true,
    tone: 'neutral',
  },
  {
    id: 'unjustified-absences',
    title: 'Faltas Injustificadas',
    description: 'Turma 8.º B tem 5 alunos com faltas não justificadas esta semana.',
    icon: 'ph:clipboard-text',
    unread: true,
    tone: 'neutral',
  },
])

const handleQuickAction = (label: string) => {
  toast.info(label, 'Esta ação será ligada ao respetivo módulo do painel.')
}

const handleEventsMenu = () => {
  toast.info('Opções dos eventos', 'As opções do calendário serão disponibilizadas neste menu.')
}

const handleCalendar = () => {
  toast.info('Calendário completo', 'O módulo de calendário será aberto aqui quando estiver disponível.')
}

const handleAlertAction = (id: string) => {
  const alert = recentAlerts.value.find(item => item.id === id)
  if (!alert) return

  toast.info(alert.title, 'Esta ação será ligada ao respetivo módulo do painel.')
}

const handleMarkAlertsRead = () => {
  if (!recentAlerts.value.some(alert => alert.unread)) return

  recentAlerts.value = recentAlerts.value.map(alert => ({ ...alert, unread: false }))
  toast.success('Alertas atualizados', 'Todos os alertas foram marcados como lidos.')
}
</script>

<template>
  <section aria-labelledby="dashboard-summary-title">
    <h2 id="dashboard-summary-title" class="sr-only">Resumo da escola</h2>

    <div class="grid grid-cols-1 gap-3 min-[560px]:grid-cols-2 min-[641px]:gap-4 min-[1360px]:grid-cols-4">
      <StatCard
        v-for="metric in metrics"
        :key="metric.label"
        :label="metric.label"
        :value="metric.value"
        :icon="metric.icon"
        :tone="metric.tone"
        :trend="metric.trend"
        :trend-label="metric.trendLabel"
        :helper="metric.comparison"
      />
    </div>

    <DashboardAnalyticsOverview
      class="mt-4"
      :attendance="weeklyAttendance"
      :levels="levelDistribution"
      total-students="1,240"
      academic-average="14.5"
    />

    <DashboardQuickActions
      class="mt-4"
      :actions="quickActions"
      @select="handleQuickAction"
    />

    <DashboardEventsAlerts
      class="mt-4"
      :events="upcomingEvents"
      :alerts="recentAlerts"
      :message-count="5"
      @calendar="handleCalendar"
      @events-menu="handleEventsMenu"
      @mark-read="handleMarkAlertsRead"
      @alert-action="handleAlertAction"
    />
  </section>
</template>
