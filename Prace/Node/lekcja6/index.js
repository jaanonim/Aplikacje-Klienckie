const Server = require("./server")
const Database = require("./database")

const app = new Server();
const db = new Database();

app.setConfig("jsonParser", true)

app.post("/add", async (ctx) => {
    try {
        console.log(ctx.getBody())
        const data = await db.insert(ctx.getBody());
        ctx.sendJson(data);
    } catch (e) {
        ctx.sendJson({ error: e });
        return;
    }
})

app.get("/get", async (ctx) => {
    try {
        const data = await db.find({});
        ctx.sendJson(data)
    } catch (e) {
        ctx.sendJson({ error: e });
        return;
    }
})

app.delete("/delete", async (ctx) => {
    try {
        const data = await db.delete({ _id: ctx.getParam("id") });
        ctx.sendJson(data);
    } catch (e) {
        ctx.sendJson({ error: e });
        return;
    }
})

app.listen();
