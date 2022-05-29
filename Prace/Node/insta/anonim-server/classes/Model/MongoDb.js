const Model = require("./Class");
const Db = require("../../utilities/Db");
const logger = require("../../utilities/Logger");
const ObjectId = require("mongodb").ObjectId;

class MongoDb extends Model {
    static async setup() {
        const db = await Db.get("mongo");
        this.collection = await db.collection(this.name);
    }

    static async _find(id) {
        const res = await this.collection.findOne({ _id: ObjectId(id) });
        return res;
    }

    static async _findAll(findData) {
        const res = await this.collection.find(findData);
        return await res.toArray();
    }

    static async _create(obj) {
        const res = await this.collection.insertOne(obj);
        return await this._find(res.insertedId);
    }

    static async _update(id, obj) {
        if (obj._id) {
            delete obj._id;
        }
        await this.collection.updateOne({ _id: ObjectId(id) }, { $set: obj });
        return await this._find(id);
    }

    static async _delete(id) {
        const obj = await this._find(id);
        await this.collection.deleteOne({ _id: ObjectId(id) });
        return obj;
    }
}

module.exports = MongoDb;
