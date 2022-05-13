const Route = require("../anonim-server/classes/Route");
const PhotoRoute = require("./photos");
const TagRoute = require("./tags");
const UserRoute = require("./users");

const route = new Route();

route.route("/photo", PhotoRoute);
route.route("/tag", TagRoute);
route.route("/user", UserRoute);

module.exports = route;
