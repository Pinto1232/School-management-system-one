const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    dbUri: process.env.DB_URI || 'mongodb://localhost:27017/SchoolDb',
    jwtSecret: process.env.JWT_SECRET || 'pVzczCVaqOiiCuV5eMAW',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
    port: process.env.PORT || 3001,
};
