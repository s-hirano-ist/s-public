import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

function respond(result) {
  process.stdout.write(`${JSON.stringify(result)}\n`);
}

function main() {
  let input;
  try {
    input = JSON.parse(readFileSync(0, "utf8"));
  } catch {
    respond({
      decision: "block",
      reason: "Invalid Stop hook input. Diagnose the hook configuration.",
    });
    return;
  }

  if (input?.permission_mode === "plan") {
    respond({ continue: true });
    return;
  }

  const repoRoot = fileURLToPath(new URL("../", import.meta.url));
  if (!existsSync(new URL("../node_modules/.bin/biome", import.meta.url))) {
    respond({
      decision: "block",
      reason:
        "Formatting check could not run: local Biome is missing. Set up the pinned Bun runtime and run bun install, then retry bun run fmt.",
    });
    return;
  }

  const result = spawnSync(process.execPath, ["run", "--silent", "fmt"], {
    cwd: repoRoot,
    encoding: "utf8",
    timeout: 110_000,
  });
  if (result.status === 0) {
    respond({ continue: true });
    return;
  }

  const details = (
    result.error?.message ||
    result.stderr ||
    result.stdout ||
    ""
  )
    .trim()
    .slice(-4_000);
  respond({
    decision: "block",
    reason:
      result.error || result.signal
        ? `Formatting check could not run. Diagnose the runtime error before retrying. ${details}`
        : `Formatting check failed. Inspect the diagnostics below; for formatting differences, run bun run fmt:fix, then rerun the affected quality checks and any required agent-browser verification before finishing.\n${details}`,
  });
}

main();
