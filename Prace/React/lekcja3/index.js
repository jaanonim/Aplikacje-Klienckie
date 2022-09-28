const Server = require("anonim-server");
const app = new Server();

app.setConfig("jsonParser", true);

const data = [
    {
        id: 123,
        thread: "thread 1",
        comments: [
            { id: 1, text: "aaa", date: "1999" },
            { id: 2, text: "bbb", date: "2000" },
        ],
    },
    {
        id: 247,
        thread: "thread 2",
        comments: [
            { id: 5, text: "ddd", date: "1999" },
            { id: 13, text: "eee", date: "2000" },
            { id: 15, text: "fff", date: "2001" },
        ],
    },
    {
        id: 350,
        thread: "thread 3",
        comments: [
            { id: 6, text: "ggg", date: "1999" },
            { id: 7, text: "hhh", date: "2000" },
            { id: 18, text: "iii", date: "2001" },
        ],
    },
];
let THREAD_ID = 350;
let COMMENT_ID = 18;

app.root.get("/", async (ctx) => {
    ctx.sendJson(data);
});

app.root.post("/", async (ctx) => {
    const name = ctx.getBody().name;
    if (!name || name.trim() == "") {
        ctx.sendJson({ error: "missing name" });
        return;
    }
    const d = {
        id: ++THREAD_ID,
        thread: name,
        comments: [],
    };
    data.push(d);
    ctx.sendJson(d);
});

app.root.post("/:id/comment/", async (ctx) => {
    const id = parseInt(ctx.getUrlParam("id"));
    if (!id) {
        ctx.sendJson({ error: "invalid id" });
        return;
    }
    const thread = data.find((ele) => ele.id === id);
    if (!thread) {
        ctx.sendJson({ error: "thread not found" });
        return;
    }

    const text = ctx.getBody().text;
    if (!text || text.trim() == "") {
        ctx.sendJson({ error: "missing text" });
        return;
    }

    const d = {
        id: ++COMMENT_ID,
        text: text,
        date: new Date(Date.now()).toDateString(),
    };
    thread.comments.push(d);
    ctx.sendJson(d);
});

app.root.post("/:id/comment/:commnet/", async (ctx) => {
    const id = parseInt(ctx.getUrlParam("id"));
    if (!id) {
        ctx.sendJson({ error: "invalid id" });
        return;
    }
    const thread = data.find((ele) => ele.id === id);
    if (!thread) {
        ctx.sendJson({ error: "thread not found" });
        return;
    }

    const c_id = parseInt(ctx.getUrlParam("commnet"));
    if (!id) {
        ctx.sendJson({ error: "invalid comment id" });
        return;
    }
    const comment = thread.comments.find((ele) => ele.id === c_id);
    if (!comment) {
        ctx.sendJson({ error: "comment not found" });
        return;
    }

    const text = ctx.getBody().text;
    if (!text || text.trim() == "") {
        ctx.sendJson({ error: "missing text" });
        return;
    }

    comment.text = text;
    ctx.sendJson(comment);
});

app.root.get("/:id/comment/:commnet/", async (ctx) => {
    const id = parseInt(ctx.getUrlParam("id"));
    if (!id) {
        ctx.sendJson({ error: "invalid id" });
        return;
    }
    const thread = data.find((ele) => ele.id === id);
    if (!thread) {
        ctx.sendJson({ error: "thread not found" });
        return;
    }

    const c_id = parseInt(ctx.getUrlParam("commnet"));
    if (!c_id) {
        ctx.sendJson({ error: "invalid comment id" });
        return;
    }

    thread.comments = thread.comments.filter((ele) => ele.id !== c_id);

    ctx.sendJson(thread);
});

app.listen();
