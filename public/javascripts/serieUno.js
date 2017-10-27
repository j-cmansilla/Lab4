var jwt = require('jwt-simple');
var payload = { foo: 'bar' };
var secret = 'secretKeyForJSON';

function cipherData(){
    var textJSon = document.getElementById('textareaJSon');
    var text = textJSon.value;
    var textCipher = document.getElementById('textareaCifrado');
    var token = jwt.encode(payload, secret,'HS512');
    textCipher.value = token;
}