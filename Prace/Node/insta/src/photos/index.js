const RouterFactory = require("../../anonim-server/classes/Router");
const PhotoControler = require("./controller");

const router = RouterFactory.create(PhotoControler, [
    {
        url: "/",
        method: "delete",
        func: "deleteMany",
    },
    {
        url: "/:id/metadata/",
        method: "get",
        func: "metadata",
    },
    {
        url: "/filters/",
        method: "options",
        func: "filterOptions",
    },
]);

module.exports = router;
