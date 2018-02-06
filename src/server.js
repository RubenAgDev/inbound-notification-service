"use strict";

const Hapi = require("hapi");
const DataConnection = require("./data_connection");
const Good = require("good");
//const HapiSwagger = require("hapi-swagger");
//const Inert = require("inert");
//const Vision = require("vision");

const Config = require("./server.config");
const IdentityAuth = require("./authorization/identity");
const MessagesRoutes = require("./routes/messages");

const server = new Hapi.Server();
server.connection(Config.webServer);
server.register([
    {
        register: Good,
        options: Config.loggerOptions        
    },
    // {
    //     register: HapiSwagger,
    //     options: Config.swaggerOptions
    // },
    // Inert,
    // Vision,
    {
        register: IdentityAuth
    }
], (err) => {
    if(err) {
        console.log(err);
    }
});

server.route([
    {
        method: "GET",
        path: "/health",
        handler: (request, reply) => {
            // TODO: Provide the Status of the API, for now replies with 200 (OK) always
            return reply();
        },
        config: {
            auth: false,
            tags: ["api"]
        }
    }
].concat(MessagesRoutes));

server.start((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
