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
    create: {
        url: "/",
        method: "post",
        options: {
            fileUpload: true,
        },
    },
    update: {
        url: "/",
        method: "patch",
        options: {
            fileUpload: true,
            middlewares: ["Auth", "ActiveAccount"],
        },
    },
});

module.exports = router;
