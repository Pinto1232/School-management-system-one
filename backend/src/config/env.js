const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    dbUri: process.env.DB_URI || 'mongodb+srv://pintomanuel:rj200100passw0rd@school-management.iqcsto9.mongodb.net/school-management?retryWrites=true&w=majority',
    jwtSecret: process.env.JWT_SECRET || 'pVzczCVaqOiiCuV5eMAW',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
    port: process.env.PORT || 3001,
};
