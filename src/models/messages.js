"use strict";

/**
 * Mongoose Schema
 */
const Mongoose = require("mongoose");
const { MESSAGE_STATUS } = require("../common/constants");

const schema = new Mongoose.Schema({
    subject: { type: String, required: true },
    companyId: { type: Mongoose.SchemaTypes.ObjectId, required: true },
    status: { type: String, enum: MESSAGE_STATUS, required: true },
    topic: { type: String, required: true },
    content: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    dateLastModified: { type: Date },
    userCreated: { type: String, required: true},
    userLastModified: { type: String }
}, {
    toJSON: {
        transform: (doc, ret) => {
            delete ret._id;
            ret.id = doc._id;
            delete ret.__v; 
        }
    }
});

module.exports = {
    schema,
    model: Mongoose.model("message", schema)
};
