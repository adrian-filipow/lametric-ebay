const roles = ['user', 'premium', 'billing', 'support', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['usePrivateRoutes']); // user
roleRights.set(roles[1], ['usePrivateRoutes', 'usePremiumRoutes']); // premium
roleRights.set(roles[2], ['getUsers']); // billing
roleRights.set(roles[3], ['getUsers']); // support
roleRights.set(roles[4], ['getUsers', 'manageUsers']); // admin

module.exports = {
  roles,
  roleRights,
};
