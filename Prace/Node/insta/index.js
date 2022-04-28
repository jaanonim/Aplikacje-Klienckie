const Server = require("./anonim-server");
const route = require("./src/router");

const app = new Server();

app.setConfig("jsonParser", true);
app.setConfig("formidable", {
    uploadDir: "./static/uploads",
    multiples: true,
    filter: function ({ name, originalFilename, mimetype }) {
        return mimetype && mimetype.includes("image");
    },
});

app.root.route("/api", route);

app.listen();

module.exports = app.server;
