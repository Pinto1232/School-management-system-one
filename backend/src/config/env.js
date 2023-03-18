const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    dbUri: process.env.DB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '2d',
    port: process.env.PORT || 3001,
};
