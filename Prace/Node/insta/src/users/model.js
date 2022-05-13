const ModelFactory = require("../../anonim-server/classes/Model");
const MongoDb = require("../../anonim-server/classes/Model/MongoDb");

const UserModel = new ModelFactory("User").create({}, MongoDb);

module.exports = UserModel;
