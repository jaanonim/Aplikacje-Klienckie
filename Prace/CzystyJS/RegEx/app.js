var express = require("express");
var app = express();
const axios = require("axios").default;

app.use(express.static("static"));
app.listen(5000, () => console.log("Listening on http://localhost:5000"));

let visitedLinks = [];

app.get("/query/", async (req, res) => {
    if (!req.query.url) res.send({ error: "error" });

    visitedLinks = [];
    res.send(await getData(req.query.url, 10, 3));
});

const getData = async (url, count, depth) => {
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
        console.log(url);
        return { urls: [url], mails: [] };
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
    const mails =
        data.data.match(/[a-zA-Z0-9-.]+@[a-zA-Z0-9-.]+\.[a-zA-Z0-9-.]+/gm) ||
        [];
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
            if (visitedLinks.indexOf(urls[index]) == -1) {
                const o = await getData(urls[index], count, depth - 1);
                urls.push(...o.urls);
                mails.push(...o.mails);
            }
        }
    }

    console.log(urls, mails);
    return { urls, mails };
};
