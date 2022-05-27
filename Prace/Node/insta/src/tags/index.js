const RouterFactory = require("../../anonim-server/classes/Router");
const TagControler = require("./controller");

const router = RouterFactory.createWithOverrite(TagControler, {
    findAll: {
        url: "/",
        method: "get",
    },
    create: {
        url: "/",
        method: "post",
        options: {
            middlewares: ["Auth", "ActiveAccount"],
        },
    },
});

module.exports = router;
