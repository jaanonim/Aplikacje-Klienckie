const RouterFactory = require("../../anonim-server/classes/Router");
const UserControler = require("./controller");

const router = RouterFactory.createWithOverrite(UserControler, {
    current: {
        url: "/",
        method: "get",
        options: {
            middlewares: ["Auth", "ActiveAccount"],
        },
    },
    activate: {
        url: "/activate/:token/",
        method: "get",
    },
    login: {
        url: "/login/",
        method: "post",
    },
});

module.exports = router;
