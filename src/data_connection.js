"use strict";

const Assert = require("assert");
const Mongoose = require("mongoose");

Mongoose.Promise = global.Promise;

const DATABASE_NAME = "notifications";

Mongoose.connect(`mongodb://${process.env.AM_MONGODB_HOST}/${DATABASE_NAME}?${process.env.AM_MONGODB_OPTIONS}`)
    .then(() => {
        console.log(`Mongoose connection open in DB: ${Mongoose.connection.db.databaseName}`);
    }).catch((dbConnectionError) => {
        console.log(dbConnectionError);
        Assert.fail(`DB: ${Mongoose.connection.db.databaseName}`, `${JSON.stringify(dbConnectionError)}`, "Mongoose connection error");
    });

module.exports = Mongoose.connection;
