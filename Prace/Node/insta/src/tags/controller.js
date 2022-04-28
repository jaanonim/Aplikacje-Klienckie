const ControlerFactory = require("../../anonim-server/classes/Controler/");
const TagModel = require("./model");

const TagControler = new ControlerFactory("Tag", TagModel).create({});

module.exports = TagControler;
