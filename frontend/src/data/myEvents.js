// My events
const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const currentMonth = currentDate.getMonth()
const currentDay = currentDate.getDate()

export const myEvents = [
  {
    title: 'Meeting with Prof. Smith',
    start: new Date(currentYear, currentMonth, currentDay, 10, 30),
    end: new Date(currentYear, currentMonth, currentDay, 11, 30),
    description: 'Discussing the project updates and next steps.',
  },
  {
    title: 'Chemistry Lab Session',
    start: new Date(currentYear, currentMonth, currentDay + 1, 13, 0),
    end: new Date(currentYear, currentMonth, currentDay + 1, 15, 0),
    description: 'Lab session for the chemistry course.',
  },
  {
    title: 'Math Study Group',
    start: new Date(currentYear, currentMonth, currentDay - 1, 16, 0),
    end: new Date(currentYear, currentMonth, currentDay - 1, 17, 30),
    description: 'Weekly study group for Calculus II.',
  },
  {
    title: 'History Lecture',
    start: new Date(currentYear, currentMonth, currentDay + 2, 9, 0),
    end: new Date(currentYear, currentMonth, currentDay + 2, 10, 0),
    description: 'Lecture on Ancient Civilizations.',
  },
  {
    title: 'Software Engineering Project Demo',
    start: new Date(currentYear, currentMonth, currentDay + 3, 14, 0),
    end: new Date(currentYear, currentMonth, currentDay + 3, 15, 30),
    description:
      'Final project demonstration for the software engineering class.',
  },
  {
    title: 'Art Workshop',
    start: new Date(currentYear, currentMonth, currentDay + 4, 11, 0),
    end: new Date(currentYear, currentMonth, currentDay + 4, 12, 30),
    description: 'Workshop on modern art techniques.',
  },
  {
    title: 'Physics Exam Review',
    start: new Date(currentYear, currentMonth, currentDay + 5, 18, 0),
    end: new Date(currentYear, currentMonth, currentDay + 5, 19, 30),
    description: 'Review session for the upcoming physics exam.',
  },
]
/*   console.log('My events', myEvents)
 */
