"use strict";

const Boom = require("boom");

const {
    AM_COMPANY_ID,
    AM_ACCOUNT_ID,
    AM_USERNAME
} = require("./am_http_headers");

const AUTH_SCHEME = "custom_headers";
const AUTH_STRATEGY_NAME = "identity";

const authenticate = (server, options) => {
    return {
        authenticate: (request, reply) => {
            const companyId = request.headers[AM_COMPANY_ID];
            const accountId = request.headers[AM_ACCOUNT_ID];
            const username = request.headers[AM_USERNAME];

            if(companyId && accountId && username) {
                reply.continue({
                    credentials: {
                        accountId,
                        companyId,
                        username
                    }
                });
            } else {
                reply(Boom.unauthorized());
            }
        }
    }
}

exports.register = (plugin, options, next) => {
    plugin.auth.scheme(AUTH_SCHEME, authenticate);
    plugin.auth.strategy(AUTH_STRATEGY_NAME, AUTH_SCHEME, "required");
    next();
};

exports.STRATEGY_NAME = AUTH_STRATEGY_NAME;

exports.register.attributes = {
    name: AUTH_STRATEGY_NAME
};
