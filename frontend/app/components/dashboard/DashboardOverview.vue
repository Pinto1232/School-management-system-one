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

const firstName = computed(() => user.value?.firstName || 'there')
const formattedDate = computed(() => new Intl.DateTimeFormat('en-ZA', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date()))

const metrics = computed(() => [
  { label: 'Active learners', value: props.peopleCount || 486, change: 'Across all grades', icon: 'ph:student' },
  { label: 'Teaching staff', value: 34, change: '31 currently on campus', icon: 'ph:chalkboard-teacher' },
  { label: 'Attendance today', value: '93%', change: 'Up from the weekly average', icon: 'ph:check-square' },
  { label: 'Open tasks', value: 18, change: '6 due this week', icon: 'ph:list-checks' },
])

const activity = [
  { icon: 'ph:clipboard-text', title: 'Term marks updated', time: '12 minutes ago' },
  { icon: 'ph:user-plus', title: 'Three admissions received', time: '48 minutes ago' },
  { icon: 'ph:megaphone', title: 'Parent meeting notice published', time: '2 hours ago' },
  { icon: 'ph:bus', title: 'Athletics transport confirmed', time: 'Yesterday' },
]
</script>

<template>
  <section>
    <div class="dashboard-welcome">
      <div>
        <h2>Good day, {{ firstName }}.</h2>
        <p>Here is what needs attention across the school.</p>
      </div>
      <time class="dashboard-date">{{ formattedDate }}</time>
    </div>

    <AppAlert
      v-if="sample"
      type="info"
      message="The dashboard is showing sample academic metrics until live reporting endpoints return data."
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
          <h2>Academic performance</h2>
          <span class="status status--active">Term 3</span>
        </div>
        <div class="panel__body">
          <div class="chart" aria-label="Sample monthly academic performance chart">
            <div v-for="point in performance" :key="point.label" class="chart__item">
              <div class="chart__bar" :style="{ height: `${point.value}%` }" :title="`${point.value}%`" />
              <span class="chart__label">{{ point.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="panel__header">
          <h2>Recent activity</h2>
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
          <h2>Course progress</h2>
          <NuxtLink class="text-link" to="/dashboard/courses">View courses</NuxtLink>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Course</th><th>Teacher</th><th>Learners</th><th>Progress</th></tr></thead>
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
          <h2>Upcoming events</h2>
          <NuxtLink class="text-link" to="/dashboard/events">Calendar</NuxtLink>
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
