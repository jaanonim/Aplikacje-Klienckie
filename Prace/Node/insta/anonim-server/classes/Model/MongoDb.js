const Model = require("./Class");
const Db = require("../../utilities/Db");
const logger = require("../../utilities/Logger");
const ObjectID = require("mongodb").ObjectID;

class MongoDb extends Model {
    static async setup() {
        const db = await Db.get("mongo");
        db.createCollection(this.name, (err, coll) => {
            if (err) {
                logger.error(err);
            } else {
                this.collection = coll;
            }
        });
    }

    static _find(id) {
        return new Promise((res, rej) => {
            this.collection.find({ _id: ObjectID(id) }).toArray((err, data) => {
                if (err) rej(err);
                else res(data[0]);
            });
        });
    }

    static _findAll(findData) {
        return new Promise((res, rej) => {
            this.collection.find(findData).toArray((err, data) => {
                if (err) rej(err);
                else res(data);
            });
        });
    }

    static _create(obj) {
        return new Promise((res, rej) => {
            this.collection.insert(obj, (err, data) => {
                if (err) rej(err);
                else res(data.ops[0]);
            });
        });
    }

    static _update(id, obj) {
        if (obj._id) {
            delete obj._id;
        }

        return new Promise((res, rej) => {
            const obj = this._find(id);
            this.collection.updateOne(
                { _id: ObjectID(id) },
                { $set: obj },
                (err, data) => {
                    if (err) rej(err);
                    else res(obj);
                }
            );
        });
    }

    static _delete(id) {
        return new Promise((res, rej) => {
            const obj = this._find(id);
            this.collection.remove({ _id: ObjectID(id) }, (err, data) => {
                if (err) rej(err);
                else res(obj);
            });
        });
    }
}

module.exports = MongoDb;
