const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://127.0.0.1:3000,http://localhost:3100,http://127.0.0.1:3100')
      .split(',')
      .map(origin => origin.trim())
      .filter(Boolean),
    dbUri: process.env.DB_URI,
    keycloakIssuer: (process.env.KEYCLOAK_ISSUER || 'http://localhost:8081/realms/school-system').replace(/\/+$/, ''),
    keycloakAudience: process.env.KEYCLOAK_AUDIENCE || 'school-system-api',
    smtp: {
      host: process.env.SMTP_HOST,
      port: Number.parseInt(process.env.SMTP_PORT, 10) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER,
      password: process.env.SMTP_PASSWORD,
      from: process.env.SMTP_FROM,
    },
    port: process.env.PORT || 3001,
};
