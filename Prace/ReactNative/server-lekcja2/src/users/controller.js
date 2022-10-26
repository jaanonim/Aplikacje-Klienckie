const ControlerFactory = require("anonim-server/classes/Controler/");
const UserModel = require("./model");
const PassCrypto = require("anonim-server/utilities/PassCrypto");
const Mail = require("anonim-server/utilities/Mail");
const JWToken = require("anonim-server/utilities/JWToken");
const Server = require("anonim-server/classes/Server");
const path = require("path");
const fs = require("fs").promises;

const UserControler = new ControlerFactory("User", UserModel).create({
    async create(ctx) {
        const b = ctx.getBody();
        console.log(b);

        if (b && b.login && b.login.length > 3) {
            const u = await this.Model.findAll((e) => e.login === b.login);
            if (u.length > 0) {
                ctx.sendCodeJson(400, {
                    error: `This login is allery registred.`,
                });
                return;
            }
            b.date = new Date().toLocaleString();
            ctx.sendJson(this.Model.create(b));
        } else {
            ctx.sendCodeJson(400, { error: "Something went wrong" });
        }
    },
});

/*{
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
                /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
            )
        ) {
            ctx.sendCodeJson(400, { error: `Invalid password.` });
            return;
        }

        if (
            !value.email.match(
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
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
        value.profileImg = null; //TODO: add default profile image

        const res = await this.Model.create(value);
        delete res.password;
        ctx.sendCodeJson(201, res);

        const token = await JWToken.createToken({
            id: res._id,
            active: true,
        });

        Mail.send(
            value.email,
            "Activate your account",
            `
            <h1>Hello ${value.firstName}</h1>
            <p>
                To activate your account, please click on the link below:
            </p>
            <a href="${process.env.BASE_URL}/api/user/activate/${token}/">
            ${process.env.BASE_URL}/api/user/activate/${token}/
            </a>
            <p>
                If you did not request this, please ignore this email and your password will remain unchanged.
            </p>
            <p>
                Regards,
            </p>
            <p>
                Insta
            </p>
            `,
        );
    },

    async activate(ctx) {
        const token = ctx.getUrlParam("token");
        const { error, value } = await JWToken.verifyToken(token);

        if (
            error ||
            !value.data ||
            value.data.active !== true ||
            !value.data.id
        ) {
            ctx.sendCodeJson(400, { error: `Invalid token.` });
            return;
        }
        const user = await this.Model.find(value.data.id);
        if (!user) {
            ctx.sendCodeJson(400, { error: `Invalid token (User not found).` });
            return;
        }

        if (user.active) {
            ctx.sendCodeJson(400, { error: `User is allready active.` });
            return;
        }
        await this.Model.update(value.data.id, { active: true });
        ctx.sendCodeJson(200, { message: `Account activated.` });
    },

    async login(ctx) {
        const { error, value } = ctx.machBody({
            password: true,
            email: true,
        });
        if (error) {
            ctx.sendCodeJson(400, { error: `Missing ${value}.` });
            return;
        }
        const [user] = await this.Model.findAll({ email: value.email });
        if (!user) {
            ctx.sendCodeJson(400, { error: `Invalid email or password.` });
            return;
        }
        if (!user.active) {
            ctx.sendCodeJson(403, {
                error: `Check you email for activation link.`,
            });
            return;
        }
        if (await PassCrypto.veryfiy(value.password, user.password)) {
            delete user.password;
            user.token = await JWToken.createToken({ id: user._id });
            ctx.sendCodeJson(200, user);
            return;
        } else {
            ctx.sendCodeJson(400, { error: `Invalid email or password.` });
            return;
        }
    },

    async logout(ctx) {},

    async update(ctx) {
        const { error, value } = ctx.machBody({
            firstName: false,
            lastName: false,
            email: false,
        });
        const user = await ctx.getUser();

        const profileImg = ctx.getFile("file")[0];
        if (profileImg) {
            const folderPath = path.join(
                Server.config.formidable.uploadDir,
                "" + user._id,
            );
            const filePath = path.join(folderPath, profileImg.newFilename);
            await fs.mkdir(folderPath, { recursive: true });
            await fs.rename(profileImg.filepath, filePath);

            value.profileImg = path.relative("static", filePath);
        }

        const res = await this.Model.update(user._id, value);
        delete res.password;
        ctx.sendCodeJson(200, res);
    },

    async current(ctx) {
        ctx.sendCodeJson(200, await ctx.getUser());
    },
}*/

module.exports = UserControler;
