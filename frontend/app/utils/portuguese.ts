import type { PackagePlan } from '~/types'

const packageNames: Record<string, string> = {
  essential: 'Essencial',
  complete: 'Completo',
}

const packageDescriptions: Record<string, string> = {
  'Core administration for a growing school.': 'Administração essencial para uma escola em crescimento.',
  'Academic and operational tools for the whole school.': 'Ferramentas académicas e operacionais para toda a escola.',
}

const featureLabels: Record<string, string> = {
  'Student profiles': 'Perfis de alunos',
  'Attendance tracking': 'Registo de presenças',
  Announcements: 'Comunicados',
  'Email support': 'Suporte por e-mail',
  'Everything in Essential': 'Tudo o que está incluído no Essencial',
  'Grades and reports': 'Notas e relatórios',
  'Lesson planning': 'Planificação de aulas',
  'Parent portal': 'Portal dos encarregados de educação',
  'Priority support': 'Suporte prioritário',
  studentProfiles: 'Perfis de alunos',
  attendanceTracking: 'Registo de presenças',
  announcements: 'Comunicados',
  emailSupport: 'Suporte por e-mail',
  gradesAndReports: 'Notas e relatórios',
  lessonPlanning: 'Planificação de aulas',
  parentPortal: 'Portal dos encarregados de educação',
  prioritySupport: 'Suporte prioritário',
  studentEnrollment: 'Matrícula de alunos',
  personalAcademicRecords: 'Registos académicos individuais',
  gradebookReportCards: 'Pautas e boletins de notas',
  healthRecords: 'Registos de saúde',
  timetableManagement: 'Gestão de horários',
  attendanceManagement: 'Gestão de presenças',
  gradeExamManagement: 'Gestão de notas e exames',
  feePaymentManagement: 'Gestão de propinas e pagamentos',
  libraryManagement: 'Gestão da biblioteca',
  transportManagement: 'Gestão de transportes',
  humanResourceManagement: 'Gestão de recursos humanos',
  communicationCollaboration: 'Comunicação e colaboração',
  learningManagementSystem: 'Sistema de gestão da aprendizagem',
  parentStudentPortal: 'Portal dos encarregados e alunos',
  inventoryAssetManagement: 'Gestão de inventário e ativos',
  eventManagement: 'Gestão de eventos',
  analyticsReporting: 'Análises e relatórios',
  securityAccessControl: 'Segurança e controlo de acesso',
  'Student enrollment': 'Matrícula de alunos',
  'Personal academic records': 'Registos académicos individuais',
  'Gradebook and report cards': 'Pautas e boletins de notas',
  'Health records': 'Registos de saúde',
  'Timetable management': 'Gestão de horários',
  'Attendance management': 'Gestão de presenças',
  'Grade and exam management': 'Gestão de notas e exames',
  'Fee and payment management': 'Gestão de propinas e pagamentos',
  'Library management': 'Gestão da biblioteca',
  'Transport management': 'Gestão de transportes',
  'Human resource management': 'Gestão de recursos humanos',
  'Communication and collaboration': 'Comunicação e colaboração',
  'Learning management system': 'Sistema de gestão da aprendizagem',
  'Parent and student portal': 'Portal dos encarregados e alunos',
  'Inventory and asset management': 'Gestão de inventário e ativos',
  'Event management': 'Gestão de eventos',
  'Analytics and reporting': 'Análises e relatórios',
  'Security and access control': 'Segurança e controlo de acesso',
}

export const translateFeatureLabel = (feature: string) => featureLabels[feature]
  || feature
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, value => value.toUpperCase())

export const localisePackagePlan = (plan: PackagePlan): PackagePlan => {
  const originalName = String(plan.name || '')
  const name = packageNames[originalName.toLowerCase()] || originalName
  const description = packageDescriptions[String(plan.description || '')] || plan.description
  const features = Array.isArray(plan.features)
    ? plan.features.map(translateFeatureLabel)
    : plan.features

  return { ...plan, name, description, features }
}
