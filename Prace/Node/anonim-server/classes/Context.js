module.exports = class Context {
    constructor(req, res) {
        this.nodeResponse = res
        this.nodeReqest = req
    }

    sendJson(obj) {
        this.nodeResponse.writeHead(200, {
            'content-type': 'application/json'
        });
        this.nodeResponse.end(JSON.stringify(obj));
    }

    sendText(text) {
        this.nodeResponse.writeHead(200, {
            'content-type': 'text/plain'
        });
        this.nodeResponse.end(text);
    }

    sendRaw(raw) {
        this.nodeResponse.end(raw)
    }

    setContentType(type) {
        this.nodeResponse.writeHead(200, {
            'content-type': type
        });
    }

    getParam(param) {
        return this.nodeReqest.param.get(param)
    }

    getBody() {
        return this.nodeReqest.body
    }
}
