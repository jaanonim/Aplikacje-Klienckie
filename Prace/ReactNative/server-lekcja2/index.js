const Server = require("anonim-server");

const route = require("./src/router");
const config = require("./config");

const app = new Server();

app.loadConfig(config);
app.root.route("/api", route);

app.listen();

module.exports = app.server;
