const Model = require("./Class");
const Db = require("../../utilities/Db");
const logger = require("../../utilities/Logger");

class MongoDb extends Model {
    static setup() {
        const db = Db.get("mongo");
        db.createCollection(this.name, (err, coll) => {
            if (err) {
                logger.error(err);
            } else {
                this.collection = coll;
            }
        });
    }

    static find(id) {
        return collection.find({ _id: ObjectID(id) }, (err, data) => {
            console.log(data);
        });
    }

    static findAll(findFunc) {
        return Memory.#store.filter(findFunc);
    }

    static create(obj) {
        coll.insert({ a: 1 }, (err, result) => {
            console.log(
                "dokument powstał, sprawdź efekt w konsoli klienta mongo"
            );
        });
        obj.id = Memory.#id;
        Memory.#id++;
        Memory.#store.push(obj);
        return obj;
    }

    static update(findFunc, obj) {
        if (obj.id) {
            delete obj.id;
        }
        let objs = Memory.#store.filter(findFunc);
        let res = [];
        objs.map((element) => {
            Memory.#store.map((v) => {
                if (v.id === element.id) {
                    res.push({ ...v, ...obj });
                    return { ...v, ...obj };
                } else return v;
            });
        });
        return res;
    }

    static delete(findFunc) {
        let objs = Memory.#store.filter(findFunc);
        let res = [];
        objs.forEach((element) => {
            res.push(
                ...Memory.#store.splice(Memory.#store.indexOf(element), 1)
            );
        });
        return res;
    }
}

module.exports = Memory;
