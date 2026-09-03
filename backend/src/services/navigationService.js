const sidebarNavigation = require('../data/sidebarNavigation');

const ROLE_PRIORITY = ['platform_admin', 'admin', 'teacher', 'staff', 'parent', 'student'];

const normaliseRoles = (roles = []) => {
  const normalised = new Set(
    roles
      .filter(role => typeof role === 'string')
      .map(role => role.trim().toLowerCase())
      .filter(Boolean),
  );

  if (normalised.has('platform_admin')) normalised.add('admin');
  return normalised;
};

const primaryRole = roles => ROLE_PRIORITY.find(role => roles.has(role)) || null;

const listSidebarLinksForRoles = (roles = []) => {
  const allowedRoles = normaliseRoles(roles);

  return sidebarNavigation
    .filter(link => (
      link.enabled
      && (!link.roles.length || link.roles.some(role => allowedRoles.has(role)))
    ))
    .sort((left, right) => left.position - right.position)
    .map(link => ({
      ...link,
      roles: [...link.roles],
    }));
};

module.exports = {
  listSidebarLinksForRoles,
  normaliseRoles,
  primaryRole,
};
