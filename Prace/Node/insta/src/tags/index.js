const RouterFactory = require("../../anonim-server/classes/Router");
const TagControler = require("./controller");

const router = RouterFactory.create(TagControler, []);

module.exports = router;
