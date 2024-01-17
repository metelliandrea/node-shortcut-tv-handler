module.exports = {
  apps: [
    {
      name: "node-shortcut-tv-handler",
      script: "./src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 7942,
        TOKEN: "<YOUR TOKEN HERE>",
      },
      watch: true
    },
  ],
};
