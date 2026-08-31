import type { CalendarEvent } from '~/types/dashboard'

export const schoolCalendarEvents: CalendarEvent[] = [
  {
    id: 'teachers-meeting',
    date: '2026-08-26',
    category: 'Administrativo',
    department: 'Administração',
    title: 'Reunião de Professores',
    startTime: '09:00',
    endTime: '11:30',
    location: 'Sala de Conferências A',
    description: 'Reunião de coordenação para preparar o início do novo período letivo.',
    tone: 'navy',
  },
  {
    id: 'final-exams',
    date: '2026-08-28',
    category: 'Académico',
    department: 'Todos os departamentos',
    title: 'Exames Finais',
    allDay: true,
    location: 'Blocos de ensino',
    description: 'Dia reservado para a realização dos exames finais.',
    tone: 'danger',
  },
  {
    id: 'classes-start',
    date: '2026-09-01',
    category: 'Académico',
    department: 'Todos os departamentos',
    title: 'Início das Aulas',
    startTime: '08:00',
    location: 'Todo o Campus',
    description: 'Primeiro dia de aulas do novo período letivo.',
    tone: 'brand',
  },
]
