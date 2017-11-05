let rutas = [{
    method: 'GET',
    path:'/routes/Pizza', 
    handler: function (request, reply) {
        reply.file('./routes/Pizza.html')
    }
},{
    method: 'GET',
    path:'/Pizza/{id?}', 
    handler: function (request, reply) {
        if(request.params.id)
            console.log(request.params.id);
        else
            console.log('not param found');
        return reply({
             status: 200, 
             data: {
                Pizza: "world"
            }
        });
    }
},{
    method: 'GET',
    path: '/routes/Serie1/{user*2}',
    handler: function (request, reply) {
        const userParts = request.params.user.split('/');
        reply('Hello ' + encodeURIComponent(userParts[0]) + ' ' + encodeURIComponent(userParts[1]) + '!');
    }
}, {
    method: 'POST',
    path:'/Pizza', 
    handler: function (request, reply) {
        return reply({
             status: 200, 
             data: {
                Pizza: "world"
            }
        });
    }
}, {
    method: 'PUT',
    path:'/Pizza', 
    handler: function (request, reply) {
        return reply({
             status: 200, 
             data: {
                Pizza: "world"
            }
        });
    }
}, {
    method: 'DELETE',
    path:'/Pizza', 
    handler: function (request, reply) {
        return reply({
             status: 200, 
             data: {
                Pizza: "world"
            }
        });
    }
}];

module.exports = rutas;