const Datastore = require('nedb')

const colection = new Datastore({
    filename: 'data.db',
    autoload: true
});

module.exports = colection
