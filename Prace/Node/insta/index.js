const Server = require("./anonim-server");
const route = require("./src/router");
const Mail = require("./anonim-server/utilities/Mail");
const app = new Server();

Mail.send("mat8mro@gmail.com", "lol", "<h1>tttt</h1>xd");

app.setConfig("jsonParser", true);
app.setConfig("formidable", {
    uploadDir: "./static/uploads",
    multiples: true,
    filter: function ({ name, originalFilename, mimetype }) {
        return mimetype && mimetype.includes("image");
    },
});
app.setConfig("middlewares", ["@Auth"]);

app.root.route("/api", route);

app.listen();

module.exports = app.server;
