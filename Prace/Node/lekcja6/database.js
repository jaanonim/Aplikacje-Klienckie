const Datastore = require('nedb');
class Database {
    constructor(filename = 'data.db', config) {
        if (config) {
            config.filename = filename;
        } else {
            config = {
                filename,
                autoload: true
            }
        }
        this.collection = new Datastore(config)
    }

    async insert(data) {
        return new Promise((resolve, reject) => {
            this.collection.insert(data, (err, docs) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(docs);
                }
            })
        })
    }

    async find(data) {
        return new Promise((resolve, reject) => {
            this.collection.find(data, (err, docs) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(docs);
                }
            })
        })
    }

    async delete(data) {
        return new Promise((resolve, reject) => {
            this.collection.remove(data, (err, docs) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(docs);
                }
            })
        })
    }

}
module.exports = Database