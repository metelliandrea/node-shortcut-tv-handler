module.exports = {
  apps: [
    {
      name: "node-shortcut-tv-handler",
      script: "./src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 7942,
        TOKEN: "aNTgA6HeXBP4oyyHetlSUnu9p1M7Gk0qW5C",
      },
      watch: true
    },
  ],
};
