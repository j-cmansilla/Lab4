

let rutas = [{
    method: 'GET',
    path:'/routes/prototype', 
    handler: (request, reply) => {
        reply.file('./routes/prototype.html')
    }
},{
    method: 'POST',
    path: '/routes/prototype',
    config: {
        payload: {
            output: 'data'
        }
    },
    handler: function (request, response){
      var your_variable = request.payload.your_variable
    }
}];
module.exports = rutas;
