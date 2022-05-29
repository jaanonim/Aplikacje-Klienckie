const logger = require("./Logger");
const MongoClient = require("mongodb").MongoClient;
module.exports = class Db {
    static async get(name) {
        if (Db.connections[name] == null) {
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

    static async db_mongo() {
        const client = new MongoClient(process.env.DB_URL);
        await client.connect();
        return client.db(process.env.DB_NAME);
    }
};
