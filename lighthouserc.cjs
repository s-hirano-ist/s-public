module.exports = {
  ci: {
    collect: {
      staticDistDir: "./.vercel/output/static/",
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
