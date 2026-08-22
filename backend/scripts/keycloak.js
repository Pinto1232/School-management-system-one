const { spawn } = require('node:child_process');
const { randomBytes } = require('node:crypto');
const { existsSync, writeFileSync } = require('node:fs');
const path = require('node:path');

const backendDirectory = path.resolve(__dirname, '..');
const composeFile = path.join(backendDirectory, 'docker-compose.keycloak.yml');
const privateEnvironment = path.join(backendDirectory, 'keycloak', '.env');
if (!existsSync(privateEnvironment)) {
  const generatedEnvironment = [
    'KEYCLOAK_ADMIN_USERNAME=bootstrap-admin',
    `KEYCLOAK_ADMIN_PASSWORD=${randomBytes(32).toString('base64url')}`,
    `KEYCLOAK_DB_PASSWORD=${randomBytes(32).toString('base64url')}`,
    'KEYCLOAK_PORT=8081',
    '',
  ].join('\n');

  writeFileSync(privateEnvironment, generatedEnvironment, { encoding: 'utf8', flag: 'wx', mode: 0o600 });
  console.log('Generated private Keycloak development credentials in keycloak/.env.');
}

const composeArguments = [
  'compose',
  '--env-file', privateEnvironment,
  '-f', composeFile,
  ...process.argv.slice(2),
];

const compose = spawn('docker', composeArguments, {
  cwd: backendDirectory,
  stdio: 'inherit',
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => compose.kill(signal));
}

compose.on('error', (error) => {
  console.error(`Unable to run Docker Compose: ${error.message}`);
  process.exit(1);
});

compose.on('exit', (code) => {
  process.exit(code ?? 1);
});
