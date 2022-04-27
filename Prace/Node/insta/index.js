const Server = require("./anonim-server");
const Route = require("./anonim-server/classes/Route");
const PhotoRoute = require("./src/photos");

const app = new Server();

const api = new Route();

api.route("/photo", PhotoRoute);

app.setConfig("jsonParser", true);
app.setConfig("formidable", {
    uploadDir: "./static/uploads",
    multiples: true,
    filter: function ({ name, originalFilename, mimetype }) {
        return mimetype && mimetype.includes("image");
    },
});

app.root.route("/api", api);

app.listen();
