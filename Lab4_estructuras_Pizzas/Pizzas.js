const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });
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
            path: '/Main',
            handler: function (request, reply) {
                reply.file('./Main.html');
            }
        });
        
        server.route({
            method: 'GET',
            path: '/serie1',
            handler: function (request, reply) {
                reply.file('./serie1.html');
            }
        });
    });
    