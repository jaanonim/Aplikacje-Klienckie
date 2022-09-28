const Server = require("./index.js");
const app = new Server();

app.setConfig("jsonParser", true);

app.root.get("/", async (ctx) => {
    ctx.sendJson({ message: "Hello word!" });
});

app.listen();
