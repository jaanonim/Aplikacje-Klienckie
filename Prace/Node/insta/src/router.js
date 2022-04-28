const Route = require("../anonim-server/classes/Route");
const PhotoRoute = require("./photos");
const TagRoute = require("./tags");

const route = new Route();

route.route("/photo", PhotoRoute);
route.route("/tag", TagRoute);

module.exports = route;
