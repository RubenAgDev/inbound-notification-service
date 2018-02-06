"use strict";

const Joi = require("joi");
//Joi.objectId = require("joi-objectid")(Joi);
const handlers = require("../handlers/messages");
const AM_HEADERS_VALIDATION_SCHEMA = require("../authorization/am_http_headers").VALIDATION_SCHEMA;
const { MESSAGE_STATUS, TOPICS } = require("../common/constants");

const AUTH_STRATEGY = "identity";
const BASE_PATH = "/messages"

const VALIDATION_SCHEMA = {
	subject: Joi.string(),
	emails: Joi.array().items(Joi.string().email()),
	topic: Joi.string().allow(TOPICS),
	content: Joi.string(),
	status: Joi.string().allow(MESSAGE_STATUS)
}

module.exports = [
	{
		method: "POST",
		path: BASE_PATH,
		handler: handlers.post,
		config: {
			auth: AUTH_STRATEGY,
			description: "Post a new message",
			tags: ["api"],
			validate: {
				payload: {
					subject: VALIDATION_SCHEMA.subject.required(),
					emails: VALIDATION_SCHEMA.emails,
					topic: VALIDATION_SCHEMA.topic.required(),
					content: VALIDATION_SCHEMA.content.required()
				}
			}
		}
	},
	{
		method: "GET",
		path: BASE_PATH,
		handler: handlers.getAll,
		config: {
			auth: AUTH_STRATEGY,
			description: "Retrieves all the messages",
			tags: ["api"],
			validate: {
				headers: AM_HEADERS_VALIDATION_SCHEMA,
			}
		}
	},
	{
		method: "GET",
		path: `${BASE_PATH}/{id}`,
		handler: handlers.getOne,
		config: {
			auth: AUTH_STRATEGY,
			description: "Retrieves a message",
			tags: ["api"],
			validate: {
				headers: AM_HEADERS_VALIDATION_SCHEMA,
			}
		}
	},
	{
		method: "PATCH",
		path: `${BASE_PATH}/{id}`,
		handler: handlers.update,
		config: {
			auth: AUTH_STRATEGY,
			description: "Updates a message",
			tags: ["api"],
			validate: {
				headers: AM_HEADERS_VALIDATION_SCHEMA,
				payload: {
					subject: VALIDATION_SCHEMA.subject,
					topic: VALIDATION_SCHEMA.topic,
					content: VALIDATION_SCHEMA.content,
					status: VALIDATION_SCHEMA.status
				}
			}
		}
	},
	{
		method: "DELETE",
		path: `${BASE_PATH}/{id}`,
		handler: handlers.delete,
		config: {
			auth: AUTH_STRATEGY,
			description: "Updates a message",
			tags: ["api"],
			validate: {
				headers: AM_HEADERS_VALIDATION_SCHEMA
			}
		}
	}
];
