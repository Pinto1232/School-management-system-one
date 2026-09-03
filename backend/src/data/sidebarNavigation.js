const sidebarNavigation = [
  { id: 1, key: 'dashboard', label: 'Painel', path: '/dashboard', icon: 'ph:squares-four', roles: ['admin', 'teacher', 'staff', 'parent', 'student'], parent_id: null, position: 0, enabled: true, target: '_self' },
  { id: 2, key: 'students', label: 'Alunos', path: '/dashboard/students', icon: 'ph:student', roles: ['admin', 'teacher', 'staff'], parent_id: null, position: 10, enabled: true, target: '_self' },
  { id: 3, key: 'teachers', label: 'Professores', path: '/dashboard/teachers', icon: 'ph:chalkboard-teacher', roles: ['admin', 'teacher', 'staff'], parent_id: null, position: 20, enabled: true, target: '_self' },
  { id: 4, key: 'courses', label: 'Disciplinas', path: '/dashboard/courses', icon: 'ph:books', roles: ['admin', 'teacher', 'staff', 'parent', 'student'], parent_id: null, position: 30, enabled: true, target: '_self' },
  { id: 5, key: 'attendance', label: 'Presenças', path: '/dashboard/attendance', icon: 'ph:check-square', roles: ['admin', 'teacher'], parent_id: null, position: 40, enabled: true, target: '_self' },
  { id: 6, key: 'events', label: 'Calendário e eventos', path: '/dashboard/events', icon: 'ph:calendar-dots', roles: ['admin', 'teacher', 'staff', 'parent', 'student'], parent_id: null, position: 50, enabled: true, target: '_self' },
  { id: 7, key: 'lesson-planning', label: 'Planificação de aulas', path: '/dashboard/lesson-planning', icon: 'ph:notebook', roles: ['admin', 'teacher'], parent_id: null, position: 60, enabled: true, target: '_self' },
  { id: 8, key: 'admissions', label: 'Admissões', path: '/dashboard/admissions', icon: 'ph:user-plus', roles: ['admin', 'staff'], parent_id: null, position: 70, enabled: true, target: '_self' },
  { id: 9, key: 'reports', label: 'Relatórios', path: '/dashboard/reports', icon: 'ph:chart-bar', roles: ['admin', 'teacher', 'staff'], parent_id: null, position: 80, enabled: true, target: '_self' },
  { id: 10, key: 'fees', label: 'Propinas', path: '/dashboard/fees', icon: 'ph:wallet', roles: ['admin', 'staff'], parent_id: null, position: 90, enabled: true, target: '_self' },
  { id: 11, key: 'grading', label: 'Avaliações', path: '/dashboard/grading', icon: 'ph:exam', roles: ['admin', 'teacher'], parent_id: null, position: 100, enabled: true, target: '_self' },
  { id: 12, key: 'tasks', label: 'Tarefas', path: '/dashboard/tasks', icon: 'ph:list-checks', roles: ['admin', 'teacher', 'staff'], parent_id: null, position: 110, enabled: true, target: '_self' },
  { id: 13, key: 'parent-portal', label: 'Portal dos encarregados', path: '/dashboard/parent-portal', icon: 'ph:users-three', roles: ['admin', 'staff', 'parent'], parent_id: null, position: 120, enabled: true, target: '_self' },
  { id: 14, key: 'staff', label: 'Funcionários', path: '/dashboard/staff', icon: 'ph:identification-card', roles: ['admin'], parent_id: null, position: 130, enabled: true, target: '_self' },
  { id: 15, key: 'timetable', label: 'Horário', path: '/dashboard/timetable', icon: 'ph:clock', roles: ['admin', 'teacher', 'staff', 'parent', 'student'], parent_id: null, position: 140, enabled: true, target: '_self' },
];

module.exports = Object.freeze(sidebarNavigation.map(link => Object.freeze({
  ...link,
  roles: Object.freeze([...link.roles]),
})));
