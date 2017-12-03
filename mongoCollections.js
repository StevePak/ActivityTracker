
const dbConnection = require("./mongoConnection");

/* This will allow you to have one reference to each collection per app */
let getCollectionFn = (collection) => {
    let _col = undefined;

    return () => {
        if (!_col) {
            _col = dbConnection().then(db => {
                return db.collection(collection);
            });
        }

        return _col;
    }
}

/* List your collections here: */
module.exports = {
    users: getCollectionFn("users"),
	activities: getCollectionFn("activities")
};

