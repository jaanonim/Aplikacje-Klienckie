module.exports = {
    jsonParser: true,
    port: process.env.PORT || 3000,
    static: "./static",
    formidable: {
        uploadDir: "./static/uploads",
    },
    middlewares: [],
    JWT: {
        expiresIn: "1d",
    },
    cors: "*",
    charset: "utf-8",
};
