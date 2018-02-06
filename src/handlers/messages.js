"use strict";

const Axios = require("axios");
const Boom = require("boom");
const MessagesDataModel = require("../models/messages").model;
const ErrorHandler = require("./error");
const AM_HEADERS = require("../authorization/am_http_headers");

const handlers = {};
const OUTBOUND_NOTIFICATION_SERVICE_URI = process.env.AM_OUTBOUND_NOTIFICATION_SERVICE_URI;
const { MESSAGE_STATUS } = require("../common/constants");

const publishNotification = (headers, data) => {
    Axios.post(`${OUTBOUND_NOTIFICATION_SERVICE_URI}/notifications`, { headers }, data).catch(error => ErrorHandler(error));
}

handlers.post = async (request, reply) => {
    const notification = request.payload;
    notification.companyId = request.auth.credentials.companyId;
    notification.userCreated = request.auth.credentials.accountId;
    notification.status = MESSAGE_STATUS[0] // New;

    let message;
    try {
        message = new MessagesDataModel(notification);
        message = await message.save();

        reply(message.toJSON()).code(201);
    } catch(error) {
        ErrorHandler(error, reply);
    }

    if(message) {
        publishNotification(request.headers, message.toJSON());
    }
};

handlers.getAll = async (request, reply) => {
    try {
        const messages = await MessagesDataModel.find({
            companyId: request.auth.credentials.companyId
        });

        reply(messages);
    } catch(error) {
        ErrorHandler(error, reply);
    }
};

handlers.getOne = async (request, reply) => {
    try {
        const message = await MessagesDataModel.findOne({
            _id: request.params.id,
            companyId: request.auth.credentials.companyId
        });

        if(message) {
            reply(message.toJSON());
        } else {
            reply(Boom.notFound());
        }
    } catch(error) {
        ErrorHandler(error, reply);
    }
};

handlers.update = async (request, reply) => {
    const message = request.payload;
    message.userLastModified = request.auth.credentials.accountId;
    message.dateLastModified = Date.now();

    try {
        const doc = await MessagesDataModel.findOneAndUpdate({
            _id: request.params.id,
            companyId: request.auth.credentials.companyId
        }, message, { new: true });

        if(doc) {
            reply(doc.toJSON());
        } else {
            reply(Boom.notFound());
        }
    } catch(error) {
        ErrorHandler(error, reply);
    }
};

handlers.delete = async (request, reply) => {
    try {
        const message = await MessagesDataModel.findOneAndRemove({
            _id: request.params.id,
            companyId: request.auth.credentials.companyId
        });

        if(message) {
            reply(message.toJSON());
        } else {
            reply(Boom.notFound());
        }
    } catch(error) {
        ErrorHandler(error, reply);
    }
};

module.exports = handlers;
