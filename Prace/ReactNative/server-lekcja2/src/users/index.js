const RouterFactory = require("anonim-server/classes/Router");
const UserControler = require("./controller");

const router = RouterFactory.create(UserControler, {});

module.exports = router;
