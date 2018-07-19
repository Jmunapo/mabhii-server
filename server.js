'use strict';

const Hapi = require('hapi');
const Joi = require("joi");

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return 'Hello, world!';
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => {
        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});

server.route({
    method: "GET",
    path: "/account/{username}",
    handler: (request, response) => {
        var accountMock = {};
        if(request.params.username == "joe") {
            accountMock = {
                "username": "joe",
                "password": "1234",
                "twitter": "@joe",
                "website": "https://www.thepolyglotdeveloper.com"
            }
        }
        return accountMock;
    }
});

server.route({
    method: "POST",
    path: "/account",
    config: {
        validate: {
            payload: {
                firstname: Joi.string().required(),
                lastname: Joi.string().required(),
                timestamp: Joi.any().forbidden().default((new Date).getTime())
            }
        }
    },
    handler: (request, response) => {
        return request.payload;
    }
});

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();