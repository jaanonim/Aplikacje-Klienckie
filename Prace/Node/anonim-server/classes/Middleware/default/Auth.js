const MiddlewareFactory = require("../Factory");
const JWToken = require("../../../utilities/JWToken");

module.exports = new MiddlewareFactory("Auth").create(async (ctx) => {
    const token = ctx.getHeader("authorization")?.split("Bearer ")[1];
    if (!token) {
        ctx.sendCodeJson(401, {
            error: "Unauthorized",
        });
        return true;
    }

    const { error, value } = await JWToken.verifyToken(token);

    if (error) {
        ctx.sendCodeJson(401, {
            error: "Unauthorized",
        });
        return true;
    }

    ctx._setAuth(value);

    return false;
});
