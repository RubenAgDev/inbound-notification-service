const Joi = require("joi");
/**
 * Headers populated after auth with access token
 */
const AM_COMPANY_ID = "am-company-id";
const AM_CLIENT_ID = "am-client-id";

/**
 * Headers populated by the API Gateway after auth with Identity Token
 */
const AM_ACCOUNT_ID = "am-account-id";
const AM_USERNAME = "am-username";

const VALIDATION_SCHEMA = {};
VALIDATION_SCHEMA[AM_COMPANY_ID] = Joi.string();
VALIDATION_SCHEMA[AM_CLIENT_ID] = Joi.string();
VALIDATION_SCHEMA[AM_ACCOUNT_ID] = Joi.string();
VALIDATION_SCHEMA[AM_USERNAME] = Joi.string().email().allow("");

module.exports = {
    AM_ACCOUNT_ID,
    AM_CLIENT_ID,
    AM_COMPANY_ID,
    AM_USERNAME,
    VALIDATION_SCHEMA: Joi.object().keys(VALIDATION_SCHEMA).unknown(true)
}
