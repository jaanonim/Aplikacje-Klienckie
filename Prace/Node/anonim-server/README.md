# anonim-server

Simple express like http server written on top of clean node.js.

## Expample usage:

    const Server = require("anonim-server")
    const app = new Server();

    app.setConfig("jsonParser", true);

    app.get("/get", async (ctx) => {
        ctx.sendJson({message: "hello world!"});
    });

    app.listen();
