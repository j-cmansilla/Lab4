'use strict';

const Hapi = require('hapi');
const routes = require('./routes');
//const Boom = require('boom');
//const mongoose = require('mongoose');
//const glob = require('glob');
//const path = require('path');
//const secret = require('./config');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });
server.route(routes);

/*const dbUrl = 'mongodb://localhost:27017/App';
server.auth.strategy('jwt', 'jwt', {
    key: secret,
    verifyOptions: { algorithms: ['HS256'] }
  });*/


/*server.route({
    method: 'GET',
    path: '/routes/Index',
    handler: function (request, reply) {
        reply.file('./routes/Index.html');
    }
});
*/
server.start((err) => {
        if (err) {
            throw err;
        }
        console.log(`Server running at: ${server.info.uri}`);   
       /* mongoose.connect(dbUrl, {}, (err) => {
            if (err) {
              throw err;
            }
          }); */
});

server.register(require('inert'), (err) => {
        if (err) {
            throw err;
        }
    
        server.route({
            method: 'GET',
            path: '/',
            handler: (request, reply) => {
                reply.file('./routes/Serie1.html');
            }
        });
    });
    