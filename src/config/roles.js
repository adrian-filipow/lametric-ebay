const roles = ['user', 'premium', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['usePrivateRoutes']);
roleRights.set(roles[1], ['usePrivateRoutes', 'usePremiumRoutes']);
roleRights.set(roles[2], ['getUsers', 'manageUsers']);

module.exports = {
  roles,
  roleRights,
};
