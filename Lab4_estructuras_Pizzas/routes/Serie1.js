function js1()
{
   alert("Hello from js1");
}
function printDataXML(){
    deleteData();
    var count = 0;
    var users = document.getElementById('key');
    users.innerHTML = "";
    lista.forEach(function(element) {
        var text = `&ltuser&gt
        &ltnombre&gt ${element.nombre} &lt/nombre&gt
        &ltid&gt ${element.id}&lt/id&gt
        &ltbool&gt ${element.bool}&lt/bool&gt
        &lt/user&gt `
        users.innerHTML = users.innerHTML + text;
    }, this); 
}
function getData(key, data){
    var privateKey = document.getElementById(key);
    var dataEncript = document.getElementById(data);
    var algorithm = 'aes-256-ctr';
    var jwt = require('jsonwebtoken');
    return 'fuck2';

    function encrypt(dataEncript) {
        var cipher = crypto.createCipher(algorithm, privateKey);
        var crypted = cipher.update(password, 'utf8', 'hex');
        crypted += cipher.final('hex');
        printData(dec);
        return crypted;
    }
    
    function decrypt(dataEncript) {
        var decipher = crypto.createDecipher(algorithm, privateKey);
        var dec = decipher.update(password, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }
    saveData( );
    printData();
}

var txt;
function saveData(txtEncripted){
txt = txtEncripted;
}

function printData(){
    var test = "Hello";
    Serie1.getElementById("encriptData").value = test;
    Serie1.write(produceMessage())
}

let rutas = [{
    method: 'GET',
    path:'/routes/Serie1', 
    handler: function (request, reply) {
        reply.file('./routes/Serie1.html')
    }
},{
    method: 'DELETE',
    path: '/routes/Serie1/{user*2}',
    handler: function (request, reply) {
        const userParts = request.params.user.split('/');
        reply('Hello ' + encodeURIComponent(userParts[0]) + ' ' + encodeURIComponent(userParts[1]) + '!');
    }
}, {
    method: ['PUT', 'POST'],
    path:'/routes/Serie1', 
    handler: function (request, reply) {
        reply('fuck the world');//'Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
}];
module.exports = rutas;
