const RouterFactory = require("../../anonim-server/classes/Router");
const PhotoControler = require("./controller");

const router = RouterFactory.create(PhotoControler, {
    deleteMany: {
        url: "/",
        method: "delete",
    },
    metadata: {
        url: "/:id/metadata/",
        method: "get",
    },
    filterOptions: {
        url: "/filters/",
        method: "options",
    },
    create: {
        url: "/",
        method: "post",
        options: {
            fileUpload: true,
        },
    },
    update: {
        url: "/:id/",
        method: "patch",
        options: {
            fileUpload: true,
        },
    },
});

module.exports = router;
