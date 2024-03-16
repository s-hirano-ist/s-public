module.exports = {
  disableEmoji: true,
  list: ["chore", "ci", "docs", "feat", "fix", "refactor", "style", "test"],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: [
    "type",
    "scope",
    "subject",
    "body",
    "breaking",
    "issues",
    "lerna",
  ],
  types: {
    chore: {
      description: "Chore changes",
      value: "chore",
    },
    ci: {
      description: "Changes in CI/CD pipeline",
      value: "ci",
    },
    docs: {
      description: "Update README.md or other documentation files",
      value: "docs",
    },
    feat: {
      description: "New features",
      value: "feat",
    },
    fix: {
      description: "Bug fixes",
      value: "fix",
    },
    refactor: {
      description: "Refactoring",
      value: "refactor",
    },
    style: {
      description: "Change styles",
      value: "style",
    },
    test: {
      description: "Add or update tests",
      value: "test",
    },
  },
};
