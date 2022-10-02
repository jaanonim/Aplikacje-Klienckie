var express = require("express");
var app = express();
const axios = require("axios").default;

app.listen(5000, () => console.log("Listening on http://localhost:5000"));

app.get("/", async (req, res) => {
    // CODE
    if (!req.query.url) res.send({ error: "error" });

    res.send(await getData(req.query.url, 10, 3));
});

const visitedLinks = [];
const getData = async (url, count, depth) => {
    const originalUrl = url;
    console.log(depth, url);

    visitedLinks.push(url);
    let data;
    try {
        data = await axios({
            method: "get",
            url: url,
            responseType: "text",
        });
    } catch {
        return url;
    }

    let r = url.match(/\/\?.*/g);
    if (r != null && r.length > 0) {
        url = url.replace(r[0], "");
    }

    if (url[url.length - 1] == "/") {
        url = url.slice(0, -1);
    }
    url = url.replace(/#.*/g, "");

    const currentUrl = url;
    const preurls = data.data.match(/<a.*href=".+?"/gm);
    const mails = data.data.match(/[a-zA-Z0-9-.]+@[a-zA-Z0-9-.]+\.../gm);
    console.log(mails);
    let urls = [];
    if (preurls)
        preurls.forEach((s) => {
            const b = s.match(/href=".+?"/)[0];
            const res = b.slice(6, b.length - 2).trim();
            if (res.length !== 0 || res !== "#") {
                if (res.match(/http.*/gm) != null) {
                    urls.push(res);
                } else if (res.match(/(\w|\d|\/)*:.*/g) == null) {
                    urls.push(currentUrl + res);
                }
            }
        });
    if (depth > 0) {
        for (let index = 0; index < Math.min(count, urls.length); index++) {
            if (visitedLinks.indexOf(urls[index]) == -1)
                urls[index] = await getData(urls[index], count, depth - 1);
        }
    }

    return { originalUrl, urls, mails };
};
