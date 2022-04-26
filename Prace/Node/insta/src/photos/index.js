const RouterFactory = require("../../anonim-server/classes/Router");
const PhotoControler = require("./controller");

const router = RouterFactory.create(PhotoControler);

module.exports = router;
