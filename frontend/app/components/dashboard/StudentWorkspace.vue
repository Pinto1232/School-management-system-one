<script setup lang="ts">
import { announcements, assignments as assignmentSource, courses, grades, schoolEvents } from '~/data/school'
import type { SchoolPerson } from '~/types'

const props = defineProps<{ people: SchoolPerson[] }>()
const activeTab = ref('profile')
const assignments = ref(assignmentSource.map(item => ({ ...item })))

const tabs = [
  { slug: 'profile', label: 'Profile', icon: 'ph:user-circle' },
  { slug: 'grades', label: 'Grades', icon: 'ph:exam' },
  { slug: 'events', label: 'Events', icon: 'ph:calendar-dots' },
  { slug: 'announcements', label: 'Announcements', icon: 'ph:megaphone' },
  { slug: 'assignments', label: 'Assignments', icon: 'ph:clipboard-text' },
  { slug: 'courses', label: 'Courses', icon: 'ph:books' },
  { slug: 'streaming', label: 'Streaming', icon: 'ph:video-camera' },
]

const student = computed(() => props.people.find(person => person.role === 'Student') || props.people[0])
const initials = computed(() => student.value?.name.split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase() || 'ST')
const average = computed(() => Math.round(grades.reduce((sum, grade) => sum + grade.current, 0) / grades.length))
const printReport = () => window.print()

const exportGrades = () => {
  const rows = [['Subject', 'Term 1', 'Term 2', 'Current', 'Grade'], ...grades.map(item => [item.subject, item.term1, item.term2, item.current, item.grade])]
  const csv = rows.map(row => row.join(',')).join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'grade-report.csv'
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <section>
    <div class="dashboard-welcome">
      <div><h2>Student workspace</h2><p>Profile, academic progress, coursework, and communication in one view.</p></div>
    </div>

    <div class="tabs" role="tablist" aria-label="Student information">
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
        <h3>{{ student?.name || 'Student profile' }}</h3>
        <p>{{ student?.group || 'Class not assigned' }}</p>
        <span class="status status--active" style="margin-top: 1rem">{{ student?.status || 'Active' }}</span>
      </article>
      <section class="panel">
        <div class="panel__header"><h2>Profile information</h2><button class="button button--secondary" type="button"><Icon name="ph:pencil-simple" /> Edit profile</button></div>
        <div class="panel__body detail-list">
          <div class="detail-item"><span>Email address</span><strong>{{ student?.email || 'Not available' }}</strong></div>
          <div class="detail-item"><span>Student number</span><strong>{{ student?.id || 'Not available' }}</strong></div>
          <div class="detail-item"><span>Class</span><strong>{{ student?.group || 'Not assigned' }}</strong></div>
          <div class="detail-item"><span>Attendance</span><strong>{{ student?.attendance || 0 }}%</strong></div>
          <div class="detail-item"><span>Current average</span><strong>{{ average }}%</strong></div>
          <div class="detail-item"><span>Enrolment status</span><strong>{{ student?.status || 'Active' }}</strong></div>
        </div>
      </section>
    </div>

    <section v-else-if="activeTab === 'grades'" class="panel">
      <div class="panel__header">
        <div><h2>Grade overview</h2><span style="color: var(--ink-soft); font-size: 0.8rem">Current average: {{ average }}%</span></div>
        <div style="display: flex; gap: 0.5rem">
          <button class="button button--secondary" type="button" @click="exportGrades"><Icon name="ph:download-simple" /> CSV</button>
          <button class="button button--secondary" type="button" @click="printReport"><Icon name="ph:printer" /> Print / PDF</button>
        </div>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Subject</th><th>Term 1</th><th>Term 2</th><th>Current</th><th>Grade</th></tr></thead>
          <tbody><tr v-for="item in grades" :key="item.subject"><td><strong>{{ item.subject }}</strong></td><td>{{ item.term1 }}%</td><td>{{ item.term2 }}%</td><td>{{ item.current }}%</td><td><span class="status status--active">{{ item.grade }}</span></td></tr></tbody>
        </table>
      </div>
    </section>

    <section v-else-if="activeTab === 'events'" class="panel">
      <div class="panel__header"><h2>School calendar</h2></div>
      <div class="panel__body event-list">
        <div v-for="event in schoolEvents" :key="event.id" class="event-item"><div class="event-date"><strong>{{ event.day }}</strong><span>{{ event.month }}</span></div><div><h3>{{ event.title }}</h3><p>{{ event.meta }}</p></div></div>
      </div>
    </section>

    <section v-else-if="activeTab === 'announcements'" class="panel">
      <div class="panel__header"><h2>Announcements</h2></div>
      <div class="panel__body announcement-list">
        <article v-for="item in announcements" :key="item.id" class="announcement-item"><h3>{{ item.title }}</h3><p>{{ item.date }}</p><p style="margin-top: 0.5rem; color: var(--ink)">{{ item.body }}</p></article>
      </div>
    </section>

    <section v-else-if="activeTab === 'assignments'" class="panel">
      <div class="panel__header"><h2>Assignments</h2></div>
      <div class="panel__body task-list">
        <article v-for="item in assignments" :key="item.id" class="task-item">
          <div><h3>{{ item.name }}</h3><p>{{ item.course }} | Due {{ item.due }}</p></div>
          <button class="button" :class="item.status === 'Submitted' ? 'button--secondary' : 'button--primary'" type="button" @click="item.status = item.status === 'Submitted' ? 'Open' : 'Submitted'">
            {{ item.status === 'Submitted' ? 'Submitted' : 'Submit assignment' }}
          </button>
        </article>
      </div>
    </section>

    <div v-else-if="activeTab === 'courses'" class="course-grid">
      <article v-for="course in courses" :key="course.id" class="course-card">
        <img :src="course.image" :alt="course.name" width="560" height="180" loading="lazy">
        <div class="course-card__body"><span class="status">{{ course.code }}</span><h3 style="margin-top: 0.8rem">{{ course.name }}</h3><p style="color: var(--ink-soft)">{{ course.teacher }}</p><div class="course-card__meta"><span>{{ course.learners }} learners</span><span>{{ course.progress }}% complete</span></div><button class="button button--secondary" type="button">Open course</button></div>
      </article>
    </div>

    <section v-else class="panel">
      <div class="panel__header"><h2>Streaming classroom</h2></div>
      <div class="empty-state">
        <Icon name="ph:video-camera" aria-hidden="true" />
        <strong>No live class right now</strong>
        <span>Scheduled live lessons and recordings will appear here.</span>
        <button class="button button--primary" type="button" style="margin-top: 1rem">Schedule session</button>
      </div>
    </section>
  </section>
</template>
