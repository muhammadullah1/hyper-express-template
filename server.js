const config = require("./config");
const app = require("./app.js");

(async () => {
  const PORT = config.port || 5000;
  app
    .listen(PORT)
    .then((socket) => console.log(socket,  'running on port ' + PORT))
    .catch((error) => console.log(error));
})();