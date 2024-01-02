const express = require("express");
const bodyParser = require("body-parser");
const pino = require("pino-http");
const app = express();
const port = process.env.PORT || 3000;

const { SamsungTvRemote, Keys } = require("samsung-tv-remote");

const config = {
  debug: false,
  ip: "192.168.178.47",
  mac: "5C:C1:D7:E5:1D:2E",
  name: "Raspberry-Pi Remote",
  port: 8002,
  timeout: 500,
};

app.use(pino({ name: "node-shortcut-tv-handler" }));
app.use(bodyParser.json());

async function main() {
  const remote = new SamsungTvRemote(config);

  app.post(
    "/channel",
    (req, res, next) => {
      if (req.headers.authorization === process.env.TOKEN) {
        next();
      } else return res.status(401).json({ message: "Not Authorized" });
    },
    async (req, res) => {
      try {
        const digits = (req.body.channel + "").split("");

        for await (const digit of digits) {
          await remote.sendKey(Keys[`KEY_${digit}`]);
        }

        res
          .status(200)
          .json({ message: `Ok, metto sul canale ${req.body.channel}` });
      } catch (err) {
        console.error(err.message);

        res
          .status(500)
          .json({ message: "Si è verificato un errore, riprova." });
      }
    }
  );

  app.post(
    "/volume_up",
    (req, res, next) => {
      if (req.headers.authorization === process.env.TOKEN) {
        next();
      } else return res.status(401).json({ message: "Not Authorized" });
    },
    async (req, res) => {
      try {
        await remote.sendKeys(Array(req.body.times).fill(Keys.KEY_VOLUP));

        res.status(200).json({ message: "Ok, ho alzato il volume" });
      } catch (err) {
        console.error(err.message);

        res.status(500).json({ message: "Si è verificato un errore, riprova" });
      }
    }
  );

  app.post(
    "/volume_down",
    (req, res, next) => {
      if (req.headers.authorization === process.env.TOKEN) {
        next();
      } else return res.status(401).json({ message: "Not Authorized" });
    },
    async (req, res) => {
      try {
        await remote.sendKeys(Array(req.body.times).fill(Keys.KEY_VOLDOWN));

        res.status(200).json({ message: "Ok, ho abbassato il volume" });
      } catch (err) {
        console.error(err.message);

        res.status(500).json({ message: "Si è verificato un errore, riprova" });
      }
    }
  );

  app.get("*", (req, res, next) => {
    res.status(404).json({
      message: "NotFound",
    });
  });
}

main()
  .then(() => app.listen(port, () => "Server listening at " + port))
  .catch((err) => console.error(err.message));
