module.exports = class Context {
    constructor(req, res, url) {
        this.nodeResponse = res;
        this.nodeReqest = req;
        this.url = url;

        this.auth = null;
    }

    sendJson(obj) {
        this.nodeResponse.writeHead(200, {
            "content-type": "application/json",
        });
        this.nodeResponse.end(JSON.stringify(obj));
    }

    sendCodeJson(code, obj) {
        this.nodeResponse.writeHead(code, {
            "content-type": "application/json",
        });
        this.nodeResponse.end(JSON.stringify(obj));
    }

    sendCode(code, text) {
        this.nodeResponse.writeHead(code, {
            "content-type": "text/plain",
        });
        this.nodeResponse.end(text);
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

    getBodyValue(value) {
        try {
            return this.nodeReqest.body[value];
        } catch (e) {
            return null;
        }
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
        let f = this.nodeReqest.files[file];
        return Array.isArray(f) ? f : [f];
    }

    machBody(obj) {
        const res = {};
        const body = this.nodeReqest.body;
        for (const [key, value] of Object.entries(obj)) {
            if (body[key]) {
                res[key] = body[key];
            } else if (value) {
                return { error: true, value: key };
            }
        }
        return { error: false, value: res };
    }

    getHeader(header) {
        return this.nodeReqest.headers[header];
    }

    _setAuth(data) {
        this.auth = data;
    }

    getAuth() {
        return this.auth.data;
    }
};
