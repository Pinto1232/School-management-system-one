const { spawnSync } = require('node:child_process');
const { randomBytes } = require('node:crypto');
const { renameSync, writeFileSync } = require('node:fs');
const path = require('node:path');

if (process.env.CONFIRM_KEYCLOAK_ROTATION !== 'yes') {
  throw new Error('Set CONFIRM_KEYCLOAK_ROTATION=yes to rotate the local Keycloak secrets.');
}

const backendDirectory = path.resolve(__dirname, '..');
const composeFile = path.join(backendDirectory, 'docker-compose.keycloak.yml');
const environmentFile = path.join(backendDirectory, 'keycloak', '.env');
const temporaryEnvironmentFile = `${environmentFile}.rotating`;
const composePrefix = ['compose', '--env-file', environmentFile, '-f', composeFile];

const run = (arguments_, options = {}) => {
  const result = spawnSync('docker', arguments_, {
    cwd: backendDirectory,
    encoding: 'utf8',
    ...options,
  });
  if (result.status !== 0) {
    if (result.stderr) process.stderr.write(result.stderr);
    throw new Error(`Docker command failed with exit code ${result.status}.`);
  }
  return (result.stdout || '').trim();
};

const databaseContainer = run([...composePrefix, 'ps', '-q', 'keycloak-db']);
if (!databaseContainer) {
  throw new Error('Start the Keycloak development stack before rotating its database secret.');
}

const adminPassword = randomBytes(32).toString('base64url');
const databasePassword = randomBytes(32).toString('base64url');
const sqlPassword = databasePassword.replaceAll("'", "''");

run(
  ['exec', '-i', databaseContainer, 'psql', '-v', 'ON_ERROR_STOP=1', '-U', 'keycloak', '-d', 'keycloak'],
  {
    input: `ALTER USER keycloak WITH PASSWORD '${sqlPassword}';\n`,
    stdio: ['pipe', 'ignore', 'pipe'],
  },
);

const environment = [
  'KEYCLOAK_ADMIN_USERNAME=bootstrap-admin',
  `KEYCLOAK_ADMIN_PASSWORD=${adminPassword}`,
  `KEYCLOAK_DB_PASSWORD=${databasePassword}`,
  'KEYCLOAK_PORT=8081',
  '',
].join('\n');

writeFileSync(temporaryEnvironmentFile, environment, { encoding: 'utf8', flag: 'wx', mode: 0o600 });
renameSync(temporaryEnvironmentFile, environmentFile);

run([...composePrefix, 'up', '-d', '--wait']);
console.log('Rotated the local Keycloak database secret and restarted the stack successfully.');
