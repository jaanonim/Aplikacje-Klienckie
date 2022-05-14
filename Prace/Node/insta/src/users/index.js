const RouterFactory = require("../../anonim-server/classes/Router");
const UserControler = require("./controller");

const router = RouterFactory.create(UserControler, {
    findAll: {
        url: "/",
        method: "get",
        options: {
            middlewares: ["Auth"],
        },
    },
});

module.exports = router;
