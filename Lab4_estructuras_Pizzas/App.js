'use strict';

const Hapi = require('hapi');
const routes = require('./routes');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });
server.route(routes);

server.route({
    method: 'GET',
    path: '/routes/Index',
    handler: function (request, reply) {
        reply.file('./routes/Index.html');
    }
});

server.start((err) => {
        if (err) {
            throw err;
        }
        console.log(`Server running at: ${server.info.uri}`);    
});

server.register(require('inert'), (err) => {
        if (err) {
            throw err;
        }
    
        server.route({
            method: 'GET',
            path: '/',
            handler: function (request, reply) {
                reply.file('./routes/Index.html');
            }
        });
    });
    