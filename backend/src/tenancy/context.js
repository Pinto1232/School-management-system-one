const { AsyncLocalStorage } = require('node:async_hooks');

const tenantStorage = new AsyncLocalStorage();

const getTenant = () => tenantStorage.getStore() || null;

const runWithTenant = (schoolId, callback) => tenantStorage.run({ schoolId }, callback);

module.exports = {
  getTenant,
  runWithTenant,
};
