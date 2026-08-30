import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { setTimeout as delay } from "node:timers/promises";

const host = "127.0.0.1";
const port = 43117;
const baseUrl = `http://${host}:${port}`;

async function waitForServer(server, logs) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`next start exited before becoming ready:\n${logs()}`);
    }

    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }

    await delay(250);
  }

  throw new Error(`next start did not become ready:\n${logs()}`);
}

test("native Next.js production routes", { timeout: 60_000 }, async () => {
  let output = "";
  const nextBin = fileURLToPath(
    new URL("../node_modules/next/dist/bin/next", import.meta.url),
  );
  const server = spawn(
    process.execPath,
    [nextBin, "start", "--hostname", host, "--port", String(port)],
    {
      cwd: new URL("..", import.meta.url),
      env: { ...process.env, NODE_ENV: "production" },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  server.stdout.on("data", (chunk) => {
    output += chunk;
  });
  server.stderr.on("data", (chunk) => {
    output += chunk;
  });

  try {
    await waitForServer(server, () => output);

    const homepage = await fetch(baseUrl);
    assert.equal(homepage.status, 200);
    assert.match(homepage.headers.get("content-type") ?? "", /^text\/html\b/i);
    assert.doesNotMatch(await homepage.text(), /href=["']\/settings["']/i);

    const resume = await fetch(`${baseUrl}/resume.pdf`);
    assert.equal(resume.status, 200);
    assert.match(resume.headers.get("content-type") ?? "", /^application\/pdf\b/i);
    const resumeHeader = Buffer.from(await resume.arrayBuffer()).subarray(0, 5).toString();
    assert.equal(resumeHeader, "%PDF-");

    const settings = await fetch(`${baseUrl}/settings`);
    assert.equal(settings.status, 404);
  } finally {
    server.kill();
  }
});
