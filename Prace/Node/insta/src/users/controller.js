const ControlerFactory = require("../../anonim-server/classes/Controler/");
const UserModel = require("./model");
const PassCrypto = require("../../anonim-server/utilities/PassCrypto");

const UserControler = new ControlerFactory("User", UserModel).create({
    async create(ctx) {
        const { error, value } = ctx.machBody({
            password: true,
            firstName: true,
            lastName: true,
            email: true,
        });
        if (error) {
            ctx.sendCodeJson(400, { error: `Missing ${value}.` });
            return;
        }

        if (
            !value.password.match(
                /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
            )
        ) {
            ctx.sendCodeJson(400, { error: `Invalid password.` });
            return;
        }

        if (
            !value.email.match(
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            )
        ) {
            ctx.sendCodeJson(400, { error: `Invalid email.` });
            return;
        }

        if (value.firstName.length < 4) {
            ctx.sendCodeJson(400, { error: `Invalid first name.` });
            return;
        }
        if (value.lastName.length < 4) {
            ctx.sendCodeJson(400, { error: `Invalid last name.` });
            return;
        }

        const u = await this.Model.findAll({ email: value.email });
        if (u.length > 0) {
            ctx.sendCodeJson(400, { error: `This email is allery registred.` });
            return;
        }

        value.password = await PassCrypto.encrypt(value.password);

        value.active = false;

        const res = await this.Model.create(value);
        ctx.sendCodeJson(201, res);

        //TODO: Send Email
    },
    async confirm(ctx) {},
    async login(ctx) {},
    async logout(ctx) {},
    async update(ctx) {},
});

module.exports = UserControler;
