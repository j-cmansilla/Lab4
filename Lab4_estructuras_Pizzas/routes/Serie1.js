function Do()
{
    var header = {
        "alg": "HS256",
        "typ": "JWT"
      };
      
      var data = {
        "id":  document.getElementById(id),
        "username": document.getElementById(username)
      };
      
      var secret =  document.getElementById(data);
      
      function base64url(source) {
        // Encode in classical base64
        encodedSource = CryptoJS.enc.Base64.stringify(source);
        
        // Remove padding equal characters
        encodedSource = encodedSource.replace(/=+$/, '');
        
        // Replace characters according to base64url specifications
        encodedSource = encodedSource.replace(/\+/g, '-');
        encodedSource = encodedSource.replace(/\//g, '_');
        
        return encodedSource;
      }
      
      var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
      var encodedHeader = base64url(stringifiedHeader);
      document.getElementById("header").innerText = encodedHeader;
      
      var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
      var encodedData = base64url(stringifiedData);
      document.getElementById("payload").innerText = encodedData;
      
      var signature = encodedHeader + "." + encodedData;
      signature = CryptoJS.HmacSHA256(signature, secret);
      signature = base64url(signature);
      
      document.getElementById("signature").innerText = signature;
}
//****************************************************************************

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
    handler: (request, reply) => {
        reply.file('./routes/Serie1.html')
    }
}];
module.exports = rutas;
