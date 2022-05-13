const MiddlewareFactory = require("../Factory");

module.exports = new MiddlewareFactory("Auth").create((ctx) => {
    return ctx;
});
