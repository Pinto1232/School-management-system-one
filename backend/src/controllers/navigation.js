const {
  listSidebarLinksForRoles,
  normaliseRoles,
  primaryRole,
} = require('../services/navigationService');

const getSidebarNavigation = (req, res) => {
  const userRoles = Array.isArray(req.user?.roles)
    ? req.user.roles
    : [req.user?.role].filter(Boolean);
  const normalisedRoles = normaliseRoles(userRoles);
  const data = listSidebarLinksForRoles(userRoles);

  res.set('Cache-Control', 'private, max-age=60, stale-while-revalidate=300');
  res.vary('Authorization');

  return res.status(200).json({
    data,
    meta: {
      total: data.length,
      role: primaryRole(normalisedRoles),
      tree: false,
      include_disabled: false,
    },
  });
};

module.exports = { getSidebarNavigation };
