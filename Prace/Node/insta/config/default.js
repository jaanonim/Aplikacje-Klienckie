module.exports = {
    jsonParser: true,
    formidable: {
        uploadDir: "./static/uploads",
        multiples: true,
        filter: function ({ name, originalFilename, mimetype }) {
            return mimetype && mimetype.includes("image");
        },
    },
    middlewares: ["@Auth"],
};
