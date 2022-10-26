const Model = require("./Class");

class Memory extends Model {
    static #store = [];
    static #id = 0;

    static _find(findFunc) {
        return Memory.#store.find(findFunc);
    }

    static _findAll(findFunc) {
        return Memory.#store.filter(findFunc);
    }

    static _create(obj) {
        obj.id = Memory.#id;
        Memory.#id++;
        Memory.#store.push(obj);
        return obj;
    }

    static _update(findFunc, obj) {
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

    static _delete(findFunc) {
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
