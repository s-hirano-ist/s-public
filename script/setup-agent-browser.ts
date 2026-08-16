import { chmod, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

function run(command: [string, ...string[]], quiet = false) {
  return spawnSync(command[0], command.slice(1), {
    encoding: "utf8",
    stdio: quiet ? "pipe" : "inherit",
  });
}

const miseWhere = run(["mise", "where", "npm:agent-browser"], true);
if (miseWhere.status !== 0) {
  console.error("agent-browser is not installed. Run `mise install` first.");
  process.exit(miseWhere.status ?? 1);
}

const installationRoot = miseWhere.stdout.trim();
const binaryDirectory = path.join(
  installationRoot,
  "lib/node_modules/agent-browser/bin",
);
const platformPrefix = `agent-browser-${process.platform}-`;

for (const entry of await readdir(binaryDirectory)) {
  if (!entry.startsWith(platformPrefix)) continue;

  const binaryPath = path.join(binaryDirectory, entry);
  const metadata = await stat(binaryPath);
  if ((metadata.mode & 0o111) === 0) {
    await chmod(binaryPath, metadata.mode | 0o755);
    console.log(`Repaired executable permission: ${entry}`);
  }
}

if (run(["agent-browser", "--version"]).status !== 0) {
  console.error("agent-browser CLI self-check failed.");
  process.exit(1);
}

const session = "s-public-setup-doctor";
const browserCheck = () =>
  run([
    "agent-browser",
    "--session",
    session,
    "batch",
    "--bail",
    "open about:blank",
    "get url",
  ]).status === 0;

let browserAvailable = browserCheck();
if (!browserAvailable) {
  console.log("No usable Chrome installation was found; installing one.");
  if (run(["agent-browser", "install"]).status === 0) {
    browserAvailable = browserCheck();
  }
}

run(["agent-browser", "--session", session, "close"], true);

if (!browserAvailable) {
  console.error("agent-browser browser launch self-check failed.");
  process.exit(1);
}

console.log("agent-browser is ready.");
