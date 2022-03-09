const { Server, logger } = require("./server")
const collection = require("./database")

Server.setConfig({ jsonParser: true })

Server.post("/add", (req, res) => {
    collection.insert(req.body, (err, docs) => {
        if (err) {
            logger.error(err)
        }
    })

    res.writeHead(200, {
        'content-type': 'application/json'
    });
    res.end(JSON.stringify({}));
})

Server.get("/get", (req, res) => {
    collection.find({}, (err, docs) => {
        if (err) {
            logger.error(err)
        }
        res.writeHead(200, {
            'content-type': 'application/json'
        });
        res.end(JSON.stringify(docs));
    })

})

Server.delete("/delete", (req, res) => {
    collection.remove({ _id: req.param.get("id") }, (err, docs) => {
        if (err) {
            logger.error(err)
        }
    })

    res.writeHead(200, {
        'content-type': 'application/json'
    });
    res.end(JSON.stringify({}));
})

