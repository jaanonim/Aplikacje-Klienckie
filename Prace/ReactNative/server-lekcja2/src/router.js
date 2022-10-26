const Route = require("anonim-server/classes/Route");
const UserRoute = require("./users");

const route = new Route();

route.route("/user", UserRoute);

module.exports = route;
