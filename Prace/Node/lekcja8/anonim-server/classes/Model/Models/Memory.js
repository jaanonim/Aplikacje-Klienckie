const Model = require("../Class");

class Memory extends Model {
    static #store = [];
    static #id = 0;

    static find(id) {
        return Memory.#store.find((v) => v.id === id);
    }

    static findAll(findFunc) {
        return Memory.#store.findAll(findFunc);
    }

    static create(obj) {
        obj.id = Memory.#id;
        Memory.#id++;
        Memory.#store.push(obj);
        return obj;
    }

    static update(findFunc, obj) {
        if (obj.id) {
            delete obj.id;
        }
        let objs = Memory.#store.findAll(findFunc);
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
        let objs = Memory.#store.findAll(findFunc);
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
