const MongoClient = require("mongodb").MongoClient;

const settings = require("../settings");

let fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
let _connection = undefined;

let connectDb = () => {
    if (!_connection) {
        _connection = MongoClient.connect(fullMongoUrl)
            .then((db) => {
                return db;
            });
    }
    return _connection;
};

module.exports = connectDb;