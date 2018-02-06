const Boom = require("boom");

const MONGO_ERROR_DUPLICATE = 11000;

module.exports = (error, reply) => {
    if (error.response) {
        console.error("Response Error:\n", `Data: ${error.response.data}, Status: ${error.response.status}, Headers: ${error.response.headers}`);
    } else if(error.config) {
        console.error("Config Error:\n", `Method: ${error.config.method}, Url: ${error.config.url}, Data: ${error.config.data}`);
    } else {
        console.error("Error:\n", error.message || error);
    }

    if(reply) {
        if(error.code === MONGO_ERROR_DUPLICATE) {
            reply(Boom.conflict(error));
        } else {
		    reply(Boom.badImplementation(error));
        }
	}
}
