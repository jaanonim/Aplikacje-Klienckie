const MiddlewareFactory = require("../anonim-server/classes/Middleware/Factory");
const UserModel = require("../src/users/model");

module.exports = new MiddlewareFactory("ActiveAccount").create(async (ctx) => {
    const id = ctx.getAuth().id;
    if (!id) {
        ctx.sendCodeJson(401, {
            error: "Unauthorized",
        });
        return true;
    }
    const user = await UserModel.find(id);
    if (!user || user.active !== true) {
        ctx.sendCodeJson(403, {
            error: "Forbidden",
        });
        return true;
    }
    delete user.password;
    ctx.getUser = () => {
        return user;
    };
    return false;
});
