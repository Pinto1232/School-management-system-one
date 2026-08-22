const mongoose = require('mongoose');
const tenantPlugin = require('./plugin');

if (!mongoose.__schoolTenantPluginRegistered) {
  mongoose.set('applyPluginsToChildSchemas', false);
  mongoose.plugin(tenantPlugin);
  mongoose.__schoolTenantPluginRegistered = true;
}

module.exports = mongoose;
