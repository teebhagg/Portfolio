import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';

const projectDir = process.cwd();
const distDir = '.next-agent-readiness';
const nextBin = `${projectDir}/node_modules/next/dist/bin/next`;
const env = { ...process.env, NEXT_DIST_DIR: distDir };

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: projectDir, env, stdio: 'inherit', ...options });
    child.once('error', reject);
    child.once('exit', (code) => code === 0 ? resolve() : reject(new Error(`${command} exited with code ${code}`)));
  });
}

const portServer = createServer();
await new Promise((resolve, reject) => {
  portServer.once('error', reject);
  portServer.listen(0, '127.0.0.1', resolve);
});
const { port } = portServer.address();
await new Promise((resolve) => portServer.close(resolve));

let server;
try {
  await run('npm', ['run', 'build']);
  server = spawn(process.execPath, [nextBin, 'start', '-p', String(port)], {
    cwd: projectDir,
    env,
    stdio: 'inherit'
  });
  const serverExited = new Promise((_, reject) => server.once('exit', (code) => reject(new Error(`Next server exited with code ${code}`))));
  const baseUrl = `http://127.0.0.1:${port}`;
  let ready = false;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (server.exitCode !== null) await serverExited;
    try {
      const response = await fetch(baseUrl);
      if (response.status === 200) {
        ready = true;
        break;
      }
    } catch {}
    await Promise.race([delay(250), serverExited]);
  }
  if (!ready) throw new Error('Next production server did not become ready.');
  await run(process.execPath, ['--test', 'tests/agent-readiness.test.mjs'], {
    env: { ...env, PORTFOLIO_TEST_URL: baseUrl }
  });
} finally {
  if (server && server.exitCode === null) server.kill('SIGTERM');
}
