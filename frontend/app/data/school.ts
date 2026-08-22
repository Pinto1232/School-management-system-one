import type { PackagePlan, SchoolPerson } from '~/types'

export const publicNavigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'FAQs', to: '/faq' },
]

export const dashboardNavigation = [
  { label: 'Dashboard', slug: 'dashboard', icon: 'ph:squares-four' },
  { label: 'Students', slug: 'students', icon: 'ph:student' },
  { label: 'Teachers', slug: 'teachers', icon: 'ph:chalkboard-teacher' },
  { label: 'Courses', slug: 'courses', icon: 'ph:books' },
  { label: 'Attendance', slug: 'attendance', icon: 'ph:check-square' },
  { label: 'Calendar/Events', slug: 'events', icon: 'ph:calendar-dots' },
  { label: 'Lesson Planning', slug: 'lesson-planning', icon: 'ph:notebook' },
  { label: 'Admissions', slug: 'admissions', icon: 'ph:user-plus' },
  { label: 'Reports', slug: 'reports', icon: 'ph:chart-bar' },
  { label: 'Fees', slug: 'fees', icon: 'ph:wallet' },
  { label: 'Grading', slug: 'grading', icon: 'ph:exam' },
  { label: 'Tasks', slug: 'tasks', icon: 'ph:list-checks' },
  { label: 'Parent Portal', slug: 'parent-portal', icon: 'ph:users-three' },
  { label: 'Staff', slug: 'staff', icon: 'ph:identification-card' },
  { label: 'Timetable', slug: 'timetable', icon: 'ph:clock' },
]

export const benefits = [
  {
    icon: 'ph:student',
    title: 'Student records',
    description: 'Keep profiles, enrolment, grades, attendance, and learning progress connected.',
  },
  {
    icon: 'ph:chalkboard-teacher',
    title: 'Teaching tools',
    description: 'Plan lessons, manage course material, publish assignments, and review class progress.',
  },
  {
    icon: 'ph:chat-circle-text',
    title: 'Family communication',
    description: 'Give parents a clear view of announcements, attendance, fees, and academic results.',
  },
  {
    icon: 'ph:chart-line-up',
    title: 'Useful reporting',
    description: 'Turn day-to-day school activity into concise operational and academic reports.',
  },
]

export const fallbackPlans: PackagePlan[] = [
  {
    id: 'essential',
    name: 'Essential',
    price: 399,
    description: 'Core administration for a growing school.',
    features: ['Student profiles', 'Attendance tracking', 'Announcements', 'Email support'],
  },
  {
    id: 'complete',
    name: 'Complete',
    price: 749,
    description: 'Academic and operational tools for the whole school.',
    features: ['Everything in Essential', 'Grades and reports', 'Lesson planning', 'Parent portal', 'Priority support'],
  },
]

export const faqs = [
  {
    question: 'Who can use the platform?',
    answer: 'The system supports administrators, teachers, students, parents, and school staff through one shared platform.',
  },
  {
    question: 'Can we track attendance and grades?',
    answer: 'Yes. Staff can record attendance, manage grade information, and review student performance from the dashboard.',
  },
  {
    question: 'Does it work on phones and tablets?',
    answer: 'Yes. The interface adapts to desktop, tablet, and mobile screens, including the dashboard navigation and forms.',
  },
  {
    question: 'How do parents receive updates?',
    answer: 'The parent portal brings together announcements, attendance, academic results, fees, and school events.',
  },
  {
    question: 'Can we export reports?',
    answer: 'Grade and operational data can be exported in CSV format. Print-friendly reports are also available.',
  },
]

export const samplePeople: SchoolPerson[] = [
  { id: 'st-1042', name: 'Naledi Mokoena', email: 'naledi.mokoena@school.test', role: 'Student', group: 'Grade 11A', attendance: 96, status: 'Active' },
  { id: 'st-1087', name: 'Lethabo Khumalo', email: 'lethabo.khumalo@school.test', role: 'Student', group: 'Grade 10B', attendance: 91, status: 'Active' },
  { id: 'st-1114', name: 'Amina Patel', email: 'amina.patel@school.test', role: 'Student', group: 'Grade 12A', attendance: 98, status: 'Active' },
  { id: 'st-1136', name: 'Onke Mthembu', email: 'onke.mthembu@school.test', role: 'Student', group: 'Grade 9C', attendance: 84, status: 'Pending' },
  { id: 'st-1171', name: 'Karabo Seabi', email: 'karabo.seabi@school.test', role: 'Student', group: 'Grade 11B', attendance: 93, status: 'Active' },
  { id: 'st-1203', name: 'Imani Daniels', email: 'imani.daniels@school.test', role: 'Student', group: 'Grade 8A', attendance: 88, status: 'Active' },
]

export const teachers = [
  { id: 'tc-18', name: 'Thandi Ndlovu', subject: 'Mathematics', classes: 4, students: 112, status: 'Active' },
  { id: 'tc-24', name: 'Yusuf Ismail', subject: 'Physical Sciences', classes: 3, students: 86, status: 'Active' },
  { id: 'tc-31', name: 'Zanele Sithole', subject: 'English', classes: 5, students: 138, status: 'Active' },
  { id: 'tc-42', name: 'Michael Adams', subject: 'History', classes: 3, students: 79, status: 'On leave' },
]

export const courses = [
  { id: 'course-1', name: 'Mathematics', code: 'MAT-11', teacher: 'Thandi Ndlovu', learners: 31, progress: 72, image: '/images/school.webp' },
  { id: 'course-2', name: 'Physical Sciences', code: 'PHY-11', teacher: 'Yusuf Ismail', learners: 28, progress: 64, image: '/images/background-01.webp' },
  { id: 'course-3', name: 'English', code: 'ENG-11', teacher: 'Zanele Sithole', learners: 31, progress: 81, image: '/images/about-us.webp' },
  { id: 'course-4', name: 'History', code: 'HIS-11', teacher: 'Michael Adams', learners: 27, progress: 59, image: '/images/aboutUs.png' },
]

export const assignments = [
  { id: 'as-1', name: 'Functions investigation', course: 'Mathematics', due: '28 Aug 2026', status: 'Open' },
  { id: 'as-2', name: 'Momentum practical report', course: 'Physical Sciences', due: '30 Aug 2026', status: 'Open' },
  { id: 'as-3', name: 'Comparative literature essay', course: 'English', due: '02 Sep 2026', status: 'Draft' },
  { id: 'as-4', name: 'Source analysis', course: 'History', due: '05 Sep 2026', status: 'Open' },
]

export const announcements = [
  { id: 'an-1', title: 'Spring athletics entries', date: '22 Aug 2026', body: 'Entries close on Friday. Learners can confirm events with their class teacher.' },
  { id: 'an-2', title: 'Grade 12 parent meeting', date: '20 Aug 2026', body: 'The term review meeting takes place in the school hall at 18:00.' },
  { id: 'an-3', title: 'Library hours extended', date: '18 Aug 2026', body: 'The library will remain open until 17:30 from Monday to Thursday.' },
]

export const schoolEvents = [
  { id: 'ev-1', day: '24', month: 'Aug', title: 'Mathematics revision', meta: '14:30 - Room B12' },
  { id: 'ev-2', day: '26', month: 'Aug', title: 'School governing body', meta: '17:30 - Conference room' },
  { id: 'ev-3', day: '29', month: 'Aug', title: 'Inter-school athletics', meta: '08:00 - Sports grounds' },
  { id: 'ev-4', day: '02', month: 'Sep', title: 'Grade 9 subject choices', meta: '18:00 - School hall' },
]

export const grades = [
  { subject: 'Mathematics', term1: 74, term2: 78, current: 81, grade: 'A' },
  { subject: 'Physical Sciences', term1: 69, term2: 73, current: 76, grade: 'B' },
  { subject: 'English', term1: 82, term2: 85, current: 84, grade: 'A' },
  { subject: 'History', term1: 71, term2: 68, current: 75, grade: 'B' },
  { subject: 'Life Orientation', term1: 88, term2: 90, current: 92, grade: 'A' },
]

export const tasks = [
  { id: 'task-1', title: 'Approve new admissions', owner: 'Administration', due: 'Today', status: 'In progress' },
  { id: 'task-2', title: 'Publish term assessment plan', owner: 'Academics', due: '25 Aug', status: 'Review' },
  { id: 'task-3', title: 'Reconcile August fee receipts', owner: 'Finance', due: '27 Aug', status: 'Not started' },
  { id: 'task-4', title: 'Confirm athletics transport', owner: 'Operations', due: '28 Aug', status: 'Done' },
]

export const timetable = [
  { time: '08:00', monday: 'Mathematics', tuesday: 'English', wednesday: 'History', thursday: 'Mathematics', friday: 'Life Orientation' },
  { time: '09:00', monday: 'English', tuesday: 'Physical Sciences', wednesday: 'Mathematics', thursday: 'History', friday: 'English' },
  { time: '10:15', monday: 'Physical Sciences', tuesday: 'Mathematics', wednesday: 'English', thursday: 'Physical Sciences', friday: 'History' },
  { time: '11:30', monday: 'History', tuesday: 'Life Orientation', wednesday: 'Physical Sciences', thursday: 'English', friday: 'Mathematics' },
  { time: '13:00', monday: 'Life Orientation', tuesday: 'History', wednesday: 'Study period', thursday: 'Life Orientation', friday: 'Assembly' },
]

export const performance = [
  { label: 'Jan', value: 62 },
  { label: 'Feb', value: 68 },
  { label: 'Mar', value: 65 },
  { label: 'Apr', value: 74 },
  { label: 'May', value: 78 },
  { label: 'Jun', value: 76 },
  { label: 'Jul', value: 83 },
  { label: 'Aug', value: 86 },
]
