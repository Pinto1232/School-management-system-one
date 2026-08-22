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
const tasks = ref(taskSource.map(task => ({ ...task, complete: task.status === 'Done' })))
const events = ref(schoolEvents.map(event => ({ ...event })))
const lessonPlans = ref([
  { id: 'lp-1', title: 'Quadratic functions', course: 'Mathematics', date: '25 Aug 2026', status: 'Ready' },
  { id: 'lp-2', title: 'Momentum and impulse', course: 'Physical Sciences', date: '27 Aug 2026', status: 'Draft' },
])
const lessonForm = reactive({ title: '', course: courses[0]?.name || '', date: '', objective: '' })
const eventForm = reactive({ title: '', date: '', time: '', location: '' })
const formMessage = ref('')

const applicants = [
  { id: 'AD-2041', name: 'Siyabonga Cele', grade: 'Grade 8', submitted: '18 Aug 2026', status: 'Review' },
  { id: 'AD-2042', name: 'Mila Jacobs', grade: 'Grade 10', submitted: '19 Aug 2026', status: 'Pending' },
  { id: 'AD-2043', name: 'Refilwe Molefe', grade: 'Grade 9', submitted: '20 Aug 2026', status: 'Accepted' },
  { id: 'AD-2044', name: 'Aphiwe Dlamini', grade: 'Grade 8', submitted: '21 Aug 2026', status: 'Review' },
]

const fees = [
  { id: 'INV-6831', family: 'Mokoena family', item: 'Term 3 tuition', amount: 7350, due: '31 Aug 2026', status: 'Paid' },
  { id: 'INV-6842', family: 'Khumalo family', item: 'Term 3 tuition', amount: 7350, due: '31 Aug 2026', status: 'Pending' },
  { id: 'INV-6857', family: 'Patel family', item: 'Activities levy', amount: 1250, due: '05 Sep 2026', status: 'Paid' },
  { id: 'INV-6870', family: 'Mthembu family', item: 'Transport', amount: 980, due: '05 Sep 2026', status: 'Overdue' },
]

const staff = [
  ...teachers.map(item => ({ id: item.id, name: item.name, department: 'Academics', position: `${item.subject} teacher`, status: item.status })),
  { id: 'sf-54', name: 'Nombuso Radebe', department: 'Administration', position: 'Admissions officer', status: 'Active' },
  { id: 'sf-63', name: 'Pieter van Wyk', department: 'Operations', position: 'Facilities manager', status: 'Active' },
]

const pageCopy: Record<string, { title: string; description: string }> = {
  teachers: { title: 'Teachers', description: 'Teaching assignments, class load, and staff availability.' },
  courses: { title: 'Courses', description: 'Course material, class ownership, and academic progress.' },
  attendance: { title: 'Attendance', description: 'Record today’s attendance and review learner participation.' },
  events: { title: 'Calendar and events', description: 'Plan school activities, meetings, assessments, and deadlines.' },
  'lesson-planning': { title: 'Lesson planning', description: 'Prepare objectives, schedules, and teaching resources.' },
  admissions: { title: 'Admissions', description: 'Review applications and follow each learner’s admission status.' },
  reports: { title: 'Reports', description: 'Review academic and operational indicators, then export what you need.' },
  fees: { title: 'Fees', description: 'Track invoices, receipts, balances, and payment status.' },
  grading: { title: 'Grading', description: 'Review term marks and prepare learner grade reports.' },
  tasks: { title: 'Tasks', description: 'Coordinate operational work across school departments.' },
  'parent-portal': { title: 'Parent portal', description: 'A family view of learning, attendance, announcements, and fees.' },
  staff: { title: 'Staff', description: 'School employees, roles, departments, and availability.' },
  timetable: { title: 'Timetable', description: 'A weekly view of classes, teaching periods, and shared activities.' },
}

const copy = computed(() => pageCopy[props.slug] || { title: 'School workspace', description: 'This school module is ready for connected data.' })

const saveAttendance = () => {
  attendanceSaved.value = true
  setTimeout(() => { attendanceSaved.value = false }, 3500)
}

const saveLesson = () => {
  if (!lessonForm.title.trim() || !lessonForm.date) {
    formMessage.value = 'Add a lesson title and date.'
    return
  }
  lessonPlans.value.unshift({
    id: `lp-${Date.now()}`,
    title: lessonForm.title.trim(),
    course: lessonForm.course,
    date: new Intl.DateTimeFormat('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${lessonForm.date}T00:00:00`)),
    status: 'Draft',
  })
  Object.assign(lessonForm, { title: '', course: courses[0]?.name || '', date: '', objective: '' })
  formMessage.value = 'Lesson plan saved.'
}

const addEvent = () => {
  if (!eventForm.title.trim() || !eventForm.date) {
    formMessage.value = 'Add an event title and date.'
    return
  }
  const date = new Date(`${eventForm.date}T00:00:00`)
  events.value.push({
    id: `ev-${Date.now()}`,
    day: String(date.getDate()).padStart(2, '0'),
    month: new Intl.DateTimeFormat('en-ZA', { month: 'short' }).format(date),
    title: eventForm.title.trim(),
    meta: [eventForm.time, eventForm.location].filter(Boolean).join(' - ') || 'Time to be confirmed',
  })
  Object.assign(eventForm, { title: '', date: '', time: '', location: '' })
  formMessage.value = 'Event added to the school calendar.'
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

const exportGrades = () => downloadCsv('grade-report.csv', [
  ['Subject', 'Term 1', 'Term 2', 'Current', 'Grade'],
  ...grades.map(item => [item.subject, item.term1, item.term2, item.current, item.grade]),
])

const exportFees = () => downloadCsv('fee-report.csv', [
  ['Invoice', 'Family', 'Item', 'Amount', 'Due', 'Status'],
  ...fees.map(item => [item.id, item.family, item.item, item.amount, item.due, item.status]),
])

const printPage = () => window.print()
</script>

<template>
  <section>
    <div class="dashboard-welcome">
      <div><h2>{{ copy.title }}</h2><p>{{ copy.description }}</p></div>
      <span class="dashboard-date">Sample school data</span>
    </div>

    <template v-if="slug === 'teachers'">
      <div class="page-toolbar"><div class="page-toolbar__search"><Icon name="ph:magnifying-glass" /><input class="search-input" type="search" aria-label="Search teachers" placeholder="Search teachers"></div><button class="button button--primary" type="button"><Icon name="ph:plus" /> Add teacher</button></div>
      <div class="panel table-wrap">
        <table class="data-table"><thead><tr><th>Teacher</th><th>Subject</th><th>Classes</th><th>Learners</th><th>Status</th></tr></thead><tbody><tr v-for="item in teachers" :key="item.id"><td><div class="person-cell"><div class="avatar">{{ item.name.split(' ').map(part => part[0]).slice(0, 2).join('') }}</div><strong>{{ item.name }}</strong></div></td><td>{{ item.subject }}</td><td>{{ item.classes }}</td><td>{{ item.students }}</td><td><span class="status" :class="item.status === 'Active' ? 'status--active' : 'status--pending'">{{ item.status }}</span></td></tr></tbody></table>
      </div>
    </template>

    <div v-else-if="slug === 'courses'" class="course-grid">
      <article v-for="course in courses" :key="course.id" class="course-card">
        <img :src="course.image" :alt="course.name" width="560" height="180">
        <div class="course-card__body"><span class="status">{{ course.code }}</span><h3 style="margin-top: 0.8rem">{{ course.name }}</h3><p style="color: var(--ink-soft)">{{ course.teacher }}</p><div class="course-card__meta"><span>{{ course.learners }} learners</span><span>{{ course.progress }}% complete</span></div><div class="progress-inline__line" style="width: 100%; height: 6px"><span :style="{ width: `${course.progress}%` }" /></div><button class="button button--secondary" type="button" style="margin-top: 1rem">Open course</button></div>
      </article>
    </div>

    <template v-else-if="slug === 'attendance'">
      <AppAlert v-if="attendanceSaved" type="success" message="Attendance has been recorded for this class." style="margin-bottom: 1rem" />
      <div class="page-toolbar"><div class="billing-toggle"><button class="is-active" type="button">Grade 11A</button><button type="button">Grade 11B</button><button type="button">Grade 12A</button></div><button class="button button--primary" type="button" @click="saveAttendance"><Icon name="ph:check" /> Record attendance</button></div>
      <div class="panel table-wrap">
        <table class="data-table"><thead><tr><th>Learner</th><th>Class</th><th>Historical attendance</th><th>Today</th></tr></thead><tbody><tr v-for="person in attendance" :key="person.id"><td><strong>{{ person.name }}</strong><br><span style="color: var(--ink-soft); font-size: 0.78rem">{{ person.email }}</span></td><td>{{ person.group }}</td><td>{{ person.attendance }}%</td><td><button class="button" :class="person.present ? 'button--primary' : 'button--secondary'" type="button" @click="person.present = !person.present">{{ person.present ? 'Present' : 'Absent' }}</button></td></tr></tbody></table>
      </div>
    </template>

    <div v-else-if="slug === 'events'" class="dashboard-grid" style="margin-top: 0">
      <section class="panel"><div class="panel__header"><h2>Upcoming events</h2></div><div class="panel__body event-list"><div v-for="event in events" :key="event.id" class="event-item"><div class="event-date"><strong>{{ event.day }}</strong><span>{{ event.month }}</span></div><div><h3>{{ event.title }}</h3><p>{{ event.meta }}</p></div></div></div></section>
      <section class="panel"><div class="panel__header"><h2>Add event</h2></div><form class="panel__body form-stack" @submit.prevent="addEvent"><AppAlert v-if="formMessage" :type="formMessage.startsWith('Event added') ? 'success' : 'error'" :message="formMessage" /><div class="field"><label for="event-title">Event title</label><input id="event-title" v-model="eventForm.title" type="text" placeholder="Event title"></div><div class="form-grid"><div class="field"><label for="event-date">Date</label><input id="event-date" v-model="eventForm.date" type="date"></div><div class="field"><label for="event-time">Time</label><input id="event-time" v-model="eventForm.time" type="time"></div></div><div class="field"><label for="event-location">Location</label><input id="event-location" v-model="eventForm.location" type="text" placeholder="School hall"></div><button class="button button--primary" type="submit">Add event</button></form></section>
    </div>

    <div v-else-if="slug === 'lesson-planning'" class="dashboard-grid" style="margin-top: 0">
      <section class="panel"><div class="panel__header"><h2>New lesson plan</h2></div><form class="panel__body form-stack" @submit.prevent="saveLesson"><AppAlert v-if="formMessage" :type="formMessage.startsWith('Lesson plan saved') ? 'success' : 'error'" :message="formMessage" /><div class="field"><label for="lesson-title">Lesson title</label><input id="lesson-title" v-model="lessonForm.title" type="text" placeholder="Topic or lesson title"></div><div class="form-grid"><div class="field"><label for="lesson-course">Course</label><select id="lesson-course" v-model="lessonForm.course"><option v-for="course in courses" :key="course.id">{{ course.name }}</option></select></div><div class="field"><label for="lesson-date">Teaching date</label><input id="lesson-date" v-model="lessonForm.date" type="date"></div></div><div class="field"><label for="lesson-objective">Learning objective</label><textarea id="lesson-objective" v-model="lessonForm.objective" rows="5" placeholder="What should learners understand or be able to do?"></textarea></div><button class="button button--primary" type="submit">Save lesson plan</button></form></section>
      <section class="panel"><div class="panel__header"><h2>Recent plans</h2></div><div class="panel__body task-list"><article v-for="plan in lessonPlans" :key="plan.id" class="task-item"><div><h3>{{ plan.title }}</h3><p>{{ plan.course }} | {{ plan.date }}</p></div><span class="status" :class="plan.status === 'Ready' ? 'status--active' : 'status--draft'">{{ plan.status }}</span></article></div></section>
    </div>

    <template v-else-if="slug === 'admissions'">
      <div class="page-toolbar"><div class="page-toolbar__search"><Icon name="ph:magnifying-glass" /><input class="search-input" type="search" aria-label="Search applications" placeholder="Search applications"></div><button class="button button--primary" type="button"><Icon name="ph:plus" /> New application</button></div>
      <div class="panel table-wrap"><table class="data-table"><thead><tr><th>Application</th><th>Learner</th><th>Applying for</th><th>Submitted</th><th>Status</th><th>Action</th></tr></thead><tbody><tr v-for="item in applicants" :key="item.id"><td>{{ item.id }}</td><td><strong>{{ item.name }}</strong></td><td>{{ item.grade }}</td><td>{{ item.submitted }}</td><td><span class="status" :class="item.status === 'Accepted' ? 'status--active' : 'status--pending'">{{ item.status }}</span></td><td><button class="button button--secondary" type="button">Review</button></td></tr></tbody></table></div>
    </template>

    <template v-else-if="slug === 'reports'">
      <div class="page-toolbar"><div></div><div style="display: flex; gap: 0.5rem"><button class="button button--secondary" type="button" @click="exportGrades"><Icon name="ph:download-simple" /> Export CSV</button><button class="button button--primary" type="button" @click="printPage"><Icon name="ph:printer" /> Print report</button></div></div>
      <div class="metric-grid"><article class="metric"><span class="metric__label">Academic average</span><strong class="metric__value">81%</strong><span class="metric__change">Sample Term 3 report</span></article><article class="metric"><span class="metric__label">Attendance</span><strong class="metric__value">93%</strong><span class="metric__change">Whole-school average</span></article><article class="metric"><span class="metric__label">Fees collected</span><strong class="metric__value">87%</strong><span class="metric__change">Current billing cycle</span></article><article class="metric"><span class="metric__label">Admissions</span><strong class="metric__value">24</strong><span class="metric__change">Open applications</span></article></div>
      <section class="panel" style="margin-top: 1rem"><div class="panel__header"><h2>Performance trend</h2></div><div class="panel__body"><div class="chart"><div v-for="point in performance" :key="point.label" class="chart__item"><div class="chart__bar" :style="{ height: `${point.value}%` }" /><span class="chart__label">{{ point.label }}</span></div></div></div></section>
    </template>

    <template v-else-if="slug === 'fees'">
      <div class="page-toolbar"><div class="billing-toggle"><button class="is-active" type="button">All invoices</button><button type="button">Outstanding</button><button type="button">Paid</button></div><button class="button button--secondary" type="button" @click="exportFees"><Icon name="ph:download-simple" /> Export</button></div>
      <div class="panel table-wrap"><table class="data-table"><thead><tr><th>Invoice</th><th>Family</th><th>Item</th><th>Amount</th><th>Due</th><th>Status</th></tr></thead><tbody><tr v-for="item in fees" :key="item.id"><td>{{ item.id }}</td><td><strong>{{ item.family }}</strong></td><td>{{ item.item }}</td><td>R{{ item.amount.toLocaleString('en-ZA') }}</td><td>{{ item.due }}</td><td><span class="status" :class="item.status === 'Paid' ? 'status--paid' : item.status === 'Pending' ? 'status--pending' : ''">{{ item.status }}</span></td></tr></tbody></table></div>
    </template>

    <template v-else-if="slug === 'grading'">
      <div class="page-toolbar"><div class="billing-toggle"><button class="is-active" type="button">Term 3</button><button type="button">Term 2</button><button type="button">Term 1</button></div><div style="display: flex; gap: 0.5rem"><button class="button button--secondary" type="button" @click="exportGrades">Export CSV</button><button class="button button--primary" type="button" @click="printPage">Print / PDF</button></div></div>
      <div class="panel table-wrap"><table class="data-table"><thead><tr><th>Subject</th><th>Term 1</th><th>Term 2</th><th>Current</th><th>Grade</th></tr></thead><tbody><tr v-for="item in grades" :key="item.subject"><td><strong>{{ item.subject }}</strong></td><td>{{ item.term1 }}%</td><td>{{ item.term2 }}%</td><td>{{ item.current }}%</td><td><span class="status status--active">{{ item.grade }}</span></td></tr></tbody></table></div>
    </template>

    <section v-else-if="slug === 'tasks'" class="panel">
      <div class="panel__header"><h2>Team task board</h2><button class="button button--primary" type="button"><Icon name="ph:plus" /> Add task</button></div>
      <div class="panel__body task-list"><article v-for="item in tasks" :key="item.id" class="task-item"><div style="display: flex; align-items: flex-start; gap: 0.75rem"><input v-model="item.complete" type="checkbox" :aria-label="`Mark ${item.title} complete`" style="margin-top: 0.25rem"><div><h3 :style="item.complete ? { textDecoration: 'line-through', color: 'var(--ink-soft)' } : undefined">{{ item.title }}</h3><p>{{ item.owner }} | Due {{ item.due }}</p></div></div><span class="status" :class="item.complete ? 'status--done' : item.status === 'Review' ? 'status--review' : ''">{{ item.complete ? 'Done' : item.status }}</span></article></div>
    </section>

    <template v-else-if="slug === 'parent-portal'">
      <AppAlert type="info" message="This preview shows the information a linked parent account can access." style="margin-bottom: 1rem" />
      <div class="metric-grid"><article class="metric"><span class="metric__label">Attendance</span><strong class="metric__value">96%</strong><span class="metric__change">Naledi Mokoena</span></article><article class="metric"><span class="metric__label">Current average</span><strong class="metric__value">82%</strong><span class="metric__change">Term 3</span></article><article class="metric"><span class="metric__label">Open assignments</span><strong class="metric__value">3</strong><span class="metric__change">Next due 28 Aug</span></article><article class="metric"><span class="metric__label">Fee balance</span><strong class="metric__value">R0</strong><span class="metric__change">Account up to date</span></article></div>
      <div class="dashboard-grid"><section class="panel"><div class="panel__header"><h2>Recent grades</h2></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Subject</th><th>Current mark</th><th>Grade</th></tr></thead><tbody><tr v-for="item in grades.slice(0, 4)" :key="item.subject"><td>{{ item.subject }}</td><td>{{ item.current }}%</td><td><span class="status status--active">{{ item.grade }}</span></td></tr></tbody></table></div></section><section class="panel"><div class="panel__header"><h2>Announcements</h2></div><div class="panel__body announcement-list"><article v-for="item in announcements.slice(0, 2)" :key="item.id" class="announcement-item"><h3>{{ item.title }}</h3><p>{{ item.date }}</p><p style="margin-top: 0.4rem; color: var(--ink)">{{ item.body }}</p></article></div></section></div>
    </template>

    <template v-else-if="slug === 'staff'">
      <div class="page-toolbar"><div class="page-toolbar__search"><Icon name="ph:magnifying-glass" /><input class="search-input" type="search" aria-label="Search staff" placeholder="Search staff"></div><button class="button button--primary" type="button"><Icon name="ph:plus" /> Add staff member</button></div>
      <div class="panel table-wrap"><table class="data-table"><thead><tr><th>Staff member</th><th>Department</th><th>Position</th><th>Status</th></tr></thead><tbody><tr v-for="item in staff" :key="item.id"><td><strong>{{ item.name }}</strong></td><td>{{ item.department }}</td><td>{{ item.position }}</td><td><span class="status" :class="item.status === 'Active' ? 'status--active' : 'status--pending'">{{ item.status }}</span></td></tr></tbody></table></div>
    </template>

    <section v-else-if="slug === 'timetable'" class="panel">
      <div class="panel__header"><h2>Grade 11A weekly timetable</h2><button class="button button--secondary" type="button" @click="printPage"><Icon name="ph:printer" /> Print</button></div>
      <div class="table-wrap"><div class="schedule-grid"><div class="schedule-grid__head">Time</div><div v-for="day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']" :key="day" class="schedule-grid__head">{{ day }}</div><template v-for="row in timetable" :key="row.time"><div class="schedule-grid__time">{{ row.time }}</div><div>{{ row.monday }}</div><div>{{ row.tuesday }}</div><div>{{ row.wednesday }}</div><div>{{ row.thursday }}</div><div>{{ row.friday }}</div></template></div></div>
    </section>

    <div v-else class="panel empty-state">
      <Icon name="ph:folder-open" aria-hidden="true" />
      <strong>{{ copy.title }} is ready for data</strong>
      <span>Connect this view to the matching backend route to populate it.</span>
    </div>
  </section>
</template>
