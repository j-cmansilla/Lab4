function getData(key, data){
    var privatetKey = document.getElementById(key);
    var dataEncript = document.getElementById(data);
    var algorithm = 'aes-256-ctr';
    var jwt = require('jsonwebtoken');
    

    function decrypt(password) {
        var decipher = crypto.createDecipher(algorithm, privateKey);
        var dec = decipher.update(password, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }

    function encrypt(password) {
        var cipher = crypto.createCipher(algorithm, privateKey);
        var crypted = cipher.update(password, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    }
    
    saveData( );
    printDataJSon();
}

var txt;
function saveData(txtEncripted){
txt = txtEncripted;
}

function printDataJSon(){
  

}

let rutas = [{
    method: 'GET',
    path:'/routes/Serie1', 
    handler: function (request, reply) {

        reply.file('./routes/Serie1.html')
    }
}];
module.exports = rutas;
