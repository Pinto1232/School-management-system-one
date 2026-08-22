import type { PackagePlan, SchoolPerson } from '~/types'

export const publicNavigation = [
  { label: 'Início', to: '/' },
  { label: 'Sobre', to: '/about' },
  { label: 'Perguntas frequentes', to: '/faq' },
]

export const dashboardNavigation = [
  { label: 'Painel', slug: 'dashboard', icon: 'ph:squares-four', roles: ['admin', 'teacher', 'staff', 'parent', 'student'] },
  { label: 'Alunos', slug: 'students', icon: 'ph:student', roles: ['admin', 'teacher', 'staff'] },
  { label: 'Professores', slug: 'teachers', icon: 'ph:chalkboard-teacher', roles: ['admin', 'teacher', 'staff'] },
  { label: 'Disciplinas', slug: 'courses', icon: 'ph:books', roles: ['admin', 'teacher', 'staff', 'parent', 'student'] },
  { label: 'Presenças', slug: 'attendance', icon: 'ph:check-square', roles: ['admin', 'teacher'] },
  { label: 'Calendário e eventos', slug: 'events', icon: 'ph:calendar-dots', roles: ['admin', 'teacher', 'staff', 'parent', 'student'] },
  { label: 'Planificação de aulas', slug: 'lesson-planning', icon: 'ph:notebook', roles: ['admin', 'teacher'] },
  { label: 'Admissões', slug: 'admissions', icon: 'ph:user-plus', roles: ['admin', 'staff'] },
  { label: 'Relatórios', slug: 'reports', icon: 'ph:chart-bar', roles: ['admin', 'teacher', 'staff'] },
  { label: 'Propinas', slug: 'fees', icon: 'ph:wallet', roles: ['admin', 'staff'] },
  { label: 'Avaliações', slug: 'grading', icon: 'ph:exam', roles: ['admin', 'teacher'] },
  { label: 'Tarefas', slug: 'tasks', icon: 'ph:list-checks', roles: ['admin', 'teacher', 'staff'] },
  { label: 'Portal dos encarregados', slug: 'parent-portal', icon: 'ph:users-three', roles: ['admin', 'staff', 'parent'] },
  { label: 'Funcionários', slug: 'staff', icon: 'ph:identification-card', roles: ['admin'] },
  { label: 'Horário', slug: 'timetable', icon: 'ph:clock', roles: ['admin', 'teacher', 'staff', 'parent', 'student'] },
]

export const dashboardNavigationForRoles = (roles: readonly string[]) => {
  const normalisedRoles = roles.map(role => role.toLowerCase())
  if (normalisedRoles.includes('platform_admin')) normalisedRoles.push('admin')
  return dashboardNavigation.filter(item => item.roles.some(role => normalisedRoles.includes(role)))
}

export const canAccessDashboardView = (slug: string, roles: readonly string[]) =>
  dashboardNavigationForRoles(roles).some(item => item.slug === slug)

export const benefits = [
  {
    icon: 'ph:student',
    title: 'Registos dos alunos',
    description: 'Mantenha ligados os perfis, matrículas, notas, presenças e progresso de aprendizagem.',
  },
  {
    icon: 'ph:chalkboard-teacher',
    title: 'Ferramentas de ensino',
    description: 'Planifique aulas, organize materiais, publique tarefas e acompanhe o progresso das turmas.',
  },
  {
    icon: 'ph:chat-circle-text',
    title: 'Comunicação com as famílias',
    description: 'Dê aos encarregados de educação uma visão clara dos comunicados, presenças, propinas e resultados.',
  },
  {
    icon: 'ph:chart-line-up',
    title: 'Relatórios úteis',
    description: 'Transforme a atividade escolar diária em relatórios operacionais e académicos claros.',
  },
]

export const fallbackPlans: PackagePlan[] = [
  {
    id: 'essential',
    name: 'Essencial',
    price: 399,
    description: 'Administração essencial para uma escola em crescimento.',
    image: '/images/plan-essential.webp',
    features: ['Perfis de alunos', 'Registo de presenças', 'Comunicados', 'Suporte por e-mail'],
  },
  {
    id: 'complete',
    name: 'Completo',
    price: 749,
    description: 'Ferramentas académicas e operacionais para toda a escola.',
    image: '/images/plan-complete.webp',
    features: ['Tudo o que está incluído no Essencial', 'Notas e relatórios', 'Planificação de aulas', 'Portal dos encarregados de educação', 'Suporte prioritário'],
  },
]

export const faqs = [
  {
    question: 'Quem pode utilizar a plataforma?',
    answer: 'O sistema apoia administradores, professores, alunos, encarregados de educação e funcionários numa única plataforma partilhada.',
  },
  {
    question: 'É possível acompanhar presenças e notas?',
    answer: 'Sim. Os funcionários podem registar presenças, gerir notas e acompanhar o desempenho dos alunos no painel.',
  },
  {
    question: 'Funciona em telemóveis e tablets?',
    answer: 'Sim. A interface adapta-se a computadores, tablets e telemóveis, incluindo a navegação e os formulários do painel.',
  },
  {
    question: 'Como recebem as famílias as atualizações?',
    answer: 'O portal dos encarregados de educação reúne comunicados, presenças, resultados académicos, propinas e eventos escolares.',
  },
  {
    question: 'É possível exportar relatórios?',
    answer: 'As notas e os dados operacionais podem ser exportados em formato CSV. Também estão disponíveis relatórios preparados para impressão.',
  },
]

export const samplePeople: SchoolPerson[] = [
  { id: 'st-1042', name: 'Naledi Mokoena', email: 'naledi.mokoena@escola.test', role: 'Aluno', group: '11.ª classe A', attendance: 96, status: 'Ativo' },
  { id: 'st-1087', name: 'Lethabo Khumalo', email: 'lethabo.khumalo@escola.test', role: 'Aluno', group: '10.ª classe B', attendance: 91, status: 'Ativo' },
  { id: 'st-1114', name: 'Amina Patel', email: 'amina.patel@escola.test', role: 'Aluno', group: '12.ª classe A', attendance: 98, status: 'Ativo' },
  { id: 'st-1136', name: 'Onke Mthembu', email: 'onke.mthembu@escola.test', role: 'Aluno', group: '9.ª classe C', attendance: 84, status: 'Pendente' },
  { id: 'st-1171', name: 'Karabo Seabi', email: 'karabo.seabi@escola.test', role: 'Aluno', group: '11.ª classe B', attendance: 93, status: 'Ativo' },
  { id: 'st-1203', name: 'Imani Daniels', email: 'imani.daniels@escola.test', role: 'Aluno', group: '8.ª classe A', attendance: 88, status: 'Ativo' },
]

export const teachers = [
  { id: 'tc-18', name: 'Thandi Ndlovu', subject: 'Matemática', classes: 4, students: 112, status: 'Ativo' },
  { id: 'tc-24', name: 'Yusuf Ismail', subject: 'Ciências Físicas', classes: 3, students: 86, status: 'Ativo' },
  { id: 'tc-31', name: 'Zanele Sithole', subject: 'Português', classes: 5, students: 138, status: 'Ativo' },
  { id: 'tc-42', name: 'Michael Adams', subject: 'História', classes: 3, students: 79, status: 'De licença' },
]

export const courses = [
  { id: 'course-1', name: 'Matemática', code: 'MAT-11', teacher: 'Thandi Ndlovu', learners: 31, progress: 72, image: '/images/school.webp' },
  { id: 'course-2', name: 'Ciências Físicas', code: 'CFI-11', teacher: 'Yusuf Ismail', learners: 28, progress: 64, image: '/images/background-01.webp' },
  { id: 'course-3', name: 'Português', code: 'POR-11', teacher: 'Zanele Sithole', learners: 31, progress: 81, image: '/images/about-us.webp' },
  { id: 'course-4', name: 'História', code: 'HIS-11', teacher: 'Michael Adams', learners: 27, progress: 59, image: '/images/aboutUs.png' },
]

export const assignments = [
  { id: 'as-1', name: 'Investigação sobre funções', course: 'Matemática', due: '28 ago. 2026', status: 'Aberta' },
  { id: 'as-2', name: 'Relatório prático sobre momento', course: 'Ciências Físicas', due: '30 ago. 2026', status: 'Aberta' },
  { id: 'as-3', name: 'Ensaio de literatura comparada', course: 'Português', due: '02 set. 2026', status: 'Rascunho' },
  { id: 'as-4', name: 'Análise de fontes', course: 'História', due: '05 set. 2026', status: 'Aberta' },
]

export const announcements = [
  { id: 'an-1', title: 'Inscrições para o atletismo', date: '22 ago. 2026', body: 'As inscrições terminam na sexta-feira. Os alunos podem confirmar as provas com o diretor de turma.' },
  { id: 'an-2', title: 'Reunião dos encarregados da 12.ª classe', date: '20 ago. 2026', body: 'A reunião de avaliação do período realiza-se no salão da escola às 18:00.' },
  { id: 'an-3', title: 'Horário alargado da biblioteca', date: '18 ago. 2026', body: 'A biblioteca permanecerá aberta até às 17:30, de segunda a quinta-feira.' },
]

export const schoolEvents = [
  { id: 'ev-1', day: '24', month: 'ago.', title: 'Revisão de Matemática', meta: '14:30 - Sala B12' },
  { id: 'ev-2', day: '26', month: 'ago.', title: 'Conselho de direção escolar', meta: '17:30 - Sala de conferências' },
  { id: 'ev-3', day: '29', month: 'ago.', title: 'Atletismo interescolar', meta: '08:00 - Campo desportivo' },
  { id: 'ev-4', day: '02', month: 'set.', title: 'Escolha de disciplinas da 9.ª classe', meta: '18:00 - Salão da escola' },
]

export const grades = [
  { subject: 'Matemática', term1: 74, term2: 78, current: 81, grade: 'A' },
  { subject: 'Ciências Físicas', term1: 69, term2: 73, current: 76, grade: 'B' },
  { subject: 'Português', term1: 82, term2: 85, current: 84, grade: 'A' },
  { subject: 'História', term1: 71, term2: 68, current: 75, grade: 'B' },
  { subject: 'Educação para a Vida', term1: 88, term2: 90, current: 92, grade: 'A' },
]

export const tasks = [
  { id: 'task-1', title: 'Aprovar novas admissões', owner: 'Administração', due: 'Hoje', status: 'Em curso' },
  { id: 'task-2', title: 'Publicar o plano de avaliação do período', owner: 'Área académica', due: '25 ago.', status: 'Revisão' },
  { id: 'task-3', title: 'Conferir os recibos de propinas de agosto', owner: 'Finanças', due: '27 ago.', status: 'Não iniciada' },
  { id: 'task-4', title: 'Confirmar o transporte para o atletismo', owner: 'Operações', due: '28 ago.', status: 'Concluída' },
]

export const timetable = [
  { time: '08:00', monday: 'Matemática', tuesday: 'Português', wednesday: 'História', thursday: 'Matemática', friday: 'Educação para a Vida' },
  { time: '09:00', monday: 'Português', tuesday: 'Ciências Físicas', wednesday: 'Matemática', thursday: 'História', friday: 'Português' },
  { time: '10:15', monday: 'Ciências Físicas', tuesday: 'Matemática', wednesday: 'Português', thursday: 'Ciências Físicas', friday: 'História' },
  { time: '11:30', monday: 'História', tuesday: 'Educação para a Vida', wednesday: 'Ciências Físicas', thursday: 'Português', friday: 'Matemática' },
  { time: '13:00', monday: 'Educação para a Vida', tuesday: 'História', wednesday: 'Período de estudo', thursday: 'Educação para a Vida', friday: 'Assembleia' },
]

export const performance = [
  { label: 'jan.', value: 62 },
  { label: 'fev.', value: 68 },
  { label: 'mar.', value: 65 },
  { label: 'abr.', value: 74 },
  { label: 'mai.', value: 78 },
  { label: 'jun.', value: 76 },
  { label: 'jul.', value: 83 },
  { label: 'ago.', value: 86 },
]
