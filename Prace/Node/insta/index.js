const Server = require("./anonim-server");
const Route = require("./anonim-server/classes/Route");
const PhotoRoute = require("./src/photos");

const app = new Server();

const api = new Route();

api.route("/photo", PhotoRoute);

app.setConfig("jsonParser", true);

app.root.route("/api", api);

app.listen();
