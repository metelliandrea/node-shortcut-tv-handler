module.exports = {
  apps: [
    {
      name: "node-shortcut-tv-handler",
      script: "src/index.js",
      cwd: "/node/node-shortcut-tv-handler/",
      env: {
        NODE_ENV: "production",
        PORT: 7942,
        TOKEN: "<YOUR-TOKEN>",
      },
      watch: true,
      autorestart: true,
    },
  ],
};
