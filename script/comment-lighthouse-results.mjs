import { readFile } from "node:fs/promises";

const marker = "<!-- lighthouse-ci-report -->";
const maxDetailsLength = 50_000;

function removeAnsi(value) {
  const escapeCharacter = String.fromCharCode(27);
  const ansiPattern = new RegExp(`${escapeCharacter}\\[[0-?]*[ -/]*[@-~]`, "g");
  return value.replaceAll(ansiPattern, "");
}

function extractAssertionOutput(output) {
  const start = output.indexOf("Checking assertions against");
  if (start === -1) return output.trim();

  const failureEnd = output.indexOf("Assertion failed.", start);
  const successEnd = output.indexOf("All results processed!", start);
  const end = [failureEnd, successEnd]
    .filter(index => index !== -1)
    .sort((a, b) => a - b)[0];

  if (end === undefined) return output.slice(start).trim();

  const lineEnd = output.indexOf("\n", end);
  return output.slice(start, lineEnd === -1 ? undefined : lineEnd).trim();
}

function extractReports(output) {
  const reports = [];
  const pattern =
    /Uploading median LHR of (.+?)\.\.\.success!\s+Open the report at (https:\/\/\S+)/g;

  for (const match of output.matchAll(pattern)) {
    reports.push({ url: match[1], reportUrl: match[2] });
  }

  return reports;
}

async function readOutput() {
  try {
    return removeAnsi(await readFile(process.env.LHCI_OUTPUT_PATH, "utf8"));
  } catch (error) {
    if (error && typeof error === "object" && error.code === "ENOENT")
      return "";
    throw error;
  }
}

function buildComment({ output, runUrl }) {
  const installOutcome = process.env.INSTALL_OUTCOME ?? "skipped";
  const buildOutcome = process.env.BUILD_OUTCOME ?? "skipped";
  const lhciOutcome = process.env.LHCI_OUTCOME ?? "skipped";

  let summary;
  if (installOutcome !== "success") {
    summary = "⚠️ Dependency installation failed, so Lighthouse was not run.";
  } else if (buildOutcome !== "success") {
    summary = "⚠️ The production build failed, so Lighthouse was not run.";
  } else if (lhciOutcome === "success") {
    summary = "✅ All configured Lighthouse assertions passed.";
  } else {
    summary =
      "⚠️ Lighthouse found assertion failures. This workflow is informational and does not block merging.";
  }

  const reports = extractReports(output);
  const reportList = reports.length
    ? `\n### Reports\n\n${reports.map(report => `- [${report.url}](${report.reportUrl})`).join("\n")}`
    : "";
  const rawDetails = extractAssertionOutput(output);
  const details = rawDetails
    ? rawDetails.length > maxDetailsLength
      ? `${rawDetails.slice(0, maxDetailsLength)}\n\n[output truncated; see the workflow run]`
      : rawDetails
    : "Lighthouse produced no assertion output. See the workflow run for setup or build errors.";

  return `${marker}
## Lighthouse CI

${summary}

[Workflow run](${runUrl})${reportList}

<details${lhciOutcome === "success" ? "" : " open"}>
<summary>All assertion results</summary>

\`\`\`text
${details}
\`\`\`
</details>`;
}

async function githubRequest(path, options = {}) {
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "User-Agent": "s-public-lighthouse-ci",
      "X-GitHub-Api-Version": "2022-11-28",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API ${response.status}: ${await response.text()}`);
  }

  return response.status === 204 ? undefined : response.json();
}

const event = JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, "utf8"));
const pullRequestNumber = event.pull_request?.number;

if (!pullRequestNumber) process.exit(0);

const repository = process.env.GITHUB_REPOSITORY;
const runUrl = `${process.env.GITHUB_SERVER_URL}/${repository}/actions/runs/${process.env.GITHUB_RUN_ID}`;
const body = buildComment({ output: await readOutput(), runUrl });
const comments = await githubRequest(
  `/repos/${repository}/issues/${pullRequestNumber}/comments?per_page=100`,
);
const existing = comments.find(comment => comment.body?.includes(marker));

if (existing) {
  await githubRequest(`/repos/${repository}/issues/comments/${existing.id}`, {
    method: "PATCH",
    body: JSON.stringify({ body }),
  });
} else {
  await githubRequest(
    `/repos/${repository}/issues/${pullRequestNumber}/comments`,
    {
      method: "POST",
      body: JSON.stringify({ body }),
    },
  );
}
