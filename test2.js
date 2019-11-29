const express = require("express");
const pinoHttp = require("pino-http");
const app = express();
const port = 3000;

app.use(
  pinoHttp({
    serializers: {
      req(req) {
        req.originalRoute = req.raw.originalRoute;
        return req;
      }
    }
  })
);

const originalRouteMiddleware = originalRoute => (req, res, next) => {
  req.originalRoute = originalRoute;
  next();
};

app.get(
  "/user/:userId",
  originalRouteMiddleware("/user/:userId"),
  (req, res) => {
    req.log.info("some message");
    res.json({ ok: true });
  }
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
