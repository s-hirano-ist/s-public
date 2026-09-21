const commonAssertions = {
  "categories:performance": [
    "warn",
    { minScore: 0.6, aggregationMethod: "median" },
  ],
  "categories:accessibility": [
    "error",
    { minScore: 0.9, aggregationMethod: "median" },
  ],
  "categories:best-practices": [
    "error",
    { minScore: 1, aggregationMethod: "median" },
  ],
  "categories:seo": ["error", { minScore: 1, aggregationMethod: "median" }],
  "first-contentful-paint": [
    "warn",
    { maxNumericValue: 6000, aggregationMethod: "median" },
  ],
  "largest-contentful-paint": [
    "warn",
    { maxNumericValue: 9000, aggregationMethod: "median" },
  ],
  "cumulative-layout-shift": [
    "error",
    { maxNumericValue: 0.25, aggregationMethod: "median" },
  ],
  "errors-in-console": ["error", { maxLength: 0 }],
};

const assertionsWithTbtLimit = maxNumericValue => ({
  ...commonAssertions,
  "total-blocking-time": [
    "error",
    { maxNumericValue, aggregationMethod: "median" },
  ],
});

module.exports = {
  ci: {
    collect: {
      staticDistDir: "./dist",
      url: [
        "http://localhost/",
        "http://localhost/blog/",
        "http://localhost/book/",
        "http://localhost/diy/",
        "http://localhost/photo/",
      ],
      numberOfRuns: 3,
      settings: {
        chromeFlags: "--headless --no-sandbox --disable-dev-shm-usage",
      },
    },
    assert: {
      assertMatrix: [
        {
          matchingUrlPattern: "^http://localhost:\\d+/book/$",
          assertions: assertionsWithTbtLimit(2100),
        },
        {
          matchingUrlPattern:
            "^http://localhost:\\d+/(?:|blog/|diy/|photo/)$",
          assertions: assertionsWithTbtLimit(300),
        },
      ],
    },
    upload: {
      target: "temporary-public-storage",
      failOnUploadFailure: false,
    },
  },
};
