# Node Shortcut Handler

A Simple API Server with express that allow to proxy iOS Shortcuts call to Samsung Smarts TV (2016+) with Tizen OS.

## Quick start

Run the server with pm2 using the following command:

```bash
pm2 start <path-to-config-file>
```
You can find the .config in the config folder of this repo where you can configure the behaviour as you prefer. More details here (pm2 doc)[https://pm2.keymetrics.io/docs/usage/application-declaration/]

Once done, you can call the exposed endpoints to change TV channel, increase or decrease volume.
