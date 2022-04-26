const ModelFactory = require("../../anonim-server/classes/Model");
const MongoDb = require("../../anonim-server/classes/Model/MongoDb");

const PhotoModel = new ModelFactory("PhotoModel").create({}, MongoDb);

module.exports = PhotoModel;
