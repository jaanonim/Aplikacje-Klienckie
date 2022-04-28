const ModelFactory = require("../../anonim-server/classes/Model");
const MongoDb = require("../../anonim-server/classes/Model/MongoDb");

const TagModel = new ModelFactory("Tag").create({}, MongoDb);

module.exports = TagModel;
