module.exports = class Context {
    constructor(req, res, url) {
        this.nodeResponse = res;
        this.nodeReqest = req;
        this.url = url;
    }

    sendJson(obj) {
        this.nodeResponse.writeHead(200, {
            "content-type": "application/json",
        });
        this.nodeResponse.end(JSON.stringify(obj));
    }

    sendText(text) {
        this.nodeResponse.writeHead(200, {
            "content-type": "text/plain",
        });
        this.nodeResponse.end(text);
    }

    sendRaw(raw) {
        this.nodeResponse.end(raw);
    }

    setContentType(type) {
        this.nodeResponse.writeHead(200, {
            "content-type": type,
        });
    }

    getParam(param) {
        return this.nodeReqest.param.get(param);
    }

    getBody() {
        return this.nodeReqest.body;
    }

    getUrlParam(param) {
        const url = this.nodeReqest.url.split("/");
        return url.find(
            (element, index) =>
                this.url[index][0] === ":" &&
                this.url[index].substring(1) === param
        );
    }

    getFiles() {
        return this.nodeReqest.files;
    }

    getFile(file) {
        return this.nodeReqest.files[file];
    }
};
