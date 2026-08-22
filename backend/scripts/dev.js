const { spawn } = require('node:child_process');
const path = require('node:path');

const backendDirectory = path.resolve(__dirname, '..');
const keycloakScript = path.join(__dirname, 'keycloak.js');
const children = new Set();
let isShuttingDown = false;

const spawnManaged = (command, arguments_) => {
  const child = spawn(command, arguments_, {
    cwd: backendDirectory,
    stdio: 'inherit',
    detached: process.platform !== 'win32',
  });

  children.add(child);
  child.once('exit', () => children.delete(child));
  return child;
};

const terminateChild = (child) => {
  if (!child?.pid || child.exitCode !== null) return;

  try {
    if (process.platform === 'win32') {
      child.kill('SIGTERM');
    } else {
      process.kill(-child.pid, 'SIGTERM');
    }
  } catch (error) {
    if (error.code !== 'ESRCH') throw error;
  }
};

const shutdown = (exitCode = 0) => {
  if (isShuttingDown) return;
  isShuttingDown = true;

  for (const child of children) terminateChild(child);

  const cleanup = spawn(process.execPath, [keycloakScript, 'down'], {
    cwd: backendDirectory,
    stdio: 'inherit',
    detached: process.platform !== 'win32',
  });

  cleanup.on('error', (error) => {
    console.error(`Unable to stop the Keycloak development stack: ${error.message}`);
    process.exit(1);
  });

  cleanup.on('exit', (cleanupCode) => {
    process.exit(exitCode || cleanupCode || 0);
  });
};

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => shutdown(0));
}

const keycloakStartup = spawnManaged(process.execPath, [
  keycloakScript,
  'up',
  '-d',
  '--wait',
]);

keycloakStartup.on('error', (error) => {
  console.error(`Unable to start Keycloak: ${error.message}`);
  shutdown(1);
});

keycloakStartup.on('exit', (startupCode) => {
  if (isShuttingDown) return;

  if (startupCode !== 0) {
    shutdown(startupCode ?? 1);
    return;
  }

  const api = spawnManaged('npm', ['run', 'dev:api']);
  const logs = spawnManaged(process.execPath, [keycloakScript, 'logs', '--follow']);
  const keycloakMonitor = spawnManaged(process.execPath, [keycloakScript, 'wait', 'keycloak']);

  api.on('error', (error) => {
    console.error(`Unable to start the backend API: ${error.message}`);
    shutdown(1);
  });

  logs.on('error', (error) => {
    console.error(`Unable to stream Keycloak logs: ${error.message}`);
    shutdown(1);
  });

  keycloakMonitor.on('error', (error) => {
    console.error(`Unable to monitor Keycloak: ${error.message}`);
    shutdown(1);
  });

  api.on('exit', (apiCode) => {
    if (!isShuttingDown) shutdown(apiCode ?? 1);
  });

  keycloakMonitor.on('exit', (keycloakCode) => {
    if (!isShuttingDown) shutdown(keycloakCode ?? 1);
  });
});
