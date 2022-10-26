const ModelFactory = require("anonim-server/classes/Model");
const Memory = require("anonim-server/classes/Model/Memory");

const UserModel = new ModelFactory("User").create({}, Memory);

module.exports = UserModel;
