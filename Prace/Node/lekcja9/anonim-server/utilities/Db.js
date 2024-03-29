const logger = require("./Logger");
const mongoClient = require("mongodb").MongoClient;
module.exports = class Db {
    static async get(name) {
        if (!Db.connections[name]) {
            try {
                Db.connections[name] = await this["db_" + name]();
            } catch (e) {
                logger.fatal(e);
                process.exit(1);
            }
        }
        return Db.connections[name];
    }

    static connections = {};

    static db_mongo() {
        new Promise((res, rej) => {
            mongoClient.connect("mongodb://localhost/test", (err, db) => {
                if (err) rej(err);
                else res(db);
            });
        });
    }
};
