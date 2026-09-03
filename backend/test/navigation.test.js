const assert = require('node:assert/strict');
const test = require('node:test');
const {
  listSidebarLinksForRoles,
  normaliseRoles,
  primaryRole,
} = require('../src/services/navigationService');
const { getSidebarNavigation } = require('../src/controllers/navigation');

test('returns sidebar links in stable position order', () => {
  const links = listSidebarLinksForRoles(['admin']);

  assert.equal(links.length, 15);
  assert.deepEqual(links.map(link => link.position), [...links.map(link => link.position)].sort((a, b) => a - b));
  assert.deepEqual(
    links.map(({ label, path, icon }) => ({ label, path, icon })),
    [
      { label: 'Painel', path: '/dashboard', icon: 'ph:squares-four' },
      { label: 'Alunos', path: '/dashboard/students', icon: 'ph:student' },
      { label: 'Professores', path: '/dashboard/teachers', icon: 'ph:chalkboard-teacher' },
      { label: 'Disciplinas', path: '/dashboard/courses', icon: 'ph:books' },
      { label: 'Presenças', path: '/dashboard/attendance', icon: 'ph:check-square' },
      { label: 'Calendário e eventos', path: '/dashboard/events', icon: 'ph:calendar-dots' },
      { label: 'Planificação de aulas', path: '/dashboard/lesson-planning', icon: 'ph:notebook' },
      { label: 'Admissões', path: '/dashboard/admissions', icon: 'ph:user-plus' },
      { label: 'Relatórios', path: '/dashboard/reports', icon: 'ph:chart-bar' },
      { label: 'Propinas', path: '/dashboard/fees', icon: 'ph:wallet' },
      { label: 'Avaliações', path: '/dashboard/grading', icon: 'ph:exam' },
      { label: 'Tarefas', path: '/dashboard/tasks', icon: 'ph:list-checks' },
      { label: 'Portal dos encarregados', path: '/dashboard/parent-portal', icon: 'ph:users-three' },
      { label: 'Funcionários', path: '/dashboard/staff', icon: 'ph:identification-card' },
      { label: 'Horário', path: '/dashboard/timetable', icon: 'ph:clock' },
    ],
  );
});

test('filters navigation by any authenticated school role', () => {
  const links = listSidebarLinksForRoles(['parent']);
  const keys = links.map(link => link.key);

  assert.deepEqual(keys, ['dashboard', 'courses', 'events', 'parent-portal', 'timetable']);
  assert.equal(keys.includes('fees'), false);
});

test('platform administrators inherit administrator navigation', () => {
  assert.deepEqual(
    listSidebarLinksForRoles(['platform_admin']),
    listSidebarLinksForRoles(['admin']),
  );
});

test('returns defensive copies instead of mutable catalogue entries', () => {
  const firstRead = listSidebarLinksForRoles(['student']);
  firstRead[0].roles.push('unexpected');

  const secondRead = listSidebarLinksForRoles(['student']);
  assert.equal(secondRead[0].roles.includes('unexpected'), false);
});

test('normalises roles and selects the primary role deterministically', () => {
  const roles = normaliseRoles([' Student ', 'TEACHER', 'teacher']);

  assert.deepEqual([...roles], ['student', 'teacher']);
  assert.equal(primaryRole(roles), 'teacher');
});

test('does not expose protected navigation when no supported role is present', () => {
  assert.deepEqual(listSidebarLinksForRoles([]), []);
  assert.deepEqual(listSidebarLinksForRoles(['unrelated-role']), []);
});

test('controller returns the standard role-filtered response envelope', () => {
  const response = {
    statusCode: null,
    body: null,
    headers: {},
    varyValues: [],
    set(name, value) {
      this.headers[name] = value;
      return this;
    },
    vary(value) {
      this.varyValues.push(value);
      return this;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };

  getSidebarNavigation({ user: { roles: ['parent'] } }, response);

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.meta.total, response.body.data.length);
  assert.equal(response.body.meta.role, 'parent');
  assert.equal(response.body.meta.include_disabled, false);
  assert.equal(response.headers['Cache-Control'], 'private, max-age=60, stale-while-revalidate=300');
  assert.deepEqual(response.varyValues, ['Authorization']);
});
