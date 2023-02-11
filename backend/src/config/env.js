const dotenv = require('dotenv');
const config = require('config');

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const envConfig = config.get(env);

module.exports = envConfig;
                     n