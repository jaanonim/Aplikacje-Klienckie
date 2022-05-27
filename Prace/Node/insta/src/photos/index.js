const RouterFactory = require("../../anonim-server/classes/Router");
const PhotoControler = require("./controller");

const router = RouterFactory.create(PhotoControler, {
    deleteMany: {
        url: "/",
        method: "delete",
        options: {
            middlewares: ["Auth", "ActiveAccount"],
        },
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
            middlewares: ["Auth", "ActiveAccount"],
            fileUpload: true,
        },
    },
    update: {
        url: "/:id/",
        method: "patch",
        options: {
            fileUpload: true,
            middlewares: ["Auth", "ActiveAccount"],
        },
    },
    delete: {
        url: "/:id/",
        method: "delete",
        options: {
            middlewares: ["Auth", "ActiveAccount"],
        },
    },
});

module.exports = router;
