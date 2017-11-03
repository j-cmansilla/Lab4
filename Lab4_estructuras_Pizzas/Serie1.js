function getData(key, data){
    var privatetKey = document.getElementById(key);
    var dataEncript = document.getElementById(data);
    var algorithm = 'aes-256-ctr';
    
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
}



var txt;
function saveData(txtEncripted){
txt = txtEncripted;
}

function printDataJSon(){
  

}
