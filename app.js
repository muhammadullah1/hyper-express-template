const HyperExpress = require("hyper-express");
const app = new HyperExpress.Server();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test route
app.get("api/test", (req, res) => {
  res.json({ message: "hyper_express server running." });
});

// catch 404
app.use((req, res) => {
  return res.status(404).send({
    success: false,
    message: `Cannot ${req.method} ${req.url}`,
  });
});

// error handling
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  req.log.error(err);
  return res.status(err.status || 500).send({
    success: false,
    message: err.message,
  });
});

module.exports = app;
