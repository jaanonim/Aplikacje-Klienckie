const ControlerFactory = require("../../anonim-server/classes/Controler/");
const UserModel = require("./model");

const UserControler = new ControlerFactory("User", UserModel).create({});

module.exports = UserControler;
